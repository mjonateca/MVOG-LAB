import { NextResponse } from "next/server";
import { requireAuthenticatedRequest } from "@/lib/auth";
import { getControlRoomState } from "@/lib/server-repository";

export async function GET(request: Request) {
  const auth = await requireAuthenticatedRequest(request);
  if (auth.response) return auth.response;

  try {
    const state = await getControlRoomState();
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
