import React from 'react';

const systems = [
  {
    video: "/videos/exploring_new_ideas.mp4",
    poster: "/img/posters/exploring_new_ideas.webp",
    label: "WORKFLOW 01 · DISCOVERY & INTENT",
    score: "Lead Intake & Smart Routing",
    summary: "Captures visitor enquiries, qualifies project scope, and routes leads to the right channel automatically.",
  },
  {
    video: "/videos/coding-web.mp4",
    poster: "/img/posters/coding-web.webp",
    label: "WORKFLOW 02 · ARCHITECTURE & LOGIC",
    score: "Custom Web App & API Engine",
    summary: "Clean frontend and backend engineering that powers interactive tools, portals, and guided service assistants.",
  },
  {
    video: "/videos/views.mp4",
    poster: "/img/posters/views.webp",
    label: "WORKFLOW 03 · MEASURABLE OUTCOMES",
    score: "CRM Sync & Conversion Tracking",
    summary: "Connects user interactions with real-time notifications, analytics events, and structured follow-up sequences.",
  },
];

const AiSystems = () => {
  return (
    <section className="w-full bg-deep-dark py-24">
      <div className="max-w-[1831px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          
          <h2 className="font-grotesk text-light-beige uppercase text-[32px] sm:text-[45px] md:text-[60px] leading-[1.1]">
            Collection of
            <br />
            <span className="ml-12 md:ml-24 lg:ml-32">
              <span className="font-condiment text-royal-beige lowercase mr-4">Automation</span>
              Systems
            </span>
          </h2>

          <a href="/contact" className="flex flex-col items-end group cursor-pointer">
            <div className="flex items-baseline text-light-beige font-grotesk uppercase">
              <span className="text-[32px] sm:text-[45px] md:text-[60px] leading-none">BUILD</span>
              <div className="flex flex-col ml-2 leading-none text-[20px] sm:text-[28px] md:text-[36px]">
                <span>YOUR</span>
                <span>SYSTEM</span>
              </div>
            </div>
            <div className="h-[6px] sm:h-[8px] md:h-[10px] bg-royal-beige w-full mt-2 group-hover:scale-x-110 transition-transform origin-right" />
          </a>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, idx) => (
            <div key={idx} className="liquid-glass rounded-[32px] p-[18px] hover:bg-dark-brown/55 transition-colors group flex flex-col justify-between">
              <div>
                <div className="relative w-full pb-[100%] rounded-[24px] overflow-hidden mb-4 bg-dark-brown">
                  <video
                    src={system.video}
                    poster={system.poster}
                    preload="none"
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={system.score}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="font-mono text-light-beige/75 text-xs leading-relaxed px-2 mb-4">
                  {system.summary}
                </p>
              </div>

              <div className="liquid-glass rounded-[20px] px-5 py-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="font-mono text-royal-beige text-[11px] uppercase tracking-wider mb-1">
                    {system.label}
                  </span>
                  <span className="font-mono text-light-beige text-[15px] font-bold">
                    {system.score}
                  </span>
                </div>

                <a
                  href="/contact"
                  aria-label={`Enquire about ${system.score}`}
                  className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-royal-beige to-dark-brown flex items-center justify-center shadow-lg shadow-royal-beige/50 group-hover:scale-110 transition-transform"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F1EADA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AiSystems;
