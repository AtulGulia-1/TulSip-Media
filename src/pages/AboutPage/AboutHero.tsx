import React from 'react';
import { motion } from 'framer-motion';

const AboutHero = () => {
  const headingText = "Local Brands.\nGlobal Voices.";
  const lines = headingText.split('\n');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <section className="relative h-screen min-h-[600px] flex flex-col justify-between px-6 md:px-10 lg:px-16 pt-6 pb-10 overflow-hidden bg-deep-dark">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-royal-beige/10 via-deep-dark to-deep-dark" />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center text-center mt-auto mb-auto">
        <p className="text-xs md:text-sm font-mono uppercase tracking-[0.25em] text-royal-beige mb-4">
          About TulSip Media
        </p>
        <motion.h1
          className="hero-heading font-black uppercase tracking-tight leading-[0.88] text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[8vw] mb-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden pb-4">
              {line.split('').map((char, charIndex) => (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-light-beige font-light leading-relaxed max-w-2xl text-base md:text-xl"
        >
          TulSip Media is a website development and digital experience studio building custom business websites, e-commerce storefronts, landing pages, and web applications that help ambitious businesses communicate clearly and grow online.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutHero;
