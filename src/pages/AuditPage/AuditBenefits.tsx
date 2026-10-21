import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Compass, Timer, MousePointer, Palette, TrendingDown } from 'lucide-react';

const benefitsData = [
  {
    icon: Flame,
    title: "Weak Hooks",
    explanation: "Discover if your video hooks are failing to capture audience attention in the first 3 seconds and how to fix them."
  },
  {
    icon: Compass,
    title: "Poor Brand Positioning",
    explanation: "Learn how to stand out from competitors and establish a unique, clear, and compelling local or global market position."
  },
  {
    icon: Timer,
    title: "Low Retention",
    explanation: "Understand where viewers drop off in your content funnel and how to optimize pacing to keep them watching longer."
  },
  {
    icon: MousePointer,
    title: "Bad CTA Structure",
    explanation: "Fix weak or confusing Calls to Action that are hurting your conversion rates and blocking qualified leads."
  },
  {
    icon: Palette,
    title: "Inconsistent Visual Identity",
    explanation: "Identify visual gaps in your fonts, colors, and asset styling that are weakening your brand recall and authority."
  },
  {
    icon: TrendingDown,
    title: "Underperforming Ads",
    explanation: "Pinpoint why your Meta or Google ads are not scaling and get direct creative guidelines to improve your ROAS."
  }
];

const AuditBenefits = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-deep-dark border-b border-royal-beige/15 relative overflow-hidden">
      
      {/* Background glow overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vh] rounded-full bg-royal-beige/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal-beige mb-2 block">
            THE DIAGNOSIS
          </span>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black uppercase text-light-beige tracking-tighter leading-none">
            What You’ll <span className="font-serif italic text-transparent bg-clip-text accent-gradient font-normal tracking-normal lowercase">discover.</span>
          </h2>
        </div>

        {/* Benefits Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {benefitsData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -8, borderColor: 'rgba(189, 160, 126, 0.3)' }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="group relative flex flex-col p-8 rounded-3xl bg-dark-brown/40 border border-royal-beige/15 backdrop-blur-md transition-all duration-300 shadow-xl overflow-hidden cursor-default"
              >
                {/* Glow Ring Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-royal-beige/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Icon wrapper */}
                <div className="w-12 h-12 rounded-2xl bg-dark-brown/35 border border-royal-beige/20 flex items-center justify-center text-royal-beige mb-6 group-hover:scale-110 group-hover:bg-royal-beige/10 group-hover:border-royal-beige/20 transition-all duration-500">
                  <IconComponent size={22} className="group-hover:rotate-6 transition-transform duration-300" />
                </div>
                
                {/* Title */}
                <h3 className="font-zentry text-lg sm:text-xl font-bold uppercase text-light-beige tracking-tight mb-3">
                  {item.title}
                </h3>
                
                {/* Explanation */}
                <p className="text-xs sm:text-sm text-light-beige/65 font-light leading-relaxed">
                  {item.explanation}
                </p>

                {/* Bottom line accent */}
                <div className="absolute bottom-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-light-beige/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </motion.div>

      </div>

    </section>
  );
};

export default AuditBenefits;
