import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const reels = [
  { id: 1, title: "Architectural Showcase", category: "Property Walkthrough", stats: "Concept • Scripting & Pacing", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "Clinical Skincare", category: "Educational Story", stats: "Concept • Ingredient Breakdown", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "Athletic Brand Launch", category: "Campaign Creative", stats: "Concept • Hook & Motion Edit", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "Culinary Experience", category: "Hospitality Reel", stats: "Concept • Visual Direction", image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "Product Founder Story", category: "Brand Narrative", stats: "Concept • Editorial Cut", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop" },
];

const ReelsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <section className="py-24 md:py-32 bg-bg overflow-hidden relative" ref={containerRef}>
      
      <div className="px-6 md:px-12 mb-16 max-w-[1400px] mx-auto">
        <h2 className="text-4xl md:text-6xl font-social-display text-text-primary tracking-tight">
          Short-Form <span className="italic accent-gradient text-transparent bg-clip-text">Reel Concepts</span>
        </h2>
      </div>

      <div className="flex pl-6 md:pl-12" ref={scrollRef}>
        <motion.div 
          className="flex gap-6 md:gap-10"
          style={{ x }}
        >
          {reels.map((reel) => (
            <div 
              key={reel.id} 
              className="relative w-[280px] md:w-[360px] aspect-[9/16] flex-shrink-0 rounded-[32px] overflow-hidden group border border-stroke bg-surface cursor-pointer"
            >
              <img 
                src={reel.image} 
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-deep-dark/80 via-deep-dark/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 border-[3px] border-transparent group-hover:border-royal-beige/40 rounded-[32px] transition-colors duration-500 pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="px-3 py-1 bg-royal-beige/25 backdrop-blur-md rounded-full text-[10px] text-light-beige uppercase tracking-wider w-fit mb-3">
                  {reel.category}
                </span>
                <h3 className="text-2xl font-social-display text-light-beige mb-2">{reel.title}</h3>
                
                <div className="flex items-center gap-2 text-accent/80 text-xs font-social-body">
                  <div className="w-2 h-2 rounded-full bg-royal-beige animate-pulse" />
                  {reel.stats}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};

export default ReelsShowcase;
