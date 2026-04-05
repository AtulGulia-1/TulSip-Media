"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/roles";
import { createAdminClient } from "@/lib/supabase/admin";

async function assertAdminProfile() {
  const supabase = await createClient();
  const { profile } = await getCurrentProfile();
  if (!profile || !["owner", "admin", "manager"].includes(profile.role)) {
    throw new Error("Unauthorized");
  }
  return { profile, supabase };
}

export async function addClientAction(formData: FormData) {
  const { supabase } = await assertAdminProfile();
  const name = String(formData.get("name") ?? "").trim();
  const industry = String(formData.get("industry") ?? "").trim();
  const website = String(formData.get("website") ?? "").trim();

  if (!name) return;

  await supabase.from("clients").insert({ name, industry: industry || null, website: website || null });
  revalidatePath("/admin/dashboard");
}

export async function addPostAction(formData: FormData) {
  const { profile, supabase } = await assertAdminProfile();

  const clientId = String(formData.get("client_id") ?? "");
  const platform = String(formData.get("platform") ?? "Instagram");
  const title = String(formData.get("title") ?? "").trim();
  const scheduledAt = String(formData.get("scheduled_at") ?? "");
  const mediaType = String(formData.get("media_type") ?? "image");
  const mediaUrl = String(formData.get("media_url") ?? "");
  const planNote = String(formData.get("plan_note") ?? "");

  if (!clientId || !title) return;

  await supabase.from("posts").insert({
    client_id: clientId,
    platform,
    title,
    status: "in_review",
    scheduled_at: scheduledAt || null,
    media_type: mediaType,
    media_url: mediaUrl || null,
    plan_note: planNote || null
  });

  const { data: latestPost } = await supabase
    .from("posts")
    .select("id")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (latestPost?.id) {
    await supabase.from("approvals").insert({
      post_id: latestPost.id,
      requested_by: profile.id,
      status: "pending",
      due_date: scheduledAt ? scheduledAt.slice(0, 10) : null
    });
  }

  revalidatePath("/admin/dashboard");
}

export async function addDeliverableAction(formData: FormData) {
  const { supabase } = await assertAdminProfile();
  const clientId = String(formData.get("client_id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const dueDate = String(formData.get("due_date") ?? "");
  const status = String(formData.get("status") ?? "pending");
  const mediaType = String(formData.get("media_type") ?? "image");
  const mediaUrl = String(formData.get("media_url") ?? "");
  const quantity = Number(formData.get("quantity") ?? 1);

  if (!clientId || !title) return;

  await supabase.from("deliverables").insert({
    client_id: clientId,
    title,
    due_date: dueDate || null,
    status,
    media_type: mediaType || null,
    media_url: mediaUrl || null,
    quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1
  });

  revalidatePath("/admin/dashboard");
}

export async function addReportAction(formData: FormData) {
  const { supabase } = await assertAdminProfile();
  const clientId = String(formData.get("client_id") ?? "");
  const reportType = String(formData.get("report_type") ?? "weekly");
  const periodStart = String(formData.get("period_start") ?? "");
  const periodEnd = String(formData.get("period_end") ?? "");
  const metaReach = Number(formData.get("meta_reach") ?? 0);
  const metaCtr = Number(formData.get("meta_ctr") ?? 0);
  const googleClicks = Number(formData.get("google_clicks") ?? 0);
  const googleCpc = Number(formData.get("google_cpc") ?? 0);
  const notes = String(formData.get("notes") ?? "");

  if (!clientId || !periodStart || !periodEnd) return;

  await supabase.from("reports").insert({
    client_id: clientId,
    report_type: reportType,
    period_start: periodStart,
    period_end: periodEnd,
    meta_insights: { reach: metaReach, ctr: metaCtr },
    google_insights: { clicks: googleClicks, cpc: googleCpc },
    notes: notes || null
  });

  revalidatePath("/admin/dashboard");
}

export async function resolveClientRequestAction(formData: FormData) {
  const { profile, supabase } = await assertAdminProfile();
  const requestId = String(formData.get("request_id") ?? "");
  const status = String(formData.get("status") ?? "resolved");

  if (!requestId) return;

  await supabase
    .from("client_requests")
    .update({
      status,
      resolved_by_user_id: profile.id,
      resolved_at: status === "resolved" || status === "closed" ? new Date().toISOString() : null
    })
    .eq("id", requestId);

  revalidatePath("/admin/dashboard");
}

export async function sendAdminMessageAction(formData: FormData) {
  const { profile, supabase } = await assertAdminProfile();
  const clientId = String(formData.get("client_id") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  const attachmentUrl = String(formData.get("attachment_url") ?? "").trim();

  if (!clientId || !body) return;

  await supabase.from("messages").insert({
    client_id: clientId,
    sender_user_id: profile.id,
    sender_role: profile.role,
    body,
    attachment_url: attachmentUrl || null
  });

  revalidatePath("/admin/dashboard");
}

export async function createAdminTicketAction(formData: FormData) {
  const { profile, supabase } = await assertAdminProfile();
  const clientId = String(formData.get("client_id") ?? "");
  const priority = String(formData.get("priority") ?? "medium");
  const subject = String(formData.get("subject") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();

  if (!clientId || !subject) return;

  await supabase.from("client_requests").insert({
    client_id: clientId,
    request_type: "admin_ticket",
    priority,
    status: "open",
    subject,
    details: details || null,
    created_by_user_id: profile.id
  });

  revalidatePath("/admin/dashboard");
}

export async function removeClientAction(formData: FormData) {
  const { supabase } = await assertAdminProfile();
  const clientId = String(formData.get("client_id") ?? "");
  if (!clientId) return;

  await supabase.from("clients").delete().eq("id", clientId);
  revalidatePath("/admin/dashboard");
}

export async function resetClientPasswordAction(formData: FormData) {
  await assertAdminProfile();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const newPassword = String(formData.get("new_password") ?? "").trim();
  if (!email || newPassword.length < 8) return;

  const admin = createAdminClient();
  const usersRes = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  const target = usersRes.data.users.find((user) => (user.email ?? "").toLowerCase() === email);
  if (!target) return;

  await admin.auth.admin.updateUserById(target.id, { password: newPassword });
  revalidatePath("/admin/dashboard");
}

export async function updateAdminSessionSettingsAction(formData: FormData) {
  const { profile, supabase } = await assertAdminProfile();
  const inactivityTimeout = Number(formData.get("inactivity_timeout_minutes") ?? 60);
  const preferredLanguage = String(formData.get("preferred_language") ?? "en").trim();

  await supabase
    .from("users")
    .update({
      preferred_language: preferredLanguage || "en",
      inactivity_timeout_minutes:
        Number.isFinite(inactivityTimeout) && inactivityTimeout >= 1 && inactivityTimeout <= 240
          ? inactivityTimeout
          : 60
    })
    .eq("id", profile.id);

  revalidatePath("/admin/dashboard");
}

export async function upsertStaffRoleAction(formData: FormData) {
  const { profile } = await assertAdminProfile();
  if (profile.role !== "owner") {
    throw new Error("Only owner can manage admin roles.");
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const role = String(formData.get("role") ?? "admin").trim();
  const fullName = String(formData.get("full_name") ?? "Staff User").trim();
  const password = String(formData.get("password") ?? "").trim();
  if (!email || !["admin", "manager", "owner", "client"].includes(role)) return;

  const admin = createAdminClient();
  const usersRes = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
  let authUser = usersRes.data.users.find((user) => (user.email ?? "").toLowerCase() === email);

  if (!authUser) {
    if (!password || password.length < 8) return;
    const created = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    authUser = created.data.user ?? null;
  } else if (password && password.length >= 8) {
    await admin.auth.admin.updateUserById(authUser.id, { password, email_confirm: true });
  }

  if (!authUser) return;

  await admin.from("users").upsert(
    {
      auth_user_id: authUser.id,
      full_name: fullName || email.split("@")[0],
      role
    },
    { onConflict: "auth_user_id" }
  );

  revalidatePath("/admin/dashboard");
}

export async function addPortfolioItemAction(formData: FormData) {
  const { supabase } = await assertAdminProfile();
  const title = String(formData.get("title") ?? "").trim();
  const result = String(formData.get("result") ?? "").trim();
  const mediaUrl = String(formData.get("media_url") ?? "").trim();
  const mediaType = String(formData.get("media_type") ?? "image").trim();
  const externalLink = String(formData.get("external_link") ?? "").trim();
  const sortOrder = Number(formData.get("sort_order") ?? 0);
  const isPublished = String(formData.get("is_published") ?? "on") === "on";

  if (!title || !result || !mediaUrl) return;

  await supabase.from("portfolio_items").insert({
    title,
    result,
    media_url: mediaUrl,
    media_type: mediaType === "video" ? "video" : "image",
    external_link: externalLink || null,
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    is_published: isPublished
  });

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio");
}

export async function deletePortfolioItemAction(formData: FormData) {
  const { supabase } = await assertAdminProfile();
  const portfolioId = String(formData.get("portfolio_id") ?? "");
  if (!portfolioId) return;

  await supabase.from("portfolio_items").delete().eq("id", portfolioId);

  revalidatePath("/admin/dashboard");
  revalidatePath("/portfolio");
}
