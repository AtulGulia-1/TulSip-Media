import Link from "next/link";
import { SafeImage } from "@/components/common/SafeImage";
import { HomeStickyCta } from "@/components/common/HomeStickyCta";
import { LazyCamera3D } from "@/components/3d/LazyCamera3D";
import { CLIENT_ITEMS } from "@/lib/data/clients";
import { TESTIMONIAL_ITEMS } from "@/lib/data/testimonials";
import { CONFIG } from "@/lib/config";

const WHY_CARDS = [
  {
    title: "Journey-first thinking",
    body: "We map how people move from first impression to inquiry, purchase, and repeat engagement.",
    cta: "Learn how we work"
  },
  {
    title: "Full-funnel execution",
    body: "Content, performance marketing, web, and reporting work as one system instead of separate vendors.",
    cta: "Explore services"
  },
  {
    title: "Decisions backed by signals",
    body: "We track what influences trust, conversion, and retention so every next step has a reason.",
    cta: "View our process"
  }
] as const;

const SERVICE_PREVIEW = [
  {
    title: "Journey & Channel Strategy",
    body: "Map audience behavior, define priority channels, and clarify what each touchpoint must achieve.",
    linkLabel: "Explore strategy"
  },
  {
    title: "Social Media & Content Systems",
    body: "Build content pillars, creative systems, and community loops based on real audience questions and motivations.",
    linkLabel: "Explore social & content"
  },
  {
    title: "Performance Marketing & Experimentation",
    body: "Test offers, audiences, and creatives across the funnel to improve efficiency and scale what works.",
    linkLabel: "Explore performance"
  },
  {
    title: "Brand, Web & Analytics",
    body: "Create a conversion-ready web experience with clear messaging, proof, and reporting systems.",
    linkLabel: "Explore brand & analytics"
  }
] as const;

const CASE_STUDIES = [
  {
    brandType: "Education brand",
    challenge: "Strong interest, weak demo conversion.",
    changed: "Landing clarity, retargeting content, and WhatsApp follow-up touchpoints.",
    outcome: "Higher qualified inquiries and lower CPL over 90 days."
  },
  {
    brandType: "Retail brand",
    challenge: "High visibility, weak repeat action.",
    changed: "Social proof, offer sequencing, and retention-oriented campaigns.",
    outcome: "Improved repeat engagement and better return from remarketing."
  },
  {
    brandType: "Service brand",
    challenge: "Referral-heavy pipeline with inconsistent lead flow.",
    changed: "Positioning, search visibility, and conversion path design.",
    outcome: "More predictable inquiries from digital channels."
  }
] as const;

const JOURNEY_STAGES = ["Awareness", "Consideration", "Conversion", "Retention", "Advocacy"] as const;

export default function HomePage() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hi TulSip Media, I'd like to discuss my brand's marketing journey and explore how you can help improve our customer touchpoints, content, ads, and conversions."
  )}`;

  const featuredTestimonial = TESTIMONIAL_ITEMS[0];
  const supportingTestimonials = TESTIMONIAL_ITEMS.slice(1, 3);

  return (
    <>
      <section className="border-y border-white/10 bg-black/20">
        <div className="mx-auto flex h-10 w-full max-w-[1200px] items-center justify-between px-5 text-xs text-[#d8caad] lg:h-11 lg:px-8 xl:px-12">
          <p className="hidden sm:block">Built for local-first brands ready to grow with strategy, content, and performance.</p>
          <p className="sm:hidden">For local brands ready to scale.</p>
          <Link
            href="/portfolio"
            title="Open portfolio"
            className="font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:text-white"
          >
            See client results
          </Link>
        </div>
      </section>

      <main className="mx-auto w-full max-w-[1200px] px-5 lg:px-8 xl:px-12">
        <section className="py-14 lg:min-h-[780px] lg:py-24" data-reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Research-led digital growth for local-first brands</p>
              <h1 className="mt-4 max-w-[760px] font-display text-[clamp(2.2rem,6vw,4.4rem)] leading-[0.95] text-[#f6f0cf]">
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
                  <p className="text-sm font-semibold text-[#f6f0cf]">Up to 3x campaign ROI</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-sm font-semibold text-[#f6f0cf]">Lower CPL through structured testing</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-3">
                  <p className="text-sm font-semibold text-[#f6f0cf]">Strategy, content, ads, web, reporting</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto flex w-full max-w-[520px] items-center justify-center py-2">
                <div className="hero-ring relative h-[280px] w-[280px] rounded-full bg-[radial-gradient(circle_at_50%_45%,#7f0f0f_0%,#2b0707_60%,#180404_100%)] sm:h-[360px] sm:w-[360px] lg:h-[420px] lg:w-[420px]">
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="h-[210px] w-[210px] overflow-hidden rounded-full sm:h-[260px] sm:w-[260px] lg:h-[320px] lg:w-[320px]">
                      <LazyCamera3D sceneUrl={CONFIG.splineSceneUrl} unstyled className="h-full w-full" />
                    </div>
                  </div>
                </div>
              </div>

              <article className="theme-card mt-5 rounded-2xl p-5">
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

        <section className="py-14 lg:py-24" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Why TulSip</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">We do not treat marketing like disconnected tasks.</h2>
          <p className="theme-muted mt-5 max-w-[760px] text-base leading-8">
            Most brands are sold isolated outputs, posts, ads, reels, websites, without a clear understanding of how those
            pieces work together. TulSip starts with the customer journey, identifies the touchpoints that matter most,
            and then aligns strategy and execution around measurable growth.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {WHY_CARDS.map((card) => (
              <article key={card.title} className="theme-card rounded-2xl p-6">
                <h3 className="font-display text-3xl text-[#f6f0cf]">{card.title}</h3>
                <p className="theme-muted mt-3 text-sm leading-7">{card.body}</p>
                <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5]">{card.cta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 lg:py-24" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Customer journey focus</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            Your customer does not experience services. They experience moments.
          </h2>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <p className="theme-muted max-w-[760px] text-base leading-8">
              A post in the feed, a Google result, a landing page, a WhatsApp reply, a testimonial, a sales call, a store
              visit, each one shapes whether your brand feels clear, credible, and worth choosing. We identify which
              moments drive action and improve them systematically.
            </p>
            <div className="theme-card rounded-2xl p-6">
              <div className="grid gap-2">
                {JOURNEY_STAGES.map((stage, index) => (
                  <div key={stage} className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-[#e8dcc0]">
                    {index + 1}. {stage}
                  </div>
                ))}
              </div>
              <p className="theme-muted mt-4 text-sm">
                We align channels, messaging, proof, and follow-up to each stage of the journey.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-24" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">What we do</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            Built around the journey, not around random deliverables.
          </h2>
          <p className="theme-muted mt-4 max-w-[760px] text-base leading-8">
            Our services are designed to strengthen the exact points where attention becomes trust and trust becomes growth.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {SERVICE_PREVIEW.map((service) => (
              <article key={service.title} className="theme-card rounded-2xl p-6">
                <h3 className="font-display text-3xl text-[#f6f0cf]">{service.title}</h3>
                <p className="theme-muted mt-3 text-sm leading-7">{service.body}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5]">
                  <Link href="/services">{service.linkLabel}</Link>
                  <span>View service details</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 lg:py-24" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Selected outcomes</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            Growth is clearer when every metric is tied to a journey problem.
          </h2>
          <p className="theme-muted mt-4 max-w-[760px] text-base leading-8">
            We focus on what changed, why it changed, and which touchpoints were improved to create the result.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {CASE_STUDIES.map((item) => (
              <article key={item.brandType} className="theme-card rounded-2xl p-6">
                <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">{item.brandType}</p>
                <p className="mt-3 text-sm text-[#f6f0cf]"><span className="font-semibold">Challenge:</span> {item.challenge}</p>
                <p className="theme-muted mt-3 text-sm"><span className="font-semibold text-[#f3e7c5]">What TulSip changed:</span> {item.changed}</p>
                <p className="mt-3 text-sm text-[#f3e7c5]"><span className="font-semibold">Outcome:</span> {item.outcome}</p>
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

        <section className="py-12 lg:py-20" data-reveal>
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-[#f6f0cf]">Experience across local categories and growth stages.</h2>
          <p className="theme-muted mt-3 max-w-[760px] text-base leading-8">
            TulSip has worked across education, retail, service businesses, and growth-focused local brands where customer trust and clarity matter.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CLIENT_ITEMS.map((client) => (
              <article key={client.name} className="flex items-center justify-center rounded-xl border border-white/10 bg-black/20 p-4">
                <div className="relative h-14 w-full">
                  <SafeImage src={client.logo} alt={client.name} fill className="object-contain grayscale opacity-90" />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-14 lg:py-24" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Client voices</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            What clients value is not just execution, but clarity.
          </h2>
          {featuredTestimonial && (
            <blockquote className="theme-card mt-8 rounded-2xl p-6 lg:p-8">
              <p className="text-sm tracking-[0.16em] text-[#f6f0cf]">{"\u2605".repeat(featuredTestimonial.rating)}</p>
              <p className="mt-4 max-w-[760px] font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-tight text-[#f6f0cf]">
                “{featuredTestimonial.quote}”
              </p>
              <p className="theme-muted mt-4 text-sm">
                {featuredTestimonial.clientName} • {featuredTestimonial.clientRole}
              </p>
            </blockquote>
          )}

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {supportingTestimonials.map((item) => (
              <blockquote key={item.clientName} className="theme-card rounded-2xl p-6">
                <p className="text-sm tracking-[0.16em] text-[#f6f0cf]">{"\u2605".repeat(item.rating)}</p>
                <p className="theme-muted mt-3 text-sm leading-7">“{item.quote}”</p>
                <p className="mt-3 text-sm font-semibold text-[#f6f0cf]">{item.clientName}</p>
                <p className="theme-muted text-xs">{item.clientRole}</p>
              </blockquote>
            ))}
          </div>

          <Link
            href="/testimonials"
            className="mt-6 inline-flex rounded-sm border border-white/20 px-5 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
          >
            Read more testimonials
          </Link>
        </section>

        <section className="py-14 lg:py-24" data-reveal>
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
          <p className="mt-4 text-xs uppercase tracking-[0.08em] text-[#bdae8a]">
            Not ideal if you only want low-cost posting without strategy or reporting.
          </p>
        </section>

        <section className="py-14 lg:py-24" data-reveal>
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">How it works</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] text-[#f6f0cf]">
            A simple process built around diagnosis, execution, and optimization.
          </h2>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <article className="theme-card rounded-2xl p-6">
              <p className="font-display text-4xl text-[#6a1212]">01</p>
              <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">Journey Audit</h3>
              <p className="theme-muted mt-3 text-sm leading-7">
                We review your current touchpoints, channels, offers, and friction points.
              </p>
            </article>
            <article className="theme-card rounded-2xl p-6">
              <p className="font-display text-4xl text-[#6a1212]">02</p>
              <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">Strategy Roadmap</h3>
              <p className="theme-muted mt-3 text-sm leading-7">
                We define priorities, experiments, and systems required for your next growth phase.
              </p>
            </article>
            <article className="theme-card rounded-2xl p-6">
              <p className="font-display text-4xl text-[#6a1212]">03</p>
              <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">Execution & Optimization</h3>
              <p className="theme-muted mt-3 text-sm leading-7">
                We implement, report clearly, and refine continuously using performance signals.
              </p>
            </article>
          </div>
          <Link
            href="/contact#contact-form"
            className="theme-btn-primary mt-8 inline-flex h-12 items-center rounded-sm px-6 text-xs font-semibold uppercase tracking-[0.08em]"
          >
            Start with a free Journey Audit
          </Link>
        </section>

        <section className="py-14 lg:py-24" data-reveal>
          <div className="theme-card rounded-2xl p-8 text-center lg:p-10">
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
                Send us a message on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <HomeStickyCta />
    </>
  );
}

