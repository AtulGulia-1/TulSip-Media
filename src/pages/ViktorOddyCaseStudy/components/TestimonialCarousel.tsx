import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: "UI/UX & Brand Direction",
    role: "Deliverable Pillar",
    company: "TulSip Media",
    text: "Every storefront and product interface starts with clear hierarchy, deliberate typography, and responsive component systems built for real customer flows."
  },
  {
    name: "Frontend Engineering",
    role: "Technical Architecture",
    company: "TulSip Media",
    text: "Modern React, Next.js, TypeScript, and Tailwind CSS codebases engineered for predictable maintenance, fast page loads, and clean accessibility."
  },
  {
    name: "E-Commerce & Conversion",
    role: "Storefront Systems",
    company: "TulSip Media",
    text: "Friction-free product discovery, variant selection, and mobile checkout journeys designed to support direct-to-consumer and retail brands."
  },
  {
    name: "Technical SEO Foundations",
    role: "Search & Discovery",
    company: "TulSip Media",
    text: "Semantic heading hierarchy, route-level metadata, canonical tags, and valid Schema.org structured data integrated directly into the build."
  },
  {
    name: "Direct Founder Collaboration",
    role: "Execution Model",
    company: "TulSip Media",
    text: "Work directly with the design and engineering studio from initial wireframes through deployment, QA testing, and post-launch support."
  }
];

const TestimonialCarousel = () => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  useEffect(() => {
    let animationFrame: number;
    let position = 0;
    const speed = 1;

    const animate = () => {
      if (!isHovered && containerRef.current) {
        position -= speed;
        if (position <= -2257.5) {
          position = 0;
        }
        controls.set({ x: position });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered, controls]);

  return (
    <section className="w-full py-20 overflow-hidden font-general text-light-beige">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:max-w-6xl mx-auto mb-12 gap-6">
        <h2 className="text-3xl md:text-5xl font-zentry tracking-tight">
          Core <span className="font-serif italic text-cta">delivery</span> standards
        </h2>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-sm text-royal-beige">Website &amp; Storefront Engineering</span>
          
          <div className="hidden md:flex items-center gap-2 ml-4">
            <button type="button" aria-label="Previous item" className="w-12 h-12 rounded-full border border-royal-beige/30 flex items-center justify-center hover:bg-dark-brown/55 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <button type="button" aria-label="Next item" className="w-12 h-12 rounded-full border border-royal-beige/30 flex items-center justify-center hover:bg-dark-brown/55 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div 
        className="w-full relative px-6 md:px-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <motion.div 
          ref={containerRef}
          animate={controls}
          className="flex gap-6 w-max"
        >
          {duplicatedTestimonials.map((t, idx) => (
            <div 
              key={idx}
              className="w-[calc(100vw-48px)] md:w-[427.5px] shrink-0 bg-deep-dark border border-royal-beige/20 rounded-[32px] md:rounded-[40px] px-8 md:px-10 py-10 flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-cta opacity-50 mb-6" />
                <p className="text-base text-light-beige/85 leading-relaxed mb-10">
                  "{t.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-royal-beige/20 pt-6">
                <div>
                  <h3 className="font-semibold text-light-beige text-sm">{t.name}</h3>
                  <p className="text-royal-beige text-xs mt-1">↳ {t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
