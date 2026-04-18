import { NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";
import { createSupabaseAdmin } from "./supabase/admin";

const DEFAULT_ALLOWED_EMAILS = ["mjcalvo92@gmail.com", "vinelis13@gmail.com"];

export function allowedEmails() {
  const configured = process.env.ALLOWED_AUTH_EMAILS?.split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
  return new Set(configured?.length ? configured : DEFAULT_ALLOWED_EMAILS);
}

export function isAllowedEmail(email?: string | null) {
  return Boolean(email && allowedEmails().has(email.toLowerCase()));
}

type AuthResult = { response: NextResponse; user?: never } | { user: User; response?: never };

export async function requireAuthenticatedRequest(request: Request): Promise<AuthResult> {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    return {
      response: NextResponse.json({ error: "Supabase is not configured." }, { status: 503 })
    };
  }

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim();
  if (!token) {
    return {
      response: NextResponse.json({ error: "Authentication required." }, { status: 401 })
    };
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user || !isAllowedEmail(data.user.email)) {
    return {
      response: NextResponse.json({ error: "Access denied." }, { status: 403 })
    };
  }

  return { user: data.user };
}
