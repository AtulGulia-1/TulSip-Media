import { ArrowUpRight, CheckCircle2, HelpCircle, Compass, ShieldCheck } from 'lucide-react';
import Card from '../components/card';
import { trackAnalyticsEvent } from '../components/AnalyticsManager';

const HOMEPAGE_FAQS = [
  {
    q: 'How do I know what digital solution my business actually needs?',
    a: 'You do not need to know the technical answer before contacting us. Many businesses reach out knowing only that their current website looks dated, fails to generate enquiries, or does not reflect their true caliber. During our initial conversation, we assess where your customers come from, clarify your immediate goals, and recommend a practical scope tailored to your budget—without unnecessary complexity.',
  },
  {
    q: 'What is the difference between Recurring Website Solutions and Custom Website Development?',
    a: 'Our Recurring Website Solutions (Option A) are structured to lower the initial financial barrier for local and growing businesses by pairing the initial website build with ongoing maintenance, security, and content updates under a predictable monthly schedule. Custom Website Development (Option B) is an individually scoped, milestone-billed project ideal for bespoke web applications, custom e-commerce platforms, or businesses with dedicated in-house technical resources.',
  },
  {
    q: 'Will a new website guarantee more customers, enquiries, or higher revenue?',
    a: 'No agency can honestly guarantee revenue, sales, or search rankings. Real business results depend on customer demand, market competition, pricing, offer appeal, and customer follow-up. What a well-engineered TulSip Media website does provide is a fast, credible, professional destination that explains your services clearly, answers buyer hesitations, and removes friction when prospective clients decide to contact you.',
  },
  {
    q: 'How are pricing, timelines, and deliverables determined?',
    a: 'Because every business requires different page counts, integrations, and content support, we do not rely on rigid one-size-fits-all price tags or hidden fees. After reviewing your brief, we provide a written Order Schedule or Statement of Work detailing the exact deliverables, project milestones, timeline, and payment terms before any development begins.',
  },
  {
    q: 'What if I already have an existing domain, social profiles, or an older website?',
    a: 'We integrate seamlessly with your existing brand assets. We can connect your current domain, align the new website design with your physical or social identity, and configure proper URL redirects so you preserve your existing reputation, customer links, and search visibility.',
  },
  {
    q: 'Do you build websites with mobile performance and SEO in mind?',
    a: 'Yes. Every website includes semantic HTML heading hierarchy, page-level metadata, Open Graph social preview tags, Schema.org structured data, optimized media assets, and rigorous testing across mobile, tablet, and desktop viewports to give you clean, resilient technical foundations from day one.',
  },
];

const Features = () => {
  const cardsData = [
    {
      title: (
        <h3 className="bento-title special-font">
          W<span>E</span>B
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Fast, mobile-first business websites that present your services clearly, answer customer questions, and turn everyday visitors into qualified enquiries.
        </p>
      ),
      video: '/videos/Web Dev.mp4',
      altText: 'Custom business website development by TulSip Media',
      box: 1,
    },
    {
      title: (
        <h3 className="bento-title special-font">
          S<span>H</span>OP
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Clean product catalogues and intuitive checkout journeys that make browsing specifications and completing orders straightforward on any device.
        </p>
      ),
      video: '/videos/Social.mp4',
      altText: 'E-commerce storefront design and development',
      box: 2,
    },
    {
      title: (
        <h3 className="bento-title special-font">
          S<span>E</span>O
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Technical SEO architecture, semantic content hierarchy, and structured data so local customers find your business when actively searching for your expertise.
        </p>
      ),
      video: '/videos/SEO.mp4',
      altText: 'Technical SEO and website architecture optimization',
      box: 3,
    },
    {
      title: (
        <h3 className="bento-title special-font">
          A<span>P</span>PS
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Custom web applications, client portals, and interactive tools engineered to simplify complex customer workflows and save your team valuable hours.
        </p>
      ),
      video: '/videos/PPC.mp4',
      altText: 'Web application development and UI UX design systems',
      box: 4,
    },
    {
      video: '/videos/ROI.mp4',
      altText: 'TulSip Media digital product and brand showcase',
      box: 5,
    },
    {
      title: (
        <h3 className="bento-title special-font text-light-beige">
          BUILT
          <br />
          F<span>O</span>R
          <br />
          GR<span>O</span>WTH
        </h3>
      ),
      box: 6,
    },
  ];

  return (
    <section
      id="features"
      className="bg-deep-dark px-4 py-20 text-light-beige lg:px-24 xl:px-40"
    >
      {/* Anchor targets for /#solutions and legacy /#subscriptions bookmarks */}
      <div id="solutions" className="scroll-mt-24" />
      <div id="subscriptions" className="scroll-mt-24" />

      <header>
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-royal-beige mb-2">
          Solutions &amp; Digital Services · Built Around Real Business Needs
        </p>
        <h2 className="max-mg:text-base text-2xl font-bold sm:text-3xl max-lg:text-xl">
          Websites That Match the Real Caliber of Your Business
        </h2>
        <p className="max-mg:text-sm mt-2 max-w-[42rem] text-lg opacity-85 max-lg:text-base leading-relaxed">
          You have built a dependable business with real expertise. We translate that reputation into a modern, credible digital presence—making it simple for potential clients to discover what you do, trust your experience, and reach out with confidence.
        </p>
      </header>

      <div className="grid h-[80rem] grid-cols-2 grid-rows-9 gap-3 py-16 md:h-[85rem] md:gap-5 md:py-20 lg:h-[90rem] lg:py-24 xl:h-[100rem] xl:gap-10 xl:py-32 2xl:h-[125rem]">
        {cardsData.map((card) => (
          <Card
            key={card.box}
            title={card.title}
            description={card.description}
            video={card.video}
            altText={card.altText}
            box={card.box}
          />
        ))}
      </div>

      {/* Customer Reassurance & Decision Anxiety Relief Banner */}
      <div className="mt-4 rounded-3xl border border-royal-beige/25 bg-dark-brown/40 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-token-card">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-royal-beige mb-2">
            <Compass size={14} className="text-royal-beige" aria-hidden="true" />
            Unsure where to begin or which option fits?
          </span>
          <h3 className="font-general text-xl sm:text-2xl font-bold text-light-beige">
            You don't need all the technical answers before reaching out.
          </h3>
          <p className="mt-2 font-general text-xs sm:text-sm text-light-beige/80 leading-relaxed">
            Whether you want to refresh an outdated website, improve local discoverability, or understand whether recurring care or a custom build suits your cash-flow better, we start with an honest, plain-English conversation about your goals—never aggressive sales pitches or unnecessary features.
          </p>
        </div>
        <a
          href="/contact"
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-royal-beige text-deep-dark px-6 py-3 font-general text-xs font-bold uppercase tracking-wider hover:bg-light-beige transition-colors"
        >
          Discuss Your Project <ArrowUpRight size={14} />
        </a>
      </div>

      {/* Professional Engagement Options Block */}
      <div className="mt-8 rounded-3xl border border-royal-beige/25 bg-dark-brown/35 p-6 sm:p-10 lg:p-12 shadow-token-card">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-2">
            Transparent Engagement Approaches
          </p>
          <h3 className="font-zentry text-3xl sm:text-4xl uppercase tracking-tight text-light-beige">
            Two Transparent Ways to Partner
          </h3>
          <p className="mt-3 font-general text-sm sm:text-base text-light-beige/85 leading-relaxed">
            Every business manages cash flow and digital priorities differently. We offer two transparent engagement models so you can select the working relationship that best fits your current operational stage.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Option A: Website solutions with recurring payments */}
          <div className="flex flex-col justify-between rounded-2xl border border-royal-beige/30 bg-deep-dark/80 p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="rounded-full bg-royal-beige/15 border border-royal-beige/35 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-royal-beige">
                  Option A · Predictable Care &amp; Lower Upfront Barrier
                </span>
              </div>
              <h4 className="font-general text-xl font-bold text-light-beige">
                Website Solutions with Recurring Payments
              </h4>
              <p className="mt-2 font-general text-sm text-light-beige/80 leading-relaxed">
                Structured for local and growing businesses seeking a professional, high-performing web presence without committing a large upfront capital expenditure.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-light-beige/85">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Accessible initial onboarding with predictable, scheduled monthly service fees</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Clearly defined deliverables and service scope documented in your written Order Schedule</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Continuous technical maintenance, security monitoring, and regular content adjustments</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Transparent billing, notice periods, and cancellation terms (<a href="/policies#subscription-policy" className="underline text-royal-beige hover:text-light-beige">view policy framework</a>)</span>
                </li>
              </ul>
            </div>

            <div className="mt-7 pt-5 border-t border-royal-beige/15 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-royal-beige">
                Scoped to your required pages &amp; care level
              </span>
              <a
                href="/contact?model=subscription"
                onClick={() =>
                  trackAnalyticsEvent('solutions_cta_click', {
                    solution_type: 'recurring_arrangement',
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full bg-cta glow-cta px-5 py-2.5 font-general text-xs font-bold uppercase tracking-wider text-deep-dark transition-transform hover:scale-105"
              >
                Enquire About Recurring Care <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Option B: Custom website development */}
          <div className="flex flex-col justify-between rounded-2xl border border-royal-beige/25 bg-deep-dark/60 p-6 sm:p-8">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="rounded-full bg-dark-brown border border-royal-beige/30 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-light-beige/90">
                  Option B · Tailored Scope &amp; Full Code Handover
                </span>
              </div>
              <h4 className="font-general text-xl font-bold text-light-beige">
                Custom Website &amp; Web App Development
              </h4>
              <p className="mt-2 font-general text-sm text-light-beige/80 leading-relaxed">
                Individually scoped, milestone-billed projects for established businesses requiring tailored architecture, e-commerce storefronts, or custom web applications.
              </p>
              <ul className="mt-5 space-y-2.5 text-xs sm:text-sm text-light-beige/85">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Itemized quotation and architecture plan tailored specifically to your project requirements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Phased milestones with clear review stages and client approvals before moving to the next step</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Structured handover upon completion, with optional ongoing maintenance if preferred</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-royal-beige" aria-hidden="true" />
                  <span>Clear Statement of Work and full intellectual property ownership (<a href="/policies#delivery-terms" className="underline text-royal-beige hover:text-light-beige">view delivery terms</a>)</span>
                </li>
              </ul>
            </div>

            <div className="mt-7 pt-5 border-t border-royal-beige/15 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs text-royal-beige">
                Tailored proposal &amp; milestone schedule
              </span>
              <a
                href="/contact?model=custom"
                onClick={() =>
                  trackAnalyticsEvent('solutions_cta_click', {
                    solution_type: 'custom_development',
                  })
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-royal-beige/50 bg-dark-brown/80 px-5 py-2.5 font-general text-xs font-bold uppercase tracking-wider text-light-beige transition-colors hover:border-royal-beige hover:bg-royal-beige hover:text-deep-dark"
              >
                Request a Custom Quote <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Transparent Process & Justified Trust Block */}
        <div className="mt-10 pt-8 border-t border-royal-beige/20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-4 flex items-center gap-2">
            <ShieldCheck size={15} className="text-royal-beige" aria-hidden="true" />
            Our Clear, Transparent Process
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-deep-dark/60 border border-royal-beige/20">
              <span className="font-mono text-xs text-royal-beige font-bold block mb-1">Step 01 · Diagnostic Conversation</span>
              <h5 className="font-general text-sm font-bold text-light-beige mb-1">Plain-English Review</h5>
              <p className="text-xs text-light-beige/75 leading-relaxed">
                We review your current customer journey, identify discoverability gaps, and tell you plainly what will make a measurable difference—before you spend a single rupee.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-deep-dark/60 border border-royal-beige/20">
              <span className="font-mono text-xs text-royal-beige font-bold block mb-1">Step 02 · Written Scope &amp; Timelines</span>
              <h5 className="font-general text-sm font-bold text-light-beige mb-1">Clear Terms Upfront</h5>
              <p className="text-xs text-light-beige/75 leading-relaxed">
                You receive a documented proposal with clear timelines, page allocations, and exact pricing. No surprise fees, no vague promises, and no pressure.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-deep-dark/60 border border-royal-beige/20">
              <span className="font-mono text-xs text-royal-beige font-bold block mb-1">Step 03 · Direct Collaboration</span>
              <h5 className="font-general text-sm font-bold text-light-beige mb-1">Hands-On Engineering</h5>
              <p className="text-xs text-light-beige/75 leading-relaxed">
                You work directly with the developers and designers building your website. We keep communication direct, prompt, and focused on your business goals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial FAQ Section for Visitors, AEO & Search Systems */}
      <div id="faq" className="mt-16 rounded-3xl border border-royal-beige/20 bg-dark-brown/20 p-6 sm:p-10 lg:p-12">
        <div className="max-w-3xl mb-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-2 flex items-center gap-2">
            <HelpCircle size={14} aria-hidden="true" /> Common Questions
          </p>
          <h3 className="font-zentry text-3xl sm:text-4xl uppercase tracking-tight text-light-beige">
            Frequently Asked Questions
          </h3>
          <p className="mt-2 font-general text-sm text-light-beige/80">
            Clear, direct answers about how TulSip Media scopes, builds, and supports business websites.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {HOMEPAGE_FAQS.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-royal-beige/20 bg-deep-dark/65 p-6"
            >
              <h4 className="font-general text-base font-bold text-light-beige mb-2">
                {item.q}
              </h4>
              <p className="font-robert-regular text-xs sm:text-sm text-light-beige/80 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
