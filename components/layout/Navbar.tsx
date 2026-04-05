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
      <div className="flex h-20 w-full items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          aria-label={`${CONFIG.brandName} homepage`}
          className="flex min-w-0 items-center gap-3"
        >
          <Image
            src={CONFIG.logoPath}
            alt={`${CONFIG.brandName} logo`}
            width={56}
            height={56}
            className="logo-float rounded-md object-contain opacity-90"
            priority
          />
          <span className="whitespace-nowrap font-display text-[1.7rem] leading-none text-[#f4eecf] sm:text-[2rem] md:text-[2.2rem]">
            Tul<span className="text-[#be1a1a]">Sip</span> Media
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 xl:gap-7 lg:flex">
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

        <div className="flex items-center gap-2">
          <Link
            href={CONFIG.bookCallUrl}
            aria-label="Book a call"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/30 text-[#f4eecf] transition hover:bg-white/10 md:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              width="18"
              height="18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M6.7 4.5H9.3C9.74 4.5 10.12 4.79 10.23 5.22L10.84 7.67C10.94 8.05 10.83 8.45 10.56 8.74L9.1 10.3C10.02 12.09 11.47 13.54 13.26 14.46L14.82 13C15.11 12.73 15.51 12.62 15.89 12.72L18.34 13.33C18.77 13.44 19.06 13.82 19.06 14.26V16.86C19.06 17.57 18.49 18.14 17.78 18.14C10.72 18.14 4.98 12.4 4.98 5.34C4.98 4.63 5.56 4.5 6.7 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link
            href="/login"
            className="hidden rounded-sm bg-[#b31313] px-4 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ce1919] sm:inline-flex sm:px-5"
          >
            Login
          </Link>
          <Link
            href="/login"
            className="rounded-sm bg-[#b31313] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#ce1919] sm:hidden"
          >
            Login
          </Link>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-sm border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.07em] text-[#efe4c2] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:px-6 lg:hidden">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-[#c9c0a3] transition-colors hover:text-[#f4eecf]"
          >
            Client Portal
          </Link>
          <Link
            href={CONFIG.bookCallUrl}
            onClick={() => setOpen(false)}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-[#c9c0a3] transition-colors hover:text-[#f4eecf]"
          >
            Book a Call
          </Link>
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="text-xs font-semibold uppercase tracking-[0.08em] text-[#f4eecf]"
          >
            Login
          </Link>
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
        </nav>
      )}
    </header>
  );
}
