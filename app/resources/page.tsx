import { PageIntro } from "@/components/common/PageIntro";

export default function ResourcesPage() {
  return (
    <>
      <PageIntro
        title="Resources"
        description="Guides, checklists, and practical growth notes are being documented."
      />
      <section className="mx-auto w-full max-w-[1200px] px-5 pb-16 lg:px-[120px]" data-reveal>
        <article className="theme-card rounded-2xl p-6">
          <h2 className="font-display text-3xl text-[#f6f0cf]">Resources Hub</h2>
          <p className="theme-muted mt-3 text-sm leading-7">
            We are building a practical resource library focused on customer journeys, touchpoint optimization, and
            local-first growth systems.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.08em] text-[#bdae8a]">[ADD BLOG/RESOURCES LINK]</p>
        </article>
      </section>
    </>
  );
}
