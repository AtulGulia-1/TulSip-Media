import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from './components/WordsPullUpMultiStyle';

const AdsFeatures = () => {
  return (
    <section className="min-h-screen bg-deep-dark relative px-4 md:px-6 py-16 md:py-24">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Core Campaign & Landing Page Architecture Pillars */}
        <div className="mb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-royal-beige/10 via-[#462C28] to-[#462C28] border border-royal-beige/30 text-center"
          >
            <span className="text-2xl md:text-3xl font-black text-royal-beige tracking-tight block">
              Landing Pages
            </span>
            <span className="text-xs uppercase font-bold text-light-beige/85 tracking-wider mt-2 block">
              Conversion-First UX
            </span>
            <p className="text-[11px] text-royal-beige mt-1">Dedicated campaign pages built for speed &amp; clarity</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-royal-beige/10 via-[#462C28] to-[#462C28] border border-royal-beige/30 text-center relative overflow-hidden"
          >
            <span className="text-2xl md:text-3xl font-black text-royal-beige tracking-tight block">
              Search &amp; Social
            </span>
            <span className="text-xs uppercase font-bold text-light-beige/85 tracking-wider mt-2 block">
              Intent-Mapped Funnels
            </span>
            <p className="text-[11px] text-royal-beige mt-1">Meta &amp; Google campaign structure aligned to buyer stage</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-dark-brown/10 via-[#462C28] to-[#462C28] border border-royal-beige/30 text-center"
          >
            <span className="text-2xl md:text-3xl font-black text-royal-beige tracking-tight block">
              Creative Testing
            </span>
            <span className="text-xs uppercase font-bold text-light-beige/85 tracking-wider mt-2 block">
              Structured Variations
            </span>
            <p className="text-[11px] text-royal-beige mt-1">Iterative testing of hooks, formats, and offer angles</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-royal-beige/10 via-[#462C28] to-[#462C28] border border-royal-beige/30 text-center"
          >
            <span className="text-2xl md:text-3xl font-black text-royal-beige tracking-tight block">
              Attribution
            </span>
            <span className="text-xs uppercase font-bold text-light-beige/85 tracking-wider mt-2 block">
              Event &amp; Lead Tracking
            </span>
            <p className="text-[11px] text-royal-beige mt-1">Pixel, analytics, and enquiry tracking implementation</p>
          </motion.div>

        </div>

        {/* Header */}
        <div className="mb-12 md:mb-20 text-center flex flex-col items-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-light-beige max-w-4xl">
            <WordsPullUpMultiStyle segments={[{ text: "Structured ad and landing-page infrastructure for growing brands." }]} />
          </h2>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-royal-beige max-w-4xl mt-2">
            <WordsPullUpMultiStyle segments={[{ text: "Built around clear offers, clean UX, and measurable enquiries." }]} />
          </div>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden bg-dark-brown h-[400px] lg:h-full group"
          >
            <video
              src="/videos/strategy_planning.mp4"
              poster="/img/posters/strategy_planning.webp"
              preload="metadata"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Strategic campaign planning and conversion architecture at TulSip Media"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-deep-dark/20" />
            <div className="absolute bottom-6 left-6 text-light-beige text-lg font-medium">
              Your growth canvas.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-dark-brown p-6 sm:p-8 flex flex-col justify-between h-[400px] lg:h-full"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dark-brown/35 rounded flex items-center justify-center mb-6">
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85" alt="" className="w-6 h-6 object-contain" />
              </div>
              <h3 className="text-light-beige text-lg font-medium mb-6">Audience Architecture. <span className="text-royal-beige text-sm ml-1">01</span></h3>
              <ul className="space-y-3">
                {['Search & social intent mapping', 'Custom & lookalike segments', 'Stage-based retargeting flows', 'Competitor offer analysis'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-royal-beige text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="/contact" className="flex items-center gap-2 text-light-beige text-sm font-medium hover:text-royal-beige transition-colors group">
              Discuss strategy <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-dark-brown p-6 sm:p-8 flex flex-col justify-between h-[400px] lg:h-full"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dark-brown/35 rounded flex items-center justify-center mb-6">
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85" alt="" className="w-6 h-6 object-contain" />
              </div>
              <h3 className="text-light-beige text-lg font-medium mb-6">Creative Optimization. <span className="text-royal-beige text-sm ml-1">02</span></h3>
              <ul className="space-y-3">
                {['Structured hook & visual testing', 'Offer-aligned ad copywriting', 'Platform-native video & static sets'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-royal-beige text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="/contact" className="flex items-center gap-2 text-light-beige text-sm font-medium hover:text-royal-beige transition-colors group">
              Discuss creatives <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl bg-dark-brown p-6 sm:p-8 flex flex-col justify-between h-[400px] lg:h-full"
          >
            <div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dark-brown/35 rounded flex items-center justify-center mb-6">
                <img src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85" alt="" className="w-6 h-6 object-contain" />
              </div>
              <h3 className="text-light-beige text-lg font-medium mb-6">Landing Page Funnels. <span className="text-royal-beige text-sm ml-1">03</span></h3>
              <ul className="space-y-3">
                {['Fast custom landing pages', 'Clear enquiry & checkout flows', 'Conversion event & pixel setup'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-royal-beige text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <a href="/contact" className="flex items-center gap-2 text-light-beige text-sm font-medium hover:text-royal-beige transition-colors group">
              Build your funnel <ArrowRight className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AdsFeatures;
