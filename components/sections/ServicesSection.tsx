import { SERVICES } from "@/lib/data/services";

function ServiceIcon({ id }: { id: string }) {
  const common = "h-5 w-5 text-[#f6f0cf]";

  if (id === "social-media") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M7 9H11M7 13H17M7 17H14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "ad-creatives") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 12L20 4V20L4 12Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === "branding") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M12 3L14.9 9.1L21 12L14.9 14.9L12 21L9.1 14.9L3 12L9.1 9.1L12 3Z" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  if (id === "website-design") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 20H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "performance-marketing") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 20L10 14L14 18L20 10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path d="M20 14V10H16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "content-creation") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M7 4H17V20H7V4Z" stroke="currentColor" strokeWidth="1.7" />
        <path d="M10 8H14M10 12H14M10 16H13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === "analytics-reporting") {
    return (
      <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
        <path d="M4 20H20" stroke="currentColor" strokeWidth="1.7" />
        <rect x="6" y="11" width="3" height="6" stroke="currentColor" strokeWidth="1.7" />
        <rect x="11" y="8" width="3" height="9" stroke="currentColor" strokeWidth="1.7" />
        <rect x="16" y="5" width="3" height="12" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 12H16M12 8V16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function ServicesSection() {
  return (
    <section className="section-shell section-y" data-reveal>
      <div className="mb-10 space-y-3">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
          Services That <span className="text-[#c62828] italic">Drive Results</span>
        </h2>
        <p className="theme-muted max-w-2xl">
          Data-driven execution across strategy, creative, media, and reporting.
        </p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, index) => (
          <article
            key={service.id}
            className="theme-card rounded-2xl p-5 transition hover:-translate-y-1"
          >
            <div className="mb-4 flex items-center justify-between">
              <ServiceIcon id={service.id} />
              <span className="font-display text-4xl leading-none text-[#6a1212]">
                {`${index + 1}`.padStart(2, "0")}
              </span>
            </div>
            <h3 className="mb-2 font-display text-2xl font-semibold text-[#f6f0cf]">{service.title}</h3>
            <p className="theme-muted text-sm leading-6">{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
