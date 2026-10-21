import React from 'react';

const AiAbout = () => {
  return (
    <section className="relative w-full min-h-screen flex justify-center bg-deep-dark overflow-hidden">
      {/* Background Video — AI_coading.mp4 */}
      <video
        src="/videos/AI_coading.mp4"
        poster="/img/posters/AI_coading.webp"
        preload="none"
        autoPlay
        loop
        muted
        playsInline
        aria-label="AI-assisted coding and intelligent workflow engineering"
        className="absolute inset-0 w-full h-full object-cover opacity-65 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-deep-dark/70 via-deep-dark/35 to-deep-dark/80 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-[1831px] px-6 md:px-12 py-16 md:py-24 flex flex-col justify-between h-full min-h-screen">
        
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 mt-12 lg:mt-24">
          
          <div className="relative">
            <h2 className="font-grotesk uppercase text-light-beige text-[32px] sm:text-[45px] md:text-[60px] leading-[1.1]">
              Hello!
              <br />
              We're TulSip
            </h2>
            <span className="font-condiment text-royal-beige mix-blend-exclusion absolute right-0 -bottom-4 md:-bottom-8 lg:-right-12 text-[36px] sm:text-[48px] md:text-[68px] -rotate-2">
              AI
            </span>
          </div>

          <p className="font-mono text-light-beige text-[14px] md:text-[16px] uppercase max-w-[340px] leading-relaxed">
            PRACTICAL AUTOMATION ENGINEERED AROUND REAL BUSINESS LOGIC, CLEAN CODE, AND HUMAN-CENTERED INTERFACES.
          </p>

        </div>

        {/* Bottom Row — Clear Crawlable HTML Service Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full mt-24 mb-12">
          
          <div className="liquid-glass rounded-3xl p-6 md:p-8 max-w-xl">
            <h3 className="font-mono text-royal-beige uppercase text-xs tracking-[0.2em] mb-3">
              01 · Intelligent Web Interfaces
            </h3>
            <p className="font-mono text-light-beige/90 text-[13px] md:text-[15px] leading-relaxed">
              We embed guided enquiry assistants, interactive calculators, and qualification flows directly into custom websites so visitors get immediate answers while your team receives structured, high-intent leads.
            </p>
          </div>

          <div className="liquid-glass rounded-3xl p-6 md:p-8 max-w-xl lg:ml-auto">
            <h3 className="font-mono text-royal-beige uppercase text-xs tracking-[0.2em] mb-3">
              02 · Connected Operations &amp; APIs
            </h3>
            <p className="font-mono text-light-beige/90 text-[13px] md:text-[15px] leading-relaxed">
              From automated CRM routing and booking synchronization to custom internal dashboards, we connect your website to the tools your business already relies on—without brittle off-the-shelf bloat.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AiAbout;
