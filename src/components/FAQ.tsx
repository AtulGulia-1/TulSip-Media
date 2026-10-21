import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './sectionHeader';

const faqs = [
  {
    question: 'What website development services does TulSip Media offer?',
    answer:
      'TulSip Media designs and builds custom business websites, e-commerce storefronts, campaign landing pages, and custom web applications using React, Next.js, TypeScript, and Tailwind CSS. We also provide UI/UX design systems, technical SEO foundations, and ongoing website care.',
  },
  {
    question: 'How much does a business website cost, and what payment options are available?',
    answer:
      'Project scope depends on the number of pages, custom UI/UX and motion requirements, CMS or e-commerce complexity, and third-party integrations. To support different business stages, we offer both recurring website service arrangements (which reduce large upfront development payments) and individually scoped custom website projects with milestone quotations.',
  },
  {
    question: 'Should I use a website builder or work with a website development partner?',
    answer:
      'Template website builders can work for simple starter pages, but growing businesses often outgrow their layout constraints, slow script overhead, and limited SEO control. Working with TulSip Media gives you a faster, tailored user journey, clean semantic code, stronger technical SEO foundations, and an architecture built around how your customers actually buy or enquire.',
  },
  {
    question: 'How long does it take to design and build a website?',
    answer:
      'A focused landing page or compact business website typically takes 2 to 4 weeks, while multi-page custom websites, e-commerce storefronts, or web applications generally take 4 to 8+ weeks depending on scope, content readiness, and review turnaround.',
  },
  {
    question: 'What is included in technical SEO and ongoing website care?',
    answer:
      'Every website we build includes foundational technical SEO: clean semantic heading hierarchy (H1–H3), route-level title and meta description tags, canonical URLs, XML sitemap and robots configuration, Open Graph tags, and valid Schema.org structured data. Ongoing care covers security and dependency updates, content edits, performance monitoring, and iterative UX improvements.',
  },
  {
    question: 'How do we start a project or request a proposal?',
    answer:
      'Use the enquiry form on our Contact page, email hello@tulsipmedia.com, or message us on WhatsApp (+91 9821005996) with a brief overview of your business, what you need built or improved, and whether you prefer a recurring service arrangement or a custom-scoped project.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-deep-dark py-24 px-4 sm:px-8">
      <SectionHeader
        H1={<>Frequently Asked Questions</>}
        H2={
          <>
            Website Development <br /> <span>A</span>nswered
          </>
        }
        color="light"
      />

      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen
                  ? 'border-royal-beige/45 bg-dark-brown/65 shadow-token-card'
                  : 'border-royal-beige/20 bg-dark-brown/20 hover:bg-dark-brown/40 hover:border-royal-beige/35'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-light-beige font-medium text-lg md:text-xl pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="shrink-0 w-8 h-8 rounded-full bg-royal-beige/20 border border-royal-beige/30 flex items-center justify-center text-light-beige"
                >
                  <ChevronDown size={16} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-6 text-royal-beige text-sm md:text-base leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQ;
