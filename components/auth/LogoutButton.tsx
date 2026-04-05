"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type LogoutButtonProps = {
  redirectTo: string;
};

export function LogoutButton({ redirectTo }: LogoutButtonProps) {
  const router = useRouter();

  async function onLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      className="rounded-sm border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f6f0cf] transition hover:bg-white/10"
    >
      Logout
    </button>
  );
}
