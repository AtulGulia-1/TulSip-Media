import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { EDITABLE_FOOTER_LINKS, EDITABLE_SOCIAL_LINKS, SITE_COPY } from "@/lib/data/site-content";

type IconProps = { className?: string };

function SocialIcon({ label, className = "h-4 w-4" }: { label: string } & IconProps) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17" cy="7" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M7 10v7M7 7h.01M11 17v-4a2 2 0 0 1 4 0v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (label === "Twitter") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M14 8h2V5h-2a4 4 0 0 0-4 4v2H8v3h2v5h3v-5h2.2l.8-3H13V9a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-8 border-t border-white/10 bg-[#120505]/90">
      <div className="mx-auto grid w-full max-w-[1200px] gap-7 px-5 py-12 lg:grid-cols-3 lg:px-[120px]">
        <div>
          <h3 className="font-display text-3xl text-[#f6f0cf]">TulSip Media</h3>
          <p className="theme-muted mt-2 text-sm">Local brands. Global voices.</p>
          <p className="mt-3 text-xs text-[#e9ddba]">{CONFIG.officeAddress}</p>
          <p className="mt-1 text-xs text-[#e9ddba]">{CONFIG.contactEmail}</p>
          <p className="mt-1 text-xs text-[#e9ddba]">{CONFIG.contactPhone}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#e9ddba]">Pages</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {EDITABLE_FOOTER_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm border border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#e9ddba] transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.08em] text-[#e9ddba]">Social</h4>
          <div className="mt-3 flex flex-wrap gap-2">
            {EDITABLE_SOCIAL_LINKS.map((item) => (
              <a
                key={item.label}
                href={CONFIG.socialLinks[item.key]}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#e9ddba] transition hover:bg-white/10"
              >
                <SocialIcon label={item.label} />
                {item.label}
              </a>
            ))}
          </div>
          <p className="theme-muted mt-4 text-xs">{SITE_COPY.footer.description}</p>
          <p className="theme-muted mt-3 text-[11px] leading-5">
            Work featured represents professional experience. All brand logos and names are trademarks of their
            respective owners. TulSip Media is an independent entity and certain projects may have been executed in
            collaboration with partner agencies.
          </p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1200px] border-t border-white/10 px-5 py-3 lg:px-[120px]">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#bdae8a]">
          Designed & Created by Atul Gulia
        </p>
      </div>
    </footer>
  );
}
