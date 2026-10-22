import { ArrowUpRight, SendHorizontal, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackAnalyticsEvent } from '../../components/AnalyticsManager';

const KEY_BENEFITS = [
  '100% Custom Architecture — Zero Clunky Templates',
  'Sub-Second Load Times & 90+ Core Web Vitals',
  'Mobile-First & Responsive Across All Devices',
  'Built-In Semantic Technical SEO & Schema',
];

const WebDevHero = () => {
  return (
    <section className="relative overflow-hidden bg-deep-dark px-4 pt-32 pb-20 text-light-beige sm:pt-40 lg:px-20 xl:px-32">
      {/* Background radial gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 size-[650px] rounded-full bg-[radial-gradient(circle,rgba(189,160,126,0.14)_0%,transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Service Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-royal-beige/35 bg-dark-brown/60 px-4 py-1.5 backdrop-blur-md">
          <Sparkles size={13} className="text-royal-beige" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige">
            Website Design &amp; Development Studio
          </span>
        </div>

        {/* Primary Page Heading */}
        <h1 className="mt-6 font-zentry text-3xl font-extrabold uppercase tracking-tight text-light-beige sm:text-5xl md:text-6xl lg:text-7xl">
          Custom Websites &amp; Web Apps Built for Clarity &amp; Growth
        </h1>

        {/* Clear Subtitle & Business Value Proposition */}
        <p className="mx-auto mt-6 max-w-3xl font-general text-base leading-relaxed text-light-beige/85 sm:text-lg md:text-xl">
          TulSip Media engineers custom business websites, high-converting landing pages, e-commerce storefronts, and tailored web applications. We build fast, accessible, search-ready digital assets that communicate your true caliber and turn everyday visitors into qualified clients.
        </p>

        {/* Direct Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact?service=website-development"
            onClick={() => trackAnalyticsEvent('project_cta_click', { cta_location: 'webdev_hero_primary' })}
            className="inline-flex items-center gap-2 rounded-2xl bg-cta glow-cta px-7 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-deep-dark transition-transform hover:scale-105"
          >
            <SendHorizontal size={14} /> Schedule a Project Briefing
          </a>
          <a
            href="/case-studies"
            onClick={() => trackAnalyticsEvent('portfolio_item_click', { item_slug: 'webdev_hero_work' })}
            className="inline-flex items-center gap-1.5 rounded-2xl border border-royal-beige/40 bg-dark-brown/70 px-6 py-3.5 font-general text-xs font-semibold uppercase tracking-wider text-light-beige transition-colors hover:border-royal-beige hover:bg-dark-brown"
          >
            Explore Case Studies <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Core Technical Highlights Strip */}
        <div className="mt-12 grid grid-cols-1 gap-3 rounded-2xl border border-royal-beige/20 bg-dark-brown/30 p-4 sm:grid-cols-2 md:grid-cols-4 md:p-5">
          {KEY_BENEFITS.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-left text-xs font-medium text-light-beige/90">
              <CheckCircle2 size={15} className="shrink-0 text-royal-beige" aria-hidden="true" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevHero;
