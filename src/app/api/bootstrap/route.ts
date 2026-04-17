import { NextResponse } from "next/server";
import { getControlRoomState } from "@/lib/server-repository";

export async function GET() {
  try {
    const state = await getControlRoomState();
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
