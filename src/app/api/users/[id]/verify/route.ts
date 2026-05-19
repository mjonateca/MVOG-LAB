import { NextResponse } from "next/server";
import { unavailableResponse, verifyUser } from "@/lib/server-repository";
import { createSupabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  if (!createSupabaseAdmin()) return unavailableResponse();

  try {
    const { id } = await context.params;
    const { code } = await request.json();
    const verified = await verifyUser(id, code);

    if (!verified) {
      return NextResponse.json({ error: "Código incorrecto." }, { status: 400 });
    }

    return NextResponse.json({ verified: true });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
