import { PageIntro } from "@/components/common/PageIntro";
import { SafeImage } from "@/components/common/SafeImage";
import { TEAM_MEMBERS } from "@/lib/data/team";
import { PRIMARY_FOUNDER } from "@/lib/data/founders";

export default function TeamPage() {
  const membersWithoutPrimaryFounder = TEAM_MEMBERS.filter(
    (member) => member.name !== PRIMARY_FOUNDER.name
  );

  return (
    <>
      <PageIntro
        title="Team"
        description="Cross-functional experts combining creative quality with performance rigor."
      />
      <section className="section-shell section-b" data-reveal>
        <article className="theme-card overflow-hidden rounded-2xl">
          <div className="grid gap-0 lg:grid-cols-[320px_1fr]">
            <div className="relative h-72 w-full lg:h-full">
              <SafeImage src={PRIMARY_FOUNDER.image} alt={PRIMARY_FOUNDER.name} fill className="object-cover" />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#e9ddba]">
                Founder Spotlight
              </p>
              <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3rem)] leading-tight text-[#f6f0cf]">
                {PRIMARY_FOUNDER.name}
              </h2>
              <p className="text-sm font-semibold text-[#c62828]">{PRIMARY_FOUNDER.title}</p>
              <p className="theme-muted mt-4 max-w-3xl leading-7">{PRIMARY_FOUNDER.bio}</p>
              <p className="theme-muted mt-4 text-sm">Founder Base: {PRIMARY_FOUNDER.location}</p>
              {PRIMARY_FOUNDER.linkedin ? (
                <a
                  href={PRIMARY_FOUNDER.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-sm border border-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
                >
                  View LinkedIn
                </a>
              ) : null}
            </div>
          </div>
        </article>
      </section>
      <section className="section-shell section-b" data-reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {membersWithoutPrimaryFounder.map((member) => (
            <article key={member.name} className="theme-card overflow-hidden rounded-2xl">
              <div className="relative h-56 w-full">
                <SafeImage src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-3xl font-semibold text-[#f6f0cf]">{member.name}</h3>
                <p className="theme-muted mt-1 text-sm">{member.role}</p>
                <ul className="mt-4 space-y-1 text-xs text-[#d8caad]">
                  {member.specialties.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
