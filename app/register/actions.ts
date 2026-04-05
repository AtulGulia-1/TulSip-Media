"use server";

import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendNewClientRegistrationEmail } from "@/lib/notifications/email";

function normalizeUsername(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

export async function registerClientAction(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const usernameRaw = String(formData.get("username") ?? "").trim();
  const businessName = String(formData.get("business_name") ?? "").trim();
  const businessType = String(formData.get("business_type") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const username =
    normalizeUsername(usernameRaw) ||
    normalizeUsername(email.split("@")[0] ?? "") ||
    `user${Date.now()}`;

  if (!fullName || !businessName || !email || !password) {
    redirect("/register?error=missing_fields");
  }

  const admin = createAdminClient();
  const { data: usernameTaken } = await admin
    .from("users")
    .select("id")
    .eq("username", username)
    .maybeSingle();
  if (usernameTaken?.id) {
    redirect("/register?error=username_taken");
  }

  const { data: createdAuth, error: createAuthError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  if (createAuthError || !createdAuth.user) {
    redirect("/register?error=auth_create_failed");
  }

  const { error: profileError } = await admin.from("users").insert({
    auth_user_id: createdAuth.user.id,
    full_name: fullName,
    username,
    role: "client"
  });

  if (profileError) {
    redirect("/register?error=profile_create_failed");
  }

  const { error: clientError } = await admin.from("clients").insert({
    name: businessName,
    industry: businessType || null,
    website: website || null,
    primary_contact_auth_user_id: createdAuth.user.id
  });

  if (clientError) {
    redirect("/register?error=client_create_failed");
  }

  await sendNewClientRegistrationEmail({
    clientName: businessName,
    email,
    website: website || undefined
  });

  redirect("/login?next=/dashboard");
}
