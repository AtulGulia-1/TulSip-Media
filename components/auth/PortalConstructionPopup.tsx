"use client";

import { useEffect, useState } from "react";
import { SITE_COPY } from "@/lib/data/site-content";

export function PortalConstructionPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const key = "tulsip_portal_notice_seen";
    const seen = window.sessionStorage.getItem(key);
    if (!seen) setOpen(true);
  }, []);

  function closePopup() {
    window.sessionStorage.setItem("tulsip_portal_notice_seen", "1");
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/55 px-4 backdrop-blur-md">
      <div className="theme-card w-full max-w-md rounded-2xl p-5 sm:p-6">
        <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Portal Notice</p>
        <h2 className="mt-2 font-display text-3xl text-[#f6f0cf] sm:text-4xl">{SITE_COPY.loginPopup.title}</h2>
        <p className="theme-muted mt-3 text-sm leading-7">
          {SITE_COPY.loginPopup.text}
        </p>
        <button
          type="button"
          onClick={closePopup}
          className="theme-btn-primary mt-5 w-full rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] sm:w-auto"
        >
          Continue to Login
        </button>
      </div>
    </div>
  );
}
