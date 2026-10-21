import React from 'react';
import { motion } from 'framer-motion';

const STRATEGIC_STEPS = [
  {
    step: "01",
    title: "Discover",
    description:
      "Understand the business model, local competition, customer questions, current digital presence and practical constraints."
  },
  {
    step: "02",
    title: "Position",
    description:
      "Define the business's value proposition, service priorities, differentiators and messaging."
  },
  {
    step: "03",
    title: "Build",
    description:
      "Create a responsive website with a clear information architecture, accessible design, useful content and straightforward enquiry paths."
  },
  {
    step: "04",
    title: "Improve discoverability",
    description:
      "Support organic search with relevant page targeting, technical SEO, local search fundamentals, descriptive metadata and structured data where appropriate."
  },
  {
    step: "05",
    title: "Measure and refine",
    description:
      "Where measurement tools are configured and consent and privacy requirements are met, assess meaningful signals such as organic visits, qualified enquiries, calls and form submissions. Use the evidence to improve the experience over time."
  }
];

const ProcessSection = () => {
  return (
    <section id="strategic-response" className="w-full py-20 overflow-hidden font-general text-light-beige">
      <div className="px-6 md:max-w-4xl mx-auto mb-16 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-3">
          05. The Strategic Response
        </p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-zentry tracking-tight"
        >
          Websites built around <span className="font-serif italic text-royal-beige">business needs</span>—not just aesthetics.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-light-beige/85 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Our approach begins with understanding the business, its audience, its competitive environment and the actions it wants customers to take.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 px-6 md:max-w-7xl mx-auto">
        {STRATEGIC_STEPS.map((p, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="bg-deep-dark border border-royal-beige/20 rounded-[32px] px-7 py-9 flex flex-col hover:border-royal-beige/35 transition-colors"
          >
            <span className="text-royal-beige font-serif text-4xl italic opacity-60 mb-5">{p.step}</span>
            <h3 className="font-zentry text-xl font-semibold text-light-beige mb-4">{p.title}</h3>
            <p className="text-sm text-light-beige/85 leading-relaxed">
              {p.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto mt-12 px-6">
        <div className="p-6 md:p-8 rounded-2xl bg-dark-brown/40 border border-royal-beige/25 text-center">
          <p className="text-sm md:text-base text-royal-beige leading-relaxed">
            A website is not a guarantee of rankings, instant footfall or revenue. It is a foundation that can help a business communicate more effectively and create more opportunities to be discovered.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
