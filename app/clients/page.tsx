import Image from "next/image";
import { PageIntro } from "@/components/common/PageIntro";
import { CLIENT_ITEMS } from "@/lib/data/clients";

export default function ClientsPage() {
  return (
    <>
      <PageIntro
        title="Brand Experience"
        description="Growth partners currently managed by TulSip Media across education, retail, sports, agency, and pet-care categories."
      />
      <section className="section-shell section-b" data-reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CLIENT_ITEMS.map((client) => (
            <article key={client.name} className="theme-card rounded-2xl p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-md border border-white/10 bg-white">
                  <Image src={client.logo} alt={`${client.name} logo`} fill className="object-contain p-1" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#f6f0cf]">{client.name}</h3>
                  {client.website ? (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noreferrer"
                      className="theme-muted text-xs underline underline-offset-4"
                    >
                      Visit website
                    </a>
                  ) : (
                    <p className="theme-muted text-xs">Digital Strategy & Execution</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                {client.socialProfile && client.socialLabel ? (
                  <a
                    href={client.socialProfile}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-sm border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
                  >
                    {client.socialLabel} Profile
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

