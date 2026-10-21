import React from 'react';
import { motion } from 'framer-motion';

const RECURRING_CONCERNS = [
  {
    quote: "“Will a website actually bring customers?”",
    detail: "Owners may struggle to see a direct connection between a website and measurable business outcomes."
  },
  {
    quote: "“I need customers now.”",
    detail: "Startups and smaller businesses often want affordable solutions that deliver immediate visibility, enquiries and footfall."
  },
  {
    quote: "“Social media is enough.”",
    detail: "Businesses may rely heavily on Instagram, Facebook, influencers, JustDial, referrals and walk-in traffic."
  },
  {
    quote: "“Someone already made us a website.”",
    detail: "A low-cost website may exist without meaningful search visibility, useful content, clear positioning or a strong customer journey."
  },
  {
    quote: "“We are good at what we do, but people don't know us.”",
    detail: "Quality products and services do not automatically translate into discoverability among people searching online."
  }
];

const GAP_STAGES = [
  {
    stage: "Discovery",
    description: "A prospective customer searches for a service but does not encounter the business."
  },
  {
    stage: "Understanding",
    description: "The customer finds a profile but cannot easily determine the business's services, expertise, location or value."
  },
  {
    stage: "Trust",
    description: "The online presence does not adequately demonstrate the quality or credibility of the business."
  },
  {
    stage: "Action",
    description: "Contact information, pricing guidance, service details or enquiry options are difficult to find."
  }
];

const TheChallengeSection = () => {
  return (
    <section id="observation" className="w-full py-20 md:py-24 px-6 font-general text-light-beige">
      {/* 02. The Observation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto mb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 flex flex-col justify-between"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-3">
              02. The Observation
            </p>
            <h2 className="text-[32px] md:text-[42px] font-semibold text-light-beige mb-6 font-zentry leading-tight">
              Businesses were investing in <span className="text-royal-beige italic font-serif">what they could see.</span>
            </h2>
            <p className="text-light-beige/85 text-sm md:text-base leading-relaxed mb-6">
              For many local business owners, inventory, equipment, rent, staffing and day-to-day operations are immediate priorities. A website can feel like another expense—particularly when its contribution to revenue is unclear.
            </p>
            <p className="text-royal-beige text-sm md:text-base leading-relaxed mb-8">
              During our local market observations, we encountered several recurring concerns:
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-dark-brown/40 border border-royal-beige/25 text-xs md:text-sm text-light-beige/80 leading-relaxed">
            These are qualitative market observations, not quantified survey results. Their purpose is to identify business problems worth investigating and solving—not to imply that every local business faces the same challenges.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7 flex flex-col gap-4"
        >
          {RECURRING_CONCERNS.map((item, idx) => (
            <div key={idx} className="bg-dark-brown border border-royal-beige/20 rounded-2xl p-6 shadow-xl flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-royal-beige/15 text-royal-beige flex items-center justify-center shrink-0 font-zentry font-semibold mt-0.5">
                0{idx + 1}
              </div>
              <div>
                <h3 className="text-light-beige font-semibold text-base md:text-lg mb-1">
                  {item.quote}
                </h3>
                <p className="text-light-beige/80 text-sm md:text-base leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* 03. The Core Problem */}
      <div id="core-problem" className="max-w-6xl mx-auto pt-16 border-t border-royal-beige/20">
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-3">
            03. The Core Problem
          </p>
          <h2 className="text-[32px] md:text-[44px] font-semibold text-light-beige mb-6 font-zentry leading-tight">
            Digital presence is not the same as <span className="text-royal-beige italic font-serif">digital discoverability.</span>
          </h2>
          <p className="text-light-beige/85 text-sm md:text-base lg:text-lg leading-relaxed mb-4">
            Having a social media account or a published website does not guarantee that potential customers will find, understand or trust a business.
          </p>
          <p className="text-royal-beige text-sm md:text-base leading-relaxed">
            The gap can appear at several stages:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {GAP_STAGES.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="bg-dark-brown/60 border border-royal-beige/25 rounded-3xl p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs text-royal-beige uppercase tracking-widest block mb-3">
                  Stage 0{idx + 1}
                </span>
                <h3 className="font-zentry text-2xl font-semibold text-light-beige mb-3">
                  {item.stage}
                </h3>
                <p className="text-sm md:text-base text-light-beige/85 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-dark-brown/60 via-dark-brown/40 to-transparent border border-royal-beige/30">
          <p className="text-base md:text-lg text-light-beige leading-relaxed">
            This creates a strategic opportunity: help local businesses build a coherent digital identity that communicates their value before a potential customer ever walks through the door.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TheChallengeSection;
