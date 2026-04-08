import Link from "next/link";
import { SafeImage } from "@/components/common/SafeImage";
import { HomeStickyCta } from "@/components/common/HomeStickyCta";
import { LazyCamera3D } from "@/components/3d/LazyCamera3D";
import { CLIENT_ITEMS } from "@/lib/data/clients";
import { TESTIMONIAL_ITEMS } from "@/lib/data/testimonials";
import { CONFIG } from "@/lib/config";

type IconProps = { className?: string };

function IconPath({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 19V6h16v13" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7 10h4M7 14h8" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconFunnel({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M4 5h16l-6 7v6l-4 1v-7L4 5Z" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

function IconSignal({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.7" />
      <rect x="6" y="11" width="3" height="6" stroke="currentColor" strokeWidth="1.7" />
      <rect x="11" y="8" width="3" height="9" stroke="currentColor" strokeWidth="1.7" />
      <rect x="16" y="5" width="3" height="12" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

const WHY_CARDS = [
  {
    title: "Journey-first thinking",
    body: "We map how people move from first impression to inquiry, purchase, and repeat engagement.",
    cta: "Learn how we work",
    href: "/services#how-it-works",
    icon: IconPath
  },
  {
    title: "Full-funnel execution",
    body: "Content, performance marketing, web, and reporting work as one system instead of separate vendors.",
    cta: "View our process",
    href: "/services#how-it-works",
    icon: IconFunnel
  },
  {
    title: "Decisions backed by signals",
    body: "We track what influences trust, conversion, and retention so every next step has a reason.",
    cta: "Explore reporting",
    href: "/services#analytics-reporting-optimization",
    icon: IconSignal
  }
] as const;

const SERVICE_PREVIEW = [
  {
    id: "journey-channel-strategy",
    title: "Journey & Channel Strategy",
    body: "Map audience behavior, define priority channels, and clarify what each touchpoint must achieve.",
    linkLabel: "Explore strategy",
    icon: IconPath
  },
  {
    id: "social-media-content-systems",
    title: "Social Media & Content Systems",
    body: "Build content pillars, creative systems, and community loops based on real audience questions and motivations.",
    linkLabel: "Explore social systems",
    icon: IconFunnel
  },
  {
    id: "performance-marketing-experimentation",
    title: "Performance Marketing & Experimentation",
    body: "Test offers, audiences, and creatives across the funnel to improve efficiency and scale what works.",
    linkLabel: "Explore performance",
    icon: IconSignal
  },
  {
    id: "brand-identity-conversion-web",
    title: "Brand, Web & Conversion",
    body: "Create conversion-ready web journeys with clear messaging and trust architecture.",
    linkLabel: "Explore web conversion",
    icon: IconPath
  },
  {
    id: "analytics-reporting-optimization",
    title: "Analytics, Reporting & Optimization",
    body: "Track what matters, ship insights quickly, and improve outcomes through structured iteration.",
    linkLabel: "Explore analytics",
    icon: IconSignal
  }
] as const;

const CASE_STUDIES = [
  {
    brand: "Mother's Pride Bahadurgarh",
    brandType: "Education",
    challenge: "Strong interest, weak inquiry-to-admission conversion.",
    changed: "Landing clarity, retargeting content, and WhatsApp follow-up touchpoints.",
    result: "Qualified inquiries: 10% increase | CPL: -15% reduction",
    thumbnail: "/images/portfolio/Admission & Enrollment Campaign.png"
  },
  {
    brand: "Shop24 Seven Bahadurgarh",
    brandType: "Retail",
    challenge: "High visibility, weak repeat action.",
    changed: "Social proof sequencing, offer layering, and retention-oriented campaigns.",
    result: "Repeat customer actions: 13% increase | Remarketing ROAS: 3.2x",
    thumbnail: "/images/portfolio/Anytime Cafe  Momos.png"
  },
  {
    brand: "Prime Pet Care",
    brandType: "Service",
    challenge: "Referral-heavy pipeline with inconsistent lead flow.",
    changed: "Positioning refresh, search visibility improvements, and conversion path redesign.",
    result: "Monthly inquiries: 22% increase | Conversion rate: 18%",
    thumbnail: "/images/portfolio/Trust Post.png"
  }
] as const;

const JOURNEY_STAGES = ["Awareness", "Consideration", "Conversion", "Retention", "Advocacy"] as const;

function InitialBadge({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[#4b1212] text-xs font-semibold text-[#f6f0cf]">
      {initials || "TM"}
    </div>
  );
}

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hi TulSip Media, I'd like to discuss my brand's marketing journey and explore how you can help improve our customer touchpoints, content, ads, and conversions."
  )}`;

  const featuredTestimonial = TESTIMONIAL_ITEMS[0];
  const supportingTestimonials = TESTIMONIAL_ITEMS.slice(1, 4);

  const logoGrid = [...CLIENT_ITEMS];
  while (logoGrid.length < 10) {
    logoGrid.push({
      name: `[LOGO ${logoGrid.length + 1}]`,
      logo: "/logo.png"
    });
  }

  return (
    <>
      <section className="border-y border-white/10 bg-black/25">
        <div className="mx-auto flex h-10 w-full max-w-[1200px] items-center justify-between px-5 text-[13px] text-[#f0e6c9] lg:h-11 lg:px-[120px]">
          <p className="hidden font-medium sm:block">Built for local-first brands ready to grow with strategy, content, and performance.</p>
          <p className="font-medium sm:hidden">For local brands ready to scale.</p>
          <Link
            href="/portfolio"
            title="Open portfolio"
            className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#cfc4a8] transition hover:text-[#f6f0cf]"
          >
            See client results
          </Link>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1200px] px-5 lg:px-[120px]">
        <section className="pt-12 pb-16 lg:min-h-[820px] lg:pt-16 lg:pb-20" data-reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 lg:pr-4">
              <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Research-led digital growth for local-first brands</p>
              <h1 className="mt-4 max-w-[760px] font-display text-[clamp(2.15rem,5.4vw,4.05rem)] leading-[0.96] text-[#f6f0cf]">
                We design customer journeys that turn local attention into measurable growth.
              </h1>
              <p className="theme-muted mt-5 max-w-[760px] text-base leading-8 lg:text-lg">
                TulSip Media maps the touchpoints where customers discover, evaluate, trust, and choose your brand,
                then builds the strategy, content, ads, and web experience to improve every step.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact#contact-form"
                  className="theme-btn-primary inline-flex h-12 items-center rounded-sm px-6 text-sm font-semibold uppercase tracking-[0.08em]"
                  title="Let's map your next growth phase"
                >
                  Book a Free Journey Audit
                </Link>
                <Link
                  href="/portfolio"
                  className="inline-flex h-12 items-center rounded-sm border border-white/20 px-6 text-sm font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
                  title="Open portfolio"
                >
                  See Client Results
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-sm font-semibold text-[#f6f0cf]">Up to 3x ROI in 8-12 weeks*</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-sm font-semibold text-[#f6f0cf]">Lower CPL in first 60-90 days*</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-sm font-semibold text-[#f6f0cf]">5 journey touchpoints tracked weekly</p>
                </div>
              </div>
              <p className="mt-3 text-[11px] uppercase tracking-[0.08em] text-[#9d937f]">*Context varies by category and baseline. [ADD APPROVED METRIC SOURCE]</p>
            </div>

            <div className="lg:col-span-3 lg:self-center">
              <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center py-2">
                <div className="hero-ring relative h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_50%_45%,#7f0f0f_0%,#2b0707_60%,#180404_100%)] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px]">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-[210px] w-[210px] overflow-hidden rounded-full sm:h-[250px] sm:w-[250px] lg:h-[290px] lg:w-[290px]">
                      <LazyCamera3D sceneUrl={CONFIG.splineSceneUrl} unstyled className="h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 lg:self-center">
              <article className="theme-card rounded-2xl p-5">
                <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Customer journey growth system</p>
                <div className="mt-3 grid gap-2">
                  {JOURNEY_STAGES.map((stage, index) => (
                    <div key={stage} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#e8dcc0]">
                      {index + 1}. {stage}
                    </div>
                  ))}
                </div>
                <p className="theme-muted mt-4 text-sm">Every touchpoint has a job.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-black/15 pt-20 pb-20" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Why TulSip</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">We do not treat marketing like disconnected tasks.</h2>
          <p className="theme-muted mt-5 max-w-[760px] text-base leading-8">
            Most brands are sold isolated outputs, posts, ads, reels, websites, without a clear understanding of how those
            pieces work together. TulSip starts with the customer journey, identifies the touchpoints that matter most,
            and then aligns strategy and execution around measurable growth.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {WHY_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="theme-card rounded-2xl p-6">
                  <div className="inline-flex rounded-lg border border-white/15 bg-black/20 p-2 text-[#f6f0cf]">
                    <Icon />
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-[#f6f0cf]">{card.title}</h3>
                  <p className="theme-muted mt-3 text-sm leading-7">{card.body}</p>
                  <Link href={card.href} className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] underline underline-offset-4">
                    {card.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        </section>

        <section className="border-t border-white/10 bg-black/15 pt-20 pb-20" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Customer journey focus</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            Your customer does not experience services. They experience moments.
          </h2>
          <p className="theme-muted mt-4 max-w-[760px] text-base leading-8">
            A post in the feed, a Google result, a landing page, a WhatsApp reply, a testimonial, a sales call, a store
            visit, each one shapes whether your brand feels clear, credible, and worth choosing.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-5">
            {[
              { stage: "Awareness", touchpoint: "Reels, ads, search result impressions" },
              { stage: "Consideration", touchpoint: "Profile visits, site pages, proof content" },
              { stage: "Conversion", touchpoint: "Lead forms, WhatsApp, calls, offer pages" },
              { stage: "Retention", touchpoint: "Repeat campaigns, follow-up content, CRM" },
              { stage: "Advocacy", touchpoint: "Testimonials, referrals, community proof" }
            ].map((node) => (
              <article key={node.stage} className="theme-card rounded-2xl p-4">
                <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">{node.stage}</p>
                <p className="mt-3 text-sm text-[#e8dcc0]">{node.touchpoint}</p>
              </article>
            ))}
          </div>
          <p className="theme-muted mt-4 text-sm">We align channels, messaging, proof, and follow-up to each stage of the journey.</p>
        </section>

        <section className="border-t border-white/10 bg-black/15 pt-20 pb-20" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">What we do</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            Built around the journey, not around random deliverables.
          </h2>
          <p className="theme-muted mt-4 max-w-[760px] text-base leading-8">
            Our services are designed to strengthen the exact points where attention becomes trust and trust becomes growth.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {SERVICE_PREVIEW.map((service) => {
              const Icon = service.icon;
              return (
                <article key={service.title} className="theme-card rounded-2xl p-6">
                  <div className="inline-flex rounded-lg border border-white/15 bg-black/20 p-2 text-[#f6f0cf]">
                    <Icon />
                  </div>
                  <h3 className="mt-4 font-display text-3xl text-[#f6f0cf]">{service.title}</h3>
                  <p className="theme-muted mt-3 text-sm leading-7">{service.body}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5]">
                    <Link href={`/services#${service.id}`} className="underline underline-offset-4">{service.linkLabel}</Link>
                    <span>See whatâ€™s included</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="selected-outcomes" className="border-t border-white/10 bg-black/15 pt-20 pb-20" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Selected outcomes</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            Growth is clearer when every metric is tied to a journey problem.
          </h2>
          <p className="theme-muted mt-4 max-w-[760px] text-base leading-8">
            We focus on what changed, why it changed, and which touchpoints were improved to create the result.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {CASE_STUDIES.map((item) => (
              <article key={item.brand} className="theme-card overflow-hidden rounded-2xl">
                <div className="relative h-36 w-full">
                  <SafeImage src={item.thumbnail} alt={item.brand} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">{item.brandType}</p>
                  <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">{item.brand}</h3>
                  <p className="mt-3 text-sm text-[#f6f0cf]"><span className="font-semibold">Challenge:</span> {item.challenge}</p>
                  <p className="theme-muted mt-3 text-sm"><span className="font-semibold text-[#f3e7c5]">What changed:</span> {item.changed}</p>
                  <p className="mt-3 text-sm text-[#f3e7c5]"><span className="font-semibold">Result:</span> {item.result}</p>
                </div>
              </article>
            ))}
          </div>
          <Link
            href="/portfolio"
            className="mt-8 inline-flex rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
          >
            See full work gallery
          </Link>
        </section>

        <section className="border-t border-white/10 pt-16 pb-20" data-reveal>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-[#f6f0cf]">Experience across local categories and growth stages.</h2>
          <p className="theme-muted mt-3 max-w-[760px] text-base leading-8">
            TulSip has worked across education, retail, service businesses, and growth-focused local brands where customer trust and clarity matter.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {logoGrid.slice(0, 10).map((client, index) => (
              <article key={`${client.name}-${index}`} className="flex items-center justify-center rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="relative h-14 w-full">
                  <SafeImage src={client.logo} alt={client.name} fill className="object-contain grayscale opacity-90" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="client-voices" className="border-t border-white/10 bg-black/15 pt-20 pb-20" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Client voices</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            What clients value is not just execution, but clarity.
          </h2>
          {featuredTestimonial && (
            <blockquote className="theme-card mt-8 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3">
                <InitialBadge name={featuredTestimonial.clientName} />
                <p className="text-sm tracking-[0.16em] text-[#f6f0cf]">{"\u2605".repeat(featuredTestimonial.rating)}</p>
              </div>
              <p className="mt-4 max-w-[760px] font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-tight text-[#f6f0cf]">
                â€œ{featuredTestimonial.quote}â€
              </p>
              <p className="theme-muted mt-4 text-sm">
                {featuredTestimonial.clientName} â€¢ {featuredTestimonial.clientRole}
              </p>
            </blockquote>
          )}

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {supportingTestimonials.map((item) => (
              <blockquote key={item.clientName} className="theme-card rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <InitialBadge name={item.clientName} />
                  <p className="text-sm tracking-[0.16em] text-[#f6f0cf]">{"\u2605".repeat(item.rating)}</p>
                </div>
                <p className="theme-muted mt-3 text-sm leading-7">â€œ{item.quote}â€</p>
                <p className="mt-3 text-sm font-semibold text-[#f6f0cf]">{item.clientName}</p>
                <p className="theme-muted text-xs">{item.clientRole}</p>
              </blockquote>
            ))}
          </div>

          <Link
            href="/testimonials"
            className="mt-6 inline-flex rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
          >
            Read more client stories
          </Link>
        </section>

        <section className="border-t border-white/10 bg-black/15 pt-20 pb-20" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Who we are for</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">Best for brands ready to grow with structure.</h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <p className="theme-muted max-w-[760px] text-base leading-8">
              TulSip is a strong fit if you want a partner who can connect strategy, content, ads, web, and reporting
              into one customer journey system.
            </p>
            <ul className="space-y-2 text-sm text-[#e8dcc0]">
              <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You want measurable growth, not vanity activity.</li>
              <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You need clarity across channels and touchpoints.</li>
              <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You are ready to test, learn, and improve consistently.</li>
              <li className="rounded-lg border border-white/10 bg-black/20 px-4 py-3">You want a long-term system, not one-off random execution.</li>
            </ul>
          </div>
          <p className="mt-4 text-xs tracking-[0.08em] text-[#bdae8a]">
            Not ideal if you only want low-cost posting without strategy or reporting.
          </p>
        </section>

        <section className="border-t border-white/10 bg-black/15 pt-20 pb-20" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">How it works</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            A simple process built around diagnosis, execution, and optimization.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="theme-card rounded-2xl p-6">
              <div className="inline-flex rounded-lg border border-white/15 bg-black/20 p-2 text-[#f6f0cf]"><IconPath /></div>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-[#bdae8a]">45-60 min call</p>
              <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">1. Journey Audit</h3>
              <p className="theme-muted mt-3 text-sm leading-7">Review touchpoints, channels, offers, and friction points.</p>
              <p className="mt-3 text-xs text-[#f3e7c5]">Deliverable: Audit notes + priority gaps.</p>
            </article>
            <article className="theme-card rounded-2xl p-6">
              <div className="inline-flex rounded-lg border border-white/15 bg-black/20 p-2 text-[#f6f0cf]"><IconSignal /></div>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-[#bdae8a]">3-5 business days</p>
              <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">2. Strategy Roadmap</h3>
              <p className="theme-muted mt-3 text-sm leading-7">Define priorities, experiments, and operating cadence.</p>
              <p className="mt-3 text-xs text-[#f3e7c5]">Deliverable: Tailored action roadmap.</p>
            </article>
            <article className="theme-card rounded-2xl p-6">
              <div className="inline-flex rounded-lg border border-white/15 bg-black/20 p-2 text-[#f6f0cf]"><IconFunnel /></div>
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Ongoing weekly/monthly</p>
              <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">3. Execution & Optimization</h3>
              <p className="theme-muted mt-3 text-sm leading-7">Implement, report clearly, and refine through performance signals.</p>
              <p className="mt-3 text-xs text-[#f3e7c5]">Deliverable: Live execution + reporting loop.</p>
            </article>
          </div>
          <Link
            href="/contact#contact-form"
            className="theme-btn-primary mt-8 inline-flex h-12 items-center rounded-sm px-6 text-xs font-semibold uppercase tracking-[0.08em]"
          >
            Start with a free Journey Audit
          </Link>
        </section>

        <section className="pb-20 pt-16 lg:pb-24" data-reveal>
          <div className="rounded-2xl border border-[#ce1919]/40 bg-[linear-gradient(120deg,rgba(107,12,12,0.35),rgba(26,8,8,0.8))] p-8 text-center shadow-[0_20px_55px_rgba(0,0,0,0.35)] lg:p-10">
            <h2 className="mx-auto max-w-[760px] font-display text-[clamp(2rem,5vw,3.4rem)] leading-tight text-[#f6f0cf]">
              Ready to improve the touchpoints shaping your growth?
            </h2>
            <p className="theme-muted mx-auto mt-4 max-w-[760px] text-base leading-8">
              If your brand is getting attention but not enough trust, conversion, or repeat action, we can help you map
              what is happening and build a stronger system around it.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact#contact-form"
                className="theme-btn-primary inline-flex h-12 items-center rounded-sm px-6 text-xs font-semibold uppercase tracking-[0.08em]"
              >
                Book a Free Journey Audit
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center rounded-sm border border-[#25D366] px-6 text-xs font-semibold uppercase tracking-[0.08em] text-[#baf2cf] transition hover:bg-[#25D366]/15"
                title="Opening WhatsApp..."
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeStickyCta />
    </>
  );
}







