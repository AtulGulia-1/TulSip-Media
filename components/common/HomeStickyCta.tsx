"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONFIG } from "@/lib/config";

export function HomeStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 760);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hi TulSip Media, I'd like to discuss my brand's marketing journey and explore how you can help improve our customer touchpoints, content, ads, and conversions."
  )}`;

  if (!visible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <Link
          href="/contact#contact-form"
          className="theme-btn-primary inline-flex h-11 items-center rounded-sm px-4 text-xs font-semibold uppercase tracking-[0.08em] shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
        >
          Book Audit
        </Link>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#140606]/95 p-3 md:hidden">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#d8caad]">Ready to grow with clarity?</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <Link
            href="/contact#contact-form"
            className="theme-btn-primary inline-flex h-11 items-center justify-center rounded-sm text-xs font-semibold uppercase tracking-[0.08em]"
          >
            Book Audit
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-sm border border-[#25D366] text-xs font-semibold uppercase tracking-[0.08em] text-[#baf2cf]"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

