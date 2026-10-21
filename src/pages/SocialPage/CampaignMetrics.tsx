import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "Strategy", label: "Audience & Content Planning" },
  { value: "Design", label: "Brand-Consistent Visual Systems" },
  { value: "Production", label: "Short-Form Video & Carousels" },
  { value: "Web Sync", label: "Connected to Landing Pages & Storefronts" }
];

const CampaignMetrics = () => {
  return (
    <section className="py-32 md:py-48 px-6 bg-bg text-text-primary relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal-beige/10 blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 text-center md:text-left">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-5xl md:text-7xl lg:text-[6.5rem] font-social-display italic leading-none text-transparent bg-clip-text accent-gradient" style={{ letterSpacing: '-0.02em' }}>
                {stat.value}
              </h3>
              <p className="text-muted text-sm md:text-lg uppercase tracking-[0.2em] font-social-body">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignMetrics;
