import { NextResponse } from "next/server";
import { requireAuthenticatedRequest } from "@/lib/auth";
import { deleteCalendarEvent, unavailableResponse, updateCalendarEvent } from "@/lib/server-repository";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: Request, context: RouteContext) {
  const auth = await requireAuthenticatedRequest(request);
  if (auth.response) return auth.response;
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const { id } = await context.params;
    await deleteCalendarEvent(id);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const auth = await requireAuthenticatedRequest(request);
  if (auth.response) return auth.response;
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const { id } = await context.params;
    const input = await request.json();
    await updateCalendarEvent(id, input);
    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
