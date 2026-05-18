import { NextResponse } from "next/server";
import { deleteIdea, unavailableResponse, updateIdea } from "@/lib/server-repository";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const { id } = await context.params;
    const input = await request.json();
    await updateIdea(id, input);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const { id } = await context.params;
    await deleteIdea(id);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
