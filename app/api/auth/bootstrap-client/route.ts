import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

export async function POST() {
  try {
    const supabase = await createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();
    const { data: existingProfile } = await admin
      .from("users")
      .select("id,role")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (existingProfile && ["owner", "admin", "manager"].includes(existingProfile.role)) {
      return NextResponse.json({ ok: false, error: "Admin/Owner account cannot bootstrap as client" }, { status: 403 });
    }

    if (!existingProfile) {
      const baseUsername = normalizeUsername(
        (user.user_metadata?.preferred_username as string | undefined) ??
          (user.user_metadata?.user_name as string | undefined) ??
          (user.email?.split("@")[0] ?? "client")
      );
      let username = baseUsername || `client${Date.now()}`;
      const { data: userNameTaken } = await admin
        .from("users")
        .select("id")
        .eq("username", username)
        .maybeSingle();
      if (userNameTaken?.id) {
        username = `${username}${Math.floor(Math.random() * 9999)}`;
      }

      await admin.from("users").insert({
        auth_user_id: user.id,
        full_name:
          (user.user_metadata?.full_name as string | undefined) ??
          (user.user_metadata?.name as string | undefined) ??
          user.email?.split("@")[0] ??
          "Client User",
        username,
        role: "client"
      });
    }

    const { data: existingClient } = await admin
      .from("clients")
      .select("id")
      .eq("primary_contact_auth_user_id", user.id)
      .maybeSingle();

    if (!existingClient) {
      const businessName =
        (user.user_metadata?.business_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined) ??
        `${user.email?.split("@")[0] ?? "Client"} Account`;
      const businessType =
        (user.user_metadata?.business_type as string | undefined) ??
        (user.user_metadata?.industry as string | undefined) ??
        null;

      await admin.from("clients").insert({
        name: businessName,
        industry: businessType,
        primary_contact_auth_user_id: user.id
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to bootstrap client account" }, { status: 500 });
  }
}
