import { SafeImage } from "@/components/common/SafeImage";
import { COMPANY_STORY, FOUNDERS } from "@/lib/data/founders";

export function FounderSection() {
  return (
    <section className="section-shell section-y" data-reveal>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
        <div className="theme-card rounded-2xl p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#e9ddba]">
            Founder Story
          </p>
          <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3rem)] leading-tight text-[#f6f0cf]">
            {COMPANY_STORY.heading}
          </h2>
          <p className="theme-muted mt-4 max-w-3xl leading-7">{COMPANY_STORY.body}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {FOUNDERS.map((founder) => (
            <article key={founder.name} className="theme-card overflow-hidden rounded-2xl">
              <div className="relative h-52 w-full">
                <SafeImage src={founder.image} alt={founder.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="font-display text-3xl text-[#f6f0cf]">{founder.name}</p>
                <p className="text-sm font-semibold text-[#c62828]">{founder.title}</p>
                <p className="theme-muted mt-3 text-sm leading-7">{founder.bio}</p>
                {founder.linkedin ? (
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex rounded-sm border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
                  >
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
