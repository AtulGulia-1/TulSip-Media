import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.8, ease: "easeOut" as const }
  })
};

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 pt-28 md:pt-36 pb-16 text-light-beige">
      <motion.p
        variants={fadeUpVariants}
        custom={1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-mono text-xs md:text-sm text-royal-beige mb-4 uppercase tracking-[0.22em]"
      >
        FIELD NOTES · LOCAL MARKET RESEARCH
      </motion.p>

      <motion.div
        variants={fadeUpVariants}
        custom={1.5}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-wrap items-center justify-center gap-2 mb-6 text-[11px] md:text-xs text-light-beige/80 font-general"
      >
        <span className="px-3 py-1 rounded-full bg-dark-brown/60 border border-royal-beige/25 text-royal-beige font-semibold">
          The Local Business Digital Gap
        </span>
        <span className="px-3 py-1 rounded-full bg-dark-brown/40 border border-royal-beige/20">
          Market Research · Digital Strategy · Local Business Growth
        </span>
        <span className="px-3 py-1 rounded-full bg-dark-brown/40 border border-royal-beige/20">
          Delhi NCR &amp; Broader Local Markets
        </span>
      </motion.div>

      <motion.h1
        variants={fadeUpVariants}
        custom={2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-zentry text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] leading-[1.05] text-light-beige tracking-tight max-w-3xl"
      >
        Great Local Businesses Deserve to Be <span className="text-royal-beige">Discovered.</span>
      </motion.h1>

      <motion.div
        variants={fadeUpVariants}
        custom={3}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col gap-5 text-sm md:text-base lg:text-lg text-light-beige/85 leading-relaxed mt-6 md:mt-8 font-general max-w-2xl"
      >
        <p>
          A business can have excellent products, loyal customers and years of experience—and still remain difficult to discover online.
        </p>
        <p>
          Through founder-led observations of the local business market, TulSip Media identified a recurring disconnect: businesses work hard to build their offline presence, but their digital identity often fails to reflect the quality of what they offer.
        </p>
        <div className="my-2 p-6 rounded-2xl bg-dark-brown/45 border border-royal-beige/30 text-left md:text-center">
          <p className="text-xs uppercase tracking-widest text-royal-beige font-mono mb-2">
            Our question was simple:
          </p>
          <p className="text-base md:text-xl font-semibold text-light-beige leading-snug">
            What happens when a great local business is invisible to the customers searching for it?
          </p>
        </div>
        <p>
          This research explores that gap and why a purposeful website, supported by a strong digital presence, can become an important part of a business&apos;s growth strategy.
        </p>
      </motion.div>

      <motion.div
        variants={fadeUpVariants}
        custom={4}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-10 w-full sm:w-auto"
      >
        <a
          href="#strategic-response"
          className="w-full sm:w-auto text-center bg-royal-beige glow-cta text-deep-dark rounded-full px-8 py-3.5 font-semibold text-sm transition-all hover:scale-105"
        >
          Explore Our Approach
        </a>
        <Link
          to="/contact"
          className="w-full sm:w-auto text-center bg-dark-brown/55 border border-royal-beige/35 text-light-beige rounded-full px-8 py-3.5 font-semibold text-sm transition-all hover:bg-royal-beige/20"
        >
          Discuss Your Business
        </Link>
      </motion.div>
    </section>
  );
};

export default HeroSection;
