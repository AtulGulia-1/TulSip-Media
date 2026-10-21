import React from 'react';
import { motion } from 'framer-motion';
import { Target, Video, Scissors, Share2 } from 'lucide-react';

const systems = [
  {
    id: 1,
    title: "Strategy",
    description: "SEO-driven planning and audience-focused storytelling.",
    icon: Target,
  },
  {
    id: 2,
    title: "Production",
    description: "Cinematic shoots optimized for social-first engagement.",
    icon: Video,
  },
  {
    id: 3,
    title: "Editing",
    description: "High-retention reels, motion graphics, and viral hooks.",
    icon: Scissors,
  },
  {
    id: 4,
    title: "Distribution",
    description: "Publishing systems designed for reach, retention, and conversion.",
    icon: Share2,
  }
];

const ContentSystems = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-surface text-text-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-royal-beige/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-social-display tracking-tight mb-6">
            Content That <span className="italic text-transparent bg-clip-text accent-gradient">Performs</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systems.map((sys, idx) => (
            <motion.div
              key={sys.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative group p-8 rounded-3xl bg-deep-dark/40 backdrop-blur-md border border-stroke hover:border-royal-beige/50 transition-all duration-500 overflow-hidden"
              style={{ boxShadow: 'inset 0 1px 1px rgba(241, 234, 218,0.05)' }}
            >
              {/* Hover Glow */}
              <div className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(189, 160, 126, 0.1) 0%, transparent 70%)' }} />

              <div className="w-14 h-14 rounded-full bg-dark-brown/35 border border-royal-beige/20 flex items-center justify-center mb-8 text-royal-beige group-hover:scale-110 transition-transform duration-500">
                <sys.icon size={24} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-social-display mb-4 text-light-beige">
                {sys.title}
              </h3>
              
              <p className="text-muted text-sm leading-relaxed font-social-body">
                {sys.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSystems;
