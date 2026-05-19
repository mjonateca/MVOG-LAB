import { NextResponse } from "next/server";
import { createUser, unavailableResponse } from "@/lib/server-repository";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const input = await request.json();
    const id = await createUser(input);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
