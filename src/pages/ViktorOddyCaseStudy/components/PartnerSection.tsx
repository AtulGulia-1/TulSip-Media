import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GIFS = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif"
];

interface MouseTrailItem {
  id: number;
  x: number;
  y: number;
  gif: string;
  rotation: number;
}

const PartnerSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<MouseTrailItem[]>([]);
  const lastSpawnTime = useRef(0);
  const trailIdCounter = useRef(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
    <section className="w-full py-24 px-6 relative z-10">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="max-w-7xl mx-auto bg-light-beige rounded-[40px] shadow-2xl py-48 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden cursor-crosshair border border-royal-beige/30"
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

        <div className="relative z-10 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-serif text-[48px] md:text-[64px] lg:text-[80px] text-deep-dark mb-12"
          >
            Partner with us
          </motion.h2>
          
          <motion.a 
            href="/contact"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pointer-events-auto inline-flex items-center gap-3 bg-deep-dark text-light-beige rounded-full pl-2 pr-8 py-2 font-general shadow-[0_4px_30px_rgba(30, 17, 16,0.15)] hover:scale-105 transition-transform mx-auto"
          >
            <img 
              src="/Logo.png" 
              alt="" 
              className="w-10 h-10 rounded-full object-cover border border-royal-beige/30"
            />
            <span className="font-semibold text-sm">Discuss your project with TulSip Media</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
