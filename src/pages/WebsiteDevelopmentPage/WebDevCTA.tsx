import { ArrowUpRight, SendHorizontal } from 'lucide-react';
import { trackAnalyticsEvent } from '../../components/AnalyticsManager';

const WebDevCTA = () => {
  return (
    <section className="bg-deep-dark px-4 py-20 text-light-beige lg:px-20 xl:px-32 border-t border-royal-beige/20">
      <div className="mx-auto max-w-5xl rounded-3xl border border-royal-beige/35 bg-dark-brown/40 p-8 sm:p-12 lg:p-16 text-center shadow-token-card relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-[radial-gradient(circle,rgba(189,160,126,0.15)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-royal-beige mb-3">
            Start Your Website Journey
          </p>
          <h2 className="font-zentry text-3xl sm:text-5xl uppercase tracking-tight text-light-beige">
            Ready to Build a Website That Actually Represents Your Business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-general text-sm sm:text-base leading-relaxed text-light-beige/85">
            Whether you need a new multi-page business website, a high-converting landing page for advertising, or a performance overhaul of your existing site, we start with a clear, plain-English conversation about your commercial goals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/contact?service=website-development"
              onClick={() => trackAnalyticsEvent('project_cta_click', { cta_location: 'webdev_footer_primary' })}
              className="inline-flex items-center gap-2 rounded-2xl bg-cta glow-cta px-8 py-3.5 font-general text-xs font-bold uppercase tracking-wider text-deep-dark transition-transform hover:scale-105"
            >
              <SendHorizontal size={14} /> Schedule a Project Briefing
            </a>
            <a
              href="/audit"
              onClick={() => trackAnalyticsEvent('solutions_cta_click', { cta_location: 'webdev_footer_audit' })}
              className="inline-flex items-center gap-1.5 rounded-2xl border border-royal-beige/40 bg-deep-dark/80 px-6 py-3.5 font-general text-xs font-semibold uppercase tracking-wider text-light-beige transition-colors hover:border-royal-beige hover:bg-dark-brown"
            >
              Request a Free Website Audit <ArrowUpRight size={14} />
            </a>
          </div>

          <p className="mt-6 font-mono text-[11px] text-royal-beige/70">
            Direct collaboration with senior engineers &bull; Transparent written scopes &bull; No high-pressure sales
          </p>
        </div>
      </div>
    </section>
  );
};

export default WebDevCTA;
