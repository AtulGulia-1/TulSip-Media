import React from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    title: "Interactive Product Showcase",
    desc: "Responsive product presentation and editorial storytelling for modern digital brands",
    img: "/img/case-studies/lazarev.png"
  },
  {
    title: "Modular Web Application UI",
    desc: "Structured dashboard layouts and clean interaction states built in React and TypeScript",
    img: "/img/case-studies/metastaq.png"
  },
  {
    title: "Brand & Storefront Experience",
    desc: "Cohesive typography, colour tokens, and mobile-first storefront architecture",
    img: "/img/case-studies/accern.png"
  }
];

const ProjectsSection = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-24 flex flex-col gap-24 md:gap-32">
      {PROJECTS.map((project, idx) => (
        <motion.div 
          key={idx}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col w-full"
        >
          <div className="ml-10 md:ml-28 mb-6 md:mb-10 max-w-xl">
            <h3 className="font-serif text-3xl md:text-5xl font-semibold text-light-beige mb-2 md:mb-4 tracking-wide">{project.title}</h3>
            <p className="font-general text-sm md:text-base text-royal-beige leading-relaxed">{project.desc}</p>
          </div>
          
          <div className="w-full rounded-[32px] overflow-hidden shadow-2xl border border-royal-beige/20 group cursor-pointer">
            <img 
              src={project.img} 
              alt={project.title} 
              className="w-full h-auto max-h-[700px] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
};

export default ProjectsSection;
