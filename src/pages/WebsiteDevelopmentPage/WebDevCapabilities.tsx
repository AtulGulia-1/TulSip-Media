import { Globe, ShoppingBag, LayoutTemplate, Cpu, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { trackAnalyticsEvent } from '../../components/AnalyticsManager';

interface CapabilityItem {
  id: string;
  icon: typeof Globe;
  title: string;
  badge: string;
  description: string;
  deliverables: string[];
  bestFor: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'business-websites',
    icon: Globe,
    title: 'Business Website Design & Development',
    badge: 'Core Offering',
    description:
      'Multi-page, bespoke business websites designed to represent your established reputation, clearly explain specialized services, build immediate trust, and remove friction when prospects decide to make contact.',
    deliverables: [
      'Tailored visual identity & bespoke UI/UX design',
      'Mobile-first responsive frontend architecture',
      'Integrated contact forms with honeypot security & spam filtering',
      'Semantic HTML5 structure and page-level Schema.org markup',
      'Fast content management options and full source code handover',
    ],
    bestFor: 'B2B companies, consultancies, healthcare clinics, legal firms, and growing service businesses.',
  },
  {
    id: 'landing-pages',
    icon: LayoutTemplate,
    title: 'High-Converting Landing Page Systems',
    badge: 'Performance & Paid Ads',
    description:
      'Focused, single-purpose landing pages engineered specifically for paid advertising campaigns (Google Ads, Meta Ads) and promotional launches, designed to deliver maximum conversion rates with minimal distraction.',
    deliverables: [
      'Conversion-focused visual hierarchy & persuasive content structure',
      'Sub-second load times engineered for high Google Ads Quality Scores',
      'A/B testing-ready layouts and custom event tracking integration',
      'Mobile-optimized enquiry, quote, or demo booking forms',
    ],
    bestFor: 'Lead generation campaigns, product launches, webinar registrations, and performance marketing funnels.',
  },
  {
    id: 'ecommerce',
    icon: ShoppingBag,
    title: 'E-Commerce Website Development',
    badge: 'Retail & D2C',
    description:
      'Intuitive, high-performance online storefronts that make exploring product specifications, viewing imagery, and completing checkout seamless on mobile and desktop alike.',
    deliverables: [
      'Clean product catalog architecture & multi-attribute filtering',
      'Mobile-optimized cart drawers and streamlined checkout flows',
      'Secure payment gateway integration (Stripe, Razorpay, etc.)',
      'Inventory, order management, and email notification setup',
      'Structured Product & Offer Schema for Google Shopping rich results',
    ],
    bestFor: 'Direct-to-consumer (D2C) brands, boutique retailers, and wholesale distributors.',
  },
  {
    id: 'web-apps',
    icon: Cpu,
    title: 'Custom Web Applications & Client Portals',
    badge: 'Interactive Software',
    description:
      'Bespoke web applications, internal operational tools, interactive client dashboards, and custom calculators built with modern React and TypeScript to streamline workflows and provide self-service experiences.',
    deliverables: [
      'Interactive UI components built with React 19 & TypeScript',
      'Secure client authentication and role-based permissions',
      'Custom database schemas and resilient REST/GraphQL API integrations',
      'Automated data visualization and workflow integrations',
    ],
    bestFor: 'Businesses needing specialized customer portals, calculation tools, or proprietary internal workflows.',
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Website Performance & Core Web Vitals Remediation',
    badge: 'Technical Optimization',
    description:
      'Diagnostic performance audits and hands-on code optimizations to eliminate lag, resolve mobile layout shifts (CLS), accelerate initial rendering (LCP), and reduce main-thread blocking time (TBT).',
    deliverables: [
      'Complete lab & field performance profiling with Chrome DevTools Protocol',
      'Elimination of layout thrashing and un-debounced event listeners',
      'Modern image format conversion (WebP/AVIF) and video streaming optimization',
      'Vendor bundle minimization, tree-shaking, and code splitting',
    ],
    bestFor: 'Existing websites experiencing sluggish mobile rendering, high bounce rates, or low Google PageSpeed scores.',
  },
  {
    id: 'maintenance',
    icon: ShieldCheck,
    title: 'Continuous Website Care & Maintenance',
    badge: 'Managed Support',
    description:
      'Ongoing technical stewardship ensuring your digital asset remains secure, updated, blazing-fast, and accurately representative of your evolving business offerings without consuming your internal bandwidth.',
    deliverables: [
      'Regular security updates, dependency patches, and uptime monitoring',
      'Content adjustments, banner updates, and new landing page additions',
      'Quarterly technical SEO and accessibility hygiene audits',
      'Direct developer support with reliable response turnarounds',
    ],
    bestFor: 'Companies seeking predictable ongoing technical maintenance without hiring an in-house development team.',
  },
];

const WebDevCapabilities = () => {
  return (
    <section id="capabilities" className="bg-deep-dark px-4 py-20 text-light-beige lg:px-20 xl:px-32">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-2">
            Comprehensive Capabilities · End-to-End Execution
          </p>
          <h2 className="font-zentry text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-light-beige">
            Website Development Disciplines We Master
          </h2>
          <p className="mt-4 font-general text-sm sm:text-base leading-relaxed text-light-beige/80">
            Every business has different functional requirements and audience expectations. We don't force a single template onto your project. We scope, design, and engineer the precise digital solution that matches your commercial model.
          </p>
        </div>

        {/* Capability Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="flex flex-col justify-between rounded-3xl border border-royal-beige/25 bg-dark-brown/40 p-6 sm:p-8 transition-colors hover:border-royal-beige/50 shadow-token-card"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl border border-royal-beige/35 bg-deep-dark/80 text-royal-beige">
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full bg-royal-beige/15 border border-royal-beige/30 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-royal-beige">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-general text-xl font-bold text-light-beige">
                    {item.title}
                  </h3>

                  <p className="mt-3 font-robert-regular text-xs sm:text-sm text-light-beige/80 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-6 border-t border-royal-beige/15 pt-5">
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-royal-beige mb-3">
                      Key Deliverables
                    </p>
                    <ul className="space-y-2 text-xs text-light-beige/85">
                      {item.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-royal-beige font-bold">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 border-t border-royal-beige/15 pt-4">
                  <p className="text-[11px] font-mono text-royal-beige/80">
                    <span className="font-semibold text-royal-beige">Best for: </span>
                    {item.bestFor}
                  </p>
                  <a
                    href={`/contact?service=${item.id}`}
                    onClick={() => trackAnalyticsEvent('solutions_cta_click', { capability: item.id })}
                    className="mt-4 inline-flex items-center gap-1.5 font-general text-xs font-bold uppercase tracking-wider text-royal-beige hover:text-light-beige transition-colors"
                  >
                    Discuss this solution <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebDevCapabilities;
