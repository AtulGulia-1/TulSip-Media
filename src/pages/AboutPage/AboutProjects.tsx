import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const projects = [
  {
    title: 'Editorial Interface & Brand Design',
    category: 'Capability Showcase · Website Design',
    description: 'High-contrast typography, wireframe systems, and custom interface direction crafted for brand clarity.',
    video: '/videos/website_design.mp4',
    poster: '/img/posters/website_design.webp',
  },
  {
    title: 'Dynamic Multi-Device Web Builds',
    category: 'Capability Showcase · Responsive Engineering',
    description: 'Mobile-first layouts and responsive web experiences engineered for seamless cross-device discovery.',
    video: '/videos/dvnamic_website_building.mp4',
    poster: '/img/posters/dvnamic_website_building.webp',
  },
  {
    title: 'Custom E-Commerce & Storefront Code',
    category: 'Capability Showcase · E-Commerce Development',
    description: 'Clean, modular storefront markup and conversion-focused product architecture built from the ground up.',
    video: '/videos/e-commerce_website_development.mp4',
    poster: '/img/posters/e-commerce_website_development.webp',
  },
  {
    title: 'Interactive 3D & Digital Architecture',
    category: 'Capability Showcase · Concept & Motion Systems',
    description: 'Immersive product concepts and spatial web storytelling balanced with fast-loading performance.',
    video: '/videos/digital_architecture.mp4',
    poster: '/img/posters/digital_architecture.webp',
  },
];

const AboutProjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="bg-deep-dark relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute top-20 left-10 md:left-20 z-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-royal-beige mb-2">
            Studio Capabilities &amp; Concept Previews
          </p>
          <h2 className="hero-heading font-black uppercase text-5xl md:text-7xl tracking-tighter">
            Selected<br />Work
          </h2>
        </div>

        <div className="relative w-full max-w-[1200px] h-[70vh] flex items-center justify-center mt-20">
          {projects.map((project, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [i * 0.25, i * 0.25 + 0.25],
              [i === 0 ? 1 : 0.8, 1]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(
              scrollYProgress,
              [i * 0.25, i * 0.25 + 0.25],
              [i === 0 ? 0 : 500, 0]
            );
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [i * 0.25, i * 0.25 + 0.1],
              [i === 0 ? 1 : 0, 1]
            );

            return (
              <motion.div
                key={i}
                className="absolute top-0 w-[90%] md:w-[80%] h-full rounded-[40px] overflow-hidden shadow-2xl bg-dark-brown border border-royal-beige/20"
                style={{
                  scale,
                  y,
                  opacity,
                  zIndex: i,
                }}
              >
                <video
                  src={project.video}
                  poster={project.poster}
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={`${project.title} — ${project.description}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-dark/90 via-deep-dark/25 to-transparent flex flex-col justify-end p-8 md:p-14">
                  <p className="text-royal-beige font-general uppercase tracking-widest text-xs md:text-sm mb-2">
                    {project.category}
                  </p>
                  <h3 className="hero-heading !text-transparent !bg-clip-text text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tight leading-[1.02] mb-3">
                    {project.title}
                  </h3>
                  <p className="text-light-beige/85 font-robert-regular text-xs sm:text-sm md:text-base max-w-2xl">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutProjects;
