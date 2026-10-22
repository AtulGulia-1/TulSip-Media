const STEPS = [
  {
    step: '01',
    name: 'Discovery & Strategic Blueprint',
    duration: 'Week 1',
    summary:
      'We begin with an in-depth conversation about your business model, customer buying journey, core service offerings, and competitive positioning. We define the exact page scope, functional requirements, and milestone schedule before writing a single line of code.',
  },
  {
    step: '02',
    name: 'Information Architecture & Wireframes',
    duration: 'Week 2',
    summary:
      'We map out page hierarchies, navigation paths, and user flow wireframes. Every section is designed to address prospective client doubts, emphasize trust markers, and create a frictionless path to enquiry.',
  },
  {
    step: '03',
    name: 'Bespoke UI Design & Brand Alignment',
    duration: 'Weeks 2–3',
    summary:
      'We craft tailored high-fidelity visual layouts reflecting your brand authority. Typography, color palettes, responsive layouts, and interactive components are presented for your direct feedback and approval.',
  },
  {
    step: '04',
    name: 'Frontend & Backend Engineering',
    duration: 'Weeks 3–4',
    summary:
      'We write clean, modular React and TypeScript components with accessible semantic HTML, form validation, API integrations, and asset optimization. Everything is tested in staging environments.',
  },
  {
    step: '05',
    name: 'Rigorous QA, SEO Verification & Launch',
    duration: 'Week 5',
    summary:
      'Pre-launch checklist: Google Search Console verification, dynamic XML sitemaps, Core Web Vitals profiling, DNS cutover, SSL certification, and post-launch monitoring to guarantee a seamless transition.',
  },
];

const WebDevProcess = () => {
  return (
    <section className="bg-deep-dark px-4 py-20 text-light-beige lg:px-20 xl:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-2">
            Predictable Milestones · Zero Ambiguity
          </p>
          <h2 className="font-zentry text-3xl sm:text-4xl uppercase tracking-tight text-light-beige">
            How We Build Your Website
          </h2>
          <p className="mt-4 font-general text-sm sm:text-base leading-relaxed text-light-beige/80">
            A successful website build relies on structured collaboration, transparent milestones, and regular communication. Here is the exact phased approach we follow for every client.
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {STEPS.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-2xl border border-royal-beige/25 bg-dark-brown/30 p-6 sm:p-8 transition-colors hover:border-royal-beige/45 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-royal-beige font-mono text-base font-bold text-deep-dark">
                  {step.step}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-general text-lg sm:text-xl font-bold text-light-beige">
                      {step.name}
                    </h3>
                    <span className="rounded-full bg-royal-beige/15 border border-royal-beige/30 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-royal-beige">
                      {step.duration}
                    </span>
                  </div>
                  <p className="font-robert-regular text-xs sm:text-sm text-light-beige/80 leading-relaxed max-w-3xl">
                    {step.summary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevProcess;
