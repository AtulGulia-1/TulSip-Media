import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = ["Brand Reels", "Social Campaigns", "Content Systems", "Carousel Stories", "Visual Identity"];

const SocialHero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-bg">
      {/* Background Video — launching_soon.mp4 */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/launching_soon.mp4"
          poster="/img/posters/launching_soon.webp"
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          aria-label="TulSip Media Social Media Services — Launching Soon"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-deep-dark/55 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-deep-dark/40 z-10" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-5xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="px-5 py-2 rounded-full border border-royal-beige/45 bg-deep-dark/80 backdrop-blur-md mb-6 shadow-lg"
        >
          <span className="text-xs md:text-sm uppercase tracking-[0.22em] text-royal-beige font-social-body font-semibold">
            Social Media Services — Coming Soon
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-social-display font-normal text-text-primary leading-[0.95] tracking-tight mb-6"
        >
          Social Content Systems<br/>
          Built Around Your<br/>
          Digital Identity
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-lg md:text-2xl text-accent font-social-body font-light mb-6 flex items-center justify-center gap-2 h-10"
        >
          Preparing
          <span className="relative inline-flex items-center min-w-[155px] md:min-w-[200px] h-full overflow-hidden text-left font-semibold">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute text-royal-beige"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
          for growing brands.
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-sm md:text-base text-muted max-w-xl leading-relaxed font-social-body mb-10"
        >
          Our dedicated social media production and brand content vertical is launching soon. Below is a preview of our creative direction—or you can explore our active website development services and register an early enquiry today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="/contact" className="px-8 py-4 rounded-full bg-light-beige text-deep-dark font-semibold font-social-body text-sm hover:scale-105 transition-all duration-300 hover:bg-deep-dark hover:text-light-beige border border-transparent hover:border-royal-beige relative group overflow-hidden">
            <span className="relative z-10">Register Early Enquiry</span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 accent-gradient z-0 blur-sm transition-opacity" />
          </a>
          <a href="/" className="px-8 py-4 rounded-full bg-dark-brown/45 backdrop-blur-md border border-royal-beige/30 text-light-beige font-semibold font-social-body text-sm hover:bg-dark-brown/70 transition-all duration-300">
            Explore Website Development
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
      >
        <span className="text-[10px] uppercase tracking-widest text-muted font-social-body">Preview Concept Direction</span>
        <div className="w-[1px] h-12 bg-stroke overflow-hidden relative">
          <div className="w-full h-full bg-light-beige origin-top" style={{ animation: 'scroll-down 2s infinite ease-in-out' }} />
        </div>
      </motion.div>
    </section>
  );
};

export default SocialHero;
