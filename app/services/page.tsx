import type { ReactNode } from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Customer-journey-first strategy, content, performance, brand, and analytics systems for measurable growth.",
  alternates: { canonical: "/services" }
};

type IconProps = { className?: string };

function IconPath({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 19V6h16v13" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 10h4M7 14h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconContent({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M6 4h12v16H6z" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconAds({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 18l6-6 4 4 6-8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M20 12V8h-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconWeb({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconAnalytics({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 20h16" stroke="currentColor" strokeWidth="1.7" />
      <rect x="6" y="11" width="3" height="6" stroke="currentColor" strokeWidth="1.7" />
      <rect x="11" y="8" width="3" height="9" stroke="currentColor" strokeWidth="1.7" />
      <rect x="16" y="5" width="3" height="12" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

type ServiceItem = {
  id: string;
  title: string;
  overview: string;
  touchpoints: string[];
  whatTulSipDoes: string[];
  success: string[];
  bestFor: string;
  Icon: (props: IconProps) => ReactNode;
};

const SERVICES: ServiceItem[] = [
  {
    id: "journey-channel-strategy",
    title: "Journey & Channel Strategy",
    overview:
      "Research-backed strategy that decides where to show up, what to say, and how often across your customer journey.",
    touchpoints: [
      "First impressions: ads, social posts, search results, offline cues.",
      "Deep dives: website visits, landing pages, catalog browsing.",
      "Decision moments: offer pages, DMs, WhatsApp chats, sales calls."
    ],
    whatTulSipDoes: [
      "Customer and category research: interviews, competitor mapping, content audit.",
      "Journey mapping from first touch to repeat buyer, including drop-offs.",
      "Channel architecture: where to prioritize and where not to waste spend.",
      "Messaging frameworks for each stage of the journey."
    ],
    success: [
      "Clear channel role-by-stage alignment.",
      "Reduced wasted spend on low-impact work.",
      "Stronger marketing-sales-operations clarity."
    ],
    bestFor: "Brands needing strategic clarity before scaling execution.",
    Icon: IconPath
  },
  {
    id: "social-media-content-systems",
    title: "Social Media & Content Systems",
    overview:
      "Always-on content designed for your customer feed, built on research into questions, objections, and motivations.",
    touchpoints: [
      "Awareness: posts, reels, stories, shorts.",
      "Consideration: carousels, FAQs, social proof, behind-the-scenes.",
      "Retention: community updates, loyalty content, repeat offers."
    ],
    whatTulSipDoes: [
      "Audience/content research for winning themes and formats.",
      "Content architecture: pillars, cadence, and editorial calendar.",
      "Creative production: scripts, copy, static/motion assets.",
      "Community/inbox loops that turn attention into qualified leads."
    ],
    success: [
      "Reach and engagement by content pillar.",
      "Clicks and inquiries from social channels.",
      "Growth in qualified followers and repeat interactions."
    ],
    bestFor: "Brands with inconsistent content performance or weak social conversion.",
    Icon: IconContent
  },
  {
    id: "performance-marketing-experimentation",
    title: "Performance Marketing & Experimentation",
    overview:
      "Paid media systems that test audiences, offers, and creatives across the journey to find scalable winners.",
    touchpoints: [
      "Discovery ads: Meta, Google, and high-intent placements.",
      "Consideration ads: retargeting with proof and FAQs.",
      "Conversion ads: lead forms, WhatsApp, store visit campaigns, search."
    ],
    whatTulSipDoes: [
      "Offer and funnel strategy mapped to intent stage.",
      "Ad account architecture for clean testing.",
      "Creative/copy variant testing by hook and angle.",
      "Weekly optimization across budgets, audiences, and destination pages."
    ],
    success: [
      "CPL/CPC performance vs baseline.",
      "Improved conversion rates across lead paths.",
      "Incremental qualified pipeline growth."
    ],
    bestFor: "Brands seeking lower acquisition costs and clearer ad scaling signals.",
    Icon: IconAds
  },
  {
    id: "brand-identity-conversion-web",
    title: "Brand Identity & Conversion-Led Web",
    overview:
      "A consistent brand system and website experience that feels trustworthy, modern, and easy to act on.",
    touchpoints: [
      "First deep dive: homepage and key service/product pages.",
      "Decision support: FAQs, proof, pricing context, contact flows.",
      "Post-click continuity: landing pages that match ad promises."
    ],
    whatTulSipDoes: [
      "Brand foundations: logo usage, colors, typography, tone hierarchy.",
      "Site architecture mapped to inquiry/conversion paths.",
      "UX + content flow for conversion.",
      "Tracking instrumentation for measurable page-level outcomes."
    ],
    success: [
      "Lower bounce and better on-page depth.",
      "Higher lead/enquiry rate from key pages.",
      "Stronger cross-channel brand consistency."
    ],
    bestFor: "Brands with traffic but weak conversion or trust signaling.",
    Icon: IconWeb
  },
  {
    id: "analytics-reporting-optimization",
    title: "Analytics, Reporting & Optimization",
    overview:
      "Clear reporting that shows what is working, what is not, and what gets changed next.",
    touchpoints: [
      "Executive view: ROI and business KPIs.",
      "Channel view: social, ads, web, retention.",
      "Experiment view: tests, learnings, next hypotheses."
    ],
    whatTulSipDoes: [
      "KPI architecture aligned to your growth model.",
      "Dashboard setup for founders and marketing leads.",
      "Weekly/monthly review loops with action decisions.",
      "Continuous optimization implementation."
    ],
    success: [
      "Reliable reporting cadence and accuracy.",
      "Faster insight-to-change cycle.",
      "Compounding gains over 8-12 week windows."
    ],
    bestFor: "Teams needing visibility, accountability, and clear growth iteration.",
    Icon: IconAnalytics
  }
];

const ENGAGEMENT_MODES = [
  {
    name: "Launch Foundations",
    forWho: "New or early-stage local brands building serious digital foundations.",
    includes:
      "Journey strategy, brand/web foundations, social/content setup, starter paid experiments.",
    duration: "Typical duration: 8-12 weeks",
    cta: "Start with this engagement",
    featured: true
  },
  {
    name: "Growth & Experimentation",
    forWho: "Brands with traction who want lower CPL and stronger conversion rates.",
    includes:
      "Performance optimization, funnel experiments, content scaling, landing page improvements.",
    duration: "Typical duration: ongoing monthly",
    cta: "Talk to us about this mode",
    featured: false
  },
  {
    name: "Full-Funnel Ownership",
    forWho: "Brands ready to outsource strategy + execution across the full journey.",
    includes:
      "All pillars with dedicated squad support and executive reporting.",
    duration: "Typical duration: 6-12 month partnership",
    cta: "Get a proposal",
    featured: false
  }
] as const;

const FAQS = [
  {
    q: "How does pricing work?",
    a: "Every engagement is scoped using your journey complexity, required channels, and internal team capacity. We share clear options after your Journey Audit."
  },
  {
    q: "What is the minimum engagement period?",
    a: "Most structured engagements begin with an 8-12 week cycle to allow diagnosis, execution, and optimization to produce meaningful signals."
  },
  {
    q: "Do you work with startups?",
    a: "Yes. We work with early-stage brands if there is readiness for structured execution and measurable decision-making."
  },
  {
    q: "What industries do you serve?",
    a: "Current experience includes education, retail, service businesses, and local growth-focused brands. [ADD INDUSTRY EXPANSION NOTES]"
  },
  {
    q: "How does onboarding work?",
    a: "We start with a Journey Audit call, define baseline touchpoints and KPIs, then ship a practical roadmap and execution sequence."
  },
  {
    q: "What do clients need to provide?",
    a: "Basic brand assets, access to active channels, offer/pricing context, and key business goals. We provide a checklist during onboarding."
  }
] as const;

export default function ServicesPage() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-5 py-14 lg:px-[120px] lg:py-20" data-reveal>
      <div className="theme-card rounded-2xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Services</p>
        <h1 className="mt-2 font-display text-[clamp(2.2rem,5vw,4rem)] leading-tight text-[#f6f0cf]">
          Customer journeys, not just campaigns.
        </h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <p className="theme-muted max-w-[760px] text-base leading-8">
            TulSip maps every touchpoint where your customer meets your brand, then designs strategy, content,
            performance media, and web systems to improve conversion quality and growth predictability.
          </p>
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Touchpoint flow map</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-[#e8dcc0]">Feed post → Profile visit</div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-[#e8dcc0]">Search result → Landing page</div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-[#e8dcc0]">Social proof → WhatsApp inquiry</div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-[#e8dcc0]">Follow-up → Conversion</div>
            </div>
            <p className="theme-muted mt-3 text-sm">Each stage is assigned channel role, message role, and success metric.</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/contact#contact-form" className="theme-btn-primary rounded-sm px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em]">
            Book a Journey Audit
          </Link>
          <Link href="/portfolio" className="rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10">
            See Client Results
          </Link>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-white/10 bg-black/20 p-6" id="fit-block">
        <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Who TulSip is a fit for</p>
        <h2 className="mt-2 font-display text-[clamp(1.8rem,3vw,2.6rem)] text-[#f6f0cf]">Best for brands ready to grow with structure.</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <p className="theme-muted text-base leading-8">
            TulSip is strongest when your team wants strategy + execution connected into one measurable journey system.
          </p>
          <ul className="space-y-2 text-sm text-[#e8dcc0]">
            <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You want measurable growth, not vanity activity.</li>
            <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You need clarity across channels and touchpoints.</li>
            <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You are ready to test, learn, and improve consistently.</li>
            <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You want a long-term system, not one-off execution.</li>
          </ul>
        </div>
      </section>

      <div className="mt-10 hidden space-y-5 md:block">
        {SERVICES.map((service) => {
          const Icon = service.Icon;
          return (
            <article key={service.id} id={service.id} className="theme-card rounded-2xl p-6 md:p-7">
              <div className="inline-flex rounded-lg border border-white/15 bg-black/20 p-2 text-[#f6f0cf]">
                <Icon />
              </div>
              <h3 className="mt-4 font-display text-[clamp(1.6rem,2.8vw,2.3rem)] text-[#f6f0cf]">{service.title}</h3>
              <p className="theme-muted mt-3 text-sm leading-7 md:text-base">{service.overview}</p>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Key touchpoints</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#e8dcc0]">{service.touchpoints.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">What TulSip does</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#e8dcc0]">{service.whatTulSipDoes.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">How success is measured</p>
                  <ul className="mt-3 space-y-2 text-sm text-[#e8dcc0]">{service.success.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-[#f3e7c5]"><span className="font-semibold">Best for:</span> {service.bestFor}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-10 space-y-3 md:hidden">
        {SERVICES.map((service) => {
          const Icon = service.Icon;
          return (
            <details key={service.id} id={service.id} className="theme-card rounded-2xl p-4 open:border-[#ce1919]/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="inline-flex rounded-lg border border-white/15 bg-black/20 p-2 text-[#f6f0cf]"><Icon className="h-4 w-4" /></span>
                <span className="font-display text-2xl text-[#f6f0cf]">{service.title}</span>
              </summary>
              <div className="mt-4 space-y-4 text-sm text-[#e8dcc0]">
                <p className="theme-muted">{service.overview}</p>
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Key touchpoints</p>
                  <ul className="mt-2 space-y-2">{service.touchpoints.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">What TulSip does</p>
                  <ul className="mt-2 space-y-2">{service.whatTulSipDoes.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">How success is measured</p>
                  <ul className="mt-2 space-y-2">{service.success.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
                <p className="text-[#f3e7c5]"><span className="font-semibold">Best for:</span> {service.bestFor}</p>
              </div>
            </details>
          );
        })}
      </div>

      <section className="mt-10" id="engagement-modes">
        <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] text-[#f6f0cf]">Engagement modes designed for different stages of growth.</h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {ENGAGEMENT_MODES.map((mode) => (
            <article key={mode.name} className={`theme-card rounded-2xl p-6 ${mode.featured ? "border-[#ce1919]" : ""}`}>
              {mode.featured ? (
                <span className="inline-flex rounded-full bg-[#ce1919] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">Entry point</span>
              ) : null}
              <h4 className="mt-3 font-display text-3xl text-[#f6f0cf]">{mode.name}</h4>
              <p className="theme-muted mt-3 text-sm">{mode.forWho}</p>
              <p className="mt-3 text-sm text-[#e8dcc0]">{mode.includes}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-[#bdae8a]">{mode.duration}</p>
              <Link href="/contact#contact-form" className="mt-5 inline-flex rounded-sm border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10">
                {mode.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-10" id="how-it-works">
        <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] text-[#f6f0cf]">How it works</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <article className="theme-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Step 1</p>
            <p className="mt-2 font-display text-2xl text-[#f6f0cf]">Journey Audit</p>
            <p className="theme-muted mt-2 text-sm">45-60 min review call + touchpoint diagnosis.</p>
          </article>
          <article className="theme-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Step 2</p>
            <p className="mt-2 font-display text-2xl text-[#f6f0cf]">Strategy Roadmap</p>
            <p className="theme-muted mt-2 text-sm">Prioritized plan with channel responsibilities.</p>
          </article>
          <article className="theme-card rounded-2xl p-5">
            <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Step 3</p>
            <p className="mt-2 font-display text-2xl text-[#f6f0cf]">Execution & Optimization</p>
            <p className="theme-muted mt-2 text-sm">Weekly implementation + monthly reporting loop.</p>
          </article>
        </div>
      </section>

      <section className="mt-10">
        <h3 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] text-[#f6f0cf]">FAQ: Pricing and Scope</h3>
        <div className="mt-4 space-y-3">
          {FAQS.map((faq) => (
            <details key={faq.q} className="theme-card rounded-xl p-4 open:border-[#ce1919]/60">
              <summary className="cursor-pointer list-none text-sm font-semibold text-[#f6f0cf]">{faq.q}</summary>
              <p className="theme-muted mt-3 text-sm leading-7">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  );
}
