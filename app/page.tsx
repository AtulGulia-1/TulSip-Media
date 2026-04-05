import Link from "next/link";
import { SafeImage } from "@/components/common/SafeImage";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandStorySection } from "@/components/sections/BrandStorySection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PackagesSection } from "@/components/sections/PackagesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FeedbackForm } from "@/components/common/FeedbackForm";
import { TEAM_MEMBERS } from "@/lib/data/team";
import { CONFIG } from "@/lib/config";
import { GROWTH_BRANDS } from "@/lib/data/brands";
import { TESTIMONIAL_ITEMS } from "@/lib/data/testimonials";

const RESULTS = [
  { title: "Campaign Lift", metric: "42%", note: "Average reach growth in 90 days." },
  { title: "Ad Efficiency", metric: "3.1x", note: "Blended ROI across paid channels." },
  { title: "Organic Growth", metric: "68%", note: "Higher non-paid audience discovery." },
  { title: "Lead Velocity", metric: "+124%", note: "Faster qualified lead generation." },
  { title: "Conversion Uplift", metric: "27%", note: "Landing page conversion gains." },
  { title: "Retention Impact", metric: "19%", note: "Month-over-month repeat engagement." }
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStorySection />

      <ServicesSection />
      <PackagesSection />

      <section className="section-shell section-y" data-reveal>
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
          Brands That <span className="text-[#c62828] italic">Choose to Grow</span>
        </h2>
        <div className="theme-card mt-6 rounded-2xl border border-white/10 py-4">
          <div className="marquee-shell">
            <div className="marquee-track">
              {[...GROWTH_BRANDS, ...GROWTH_BRANDS].map((brand, index) => (
                <div
                  key={`${brand}-${index}`}
                  className="rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#d8caad]"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-y" data-reveal>
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
          Results That <span className="text-[#c62828] italic">Speak Loud</span>
        </h2>
        <p className="theme-muted mt-2 max-w-2xl">
          Real outcomes measured across campaign performance, funnel quality, and brand consistency.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {RESULTS.map((item) => (
            <article key={item.title} className="theme-card rounded-2xl p-5">
              <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">{item.title}</p>
              <p className="font-display mt-2 text-4xl text-[#f6f0cf]">{item.metric}</p>
              <p className="theme-muted mt-3 text-sm">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-y" data-reveal>
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
          What Our Clients <span className="text-[#c62828] italic">Say</span>
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {TESTIMONIAL_ITEMS.map((item) => (
            <blockquote key={item.clientName} className="theme-card rounded-2xl p-5">
              <p className="text-sm tracking-[0.15em] text-[#f6f0cf]">
                {"\u2605".repeat(item.rating)}
              </p>
              <p className="theme-muted mt-3 text-sm leading-7">&quot;{item.quote}&quot;</p>
              <div className="mt-4 flex items-center justify-between gap-3">
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
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section-shell section-y" data-reveal>
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
          Meet the <span className="text-[#c62828] italic">Complete Team</span> Behind Your Growth
        </h2>
        <p className="theme-muted mt-2 max-w-2xl">
          Strategy, creative, and performance specialists working as one execution team.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.name} className="theme-card overflow-hidden rounded-2xl">
              <div className="relative h-52 w-full">
                <SafeImage src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="font-display text-3xl text-[#f6f0cf]">{member.name}</p>
                <p className="theme-muted text-sm">{member.role}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell section-y" data-reveal>
        <div className="theme-card rounded-2xl p-6 sm:p-8">
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
            Your Brand, <span className="text-[#c62828] italic">Full Visibility</span>
          </h2>
          <p className="theme-muted mt-3 max-w-3xl">
            A clear dashboard for engagement, conversions, campaign results, and pipeline quality.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Engagement Rate</p>
              <p className="mt-2 font-display text-3xl text-[#f6f0cf]">4.8%</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Lead Quality</p>
              <p className="mt-2 font-display text-3xl text-[#f6f0cf]">82/100</p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">Monthly ROI</p>
              <p className="mt-2 font-display text-3xl text-[#f6f0cf]">3.2x</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell section-y" data-reveal>
        <div className="theme-card rounded-2xl p-8 text-center">
          <h2 className="font-display text-[clamp(2.3rem,7vw,4.5rem)] leading-[0.9] text-[#f6f0cf]">
            Local Brands. <span className="soft-outline italic">Global</span> Voices.
          </h2>
          <p className="theme-muted mx-auto mt-4 max-w-2xl">
            Scale with a marketing team built for performance, creativity, and measurable outcomes.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="theme-btn-primary inline-flex rounded-sm px-6 py-3 text-sm font-semibold transition"
            >
              Book a Call
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex rounded-sm border border-white/20 px-6 py-3 text-sm font-semibold text-[#f3e7c5] transition hover:bg-white/10"
            >
              See Portfolio
            </Link>
            <a
              href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
                CONFIG.whatsappMessage
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-sm border border-[#25D366] px-6 py-3 text-sm font-semibold text-[#baf2cf] transition hover:bg-[#25D366]/15"
            >
              WhatsApp
            </a>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#e9ddba]">
            <a href={CONFIG.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
            <span className="text-[#8e7e66]">|</span>
            <a href={CONFIG.socialLinks.twitter} target="_blank" rel="noreferrer">Twitter</a>
            <span className="text-[#8e7e66]">|</span>
            <a href={CONFIG.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </div>
      </section>

      <FAQSection compact />

      <section className="section-shell section-y" data-reveal>
        <FeedbackForm />
      </section>
    </>
  );
}

