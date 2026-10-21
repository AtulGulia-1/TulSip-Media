import React from 'react';
import { motion } from 'framer-motion';

const OPPORTUNITIES = [
  {
    number: "01",
    title: "01 — Build an identity beyond social media",
    description:
      "Social platforms are useful discovery and engagement channels, but a dedicated website gives a business greater control over how its story, services, portfolio and contact options are presented.",
    img: "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    alt: "Dedicated business website layout presenting brand story, services, and contact options"
  },
  {
    number: "02",
    title: "02 — Make quality visible",
    description:
      "Strong photography, clear service descriptions, genuine reviews, relevant credentials and real examples of work can help customers evaluate a business with greater confidence.",
    img: "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
    alt: "Visual showcase highlighting service quality, portfolio work, and business credentials"
  },
  {
    number: "03",
    title: "03 — Design for how customers search",
    description:
      "A website should reflect the language customers actually use when looking for a product or service. Relevant page content, descriptive headings, internal links and local business information help search engines understand what the business offers.",
    img: "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    alt: "Search-friendly page architecture with clear headings and local business information"
  },
  {
    number: "04",
    title: "04 — Turn attention into action",
    description:
      "A useful website should make the next step obvious. Depending on the business, this could mean calling, requesting a quote, booking an appointment, visiting a location or starting a WhatsApp conversation.",
    img: "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    alt: "Clear website conversion paths for calls, quotes, appointments, and WhatsApp enquiries"
  },
  {
    number: "05",
    title: "05 — Connect the website to the wider digital ecosystem",
    description:
      "A website works best as part of a broader system that can include a Google Business Profile, social media, local search optimization, analytics and a consistent brand identity.",
    img: "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
    alt: "Connected digital ecosystem linking website, Google Business Profile, social channels, and analytics"
  }
];

const StrategySection = () => {
  return (
    <section id="what-we-learned" className="w-full max-w-[1200px] mx-auto px-6 py-24 flex flex-col gap-20 md:gap-28">
      <div className="text-center max-w-3xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-3">
          04. What We Learned
        </p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[32px] md:text-[48px] font-semibold text-light-beige font-zentry"
        >
          Five opportunities for <span className="text-royal-beige italic font-serif">local businesses</span>
        </motion.h2>
      </div>

      {OPPORTUNITIES.map((item, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 w-full`}
        >
          <div className="w-full lg:w-1/2">
            <h3 className="font-serif text-2xl md:text-4xl font-semibold text-light-beige mb-5 tracking-wide">
              {item.title}
            </h3>
            <p className="font-general text-base md:text-lg text-light-beige/85 leading-relaxed">
              {item.description}
            </p>
          </div>
          
          <div className="w-full lg:w-1/2 rounded-[32px] overflow-hidden shadow-2xl border border-royal-beige/20 group">
            <img 
              src={item.img} 
              alt={item.alt} 
              className="w-full h-[320px] md:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto text-center p-8 rounded-3xl bg-dark-brown/45 border border-royal-beige/30">
        <p className="font-general text-base md:text-xl text-light-beige leading-relaxed">
          The objective is not simply to put a business online. It is to make its digital presence useful, credible and connected to real customer needs.
        </p>
      </div>
    </section>
  );
};

export default StrategySection;
