import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

function sanitizeIdentifier(value: string) {
  return value.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { identifier?: string };
    const identifier = sanitizeIdentifier(String(body.identifier ?? ""));
    if (!identifier) {
      return NextResponse.json({ ok: false, error: "Missing identifier" }, { status: 400 });
    }

    if (identifier.includes("@")) {
      return NextResponse.json({ ok: true, email: identifier });
    }

    const admin = createAdminClient();
    const { data: profile } = await admin
      .from("users")
      .select("auth_user_id")
      .eq("username", identifier)
      .maybeSingle();

    if (!profile?.auth_user_id) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 404 });
    }

    const authUserRes = await admin.auth.admin.getUserById(profile.auth_user_id);
    const email = authUserRes.data.user?.email?.trim().toLowerCase();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, email });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to resolve login identifier" }, { status: 500 });
  }
}

