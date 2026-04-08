import Link from "next/link";
import { CONFIG } from "@/lib/config";
import { EDITABLE_FOOTER_LINKS, EDITABLE_SOCIAL_LINKS, SITE_COPY } from "@/lib/data/site-content";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-[1200px] gap-7 px-5 py-10 lg:grid-cols-3 lg:px-[120px]">
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
                className="rounded-sm border border-white/15 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#e9ddba] transition hover:bg-white/10"
              >
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

