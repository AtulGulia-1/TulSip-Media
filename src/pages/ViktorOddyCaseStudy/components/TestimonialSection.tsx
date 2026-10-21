import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TestimonialSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-35, 35]);

  return (
    <section id="why-this-matters" ref={containerRef} className="py-20 md:py-24 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: prefersReducedMotion ? 0 : 0.8 }}
        className="flex flex-col items-center"
      >
        <Quote className="w-8 h-8 text-cta mb-4 opacity-80" />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-3">
          06. Why This Matters
        </p>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: prefersReducedMotion ? 0 : 0.8 }}
        className="font-zentry text-[30px] sm:text-[36px] md:text-[44px] lg:text-[52px] leading-[1.1] text-light-beige tracking-tight mb-8"
      >
        Local expertise should not mean <span className="font-serif italic text-royal-beige">limited digital visibility.</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: prefersReducedMotion ? 0 : 0.8 }}
        className="flex flex-col gap-5 text-sm md:text-base lg:text-lg text-light-beige/85 font-general max-w-2xl leading-relaxed"
      >
        <p>
          A neighbourhood café, clinic, educational institution, furniture showroom or independent service provider can have genuine expertise and a strong reputation without having a digital presence that communicates either effectively.
        </p>
        <p>
          The opportunity is to close the gap between the quality a business delivers and the quality its online presence communicates.
        </p>
        <p>
          At TulSip Media, we believe local businesses should have access to thoughtful digital experiences—not merely generic templates or websites that look finished but fail to answer customers&apos; questions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: prefersReducedMotion ? 0 : 0.8 }}
        className="mt-10 p-6 md:p-8 rounded-3xl bg-dark-brown/50 border border-royal-beige/30 max-w-2xl"
      >
        <p className="font-zentry text-2xl md:text-3xl text-royal-beige tracking-wide mb-3">
          Local brands. Global Voices.
        </p>
        <p className="text-sm md:text-base text-light-beige/90 font-general leading-relaxed">
          Our ambition is to help local businesses present their value with the clarity, confidence and care that strong brands deserve.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: prefersReducedMotion ? 0 : 0.8 }}
        className="mt-14 w-full max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl relative border border-royal-beige/20"
      >
        <motion.img
          style={{ y }}
          src="/img/Social Media Marketing.jpg"
          alt="Creative brand storytelling and digital identity photography for local businesses"
          className="w-full h-auto object-cover scale-105"
          loading="lazy"
        />
      </motion.div>
    </section>
  );
};

export default TestimonialSection;
