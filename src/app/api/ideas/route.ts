import { NextResponse } from "next/server";
import { createIdea, getControlRoomState, unavailableResponse } from "@/lib/server-repository";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  try {
    return NextResponse.json(await getControlRoomState());
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const input = await request.json();
    const id = await createIdea(input);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
