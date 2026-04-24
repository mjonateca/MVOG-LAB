import { NextResponse } from "next/server";
import { demoState } from "./demo-data";
import { createSupabaseAdmin } from "./supabase/admin";
import type { AppUser, CalendarEvent, CalendarEventInput, ControlRoomState, Idea, IdeaInput, IdeaPhaseNote, Role, Status } from "./types";

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
  development_progress?: number | null;
  return_score?: number | null;
  difficulty_score?: number | null;
  updated_at: string;
  app_users?: RelationOne<Pick<UserRow, "id" | "name">>;
  statuses?: RelationOne<Pick<StatusRow, "id" | "name">>;
  idea_tags?: Array<{ tag: string }>;
};
type ActivityRow = { id: string; created_at: string; message: string };
type CalendarEventRow = {
  id: string;
  title: string;
  owner_name: string;
  owner_email: string | null;
  starts_at: string;
  ends_at: string | null;
  location: string;
  notes: string;
  completed_at: string | null;
  created_at: string;
};
type IdeaPhaseNoteRow = {
  id: string;
  idea_id: string;
  status_id: string | null;
  status_name: string;
  summary: string;
  details: string;
  link: string;
  created_at: string;
  updated_at: string;
};

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

  const [roles, statuses, users, activity] = await Promise.all([
    supabase.from("roles").select("id,name").order("name"),
    supabase.from("statuses").select("id,name,position,wip_limit").order("position"),
    supabase.from("app_users").select("id,name,email,verified,verification_code,roles(id,name)").order("name"),
    supabase.from("activity").select("id,created_at,message").order("created_at", { ascending: false }).limit(40)
  ]);
  const ideas = await fetchIdeaRows();
  const phaseNotes = await fetchIdeaPhaseNotes();
  const calendarEvents = await fetchCalendarEvents();

  const error = roles.error || statuses.error || users.error || activity.error;
  if (error) {
    throw error;
  }

  return {
    roles: ((roles.data || []) as RoleRow[]).map(mapRole),
    statuses: ((statuses.data || []) as StatusRow[]).map(mapStatus),
    users: ((users.data || []) as unknown as UserRow[]).map(mapUser),
    ideas: ideas.map((idea) => mapIdea(idea, phaseNotes.get(idea.id) || [])),
    calendarEvents,
    activity: ((activity.data || []) as ActivityRow[]).map((item) => ({
      id: item.id,
      at: item.created_at,
      text: item.message
    }))
  };
}

export async function createCalendarEvent(input: CalendarEventInput) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("calendar_events")
    .insert({
      title: input.title,
      owner_name: input.ownerName,
      owner_email: input.ownerEmail || null,
        starts_at: input.startsAt,
        ends_at: input.endsAt || null,
        location: input.location,
        notes: input.notes,
        completed_at: input.completedAt || null
    })
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  await addActivity(`${input.ownerName} tiene ${input.title} en calendario.`);
  return data.id as string;
}

export async function updateCalendarEvent(id: string, input: Partial<CalendarEventInput>) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const patch: Record<string, unknown> = {};
  if (input.title !== undefined) patch.title = input.title;
  if (input.ownerName !== undefined) patch.owner_name = input.ownerName;
  if (input.ownerEmail !== undefined) patch.owner_email = input.ownerEmail || null;
  if (input.startsAt !== undefined) patch.starts_at = input.startsAt;
  if (input.endsAt !== undefined) patch.ends_at = input.endsAt || null;
  if (input.location !== undefined) patch.location = input.location;
  if (input.notes !== undefined) patch.notes = input.notes;
  if (input.completedAt !== undefined) patch.completed_at = input.completedAt || null;

  const { error } = await supabase.from("calendar_events").update(patch).eq("id", id);
  if (error) {
    throw error;
  }

  if (input.completedAt !== undefined) {
    await addActivity(input.completedAt ? "Un evento fue marcado como completado." : "Un evento fue reabierto en el calendario.");
  } else if (input.startsAt !== undefined) {
    await addActivity("Un evento del calendario cambió de día.");
  } else {
    await addActivity("Un evento del calendario fue actualizado.");
  }

  return id;
}

export async function deleteCalendarEvent(id: string) {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return null;
  }

  const { error } = await supabase.from("calendar_events").delete().eq("id", id);
  if (error) {
    throw error;
  }

  await addActivity("Un evento fue eliminado del calendario.");
  return id;
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
      prompt: input.prompt,
      development_progress: input.developmentProgress ?? progressFromStatus(input.status || "", []),
      return_score: input.returnScore ?? null,
      difficulty_score: input.difficultyScore ?? null
    })
    .select("id")
    .single();

  if (error) {
    const fallback = await supabase
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
    if (fallback.error) throw fallback.error;
    await syncTags(fallback.data.id, input.tags);
    await syncPhaseNotes(fallback.data.id, input.phaseNotes || []);
    await addActivity(`${input.name} fue creada.`);
    return fallback.data.id as string;
  }

  await syncTags(data.id, input.tags);
  await syncPhaseNotes(data.id, input.phaseNotes || []);
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
  if (input.developmentProgress !== undefined) patch.development_progress = input.developmentProgress;
  if (input.returnScore !== undefined) patch.return_score = input.returnScore;
  if (input.difficultyScore !== undefined) patch.difficulty_score = input.difficultyScore;

  const { error } = await supabase.from("ideas").update(patch).eq("id", id);
  if (error) {
    delete patch.development_progress;
    delete patch.return_score;
    delete patch.difficulty_score;
    const retry = await supabase.from("ideas").update(patch).eq("id", id);
    if (retry.error) throw retry.error;
  }

  if (input.tags) {
    await syncTags(id, input.tags);
  }
  if (input.phaseNotes) {
    await syncPhaseNotes(id, input.phaseNotes);
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

async function fetchIdeaRows() {
  const supabase = createSupabaseAdmin();
  if (!supabase) return [] as IdeaRow[];

  const enriched = await supabase
    .from("ideas")
    .select(
      "id,name,market,owner_id,status_id,value,effort,notes,prompt,development_progress,return_score,difficulty_score,updated_at,app_users(id,name),statuses(id,name),idea_tags(tag)"
    )
    .order("updated_at", { ascending: false });

  if (!enriched.error) {
    return (enriched.data || []) as unknown as IdeaRow[];
  }

  const fallback = await supabase
    .from("ideas")
    .select("id,name,market,owner_id,status_id,value,effort,notes,prompt,updated_at,app_users(id,name),statuses(id,name),idea_tags(tag)")
    .order("updated_at", { ascending: false });

  if (fallback.error) {
    throw fallback.error;
  }
  return (fallback.data || []) as unknown as IdeaRow[];
}

async function fetchIdeaPhaseNotes() {
  const supabase = createSupabaseAdmin();
  const byIdea = new Map<string, IdeaPhaseNote[]>();
  if (!supabase) return byIdea;

  const { data, error } = await supabase
    .from("idea_phase_notes")
    .select("id,idea_id,status_id,status_name,summary,details,link,created_at,updated_at")
    .order("created_at");

  if (error) {
    return byIdea;
  }

  ((data || []) as IdeaPhaseNoteRow[]).forEach((row) => {
    const current = byIdea.get(row.idea_id) || [];
    current.push(mapIdeaPhaseNote(row));
    byIdea.set(row.idea_id, current);
  });

  return byIdea;
}

async function fetchCalendarEvents() {
  const supabase = createSupabaseAdmin();
  if (!supabase) return [] as CalendarEvent[];

  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 14);
  const end = new Date(now);
  end.setDate(end.getDate() + 60);

  const { data, error } = await supabase
    .from("calendar_events")
    .select("id,title,owner_name,owner_email,starts_at,ends_at,location,notes,completed_at,created_at")
    .gte("starts_at", start.toISOString())
    .lte("starts_at", end.toISOString())
    .order("starts_at");

  if (error) {
    return [];
  }

  return ((data || []) as CalendarEventRow[]).map(mapCalendarEvent);
}

async function syncPhaseNotes(ideaId: string, notes: IdeaPhaseNote[]) {
  const supabase = createSupabaseAdmin();
  if (!supabase || !notes.length) return;

  const rows = notes
    .filter((note) => note.summary.trim() || note.details.trim() || note.link.trim())
    .map((note) => ({
      idea_id: ideaId,
      status_id: note.statusId || null,
      status_name: note.statusName,
      summary: note.summary,
      details: note.details,
      link: note.link
    }));
  if (!rows.length) return;

  const { error } = await supabase.from("idea_phase_notes").insert(rows);
  if (error) {
    return;
  }
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

function mapIdea(row: IdeaRow, phaseNotes: IdeaPhaseNote[]): Idea {
  const owner = firstRelation(row.app_users);
  const status = firstRelation(row.statuses);
  return {
    id: row.id,
    name: row.name,
    market: row.market,
    ownerId: row.owner_id,
    owner: owner?.name || "",
    statusId: row.status_id,
    status: status?.name || "IDEA",
    value: row.value,
    effort: row.effort,
    notes: row.notes,
    prompt: row.prompt,
    tags: row.idea_tags?.map((item) => item.tag) || [],
    phaseNotes,
    developmentProgress: row.development_progress ?? progressFromStatus(status?.name || "", []),
    returnScore: row.return_score ?? null,
    difficultyScore: row.difficulty_score ?? null,
    updatedAt: row.updated_at
  };
}

function mapIdeaPhaseNote(row: IdeaPhaseNoteRow): IdeaPhaseNote {
  return {
    id: row.id,
    statusId: row.status_id,
    statusName: row.status_name,
    summary: row.summary,
    details: row.details,
    link: row.link,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapCalendarEvent(row: CalendarEventRow): CalendarEvent {
  return {
    id: row.id,
    title: row.title,
    ownerName: row.owner_name,
    ownerEmail: row.owner_email,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    location: row.location,
    notes: row.notes,
    completedAt: row.completed_at,
    createdAt: row.created_at
  };
}

function firstRelation<T>(relation: RelationOne<T> | undefined) {
  return Array.isArray(relation) ? relation[0] : relation;
}

function randomCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function progressFromStatus(statusName: string, statuses: Status[]) {
  if (!statusName || !statuses.length) return 0;
  const index = statuses.findIndex((status) => status.name === statusName);
  return index < 0 || statuses.length <= 1 ? 0 : Math.round((index / (statuses.length - 1)) * 100);
}
