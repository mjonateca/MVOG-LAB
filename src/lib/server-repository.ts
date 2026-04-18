import { NextResponse } from "next/server";
import { demoState } from "./demo-data";
import { createSupabaseAdmin } from "./supabase/admin";
import type { AppUser, ControlRoomState, Idea, IdeaInput, Role, Status } from "./types";

type RoleRow = { id: string; name: string };
type StatusRow = { id: string; name: string; position: number; wip_limit: number };
type RelationOne<T> = T | T[] | null;
type UserRow = {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  verification_code: string;
  roles?: RelationOne<RoleRow>;
};
type IdeaRow = {
  id: string;
  name: string;
  market: string;
  owner_id: string | null;
  status_id: string | null;
  value: Idea["value"];
  effort: Idea["effort"];
  notes: string;
  prompt: string;
  updated_at: string;
  app_users?: RelationOne<Pick<UserRow, "id" | "name">>;
  statuses?: RelationOne<Pick<StatusRow, "id" | "name">>;
  idea_tags?: Array<{ tag: string }>;
};
type ActivityRow = { id: string; created_at: string; message: string };

export function unavailableResponse() {
  return NextResponse.json(
    {
      error: "Supabase is not configured. Copy .env.example to .env.local and set Supabase keys."
    },
    { status: 503 }
  );
}

export async function getControlRoomState(): Promise<ControlRoomState> {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return demoState;
  }

  const [roles, statuses, users, ideas, activity] = await Promise.all([
    supabase.from("roles").select("id,name").order("name"),
    supabase.from("statuses").select("id,name,position,wip_limit").order("position"),
    supabase.from("app_users").select("id,name,email,verified,verification_code,roles(id,name)").order("name"),
    supabase
      .from("ideas")
      .select("id,name,market,owner_id,status_id,value,effort,notes,prompt,updated_at,app_users(id,name),statuses(id,name),idea_tags(tag)")
      .order("updated_at", { ascending: false }),
    supabase.from("activity").select("id,created_at,message").order("created_at", { ascending: false }).limit(40)
  ]);

  const error = roles.error || statuses.error || users.error || ideas.error || activity.error;
  if (error) {
    throw error;
  }

  return {
    roles: ((roles.data || []) as RoleRow[]).map(mapRole),
    statuses: ((statuses.data || []) as StatusRow[]).map(mapStatus),
    users: ((users.data || []) as unknown as UserRow[]).map(mapUser),
    ideas: ((ideas.data || []) as unknown as IdeaRow[]).map(mapIdea),
    activity: ((activity.data || []) as ActivityRow[]).map((item) => ({
      id: item.id,
      at: item.created_at,
      text: item.message
    }))
  };
}

export async function createIdea(input: IdeaInput) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("ideas")
    .insert({
      name: input.name,
      market: input.market,
      owner_id: input.ownerId || null,
      status_id: input.statusId || null,
      value: input.value,
      effort: input.effort,
      notes: input.notes,
      prompt: input.prompt
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  await syncTags(data.id, input.tags);
  await addActivity(`${input.name} fue creada.`);
  return data.id as string;
}

export async function updateIdea(id: string, input: Partial<IdeaInput>) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const patch: Record<string, unknown> = {};
  if (input.name !== undefined) patch.name = input.name;
  if (input.market !== undefined) patch.market = input.market;
  if (input.ownerId !== undefined) patch.owner_id = input.ownerId || null;
  if (input.statusId !== undefined) patch.status_id = input.statusId || null;
  if (input.value !== undefined) patch.value = input.value;
  if (input.effort !== undefined) patch.effort = input.effort;
  if (input.notes !== undefined) patch.notes = input.notes;
  if (input.prompt !== undefined) patch.prompt = input.prompt;

  const { error } = await supabase.from("ideas").update(patch).eq("id", id);
  if (error) {
    throw error;
  }

  if (input.tags) {
    await syncTags(id, input.tags);
  }

  await addActivity(`${input.name || "Una idea"} fue actualizada.`);
  return id;
}

export async function deleteIdea(id: string) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { error } = await supabase.from("ideas").delete().eq("id", id);
  if (error) {
    throw error;
  }

  await addActivity("Una idea fue eliminada.");
  return id;
}

export async function createUser(input: { name: string; email: string; roleId?: string | null }) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const code = randomCode();
  const { data, error } = await supabase
    .from("app_users")
    .insert({
      name: input.name,
      email: input.email,
      role_id: input.roleId || null,
      verification_code: code
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  await addActivity(`${input.name} fue agregado al equipo.`);
  return data.id as string;
}

export async function verifyUser(id: string, code: string) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return false;
  }

  const { data, error } = await supabase
    .from("app_users")
    .select("id,name,verification_code")
    .eq("id", id)
    .single();

  if (error || !data || data.verification_code !== code) {
    return false;
  }

  const { error: updateError } = await supabase
    .from("app_users")
    .update({ verified: true, verification_code: randomCode() })
    .eq("id", id);

  if (updateError) {
    throw updateError;
  }

  await addActivity(`${data.name} completó verificación.`);
  return true;
}

async function syncTags(ideaId: string, tags: string[]) {
  const supabase = createSupabaseAdmin();
  if (!supabase) return;

  await supabase.from("idea_tags").delete().eq("idea_id", ideaId);
  const cleanTags = [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
  if (!cleanTags.length) return;

  const { error } = await supabase.from("idea_tags").insert(cleanTags.map((tag) => ({ idea_id: ideaId, tag })));
  if (error) {
    throw error;
  }
}

async function addActivity(message: string) {
  const supabase = createSupabaseAdmin();
  if (!supabase) return;
  await supabase.from("activity").insert({ message });
}

function mapRole(row: RoleRow): Role {
  return { id: row.id, name: row.name };
}

function mapStatus(row: StatusRow): Status {
  return { id: row.id, name: row.name, position: row.position, wipLimit: row.wip_limit };
}

function mapUser(row: UserRow): AppUser {
  const role = firstRelation(row.roles);
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: role?.name || "Sin rol",
    verified: row.verified,
    verificationCode: row.verification_code
  };
}

function mapIdea(row: IdeaRow): Idea {
  const owner = firstRelation(row.app_users);
  const status = firstRelation(row.statuses);
  return {
    id: row.id,
    name: row.name,
    market: row.market,
    ownerId: row.owner_id,
    owner: owner?.name || "Sin responsable",
    statusId: row.status_id,
    status: status?.name || "Inbox",
    value: row.value,
    effort: row.effort,
    notes: row.notes,
    prompt: row.prompt,
    tags: row.idea_tags?.map((item) => item.tag) || [],
    updatedAt: row.updated_at
  };
}

function firstRelation<T>(relation: RelationOne<T> | undefined) {
  return Array.isArray(relation) ? relation[0] : relation;
}

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
