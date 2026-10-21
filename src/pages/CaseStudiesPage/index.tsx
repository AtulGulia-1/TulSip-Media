import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  RotateCw, 
  Sparkles, 
  ChevronUp, 
  ChevronDown, 
  Layers
} from 'lucide-react';
import PageMeta from '../../components/PageMeta';
import { trackAnalyticsEvent } from '../../components/AnalyticsManager';
import { CASE_STUDIES } from '../../data/caseStudiesData';

const CATEGORIES = [
  "All",
  "Market Research · Digital Strategy",
  "D2C Brands",
  "Education Sector",
  "Building Materials & Retail"
];

const CaseStudiesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredStudies = selectedCategory === "All" 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.category === selectedCategory);

  useEffect(() => {
    if (activeIdx >= filteredStudies.length) {
      setActiveIdx(0);
    }
  }, [selectedCategory, filteredStudies.length, activeIdx]);

  const handleWheel = (e: React.WheelEvent) => {
    if (filteredStudies.length <= 1) return;
    if (e.deltaY > 0) {
      setActiveIdx((prev) => (prev + 1) % filteredStudies.length);
    } else if (e.deltaY < 0) {
      setActiveIdx((prev) => (prev - 1 + filteredStudies.length) % filteredStudies.length);
    }
  };

  const currentStudy = filteredStudies[activeIdx] || CASE_STUDIES[0];

  return (
    <div className="min-h-screen bg-deep-dark text-light-beige pt-24 pb-20 px-4 md:px-8 font-sans overflow-x-hidden">
      <PageMeta
        title="Selected Work & Case Studies | Website Development & Brand Systems | TulSip Media"
        description="Explore selected website development, e-commerce restructuring, technical SEO, and digital brand projects delivered by TulSip Media."
        canonicalPath="/case-studies"
      />
      
      {/* Header & Title */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-beige/10 border border-royal-beige/30 text-royal-beige text-xs font-semibold uppercase tracking-wider mb-4"
        >
          <Sparkles size={14} /> Selected Work &amp; Brand Explorations
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-light-beige mb-4">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-beige via-light-beige to-dark-brown">Work &amp; Case Studies</span>
        </h1>
        <p className="text-royal-beige text-sm md:text-base max-w-2xl mx-auto mb-8">
          Explore how TulSip Media approaches website architecture, e-commerce clarity, on-page SEO, and digital brand positioning across industries.
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                setActiveIdx(0);
              }}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-semibold tracking-wide transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-royal-beige text-deep-dark shadow-lg shadow-royal-beige/20'
                  : 'bg-dark-brown/35 border border-royal-beige/20 text-royal-beige hover:text-light-beige hover:border-royal-beige/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive 3D Scroll Wheel Showcase Container */}
      <div 
        ref={wheelContainerRef}
        onWheel={handleWheel}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-b from-dark-brown/35 to-transparent border border-royal-beige/20 rounded-3xl p-6 md:p-10 relative overflow-hidden"
      >
        
        {/* Left Side: Scroll Wheel Selector Dial */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center border-r border-royal-beige/20 pr-0 lg:pr-8 py-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-royal-beige mb-6">
            <RotateCw size={14} className="animate-spin-slow" /> Project Selector ({activeIdx + 1}/{filteredStudies.length})
          </div>

          <button 
            type="button"
            aria-label="Previous case study"
            onClick={() => setActiveIdx((prev) => (prev - 1 + filteredStudies.length) % filteredStudies.length)}
            className="w-10 h-10 rounded-full bg-dark-brown/55 hover:bg-royal-beige/25 text-light-beige flex items-center justify-center transition-all mb-4"
          >
            <ChevronUp size={20} />
          </button>

          {/* Wheel Selector Items */}
          <div className="space-y-4 w-full max-w-xs">
            {filteredStudies.map((study, idx) => {
              const isActive = idx === activeIdx;
              return (
                <motion.button
                  type="button"
                  key={study.id}
                  onClick={() => setActiveIdx(idx)}
                  whileHover={{ scale: 1.02 }}
                  className={`w-full text-left p-4 rounded-2xl cursor-pointer transition-all border ${
                    isActive 
                      ? 'bg-royal-beige text-deep-dark font-bold border-royal-beige shadow-xl shadow-royal-beige/20 scale-105' 
                      : 'bg-dark-brown/35 text-royal-beige border-royal-beige/20 hover:border-royal-beige/30 hover:text-light-beige'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-75">
                      {study.category}
                    </span>
                    <span className="text-xs font-mono font-bold">0{idx + 1}</span>
                  </div>
                  <h3 className="text-sm md:text-base font-bold mt-1 line-clamp-1">{study.brandName}</h3>
                </motion.button>
              );
            })}
          </div>

          <button 
            type="button"
            aria-label="Next case study"
            onClick={() => setActiveIdx((prev) => (prev + 1) % filteredStudies.length)}
            className="w-10 h-10 rounded-full bg-dark-brown/55 hover:bg-royal-beige/25 text-light-beige flex items-center justify-center transition-all mt-4"
          >
            <ChevronDown size={20} />
          </button>
          
          <p className="text-[11px] text-royal-beige mt-4 text-center">Use mouse wheel or select a project to inspect scope</p>
        </div>

        {/* Right Side: Active Case Study Card Showcase */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStudy.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Category & Brand Tag */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-royal-beige/20 text-royal-beige border border-royal-beige/30 uppercase tracking-wider">
                  {currentStudy.category}
                </span>
                <span className="text-xs text-royal-beige font-mono">Project Ref: #{currentStudy.id}</span>
              </div>

              {/* Brand Name & Tagline */}
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-light-beige mb-3">
                  {currentStudy.brandName}
                </h2>
                <p className="text-lg md:text-xl text-royal-beige font-medium leading-snug">
                  {currentStudy.tagline}
                </p>
              </div>

              {/* Special Founder Story if present */}
              {currentStudy.founderStory && (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-dark-brown/30 via-dark-brown/20 to-transparent border border-royal-beige/30">
                  <span className="text-xs uppercase font-bold text-royal-beige tracking-wider block mb-1">
                    Project Context &amp; Mission
                  </span>
                  <p className="text-xs md:text-sm text-light-beige/85 leading-relaxed">
                    {currentStudy.founderStory}
                  </p>
                </div>
              )}

              {/* Key Scope & Focus Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 bg-dark-brown/35 border border-royal-beige/20 rounded-2xl p-4 md:p-6 text-center">
                <div>
                  <span className="text-xl md:text-2xl font-extrabold text-royal-beige block">
                    {currentStudy.results.stat1}
                  </span>
                  <span className="text-[10px] md:text-xs text-light-beige/80 uppercase font-semibold mt-1 block">
                    {currentStudy.results.label1}
                  </span>
                </div>

                <div>
                  <span className="text-xl md:text-2xl font-extrabold text-royal-beige block">
                    {currentStudy.results.stat2}
                  </span>
                  <span className="text-[10px] md:text-xs text-light-beige/80 uppercase font-semibold mt-1 block">
                    {currentStudy.results.label2}
                  </span>
                </div>

                <div>
                  <span className="text-xl md:text-2xl font-extrabold text-royal-beige block">
                    {currentStudy.results.stat3}
                  </span>
                  <span className="text-[10px] md:text-xs text-light-beige/80 uppercase font-semibold mt-1 block">
                    {currentStudy.results.label3}
                  </span>
                </div>
              </div>

              {/* Challenge & Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
                <div className="p-4 rounded-xl bg-dark-brown/35 border border-royal-beige/20">
                  <h3 className="font-bold mb-1 uppercase text-xs text-royal-beige">The Brief &amp; Challenge</h3>
                  <p className="text-light-beige/85 leading-relaxed">{currentStudy.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-dark-brown/35 border border-royal-beige/20">
                  <h3 className="font-bold mb-1 uppercase text-xs text-royal-beige">Work Performed</h3>
                  <p className="text-light-beige/85 leading-relaxed">{currentStudy.strategy}</p>
                </div>
              </div>

              {/* Project Scope Summary & Action Links */}
              {currentStudy.projectScopeNote && (
                <div className="p-4 rounded-xl bg-royal-beige/5 border border-royal-beige/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Layers size={22} className="text-royal-beige shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs md:text-sm text-light-beige/90 mb-1">
                        <strong className="text-royal-beige">Deliverables:</strong> {currentStudy.projectScopeNote.summary}
                      </p>
                      <span className="text-[11px] font-semibold text-royal-beige uppercase">
                        {currentStudy.projectScopeNote.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3 shrink-0">
                    {currentStudy.detailUrl && (
                      <a
                        href={currentStudy.detailUrl}
                        onClick={() => trackAnalyticsEvent('portfolio_item_click', { item_slug: currentStudy.id })}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-royal-beige text-deep-dark text-xs font-bold uppercase tracking-wider hover:bg-light-beige transition-colors"
                      >
                        Read Full Breakdown <ArrowRight size={14} />
                      </a>
                    )}
                    <a
                      href="/contact"
                      onClick={() => trackAnalyticsEvent('project_cta_click', { cta_location: 'case_studies_page' })}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-royal-beige/35 text-light-beige text-xs font-semibold uppercase tracking-wider hover:bg-dark-brown/60 transition-colors"
                    >
                      Discuss Similar Project
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
};

export default CaseStudiesPage;
