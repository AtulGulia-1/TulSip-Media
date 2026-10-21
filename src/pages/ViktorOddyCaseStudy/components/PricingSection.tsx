import React from 'react';
import { motion } from 'framer-motion';

const PricingSection = () => {
  return (
    <section className="w-full py-24 px-6 font-general">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl mx-auto md:justify-end">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="bg-deep-dark border border-royal-beige/20 rounded-[40px] px-10 md:pr-24 pt-10 pb-12 shadow-[inset_0_2px_8px_0_rgba(241, 234, 218,0.05)] flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[22px] font-semibold text-light-beige mb-4 font-zentry">Ongoing Website &amp; Growth Retainer</h3>
            <p className="text-light-beige text-sm md:text-base leading-relaxed mb-8 opacity-80">
              Continuous UI/UX iteration, technical SEO care, landing pages, and content systems with a manageable recurring arrangement.
            </p>
          </div>
          <div>
            <div className="mb-8">
              <span className="text-3xl font-bold text-light-beige">Custom Scope</span>
              <span className="block text-sm text-light-beige opacity-60 mt-1">Monthly Partnership</span>
            </div>
            <div className="flex flex-col gap-3">
              <a href="/contact" className="text-center bg-cta glow-cta text-deep-dark rounded-full px-6 py-3 font-semibold text-sm transition-all hover:scale-105">
                Request a Proposal
              </a>
              <a href="/about" className="text-center bg-transparent border border-royal-beige/30 text-light-beige rounded-full px-6 py-3 font-semibold text-sm transition-all hover:bg-dark-brown/55">
                How we work
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-dark-brown border border-royal-beige/15 rounded-[40px] px-10 md:pr-24 pt-10 pb-12 shadow-2xl flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[22px] font-semibold text-light-beige mb-4 font-zentry">Custom Website Build</h3>
            <p className="text-royal-beige text-sm md:text-base leading-relaxed mb-8">
              Defined deliverables, milestone schedule, and full handover for individually scoped website and web application projects.
            </p>
          </div>
          <div>
            <div className="mb-8">
              <span className="text-3xl font-bold text-light-beige">Tailored Quote</span>
              <span className="block text-sm text-royal-beige mt-1">Based on pages &amp; integrations</span>
            </div>
            <div className="flex flex-col gap-3">
              <a href="/contact" className="text-center bg-light-beige text-deep-dark rounded-full px-6 py-3 font-semibold text-sm transition-all hover:scale-105 shadow-[0_4px_16px_rgba(241, 234, 218,0.1)] hover:shadow-[0_4px_24px_rgba(241, 234, 218,0.2)]">
                Discuss Your Project
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default PricingSection;
