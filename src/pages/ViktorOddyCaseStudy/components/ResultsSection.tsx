import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const GIFS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif"
];

const GUIDING_QUESTIONS = [
  "Can potential customers discover this business through relevant searches?",
  "Does its online presence communicate what makes it valuable?",
  "Can visitors quickly find accurate services, location and contact information?",
  "Does the website work well on mobile devices?",
  "Is the next customer action easy to understand?",
  "Can the business learn from measurable website activity?"
];

interface MouseTrailItem {
  id: number;
  x: number;
  y: number;
  gif: string;
  rotation: number;
}

const ResultsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<MouseTrailItem[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const lastSpawnTime = useRef(0);
  const trailIdCounter = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return;
    const now = Date.now();
    if (now - lastSpawnTime.current < 80) return;
    lastSpawnTime.current = now;

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newTrail: MouseTrailItem = {
      id: trailIdCounter.current++,
      x,
      y,
      gif: GIFS[Math.floor(Math.random() * GIFS.length)],
      rotation: Math.random() * 20 - 10
    };

    setTrails(prev => [...prev, newTrail]);

    setTimeout(() => {
      setTrails(prev => prev.filter(t => t.id !== newTrail.id));
    }, 1000);
  };

  return (
    <section id="outcome" className="w-full py-24 px-6 relative z-10">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="max-w-7xl mx-auto bg-light-beige rounded-[40px] shadow-2xl py-20 md:py-24 px-6 md:px-16 flex flex-col items-center justify-center relative overflow-hidden cursor-crosshair border border-royal-beige/30"
      >
        <AnimatePresence>
          {trails.map(trail => (
            <motion.div
              key={trail.id}
              initial={{ opacity: 1, scale: 0.8, x: trail.x - 75, y: trail.y - 75, rotate: trail.rotation }}
              animate={{ opacity: 0, scale: 0.5, x: trail.x - 75, y: trail.y - 75, rotate: trail.rotation }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-[150px] h-[100px] pointer-events-none rounded-xl overflow-hidden shadow-xl z-0"
            >
              <img src={trail.gif} className="w-full h-full object-cover" alt="" />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 07. The Outcome of the Research */}
        <div className="relative z-10 pointer-events-none text-left w-full max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark-brown/80 mb-3">
              07. The Outcome of the Research
            </p>
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-serif text-[34px] md:text-[48px] lg:text-[60px] leading-[1.1] text-deep-dark mb-6"
            >
              A clearer framework for solving the right problem.
            </motion.h2>
            <p className="text-deep-dark/85 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              This market research shaped our perspective on how websites should be approached for local businesses.
            </p>
            <p className="text-deep-dark/80 text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
              Rather than assuming every business needs the same solution, we identified a set of questions to guide future projects:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-deep-dark font-general mb-8">
            {GUIDING_QUESTIONS.map((question, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="p-5 rounded-2xl bg-deep-dark/5 border border-dark-brown/15 flex items-start gap-3"
              >
                <span className="font-mono text-xs font-bold text-dark-brown mt-1">0{idx + 1}</span>
                <p className="text-sm md:text-base font-medium text-deep-dark leading-relaxed">
                  {question}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm md:text-base text-deep-dark/85 font-medium mb-8">
            These questions form a practical starting point for website strategy, design and ongoing optimization.
          </p>

          {/* Explicit Evidence Note */}
          <div className="p-6 rounded-2xl bg-deep-dark text-light-beige border border-royal-beige/30 mb-16">
            <p className="text-xs md:text-sm leading-relaxed">
              <strong className="text-royal-beige">Evidence note:</strong> This is a qualitative, founder-led market research case study. It does not claim a representative survey sample, completed client implementation, measured conversion lift or quantified financial return. Quantitative findings can be added when verified research records and measurement data are available.
            </p>
          </div>

          {/* 08. Closing Section */}
          <div className="pt-12 border-t border-dark-brown/20 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark-brown/80 mb-3">
              08. Closing Section
            </p>
            <h2 className="font-serif text-[32px] md:text-[46px] lg:text-[56px] leading-[1.1] text-deep-dark mb-6">
              Your Business Has a Story. Make It Easier to Find.
            </h2>
            <p className="text-deep-dark/85 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed mb-4">
              Your customers should not have to work hard to understand what you do, why it matters or how to reach you.
            </p>
            <p className="text-deep-dark/85 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
              TulSip Media helps businesses develop purposeful digital experiences that bring their brand, services and customer journey together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto mb-8">
              <Link 
                to="/contact"
                className="w-full sm:w-auto bg-deep-dark text-light-beige rounded-full px-8 py-3.5 font-semibold text-sm shadow-[0_4px_30px_rgba(30, 17, 16,0.15)] hover:scale-105 transition-transform"
              >
                Discuss Your Project
              </Link>
              <Link 
                to="/#features"
                className="w-full sm:w-auto bg-transparent border border-deep-dark/35 text-deep-dark rounded-full px-8 py-3.5 font-semibold text-sm hover:bg-deep-dark/10 transition-colors"
              >
                Explore Our Services
              </Link>
            </div>

            <p className="font-mono text-xs md:text-sm font-semibold text-dark-brown uppercase tracking-widest">
              TulSip Media — Local brands. Global Voices.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
