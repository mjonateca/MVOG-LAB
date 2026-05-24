import { NextResponse } from "next/server";
import { loadStateFromGitHub, saveStateToGitHub } from "@/lib/github-state";

export async function GET() {
  try {
    const state = await loadStateFromGitHub();
    return NextResponse.json(state);
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const state = await request.json();
    await saveStateToGitHub(state);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
