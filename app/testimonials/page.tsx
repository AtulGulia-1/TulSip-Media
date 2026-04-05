import { PageIntro } from "@/components/common/PageIntro";
import { TESTIMONIAL_ITEMS } from "@/lib/data/testimonials";

export default function TestimonialsPage() {
  return (
    <>
      <PageIntro
        title="Testimonials"
        description="Client feedback from campaigns, content systems, and website projects."
      />
      <section className="section-shell section-b grid gap-6 md:grid-cols-3" data-reveal>
        {TESTIMONIAL_ITEMS.map((item) => (
          <blockquote key={item.clientName} className="theme-card rounded-2xl p-6">
            <p className="text-sm tracking-[0.15em] text-[#f6f0cf]">{"\u2605".repeat(item.rating)}</p>
            <p className="theme-muted mt-3 leading-7">&quot;{item.quote}&quot;</p>
            <footer className="mt-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-[#f6f0cf]">{item.clientName}</p>
                <p className="theme-muted text-xs">{item.clientRole}</p>
              </div>
              <a
                href={item.socialUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
              >
                {item.socialLabel}
              </a>
            </footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}
