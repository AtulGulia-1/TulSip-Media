import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, Play, Award, Globe, MessageSquare, Zap, Eye, BarChart2 } from 'lucide-react';

const accordionData = [
  {
    icon: Search,
    title: "Instagram Content",
    description: "We evaluate your visual grid aesthetic, overall design flow, design pillars, text readability, graphic consistency, and organic post alignments to ensure your profile feels elite."
  },
  {
    icon: Play,
    title: "Reels Strategy",
    description: "We analyze your hook structures, sound designs, editing pacing, visual hooks, caption copy, subtitles, and performance metrics to maximize organic algorithmic reach."
  },
  {
    icon: Award,
    title: "Paid Ad Creatives",
    description: "We dissect your high-spend Meta and Google ads. We analyze hook ratios, hold rates, UGC quality, static banner performances, and ad formats to reduce your customer acquisition cost."
  },
  {
    icon: Globe,
    title: "Website Conversion",
    description: "We inspect your mobile landing page load speed, checkout flows, layout constraints, copy hierarchy, CTA styling, and customer friction points to increase direct sales."
  },
  {
    icon: MessageSquare,
    title: "Brand Messaging",
    description: "We review your brand's voice, copy clarity, core values, uniqueness of offer, benefits-first structures, and overall storytelling tone across all channels."
  },
  {
    icon: Zap,
    title: "Thumbnail Psychology",
    description: "We evaluate visual curiosity loops, contrast scales, color psychology, and text visibility on mobile feeds to boost your Click-Through Rate (CTR)."
  },
  {
    icon: Eye,
    title: "Audience Attention Patterns",
    description: "We study drop-off patterns, pacing shifts, visual resets, and scroll velocity metrics to keep users fully locked into your content for longer durations."
  },
  {
    icon: BarChart2,
    title: "Competitor Creative Analysis",
    description: "We reverse-engineer your competitors' highest-converting ads, hook designs, offers, and visual strategies to find creative gaps you can dominate."
  }
];

const AuditAnalyze = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  };

  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-deep-dark border-b border-royal-beige/15 relative overflow-hidden">
      
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left: Sticky Heading */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal-beige mb-2 block">
            OUR FOCUS AREAS
          </span>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase text-light-beige tracking-tighter leading-[0.9] mb-6">
            We Audit Every <br /> Creative <span className="font-serif italic text-transparent bg-clip-text accent-gradient font-normal tracking-normal lowercase">layer.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-light-beige/65 font-light leading-relaxed max-w-sm">
            We dive deep into the algorithms, data metrics, and psychological layers that dictate whether a user scrolls past or buys from your brand.
          </p>
        </div>

        {/* Right: Custom Accordions */}
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
          {accordionData.map((item, idx) => {
            const isActive = activeIndex === idx;
            const IconComponent = item.icon;
            
            return (
              <div 
                key={idx}
                className={`rounded-[24px] border transition-all duration-500 overflow-hidden ${
                  isActive 
                    ? 'border-royal-beige/30 bg-dark-brown/60 shadow-[0_10px_30px_rgba(189, 160, 126,0.02)]' 
                    : 'border-royal-beige/15 bg-dark-brown/10 hover:border-royal-beige/20'
                }`}
              >
                {/* Header/Toggle Button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-8 text-left transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    {/* Icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${
                      isActive 
                        ? 'bg-royal-beige/10 border-royal-beige/30 text-royal-beige' 
                        : 'bg-dark-brown/35 border-royal-beige/20 text-royal-beige/70'
                    }`}>
                      <IconComponent size={18} />
                    </div>
                    {/* Title */}
                    <span className={`font-zentry text-base sm:text-lg font-bold uppercase tracking-tight transition-colors duration-300 ${
                      isActive ? 'text-light-beige' : 'text-light-beige/85'
                    }`}>
                      {item.title}
                    </span>
                  </div>

                  {/* Toggle icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    isActive 
                      ? 'border-royal-beige/30 text-royal-beige' 
                      : 'border-royal-beige/20 text-royal-beige/60'
                  }`}>
                    {isActive ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {/* Content Expand */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: { height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.3 } } 
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: { height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.2 } } 
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 pl-16 sm:pl-20">
                        {/* Custom animated/fade content */}
                        <motion.p 
                          initial={{ filter: "blur(4px)", y: 10 }}
                          animate={{ filter: "blur(0px)", y: 0 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className="text-xs sm:text-sm text-light-beige/75 font-light leading-relaxed max-w-2xl"
                        >
                          {item.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default AuditAnalyze;
