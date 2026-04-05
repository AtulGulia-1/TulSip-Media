import { COMPANY_STORY } from "@/lib/data/founders";

function StoryIcon({ type }: { type: "strategy" | "creative" | "clarity" | "reach" }) {
  const common = "h-5 w-5 text-[#f6f0cf]";

  if (type === "strategy") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
        <path d="M12 8V12L15 14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "creative") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M12 3L14.6 9.4L21 12L14.6 14.6L12 21L9.4 14.6L3 12L9.4 9.4L12 3Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (type === "clarity") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 9H16M8 13H16M8 17H12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function BrandStorySection() {
  return (
    <section className="section-shell section-y" data-reveal>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <div className="theme-card min-h-[300px] rounded-2xl bg-[linear-gradient(130deg,rgba(163,18,18,0.55),rgba(60,9,9,0.25))] p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#e9ddba]">Our Story</p>
          <blockquote className="mt-8 font-display text-[clamp(1.8rem,4vw,2.8rem)] italic leading-tight text-[#f6f0cf]">
            Every local brand has a story worth telling to the world.
          </blockquote>
          <p className="theme-muted mt-6 max-w-xl leading-7">
            We are the team that turns your story into performance-led growth.
          </p>
        </div>

        <div>
          <h2 className="font-display text-[clamp(2rem,5vw,3.5rem)] leading-tight text-[#f6f0cf]">
            We Built TulSip for <span className="text-[#c62828] italic">Brands Like Yours</span>
          </h2>
          <p className="theme-muted mt-4 leading-8">{COMPANY_STORY.body}</p>
          <p className="theme-muted mt-5 leading-8">
            No one-size-fits-all playbooks. Every strategy is tailored to your audience, goals, and market.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="theme-card rounded-xl p-4">
              <StoryIcon type="strategy" />
              <p className="mt-3 text-lg font-semibold text-[#f6f0cf]">Strategy-First</p>
              <p className="theme-muted mt-1 text-sm">Every decision backed by data, not guesswork.</p>
            </div>
            <div className="theme-card rounded-xl p-4">
              <StoryIcon type="creative" />
              <p className="mt-3 text-lg font-semibold text-[#f6f0cf]">Creative Excellence</p>
              <p className="theme-muted mt-1 text-sm">High-conviction content designed to stop the scroll.</p>
            </div>
            <div className="theme-card rounded-xl p-4">
              <StoryIcon type="clarity" />
              <p className="mt-3 text-lg font-semibold text-[#f6f0cf]">Full Transparency</p>
              <p className="theme-muted mt-1 text-sm">Clear reporting, clear actions, clear outcomes.</p>
            </div>
            <div className="theme-card rounded-xl p-4">
              <StoryIcon type="reach" />
              <p className="mt-3 text-lg font-semibold text-[#f6f0cf]">Global Reach</p>
              <p className="theme-muted mt-1 text-sm">Local roots with scale-ready visibility worldwide.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
