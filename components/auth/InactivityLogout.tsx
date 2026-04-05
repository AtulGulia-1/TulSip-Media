"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_TIMEOUT_MINUTES = 60;

export function InactivityLogout() {
  const pathname = usePathname();
  const router = useRouter();
  const timerRef = useRef<number | null>(null);
  const timeoutMsRef = useRef(DEFAULT_TIMEOUT_MINUTES * 60 * 1000);
  const hasSessionRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    async function loadTimeout() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!mounted || !user) {
        hasSessionRef.current = false;
        return;
      }

      hasSessionRef.current = true;

      const { data: profile } = await supabase
        .from("users")
        .select("inactivity_timeout_minutes")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      const minutes = Number(profile?.inactivity_timeout_minutes ?? DEFAULT_TIMEOUT_MINUTES);
      timeoutMsRef.current = Math.max(1, Math.min(240, minutes)) * 60 * 1000;
      resetTimer();
    }

    async function logoutForInactivity() {
      if (!hasSessionRef.current) return;
      await supabase.auth.signOut();
      const isAdminRoute = pathname.startsWith("/admin");
      router.push(isAdminRoute ? "/admin/login?timeout=1" : "/login?timeout=1");
      router.refresh();
    }

    function resetTimer() {
      if (!hasSessionRef.current) return;
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(logoutForInactivity, timeoutMsRef.current);
    }

    const events: Array<keyof WindowEventMap> = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart"
    ];
    events.forEach((eventName) => window.addEventListener(eventName, resetTimer, { passive: true }));

    loadTimeout();

    return () => {
      mounted = false;
      if (timerRef.current) window.clearTimeout(timerRef.current);
      events.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [pathname, router]);

  return null;
}
