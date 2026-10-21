import React from 'react';
import { ArrowRight } from 'lucide-react';

const AboutCTA = () => {
  return (
    <section className="py-40 px-6 md:px-10 lg:px-20 bg-deep-dark relative overflow-hidden flex items-center justify-center min-h-[80vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-dark-brown/35 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col items-center text-center">
        <h2 className="hero-heading font-black uppercase text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-[0.85] mb-10">
          Ready To Build<br />Your Website?
        </h2>
        
        <p className="font-general text-xl md:text-2xl text-light-beige font-light mb-16 max-w-2xl">
          Tell us about your business goals, required pages, and timeline. Let’s build a digital experience your customers trust.
        </p>
        
        <a 
          href="/contact" 
          className="group relative inline-flex items-center justify-center gap-4 bg-transparent border border-royal-beige/30 text-light-beige px-10 py-5 rounded-full font-inter text-sm md:text-base uppercase tracking-widest font-semibold overflow-hidden transition-all duration-500 hover:bg-light-beige hover:text-deep-dark hover:border-royal-beige"
        >
          <span className="relative z-10 transition-colors duration-500">Discuss Your Project</span>
          <ArrowRight className="relative z-10 transition-all duration-500 group-hover:translate-x-2" strokeWidth={2} size={18} />
        </a>
      </div>
    </section>
  );
};

export default AboutCTA;
