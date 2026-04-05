"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "tulsip_daily_check_seen_at";

const REMINDERS = [
  "Daily check: review your content approvals before 6 PM.",
  "Daily check: confirm tomorrow's post and reel schedule.",
  "Daily check: reply to open client/admin messages.",
  "Daily check: inspect ad insights for optimization opportunities."
];

export function DailyCheckReminder() {
  const [visible, setVisible] = useState(false);
  const reminder = useMemo(
    () => REMINDERS[new Date().getDate() % REMINDERS.length],
    []
  );

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const seenAt = window.localStorage.getItem(STORAGE_KEY);
    if (seenAt === today) return;

    const timer = window.setTimeout(() => setVisible(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  function closeReminder() {
    const today = new Date().toISOString().slice(0, 10);
    window.localStorage.setItem(STORAGE_KEY, today);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="theme-card mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border-[#ce1919]/40 bg-[#7d0f0f]/20 p-3">
      <p className="text-sm text-[#f3e7c5]">{reminder}</p>
      <button
        type="button"
        onClick={closeReminder}
        className="rounded-sm border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
      >
        Noted
      </button>
    </div>
  );
}

