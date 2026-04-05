import { createClient } from "@/lib/supabase/server";

export type PortalRole = "owner" | "admin" | "manager" | "client";

export type PortalProfile = {
  id: string;
  auth_user_id: string;
  full_name: string;
  username?: string | null;
  role: PortalRole;
  avatar_url?: string | null;
  preferred_language?: string | null;
  inactivity_timeout_minutes?: number | null;
};

export async function getCurrentProfile() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { user: null, profile: null as PortalProfile | null };

  const { data: profile } = await supabase
    .from("users")
    .select("id,auth_user_id,full_name,username,role,avatar_url,preferred_language,inactivity_timeout_minutes")
    .eq("auth_user_id", user.id)
    .maybeSingle();

  return { user, profile: profile ?? null };
}
