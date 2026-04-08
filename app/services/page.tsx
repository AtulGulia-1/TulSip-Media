import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Customer-journey-first strategy, content, performance, brand, and analytics systems for measurable growth.",
  alternates: { canonical: "/services" }
};

type Pillar = {
  title: string;
  whatItCovers: string;
  keyTouchpoints: string[];
  whatTulSipDoes: string[];
  successMetrics: string[];
};

const JOURNEY_STAGES = ["Awareness", "Consideration", "Conversion", "Retention", "Advocacy"];

const PILLARS: Pillar[] = [
  {
    title: "Journey & Channel Strategy",
    whatItCovers:
      "Research-backed strategy that decides where to show up, what to say, and how often across your customer journey.",
    keyTouchpoints: [
      "First impressions: ads, social posts, search results, offline cues.",
      "Deep dives: website visits, landing pages, catalog browsing.",
      "Decision moments: offer pages, DMs, WhatsApp chats, sales calls."
    ],
    whatTulSipDoes: [
      "Customer and category research: interviews, competitor mapping, and channel content audit.",
      "Journey mapping: core paths from first touch to repeat buyer, including drop-off points.",
      "Channel architecture: where to focus, what each channel does, and what to stop spending on.",
      "Messaging frameworks: brand story, proof points, and offers by stage."
    ],
    successMetrics: [
      "Clear channel-to-journey role mapping.",
      "Reduced wasted spend on low-impact activity.",
      "Stronger alignment between marketing, sales, and operations."
    ]
  },
  {
    title: "Social Media & Content Systems",
    whatItCovers:
      "Always-on content designed for your customer feed, built on research into questions, objections, and motivations.",
    keyTouchpoints: [
      "Awareness: posts, reels, stories, shorts.",
      "Consideration: carousels, FAQs, behind-the-scenes, social proof.",
      "Retention: community updates, loyalty content, repeat-buyer offers."
    ],
    whatTulSipDoes: [
      "Audience and content research for high-resonance topics and formats.",
      "Content architecture: pillars, cadence, and calendar systems.",
      "Asset production: scripts, copy, static and motion creatives aligned to brand standards.",
      "Community and inbox loops: comment handling and DM routing to convert intent into leads."
    ],
    successMetrics: [
      "Reach and engagement by content pillar.",
      "Clicks and inquiries from social channels.",
      "Growth in qualified followers and repeat interactions."
    ]
  },
  {
    title: "Performance Marketing & Experimentation",
    whatItCovers:
      "Paid media systems that test audiences, offers, and creatives across the journey to find scalable winners.",
    keyTouchpoints: [
      "Discovery ads: Meta, Google, and high-intent placements.",
      "Consideration ads: retargeting with FAQs, proof, and offer reinforcement.",
      "Conversion ads: lead forms, WhatsApp campaigns, store visits, high-intent search."
    ],
    whatTulSipDoes: [
      "Offer and funnel strategy from ad promise to destination page.",
      "Ad account structure for clean testing and decision-making.",
      "Creative and copy variant testing across hooks, formats, and angles.",
      "Weekly optimization: budgets, audiences, and landing page feedback loops."
    ],
    successMetrics: [
      "CPL/CPC improvement vs baseline.",
      "Higher conversion rates across landing and WhatsApp funnels.",
      "Incremental qualified pipeline and revenue."
    ]
  },
  {
    title: "Brand Identity & Conversion-Led Web",
    whatItCovers:
      "A consistent brand system and web experience that feels trustworthy, modern, and easy to act on.",
    keyTouchpoints: [
      "First deep dive: homepage and key service/product pages.",
      "Decision support: FAQs, proof, pricing context, and contact flows.",
      "Post-click continuity: landing pages that match ad intent."
    ],
    whatTulSipDoes: [
      "Brand foundations: logo usage, color systems, typography, tone, messaging hierarchy.",
      "Site architecture mapped from first visit to inquiry.",
      "UX and content design for conversion-focused page flow.",
      "Analytics instrumentation: events, tagging, and readable dashboards."
    ],
    successMetrics: [
      "Lower bounce rates and better session depth.",
      "Higher inquiry and lead rate from core pages.",
      "Consistent brand experience across channels."
    ]
  },
  {
    title: "Analytics, Reporting & Optimization",
    whatItCovers:
      "Clear reporting that shows what is working, what is not, and what gets changed next.",
    keyTouchpoints: [
      "Executive view: monthly ROI and key business KPIs.",
      "Channel view: social, ads, web, and retention performance.",
      "Experiment view: tests, learnings, and next hypotheses."
    ],
    whatTulSipDoes: [
      "KPI architecture based on your business model.",
      "Dashboard setup for founders and marketing leaders.",
      "Weekly/monthly review cadences with action plans.",
      "Continuous optimization across creatives, audiences, and funnels."
    ],
    successMetrics: [
      "Reporting consistency and data accuracy.",
      "Faster insight-to-execution loops.",
      "Compounding performance gains across 8-12 weeks."
    ]
  }
];

export default function ServicesPage() {
  return (
    <section className="section-shell section-y" data-reveal>
      <div className="theme-card rounded-2xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Services</p>
        <h1 className="mt-2 font-display text-[clamp(2.2rem,5vw,4rem)] leading-tight text-[#f6f0cf]">
          Customer journeys, not just campaigns.
        </h1>
        <p className="theme-muted mt-4 max-w-4xl text-base leading-8 md:text-lg">
          TulSip Media maps every touchpoint where your customer meets your brand, then designs strategy,
          content, and performance systems that turn those moments into measurable growth.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact#contact-form"
            className="theme-btn-primary rounded-sm px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em]"
          >
            Book a Journey Audit
          </Link>
          <Link
            href="/portfolio"
            className="rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
          >
            See Client Results
          </Link>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="theme-card rounded-2xl p-6">
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] text-[#f6f0cf]">Every touchpoint is a growth lever.</h2>
          <p className="theme-muted mt-4 text-sm leading-7 md:text-base">
            Your customer does not experience you as SEO, social media, or ads. They experience a journey: seeing a post,
            clicking an ad, checking your website, asking a question on WhatsApp, visiting your store, and buying or
            dropping off.
          </p>
          <p className="theme-muted mt-4 text-sm leading-7 md:text-base">
            TulSip starts by mapping this journey and identifying the touchpoints that matter most for attention, trust,
            and conversion in your category. Every service is aligned to a journey stage so you invest in structured growth,
            not random activity.
          </p>
        </article>
        <aside className="theme-card rounded-2xl p-6">
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Journey Visual</p>
          <div className="mt-4 grid grid-cols-1 gap-2">
            {JOURNEY_STAGES.map((stage, index) => (
              <div key={stage} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#e8dcc0]">
                {index + 1}. {stage}
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="mt-8 space-y-6">
        {PILLARS.map((pillar) => (
          <article key={pillar.title} className="theme-card rounded-2xl p-6 md:p-7">
            <h3 className="font-display text-[clamp(1.6rem,2.8vw,2.3rem)] text-[#f6f0cf]">{pillar.title}</h3>
            <p className="theme-muted mt-3 text-sm leading-7 md:text-base">{pillar.whatItCovers}</p>

            <div className="mt-5 grid gap-4 lg:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Key Touchpoints</p>
                <ul className="mt-3 space-y-2 text-sm text-[#e8dcc0]">
                  {pillar.keyTouchpoints.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">What TulSip Does</p>
                <ul className="mt-3 space-y-2 text-sm text-[#e8dcc0]">
                  {pillar.whatTulSipDoes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">How Success Is Measured</p>
                <ul className="mt-3 space-y-2 text-sm text-[#e8dcc0]">
                  {pillar.successMetrics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="theme-card rounded-2xl p-6">
          <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] text-[#f6f0cf]">Who TulSip is a fit for</h3>
          <ul className="theme-muted mt-4 space-y-2 text-sm leading-7 md:text-base">
            <li>Local-first brands that want measurable growth, not vanity metrics.</li>
            <li>Founders who want strategic clarity across content, ads, web, and CRM touchpoints.</li>
            <li>Teams that need an execution partner for both strategy and implementation.</li>
            <li>Businesses ready to test, learn, and optimize consistently for 8+ weeks.</li>
          </ul>
        </article>

        <article className="theme-card rounded-2xl p-6">
          <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] text-[#f6f0cf]">
            Engagement modes designed for different stages of growth.
          </h3>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="font-display text-2xl text-[#f6f0cf]">Launch Foundations</p>
              <p className="mt-2 text-sm text-[#e8dcc0]">
                For new/early-stage local brands. Includes journey strategy, brand/web foundations, content system setup,
                and starter paid experiments. Typical duration: 8-12 weeks.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="font-display text-2xl text-[#f6f0cf]">Growth & Experimentation</p>
              <p className="mt-2 text-sm text-[#e8dcc0]">
                For brands with traction. Includes deeper funnel experiments, performance optimization, content scaling,
                and landing page improvement. Typical duration: ongoing monthly engagement.
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-4">
              <p className="font-display text-2xl text-[#f6f0cf]">Full-Funnel Ownership</p>
              <p className="mt-2 text-sm text-[#e8dcc0]">
                For brands ready to outsource strategy + execution. Includes all pillars with dedicated squad support and
                executive reporting. Typical duration: 6-12 month partnerships.
              </p>
            </div>
          </div>
          <p className="theme-muted mt-4 text-xs uppercase tracking-[0.08em]">
            Most engagements start from a monthly investment aligned with your stage and channels. Discuss ranges on a free strategy call.
          </p>
        </article>
      </div>

      <article className="theme-card mt-8 rounded-2xl p-6">
        <h3 className="font-display text-[clamp(1.7rem,3vw,2.4rem)] text-[#f6f0cf]">FAQ: Pricing and Scope</h3>
        <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4">
          <p className="font-semibold text-[#f6f0cf]">How does TulSip pricing work?</p>
          <p className="theme-muted mt-2 text-sm leading-7 md:text-base">
            Every engagement is scoped using your customer journey, required channels, and internal capacity, so we do
            not use one-size-fits-all prices. During your free Journey Audit, we map key touchpoints, define the required
            work, and then share a clear proposal with options calibrated to your goals and constraints.
          </p>
        </div>
      </article>
    </section>
  );
}
