"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/nav-links";
import { CONFIG } from "@/lib/config";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1a0808]/80 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] w-full max-w-[1200px] items-center justify-between gap-3 px-5 lg:h-[84px] lg:px-[120px]">
        <Link
          href="/"
          aria-label={`${CONFIG.brandName} homepage`}
          className="flex min-w-0 items-center gap-3"
        >
          <Image
            src={CONFIG.logoPath}
            alt={`${CONFIG.brandName} logo`}
            width={52}
            height={52}
            className="logo-float rounded-md object-contain opacity-90"
            priority
          />
          <span className="whitespace-nowrap font-display text-[1.6rem] leading-none text-[#f4eecf] sm:text-[1.9rem] md:text-[2.1rem]">
            Tul<span className="text-[#be1a1a]">Sip</span> Media
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:text-[#f4eecf] ${
                  isActive ? "text-[#f4eecf]" : "text-[#c9c0a3]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/portfolio"
            className="inline-flex h-11 items-center rounded-sm border border-white/20 px-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
          >
            See Our Work
          </Link>
          <Link
            href="/contact#contact-form"
            className="theme-btn-primary inline-flex h-11 items-center rounded-sm px-4 text-xs font-semibold uppercase tracking-[0.08em]"
          >
            Book a Journey Audit
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="/contact#contact-form"
            className="theme-btn-primary inline-flex h-10 items-center rounded-sm px-3 text-[10px] font-semibold uppercase tracking-[0.08em]"
          >
            Audit
          </Link>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.07em] text-[#efe4c2]"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 lg:hidden">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-xs font-semibold uppercase tracking-[0.08em] transition-colors hover:text-[#f4eecf] ${
                pathname === item.href ? "text-[#f4eecf]" : "text-[#c9c0a3]"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact#contact-form"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-[#f4eecf]"
          >
            Book a Journey Audit
          </Link>
        </nav>
      )}
    </header>
  );
}

