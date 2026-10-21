import React from 'react';
import { motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';

const AuditCTA = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-20 bg-deep-dark relative overflow-hidden flex items-center justify-center min-h-[50vh]">
      
      {/* Intense center backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-br from-royal-beige/5 to-dark-brown/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1000px] w-full mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Main Editorial Header */}
        <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter leading-[0.95] mb-8 text-light-beige">
          Your brand doesn’t <br />
          need more content. <br />
          It needs <span className="font-serif italic text-transparent bg-clip-text accent-gradient font-normal tracking-normal lowercase">better creative direction.</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-sm md:text-base lg:text-lg text-light-beige/75 font-light leading-relaxed max-w-xl mb-12">
          Tulsip Media helps brands create content that actually performs.
        </p>
        
        {/* Action Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <a 
            href="#audit-form" 
            className="btn relative h-14 w-full sm:w-56 overflow-hidden rounded-full bg-royal-beige glow-cta text-sm font-bold text-deep-dark uppercase tracking-widest flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            <span className="btn-text-one center text-deep-dark gap-2">
              <SendHorizontal size={14} fill="#1E1110" /> Start Your Audit
            </span>
            <span className="btn-text-two center text-deep-dark gap-2">
              <SendHorizontal size={14} fill="#1E1110" /> Start Your Audit
            </span>
          </a>
        </motion.div>

      </div>

    </section>
  );
};

export default AuditCTA;
