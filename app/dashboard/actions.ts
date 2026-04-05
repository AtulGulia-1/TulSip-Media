"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getCurrentProfile } from "@/lib/supabase/roles";

async function assertClientContext() {
  const { user, profile } = await getCurrentProfile();
  if (!user || !profile || profile.role !== "client") {
    throw new Error("Unauthorized");
  }

  const supabase = await createClient();
  const { data: client } = await supabase
    .from("clients")
    .select("id")
    .eq("primary_contact_auth_user_id", user.id)
    .maybeSingle();

  if (!client) {
    throw new Error("Client not found");
  }

  return { supabase, profile, clientId: client.id };
}

export async function respondApprovalAction(formData: FormData) {
  const { supabase, profile, clientId } = await assertClientContext();
  const approvalId = String(formData.get("approval_id") ?? "");
  const decision = String(formData.get("decision") ?? "approved");
  const feedback = String(formData.get("feedback") ?? "");

  if (!approvalId || !["approved", "rejected"].includes(decision)) return;

  const { data: approval } = await supabase
    .from("approvals")
    .select("id,post_id,posts!inner(client_id)")
    .eq("id", approvalId)
    .eq("posts.client_id", clientId)
    .maybeSingle();

  if (!approval) return;

  await supabase
    .from("approvals")
    .update({
      status: decision,
      approved_by: profile.id,
      feedback: feedback || null
    })
    .eq("id", approvalId);

  await supabase
    .from("posts")
    .update({ status: decision === "approved" ? "scheduled" : "draft" })
    .eq("id", approval.post_id);

  revalidatePath("/dashboard");
}

export async function raiseRequestAction(formData: FormData) {
  const { supabase, profile, clientId } = await assertClientContext();
  const requestType = String(formData.get("request_type") ?? "content_request");
  const priority = String(formData.get("priority") ?? "medium");
  const subject = String(formData.get("subject") ?? "").trim();
  const details = String(formData.get("details") ?? "").trim();

  if (!subject) return;

  await supabase.from("client_requests").insert({
    client_id: clientId,
    request_type: requestType,
    priority,
    subject,
    details: details || null,
    created_by_user_id: profile.id
  });

  revalidatePath("/dashboard");
}

export async function sendClientMessageAction(formData: FormData) {
  const { supabase, profile, clientId } = await assertClientContext();
  const body = String(formData.get("body") ?? "").trim();
  const attachmentUrl = String(formData.get("attachment_url") ?? "").trim();

  if (!body) return;

  await supabase.from("messages").insert({
    client_id: clientId,
    sender_user_id: profile.id,
    sender_role: "client",
    body,
    attachment_url: attachmentUrl || null
  });

  revalidatePath("/dashboard");
}

export async function updateClientSettingsAction(formData: FormData) {
  const { supabase, profile, clientId } = await assertClientContext();
  const fullName = String(formData.get("full_name") ?? "").trim();
  const avatarUrl = String(formData.get("avatar_url") ?? "").trim();
  const businessType = String(formData.get("business_type") ?? "").trim();
  const preferredLanguage = String(formData.get("preferred_language") ?? "en").trim();
  const inactivityTimeout = Number(formData.get("inactivity_timeout_minutes") ?? 60);

  if (!fullName) return;

  await supabase
    .from("users")
    .update({
      full_name: fullName,
      avatar_url: avatarUrl || null,
      preferred_language: preferredLanguage || "en",
      inactivity_timeout_minutes:
        Number.isFinite(inactivityTimeout) && inactivityTimeout >= 1 && inactivityTimeout <= 240
          ? inactivityTimeout
          : 60
    })
    .eq("id", profile.id);

  await supabase
    .from("clients")
    .update({ industry: businessType || null })
    .eq("id", clientId);

  revalidatePath("/dashboard");
}
