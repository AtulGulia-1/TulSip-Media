import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

function getAllowedOwnerEmails() {
  const configured = (process.env.OWNER_EMAILS ?? process.env.OWNER_EMAIL ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return new Set(configured);
}

function getAllowedAdminEmails() {
  const configured = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return new Set(configured);
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

    const email = (user.email ?? "").toLowerCase();
    if (!email) {
      return NextResponse.json({ ok: false, error: "Email missing" }, { status: 400 });
    }

    const ownerEmails = getAllowedOwnerEmails();
    const adminEmails = getAllowedAdminEmails();

    let role = ownerEmails.has(email) ? "owner" : adminEmails.has(email) ? "admin" : null;

    const admin = createAdminClient();

    // Safe first-boot fallback: if no privileged user exists yet, first admin login becomes owner.
    if (!role) {
      const { count: privilegedCount } = await admin
        .from("users")
        .select("id", { count: "exact", head: true })
        .in("role", ["owner", "admin", "manager"]);
      if ((privilegedCount ?? 0) === 0) {
        role = "owner";
      }
    }

    if (!role) {
      return NextResponse.json({ ok: false, error: "Email is not in allowed admin list" }, { status: 403 });
    }
    const { data: existingProfile, error: profileReadError } = await admin
      .from("users")
      .select("id,role")
      .eq("auth_user_id", user.id)
      .maybeSingle();

    if (profileReadError) {
      return NextResponse.json(
        { ok: false, error: `Profile read failed: ${profileReadError.message}` },
        { status: 500 }
      );
    }

    if (!existingProfile) {
      const fullName =
        (user.user_metadata?.full_name as string | undefined) ??
        (user.user_metadata?.name as string | undefined) ??
        email.split("@")[0];

      const insertPayload = {
        auth_user_id: user.id,
        full_name: fullName,
        role
      };

      const insertRes = await admin
        .from("users")
        .upsert(insertPayload, { onConflict: "auth_user_id" });

      // Backward-compatible fallback for databases not yet migrated to support "owner" role.
      if (insertRes.error && role === "owner") {
        const fallbackRes = await admin.from("users").insert({
          ...insertPayload,
          role: "admin"
        });
        if (fallbackRes.error) {
          return NextResponse.json(
            { ok: false, error: `Bootstrap failed: ${fallbackRes.error.message}` },
            { status: 500 }
          );
        }
      } else if (insertRes.error) {
        return NextResponse.json(
          { ok: false, error: `Bootstrap failed: ${insertRes.error.message}` },
          { status: 500 }
        );
      }
    } else if (!["owner", "admin", "manager"].includes(existingProfile.role)) {
      // Allowlisted admin/owner email can be promoted from client during bootstrap.
      const promoteRes = await admin
        .from("users")
        .update({ role })
        .eq("auth_user_id", user.id);

      if (promoteRes.error) {
        return NextResponse.json(
          { ok: false, error: `Role promotion failed: ${promoteRes.error.message}` },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ ok: true, role });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to bootstrap admin role" }, { status: 500 });
  }
}


