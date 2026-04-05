import Link from "next/link";
import { FAQ_ITEMS } from "@/lib/data/faqs";

type FAQSectionProps = {
  compact?: boolean;
};

export function FAQSection({ compact = false }: FAQSectionProps) {
  const items = compact ? FAQ_ITEMS.slice(0, 4) : FAQ_ITEMS;

  return (
    <section className="section-shell section-y" data-reveal>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
            Help Center <span className="text-[#c62828] italic">FAQs</span>
          </h2>
          <p className="theme-muted mt-2 max-w-2xl">
            Fast answers for onboarding, payments, campaigns, deliverables, and portal usage.
          </p>
        </div>
        {compact && (
          <Link
            href="/help-center"
            className="rounded-sm border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
          >
            Open Help Center
          </Link>
        )}
      </div>
      <div className="mt-6 grid gap-3">
        {items.map((faq) => (
          <details key={faq.question} className="theme-card rounded-xl p-4">
            <summary className="cursor-pointer list-none pr-4 text-base font-semibold text-[#f6f0cf]">
              {faq.question}
            </summary>
            <p className="theme-muted mt-2 text-sm leading-7">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

