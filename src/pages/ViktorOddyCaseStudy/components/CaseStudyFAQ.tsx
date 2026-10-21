import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CASE_STUDY_FAQS = [
  {
    question: "Why does a local business need a website?",
    answer:
      "A website can give a business a dedicated place to explain its services, establish its brand identity, answer customer questions and generate enquiries. Its value depends on the business, the quality of the website and how effectively it is connected to customer discovery channels."
  },
  {
    question: "Is social media enough for a local business?",
    answer:
      "Social media can help businesses build awareness and engage customers. A website complements these channels by providing a more controlled destination for detailed service information, portfolios, contact options and relevant search content."
  },
  {
    question: "Can a website guarantee more customers?",
    answer:
      "No. A website alone cannot guarantee rankings, enquiries, footfall or revenue. Results depend on factors including customer demand, competition, website quality, visibility, offer, pricing and follow-up."
  },
  {
    question: "What did TulSip Media's local market research examine?",
    answer:
      "The founder-led observations explored how local businesses approach websites, digital discovery, social media, affordability, online credibility and customer acquisition. The findings are qualitative and should not be interpreted as statistically representative survey results."
  }
];

const CaseStudyFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="faq" className="w-full py-20 md:py-24 px-6 font-general text-light-beige">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-3">
            Frequently Asked Questions
          </p>
          <h2 className="text-3xl md:text-5xl font-zentry tracking-tight text-light-beige">
            Local Business Websites <span className="font-serif italic text-royal-beige">&amp; Discoverability</span>
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {CASE_STUDY_FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `case-study-faq-panel-${index}`;
            const buttonId = `case-study-faq-button-${index}`;

            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'border-royal-beige/45 bg-dark-brown/65 shadow-token-card'
                    : 'border-royal-beige/20 bg-dark-brown/20 hover:bg-dark-brown/40 hover:border-royal-beige/35'
                }`}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between p-6 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="text-light-beige font-medium text-base sm:text-lg md:text-xl pr-6">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: 'easeInOut' }}
                      className="shrink-0 w-8 h-8 rounded-full bg-royal-beige/20 border border-royal-beige/30 flex items-center justify-center text-light-beige"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-light-beige/85 text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CaseStudyFAQ;
