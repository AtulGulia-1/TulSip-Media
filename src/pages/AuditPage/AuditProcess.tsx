import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileInput, BrainCircuit, Columns, Target } from 'lucide-react';

const steps = [
  {
    icon: FileInput,
    phase: "Phase 01",
    title: "Submit Brand Details",
    desc: "Provide your brand name, Instagram handle, website URL, and biggest growth challenges through our secure 1-minute form."
  },
  {
    icon: BrainCircuit,
    phase: "Phase 02",
    title: "Deep Creative Analysis",
    desc: "Our senior design directors and media buyers perform a manual audit of your content strategy, Reels hooks, visual identity, and paid ads."
  },
  {
    icon: Columns,
    phase: "Phase 03",
    title: "Strategy Breakdown",
    desc: "We build a premium visual PDF report reverse-engineering competitor tactics and mapping out all your hidden creative vulnerabilities."
  },
  {
    icon: Target,
    phase: "Phase 04",
    title: "Growth Recommendations",
    desc: "Receive exact blueprints for script structures, hook templates, performance creative grids, and landing page conversions to scale ROAS."
  }
];

const AuditProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-20 bg-deep-dark border-b border-royal-beige/15 relative overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 left-[20%] w-[50vw] h-[40vh] rounded-full bg-royal-beige/5 blur-[130px] mix-blend-screen" />
      </div>

      <div className="max-w-[1100px] w-full mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal-beige mb-2 block">
            THE METHODOLOGY
          </span>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black uppercase text-light-beige tracking-tighter leading-none">
            Audit Process <span className="font-serif italic text-transparent bg-clip-text accent-gradient font-normal tracking-normal lowercase">timeline.</span>
          </h2>
        </div>

        {/* Timeline body */}
        <div className="relative w-full flex flex-col items-center">
          
          {/* Main vertical connector line (bg/inactive) */}
          <div className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-dark-brown/35 -translate-x-1/2 z-0" />
          
          {/* Glowing animated scroll-progress timeline line */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-[30px] md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-royal-beige to-dark-brown -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(189, 160, 126,0.5)]"
          />

          {/* Timeline steps */}
          <div className="w-full flex flex-col gap-12 sm:gap-16 z-20">
            {steps.map((step, idx) => {
              const IconComponent = step.icon;
              const isEven = idx % 2 === 0;

              return (
                <div 
                  key={idx} 
                  className={`flex flex-col md:flex-row items-start w-full relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline circular node marker */}
                  <div className="absolute left-[30px] md:left-1/2 top-6 w-8 h-8 rounded-full bg-deep-dark border-2 border-royal-beige -translate-x-1/2 flex items-center justify-center z-30 shadow-[0_0_10px_rgba(189, 160, 126,0.3)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-royal-beige animate-pulse" />
                  </div>

                  {/* Left/Right Card Spacer */}
                  <div className="hidden md:block w-1/2" />

                  {/* Card Content block */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12"
                  >
                    <div className="group relative p-8 rounded-3xl bg-dark-brown/40 border border-royal-beige/15 backdrop-blur-md hover:border-royal-beige/20 transition-all duration-500 shadow-xl overflow-hidden cursor-default">
                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-royal-beige/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      {/* Header block */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] text-royal-beige uppercase">
                          {step.phase}
                        </span>
                        <div className="w-8 h-8 rounded-xl bg-dark-brown/35 border border-royal-beige/20 flex items-center justify-center text-royal-beige">
                          <IconComponent size={14} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="font-zentry text-lg sm:text-xl font-bold uppercase tracking-tight text-light-beige mb-2">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-light-beige/65 font-light leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
};

export default AuditProcess;
