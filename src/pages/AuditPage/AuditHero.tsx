import React from 'react';
import { motion } from 'framer-motion';
import { Check, SendHorizontal, FileText, TrendingUp, Sparkles, Percent, ShieldCheck } from 'lucide-react';

const AuditHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const listItems = [
    "Website UX & Conversion Review",
    "On-Page & Technical SEO Check",
    "Content & Messaging Hierarchy",
    "Branding Consistency Review",
    "Competitor Positioning Breakdown",
    "Prioritised Action Roadmap"
  ];

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center py-12 md:py-20 lg:py-24 px-6 md:px-12 lg:px-20 bg-deep-dark border-b border-royal-beige/15">
      
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-7 flex flex-col items-start text-left z-10"
        >
          <motion.span 
            variants={itemVariants}
            className="text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-royal-beige mb-4 flex items-center gap-2"
          >
            <Sparkles size={14} className="animate-pulse" /> WEBSITE, SEO &amp; BRAND AUDIT
          </motion.span>
          
          <motion.h1 
            variants={itemVariants}
            className="font-zentry text-[40px] sm:text-[56px] md:text-[68px] lg:text-[72px] font-black uppercase leading-[0.9] tracking-tighter mb-6 text-light-beige"
          >
            Fix What’s Holding <br />
            Your Website <span className="font-serif italic text-transparent bg-clip-text accent-gradient font-normal tracking-normal lowercase">back.</span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-sm md:text-base lg:text-lg text-light-beige/75 font-light leading-relaxed max-w-xl mb-8"
          >
            We manually review your website structure, page speed, on-page SEO, brand messaging, and content funnels to identify practical improvements that help turn visitors into enquiries.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 mb-10 w-full"
          >
            {listItems.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="flex items-center gap-3 text-xs md:text-sm font-medium text-light-beige/90"
              >
                <div className="w-5 h-5 rounded-full bg-royal-beige/15 border border-royal-beige/30 flex items-center justify-center text-royal-beige shrink-0">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span>{item}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <a 
              href="#audit-form"
              className="btn relative h-14 w-full sm:w-56 overflow-hidden rounded-full bg-royal-beige glow-cta text-sm font-bold text-deep-dark uppercase tracking-wider flex items-center justify-center transition-transform hover:scale-105 duration-300"
            >
              <span className="btn-text-one center text-deep-dark gap-2">
                <SendHorizontal size={14} fill="#1E1110" /> Request Audit
              </span>
              <span className="btn-text-two center text-deep-dark gap-2" aria-hidden="true">
                <SendHorizontal size={14} fill="#1E1110" /> Request Audit
              </span>
            </a>
            
            <a 
              href="/case-studies" 
              className="btn relative h-14 w-full sm:w-56 overflow-hidden rounded-full bg-dark-brown/35 border border-royal-beige/20 hover:border-royal-beige/30 text-sm font-bold text-light-beige uppercase tracking-wider flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              <span className="btn-text-one center text-light-beige gap-2">
                <FileText size={14} /> View Case Studies
              </span>
              <span className="btn-text-two center text-light-beige gap-2" aria-hidden="true">
                <FileText size={14} /> View Case Studies
              </span>
            </a>
          </motion.div>

        </motion.div>

        {/* Right Video & Floating Inspection Pillars Side */}
        <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[500px] lg:h-[620px] z-10 flex items-center justify-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full rounded-[32px] overflow-hidden border border-royal-beige/20 shadow-[0_20px_50px_rgba(189, 160, 126,0.05)] relative"
          >
            <video 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover pointer-events-none"
              aria-label="TulSip Media website and creative audit preview"
            />
          </motion.div>

          {/* Card 1 */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0 }}
            className="absolute top-[8%] left-[-4%] sm:left-[-10%] bg-deep-dark/80 backdrop-blur-md border border-royal-beige/25 p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-lg pointer-events-none max-w-[180px] sm:max-w-[210px]"
          >
            <div className="w-8 h-8 rounded-xl bg-royal-beige/20 border border-royal-beige/30 flex items-center justify-center text-royal-beige">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-royal-beige/70 tracking-wider font-semibold">Pillar 01</p>
              <p className="text-xs sm:text-sm font-bold text-light-beige leading-none mt-1">Website UX &amp; Clarity</p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-[35%] right-[-4%] sm:right-[-10%] bg-deep-dark/80 backdrop-blur-md border border-royal-beige/25 p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-lg pointer-events-none max-w-[180px] sm:max-w-[210px]"
          >
            <div className="w-8 h-8 rounded-xl bg-royal-beige/20 border border-royal-beige/30 flex items-center justify-center text-royal-beige">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-royal-beige/70 tracking-wider font-semibold">Pillar 02</p>
              <p className="text-xs sm:text-sm font-bold text-light-beige leading-none mt-1">Technical SEO Check</p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[28%] left-[-4%] sm:left-[-10%] bg-deep-dark/80 backdrop-blur-md border border-royal-beige/25 p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-lg pointer-events-none max-w-[180px] sm:max-w-[210px]"
          >
            <div className="w-8 h-8 rounded-xl bg-royal-beige/20 border border-royal-beige/30 flex items-center justify-center text-royal-beige">
              <Percent size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-royal-beige/70 tracking-wider font-semibold">Pillar 03</p>
              <p className="text-xs sm:text-sm font-bold text-light-beige leading-none mt-1">Content &amp; Hooks</p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-[8%] right-[-4%] sm:right-[-10%] bg-deep-dark/80 backdrop-blur-md border border-royal-beige/25 p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-lg pointer-events-none max-w-[180px] sm:max-w-[210px]"
          >
            <div className="w-8 h-8 rounded-xl bg-royal-beige/20 border border-royal-beige/30 flex items-center justify-center text-royal-beige">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-royal-beige/70 tracking-wider font-semibold">Pillar 04</p>
              <p className="text-xs sm:text-sm font-bold text-light-beige leading-none mt-1">Conversion Path</p>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default AuditHero;
