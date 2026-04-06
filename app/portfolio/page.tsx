import Link from "next/link";
import type { Metadata } from "next";
import { SafeImage } from "@/components/common/SafeImage";
import { PageIntro } from "@/components/common/PageIntro";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/lib/data/portfolio";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Work Gallery",
  description: "Category-based showcase of campaigns, brand content, and performance outcomes by TulSip Media.",
  alternates: { canonical: "/portfolio" }
};

type WorkTab = "food-retail" | "services-healthcare" | "sports-b2b";

type WorkCardConfig = {
  title: string;
  writeup: string;
  keywords: string[];
  fallbackMedia: string;
  mockup?: boolean;
};

type WorkSectionConfig = {
  id: WorkTab;
  label: string;
  targetClients: string;
  cards: WorkCardConfig[];
};

type ResolvedWorkCard = {
  id: string;
  title: string;
  writeup: string;
  mediaUrl: string;
  mediaType: "image" | "video";
  link?: string;
  mockup?: boolean;
};

const WORK_SECTIONS: WorkSectionConfig[] = [
  {
    id: "food-retail",
    label: "Food, Hospitality & Retail",
    targetClients: "Restaurants, Cafes, Bakeries, Cloud Kitchens",
    cards: [
      {
        title: "24Seven Cafe (The Vibe Post)",
        writeup:
          "Strategic Social Media Engagement. Created high-energy, trend-based content to drive evening footfall and weekend reservations. Focused on scroll-stopping visuals that resonate with a younger, digital-first audience.",
        keywords: ["24seven", "ipl", "mojito", "cafe", "vibe"],
        fallbackMedia: "/images/portfolio/local-cafe-launch.jpg",
        mockup: true
      },
      {
        title: "Athens Pizza (The 3D Hook Post)",
        writeup:
          "Conversion-Driven Visual Design. Utilized breaking-the-4th-wall design techniques to trigger immediate cravings and increase order-now click-through rates for local delivery.",
        keywords: ["athens", "pizza", "burger", "3d", "order"],
        fallbackMedia: "/images/portfolio/fashion-brand-ugc.jpg",
        mockup: true
      },
      {
        title: "24Seven Cafe (The Menu Post)",
        writeup:
          "Premium Brand Identity. Elevated everyday menu items through modern aesthetics and high-end typography to compete with national cafe chains.",
        keywords: ["24seven", "menu", "anytime", "momos", "coffee"],
        fallbackMedia: "/images/portfolio/healthcare-campaign.jpg"
      }
    ]
  },
  {
    id: "services-healthcare",
    label: "Professional Services & Healthcare",
    targetClients: "Doctors, Clinics, Schools, Academies",
    cards: [
      {
        title: "Mother's Pride (Authority Post)",
        writeup:
          "High-Ticket Lead Generation. Executed a comprehensive 2026 academic session drive, balancing CBSE authority with parent-centric trust factors to streamline the inquiry-to-admission funnel.",
        keywords: ["mother", "pride", "school", "admission", "cbse", "2026"],
        fallbackMedia: "/images/portfolio/local-cafe-launch.jpg",
        mockup: true
      },
      {
        title: "Tan Man Paramarsh (Clinical Post)",
        writeup:
          "Healthcare Authority and Patient Outreach. Established a trustworthy digital presence for a specialized medical practice using solution-oriented messaging for expert dermatological care.",
        keywords: ["tan", "man", "paramarsh", "dermatology", "psoriasis", "clinic"],
        fallbackMedia: "/images/portfolio/fashion-brand-ugc.jpg"
      },
      {
        title: "Prime Pet Care (Trust Post)",
        writeup:
          "Empathy-Based Medical Branding. Combined medical authority with compassionate visual storytelling to build long-term trust with local pet owners.",
        keywords: ["prime", "pet", "care", "vet", "golden", "retriever"],
        fallbackMedia: "/images/portfolio/healthcare-campaign.jpg"
      },
      {
        title: "Prime Pet Care (Retail Post)",
        writeup:
          "Integrated E-commerce and Retail Strategy. Managed a dual-track clinic-plus-retail model with urgency triggers to drive physical store sales.",
        keywords: ["prime", "pet", "20%", "dog", "food", "retail"],
        fallbackMedia: "/images/portfolio/local-cafe-launch.jpg"
      }
    ]
  },
  {
    id: "sports-b2b",
    label: "Sports, Events & Agency B2B",
    targetClients: "Sports Complexes, Agencies, Corporate Brands",
    cards: [
      {
        title: "SSCA Cricket Academy (High-Energy Post)",
        writeup:
          "Facility Marketing and Slot Optimization. Managed digital bookings for a premier sports facility using athletic high-contrast imagery for night matches and training demand.",
        keywords: ["ssca", "cricket", "academy", "floodlight", "ground", "booking"],
        fallbackMedia: "/images/portfolio/fashion-brand-ugc.jpg",
        mockup: true
      },
      {
        title: "Ad Guru (Expert Partner Post)",
        writeup:
          "Agency-Level Strategic Collaboration. Trusted by industry partners to deliver high-volume, professional advertising assets and complex service-catalog campaigns.",
        keywords: ["ad guru", "business cards", "india", "victory", "agency"],
        fallbackMedia: "/images/portfolio/healthcare-campaign.jpg"
      }
    ]
  }
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function buildLiveProjects(rows: Array<Record<string, unknown>> | null): PortfolioProject[] {
  if (!rows?.length) return [];
  return rows.map((row) => ({
    id: String(row.id ?? ""),
    name: String(row.title ?? ""),
    result: String(row.result ?? ""),
    mediaUrl: String(row.media_url ?? ""),
    mediaType: row.media_type === "video" ? "video" : "image",
    link: row.external_link ? String(row.external_link) : undefined,
    isPublished: Boolean(row.is_published),
    sortOrder: Number(row.sort_order ?? 0)
  }));
}

function resolveCards(
  section: WorkSectionConfig,
  projects: PortfolioProject[],
  usedProjectIds: Set<string>
): ResolvedWorkCard[] {
  return section.cards.map((card, index) => {
    const hit = projects.find((project) => {
      if (!project.mediaUrl || !project.id || usedProjectIds.has(project.id)) return false;
      const haystack = normalize(`${project.name} ${project.result}`);
      return card.keywords.some((keyword) => haystack.includes(normalize(keyword)));
    });

    if (hit?.id) {
      usedProjectIds.add(hit.id);
    }

    const mediaUrl = hit?.mediaUrl || card.fallbackMedia;
    const mediaType = hit?.mediaType === "video" ? "video" : "image";

    return {
      id: hit?.id || `${section.id}-${index}`,
      title: card.title,
      writeup: card.writeup,
      mediaUrl,
      mediaType,
      link: hit?.link,
      mockup: card.mockup
    };
  });
}

function getActiveTab(rawTab?: string): WorkTab {
  const allowedTabs: WorkTab[] = ["food-retail", "services-healthcare", "sports-b2b"];
  return allowedTabs.includes(rawTab as WorkTab) ? (rawTab as WorkTab) : "food-retail";
}

export default async function PortfolioPage({
  searchParams
}: {
  searchParams?: Promise<{ tab?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const activeTab = getActiveTab(resolvedSearchParams?.tab);

  const supabase = await createClient();
  const { data: portfolioRows } = await supabase
    .from("portfolio_items")
    .select("id,title,result,media_url,media_type,external_link,is_published,sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  const liveProjects = buildLiveProjects(portfolioRows as Array<Record<string, unknown>> | null);
  const projects = liveProjects.length ? liveProjects : PORTFOLIO_PROJECTS;

  const usedProjectIds = new Set<string>();
  const resolvedBySection = WORK_SECTIONS.map((section) => ({
    ...section,
    cards: resolveCards(section, projects, usedProjectIds)
  }));

  const activeSection = resolvedBySection.find((section) => section.id === activeTab) ?? resolvedBySection[0];
  const extraSnapshots = projects.filter((project) => !project.id || !usedProjectIds.has(project.id));

  return (
    <>
      <PageIntro
        title="Work Gallery"
        description="Explore campaign snapshots by business category, with strategic context and outcomes."
      />

      <section className="section-shell section-b" data-reveal>
        <div className="mb-6 flex flex-wrap gap-2">
          {resolvedBySection.map((section) => {
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
            <article key={card.id} className="theme-card overflow-hidden rounded-2xl">
              <div className={`relative ${card.mockup ? "bg-black/40 p-3" : "h-52 bg-black/25 sm:h-56"}`}>
                {card.mockup ? (
                  <div className="relative mx-auto h-56 w-[min(260px,80%)] rounded-[2rem] border border-white/20 bg-black/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.45)] sm:h-60">
                    <div className="absolute left-1/2 top-2 h-1 w-14 -translate-x-1/2 rounded-full bg-white/20" />
                    <div className="relative h-full w-full overflow-hidden rounded-[1.6rem]">
                      {card.mediaType === "video" ? (
                        <video
                          src={card.mediaUrl}
                          controls
                          preload="metadata"
                          playsInline
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <SafeImage src={card.mediaUrl} alt={card.title} fill className="object-cover" />
                      )}
                    </div>
                  </div>
                ) : card.mediaType === "video" ? (
                  <video
                    src={card.mediaUrl}
                    controls
                    preload="metadata"
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <SafeImage src={card.mediaUrl} alt={card.title} fill className="object-cover" />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-display text-2xl font-semibold text-[#f6f0cf]">{card.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d8caad]">{card.writeup}</p>
                {card.link ? (
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] underline underline-offset-4"
                  >
                    View Live Snapshot
                  </a>
                ) : null}
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

        {extraSnapshots.length ? (
          <div className="mt-8 rounded-2xl border border-white/10 bg-black/20 p-5">
            <h3 className="font-display text-3xl text-[#f6f0cf]">More Work Snapshots</h3>
            <p className="mt-1 text-sm text-[#d8caad]">All additional uploads auto-appear here with the same responsive layout.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {extraSnapshots.map((project, index) => (
                <article key={project.id ?? `${project.name}-${index}`} className="overflow-hidden rounded-xl border border-white/10 bg-black/25">
                  <div className="relative h-44 w-full">
                    {(project.mediaType ?? "image") === "video" ? (
                      <video src={project.mediaUrl ?? project.image} controls preload="metadata" playsInline className="h-full w-full object-cover" />
                    ) : (
                      <SafeImage
                        src={project.mediaUrl ?? project.image ?? "/camera-fallback.png"}
                        alt={`Additional snapshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-3 text-xs uppercase tracking-[0.08em] text-[#d8caad]">Snapshot {String(index + 1).padStart(2, "0")}</div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-8 text-xs leading-6 text-[#9f9682]">
          TulSip Media is an independent digital agency. The work displayed in this portfolio represents professional projects executed by our team. All trademarks and brand logos remain the property of their respective owners.
        </p>
      </section>
    </>
  );
}
