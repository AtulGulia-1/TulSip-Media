import React from 'react';
import { motion } from 'framer-motion';

const SocialFooter = () => {
  return (
    <footer className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-bg flex flex-col justify-end text-text-primary">
      {/* Background Video — launching_soon.mp4 */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/launching_soon.mp4"
          poster="/img/posters/launching_soon.webp"
          preload="none"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Social Media Services — Launching Soon"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-deep-dark/75 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg to-transparent z-10" />
      </div>

      <div className="relative z-20 w-full pb-12 md:pb-20 pt-32 px-6 flex flex-col items-center text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-royal-beige font-social-body mb-4">
          Social Media Services — Coming Soon
        </p>
        <h2 className="text-5xl md:text-7xl lg:text-[6.5rem] font-social-display italic leading-[0.92] tracking-tight mb-8">
          Need a Website First? <br />
          Let’s Talk Strategy
        </h2>
        <p className="max-w-lg text-sm md:text-base text-muted font-social-body mb-8">
          While our social media production vertical prepares to launch, our core website development, e-commerce, and digital strategy team is actively onboarding projects.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/contact"
            className="group relative px-8 py-4 rounded-full bg-light-beige text-deep-dark font-social-body font-semibold text-sm md:text-base tracking-wide hover:bg-royal-beige transition-all duration-300"
          >
            Request Launch Notification / Enquire
          </a>
          <a
            href="mailto:hello@tulsipmedia.com"
            className="group relative px-8 py-4 rounded-full bg-dark-brown/35 backdrop-blur-xl border border-royal-beige/30 hover:border-royal-beige/60 transition-all duration-500 overflow-hidden"
          >
            <span className="relative z-10 text-light-beige font-social-body font-semibold text-sm md:text-base tracking-wide">
              hello@tulsipmedia.com
            </span>
          </a>
        </div>

        {/* Status */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-royal-beige opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-royal-beige"></span>
          </div>
          <span className="text-xs md:text-sm font-social-body text-muted uppercase tracking-widest">
            Social Media Vertical Launching Soon • Web Development Active
          </span>
        </div>
      </div>

      {/* Marquee */}
      <div className="relative z-20 w-full py-8 border-t border-stroke/50 bg-deep-dark/40 backdrop-blur-md overflow-hidden flex">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-sm md:text-base font-social-body uppercase tracking-[0.3em] text-muted mx-8">
              SOCIAL MEDIA SERVICES COMING SOON • LOCAL BRANDS. GLOBAL VOICES. •
            </span>
          ))}
        </motion.div>
      </div>

      {/* Footer Links */}
      <div className="relative z-20 w-full py-6 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-stroke/50 bg-bg text-xs font-social-body text-muted uppercase tracking-widest">
        <p>© 2026 TulSip Media. All Rights Reserved.</p>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a href="https://x.com/TulSipMedia" target="_blank" rel="noopener noreferrer" className="hover:text-light-beige transition-colors">Twitter</a>
          <a href="https://github.com/AtulGulia-1" target="_blank" rel="noopener noreferrer" className="hover:text-light-beige transition-colors">GitHub</a>
          <a href="/case-studies" className="hover:text-light-beige transition-colors">Case Studies</a>
          <a href="/contact" className="hover:text-light-beige transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;
