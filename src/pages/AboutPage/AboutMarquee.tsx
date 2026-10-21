import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StudioMediaItem {
  label: string;
  video?: string;
  poster: string;
}

const topRowItems: StudioMediaItem[] = [
  {
    label: '01 · Creative Direction',
    video: '/videos/exploring_new_ideas.mp4',
    poster: '/img/posters/exploring_new_ideas.webp',
  },
  {
    label: '02 · Strategy & Planning',
    video: '/videos/strategy_planning.mp4',
    poster: '/img/posters/strategy_planning.webp',
  },
  {
    label: '03 · Interface Systems',
    video: '/videos/website_design.mp4',
    poster: '/img/posters/website_design.webp',
  },
  {
    label: '04 · Concept Prototyping',
    poster: '/img/posters/website_development_planning.webp',
  },
  {
    label: '05 · Creative Direction',
    poster: '/img/posters/exploring_new_ideas.webp',
  },
  {
    label: '06 · Strategy & Planning',
    poster: '/img/posters/strategy_planning.webp',
  },
];

const bottomRowItems: StudioMediaItem[] = [
  {
    label: '04 · Clean Engineering',
    poster: '/img/posters/coding-web.webp',
  },
  {
    label: '05 · Digital Architecture',
    video: '/videos/digital_architecture.mp4',
    poster: '/img/posters/digital_architecture.webp',
  },
  {
    label: '06 · Idea to Development',
    video: '/videos/idea_to_development.mp4',
    poster: '/img/posters/idea_to_development.webp',
  },
  {
    label: '07 · Production Code',
    video: '/videos/coding-web.mp4',
    poster: '/img/posters/coding-web.webp',
  },
  {
    label: '08 · Digital Architecture',
    poster: '/img/posters/digital_architecture.webp',
  },
  {
    label: '09 · Idea to Development',
    poster: '/img/posters/idea_to_development.webp',
  },
];

const AboutMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-180, 180]);
  const x2 = useTransform(scrollYProgress, [0, 1], [180, -180]);

  const renderCard = (item: StudioMediaItem, idx: number) => (
    <div
      key={idx}
      className="relative w-[340px] sm:w-[420px] h-[230px] sm:h-[270px] shrink-0 rounded-3xl overflow-hidden border border-royal-beige/20 bg-dark-brown group"
    >
      {item.video ? (
        <video
          src={item.video}
          poster={item.poster}
          preload="none"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      ) : (
        <img
          src={item.poster}
          alt={item.label}
          loading="lazy"
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-deep-dark/80 via-transparent to-transparent pointer-events-none" />
      <span className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.18em] text-light-beige/90 bg-deep-dark/65 backdrop-blur-sm px-3 py-1 rounded-full border border-royal-beige/25">
        {item.label}
      </span>
    </div>
  );

  return (
    <section
      ref={containerRef}
      aria-label="TulSip Media studio workflow from idea exploration to website engineering"
      className="pt-28 pb-16 bg-deep-dark overflow-hidden flex flex-col gap-6"
    >
      <motion.div className="flex gap-6 w-[200vw] sm:w-[150vw]" style={{ x: x1 }}>
        {topRowItems.map(renderCard)}
      </motion.div>

      <motion.div className="flex gap-6 w-[200vw] sm:w-[150vw] -ml-[180px]" style={{ x: x2 }}>
        {bottomRowItems.map(renderCard)}
      </motion.div>
    </section>
  );
};

export default AboutMarquee;
