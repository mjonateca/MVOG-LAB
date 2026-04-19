import { NextResponse } from "next/server";
import { requireAuthenticatedRequest } from "@/lib/auth";
import { createCalendarEvent, getControlRoomState, unavailableResponse } from "@/lib/server-repository";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const auth = await requireAuthenticatedRequest(request);
  if (auth.response) return auth.response;

  try {
    return NextResponse.json(await getControlRoomState());
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await requireAuthenticatedRequest(request);
  if (auth.response) return auth.response;
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const input = await request.json();
    const id = await createCalendarEvent(input);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
