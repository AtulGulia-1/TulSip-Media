import Link from "next/link";
import type { Metadata } from "next";
import { SafeImage } from "@/components/common/SafeImage";
import { PageIntro } from "@/components/common/PageIntro";

type WorkTab = "food-retail" | "services-healthcare" | "sports-b2b";

type WorkCard = {
  title: string;
  writeup: string;
  mediaPath: string;
  mockup?: boolean;
};

type WorkSection = {
  id: WorkTab;
  label: string;
  targetClients: string;
  cards: WorkCard[];
};

export const metadata: Metadata = {
  title: "Work Gallery",
  description: "Category-based showcase of campaigns, brand content, and performance outcomes by TulSip Media.",
  alternates: { canonical: "/portfolio" }
};

const ALL_PORTFOLIO_IMAGES_IN_SEQUENCE = [
  "/images/portfolio/IPL Night.png",
  "/images/portfolio/Mojito  POV.png",
  "/images/portfolio/Visual Appetite & Local Growth.png",
  "/images/portfolio/Anytime Cafe  Momos.png",
  "/images/portfolio/Navratri Special Thali.png",
  "/images/portfolio/Admission & Enrollment Campaign.png",
  "/images/portfolio/Academy Programs & Admissions.png",
  "/images/portfolio/Scholarship & Entrance Exam Alerts.png",
  "/images/portfolio/Science & Curiosity Series 1.png",
  "/images/portfolio/Science & Curiosity Series 2.png",
  "/images/portfolio/Science & Curiosity Series 3.png",
  "/images/portfolio/Science & Curiosity Series 4.png",
  "/images/portfolio/Science & Curiosity Series 5.png",
  "/images/portfolio/Ground Booking & Lead Generation.png",
  "/images/portfolio/B2B Service Showcase.png",
  "/images/portfolio/Community & Festive Greetings.png",
  "/images/portfolio/local-cafe-launch.jpg",
  "/images/portfolio/fashion-brand-ugc.jpg",
  "/images/portfolio/healthcare-campaign.jpg"
] as const;

const FEATURED_SECTIONS: WorkSection[] = [
  {
    id: "food-retail",
    label: "Food, Hospitality & Retail",
    targetClients: "Restaurants, Cafes, Bakeries, Cloud Kitchens",
    cards: [
      {
        title: "24Seven Cafe (The Vibe Post)",
        writeup:
          "Strategic Social Media Engagement. Created high-energy, trend-based content to drive evening footfall and weekend reservations. Focused on scroll-stopping visuals that resonate with a younger, digital-first audience.",
        mediaPath: "/images/portfolio/IPL Night.png",
        mockup: true
      },
      {
        title: "Athens Pizza (The 3D Hook Post)",
        writeup:
          "Conversion-Driven Visual Design. Utilized breaking-the-4th-wall design techniques to trigger immediate cravings and increase order-now click-through rates for local delivery.",
        mediaPath: "/images/portfolio/Visual Appetite & Local Growth.png",
        mockup: true
      },
      {
        title: "24Seven Cafe (The Menu Post)",
        writeup:
          "Premium Brand Identity. Elevated everyday menu items through modern, clean aesthetics and high-end typography to compete with national cafe chains.",
        mediaPath: "/images/portfolio/Anytime Cafe  Momos.png"
      }
    ]
  },
  {
    id: "services-healthcare",
    label: "Professional Services & Healthcare",
    targetClients: "Doctors, Clinics, Schools, Academies",
    cards: [
      {
        title: "Mother's Pride (The Authority Post)",
        writeup:
          "High-Ticket Lead Generation. Executed a comprehensive 2026 academic session drive. Balanced professional CBSE authority with parent-centric trust factors to streamline the inquiry-to-admission funnel.",
        mediaPath: "/images/portfolio/Admission & Enrollment Campaign.png",
        mockup: true
      },
      {
        title: "Tan Man Paramarsh (The Clinical Post)",
        writeup:
          "Healthcare Authority and Patient Outreach. Established a trustworthy digital presence for a specialized medical practice. Used solution-oriented messaging to connect patients with expert dermatological care.",
        mediaPath: "/images/portfolio/Science & Curiosity Series 1.png"
      },
      {
        title: "Prime Pet Care (The Trust Post)",
        writeup:
          "Empathy-Based Medical Branding. Combined professional medical authority with compassionate visual storytelling to build long-term trust with local pet owners.",
        mediaPath: "/images/portfolio/Academy Programs & Admissions.png"
      },
      {
        title: "Prime Pet Care (The Retail Post)",
        writeup:
          "Integrated E-commerce and Retail Strategy. Successfully managed a dual-track strategy for a clinic-plus-retail model, using urgency triggers to drive physical store sales.",
        mediaPath: "/images/portfolio/Scholarship & Entrance Exam Alerts.png"
      }
    ]
  },
  {
    id: "sports-b2b",
    label: "Sports, Events & Agency B2B",
    targetClients: "Sports Complexes, Other Agencies, Corporate Brands",
    cards: [
      {
        title: "SSCA Cricket Academy (The High-Energy Post)",
        writeup:
          "Facility Marketing and Slot Optimization. Managed digital bookings for a premier sports facility. Used athletic, high-contrast imagery to position the academy as the top choice for night-matches and professional training.",
        mediaPath: "/images/portfolio/Ground Booking & Lead Generation.png",
        mockup: true
      },
      {
        title: "Ad Guru (The Expert Partner Post)",
        writeup:
          "Agency-Level Strategic Collaboration. Trusted by industry partners to deliver high-volume, professional advertising assets. Demonstrated ability to manage complex service catalogs and large-scale creative celebrations.",
        mediaPath: "/images/portfolio/B2B Service Showcase.png"
      }
    ]
  }
];

function getActiveTab(rawTab?: string): WorkTab {
  const tabs: WorkTab[] = ["food-retail", "services-healthcare", "sports-b2b"];
  return tabs.includes(rawTab as WorkTab) ? (rawTab as WorkTab) : "food-retail";
}

export default async function PortfolioPage({
  searchParams
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeTab = getActiveTab(resolvedSearchParams?.tab);

  const activeSection = FEATURED_SECTIONS.find((section) => section.id === activeTab) ?? FEATURED_SECTIONS[0];
  const featuredPaths = new Set(FEATURED_SECTIONS.flatMap((section) => section.cards.map((card) => card.mediaPath)));
  const moreSnapshots = ALL_PORTFOLIO_IMAGES_IN_SEQUENCE.filter((path) => !featuredPaths.has(path));

  return (
    <>
      <PageIntro
        title="Work Gallery"
        description="Explore campaign snapshots by business category, with strategic context and outcomes."
      />

      <section className="section-shell section-b" data-reveal>
        <div className="mb-6 flex flex-wrap gap-2">
          {FEATURED_SECTIONS.map((section) => {
            const isActive = section.id === activeSection.id;
            return (
              <Link
                key={section.id}
                href={`/portfolio?tab=${section.id}`}
                className={`rounded-sm border px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                  isActive
                    ? "border-[#ce1919] bg-[#ce1919] text-[#f6f0cf]"
                    : "border-white/15 bg-black/20 text-[#d8caad] hover:border-[#ce1919]/60"
                }`}
              >
                {section.label}
              </Link>
            );
          })}
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
          <h2 className="font-display text-[clamp(1.8rem,4vw,2.8rem)] text-[#f6f0cf]">{activeSection.label}</h2>
          <p className="mt-2 text-sm text-[#d8caad]">Target clients: {activeSection.targetClients}</p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {activeSection.cards.map((card) => (
            <article key={card.title} className="theme-card overflow-hidden rounded-2xl">
              <div className={`relative ${card.mockup ? "bg-black/40 p-3" : "h-52 bg-black/25 sm:h-56"}`}>
                {card.mockup ? (
                  <div className="relative mx-auto h-56 w-[min(260px,80%)] rounded-[2rem] border border-white/20 bg-black/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:h-60">
                    <div className="absolute left-1/2 top-2 h-1 w-14 -translate-x-1/2 rounded-full bg-white/20" />
                    <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                      <SafeImage src={card.mediaPath} fallbackSrc="/images/portfolio/IPL Night.png" alt={card.title} fill className="object-cover" />
                    </div>
                  </div>
                ) : (
                  <SafeImage src={card.mediaPath} fallbackSrc="/images/portfolio/IPL Night.png" alt={card.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-2xl font-semibold text-[#f6f0cf]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d8caad]">{card.writeup}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/25 p-5">
          <p className="text-xs uppercase tracking-[0.08em] text-[#bdae8a]">TulSip Stats</p>
          <h3 className="mt-2 font-display text-3xl text-[#f6f0cf]">Our Impact in 2025-26</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-[#e8dcc0]">30% average increase in organic reach for local brands.</div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-[#e8dcc0]">500+ qualified leads generated for education and healthcare clients.</div>
            <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-[#e8dcc0]">24/7 strategic support for brand partners.</div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
          <h3 className="font-display text-3xl text-[#f6f0cf]">More Work Snapshots</h3>
          <p className="mt-1 text-sm text-[#d8caad]">Photos are shown in your fixed sequence to preserve visual storytelling.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {moreSnapshots.map((path, index) => (
              <article key={path} className="overflow-hidden rounded-xl border border-white/10 bg-black/25">
                <div className="relative h-44 w-full">
                  <SafeImage src={path} fallbackSrc="/images/portfolio/IPL Night.png" alt={`Work snapshot ${index + 1}`} fill className="object-cover" />
                </div>
                <div className="p-3 text-xs uppercase tracking-[0.08em] text-[#d8caad]">Snapshot {String(index + 1).padStart(2, "0")}</div>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs leading-6 text-[#9f9682]">
          TulSip Media is an independent digital agency. The work displayed in this portfolio represents professional projects executed by our team. All trademarks and brand logos remain the property of their respective owners.
        </p>
      </section>
    </>
  );
}
