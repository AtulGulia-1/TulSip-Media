import type { Metadata } from "next";
import { SafeImage } from "@/components/common/SafeImage";
import { PageIntro } from "@/components/common/PageIntro";
import { PORTFOLIO_PROJECTS, type PortfolioProject } from "@/lib/data/portfolio";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A snapshot of campaigns, websites, and growth systems we shipped.",
  alternates: { canonical: "/portfolio" }
};

export default async function PortfolioPage() {
  const supabase = await createClient();
  let liveProjects: PortfolioProject[] = [];

  const { data: portfolioRows } = await supabase
    .from("portfolio_items")
    .select("id,title,result,media_url,media_type,external_link,is_published,sort_order")
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (portfolioRows?.length) {
    liveProjects = portfolioRows.map((row) => ({
      id: row.id,
      name: row.title,
      result: row.result,
      mediaUrl: row.media_url,
      mediaType: (row.media_type as "image" | "video") ?? "image",
      link: row.external_link ?? undefined,
      isPublished: row.is_published ?? true,
      sortOrder: row.sort_order ?? 0
    }));
  }

  const projects = liveProjects.length ? liveProjects : PORTFOLIO_PROJECTS;

  return (
    <>
      <PageIntro
        title="Portfolio"
        description="A snapshot of campaigns, websites, and growth systems we shipped."
      />
      <section className="section-shell section-b grid gap-6 sm:grid-cols-2 xl:grid-cols-3" data-reveal>
        {projects.map((project) => (
          <article key={project.name} className="theme-card overflow-hidden rounded-2xl">
            <div className="relative h-52 w-full bg-black/25 sm:h-56">
              {(project.mediaType ?? "image") === "video" ? (
                <video
                  src={project.mediaUrl ?? project.image}
                  controls
                  preload="metadata"
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <SafeImage
                  src={project.mediaUrl ?? project.image ?? "/camera-fallback.png"}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-4">
              <h3 className="font-display text-2xl font-semibold text-[#f6f0cf]">{project.name}</h3>
              <p className="mt-2 text-sm text-[#d8caad]">{project.result}</p>
              {project.link ? (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] underline underline-offset-4"
                >
                  View Case Study
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
