import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-light-beige font-light flex flex-wrap gap-x-2 gap-y-1 mb-8">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <motion.span key={i} style={{ opacity }}>
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

const AboutStory = () => {
  const p1 = "TulSip Media is a website development and digital brand studio founded to help businesses present their work with clarity, speed, and conviction.";
  const p2 = "Many growing businesses outgrow generic templates or disconnected social pages before they have a website that properly explains what they do, why they are credible, and how a customer should take the next step.";
  const p3 = "We bridge design and engineering—combining UI/UX architecture, custom React and Next.js development, technical SEO foundations, and cohesive brand content into a single, well-structured web presence.";
  const p4 = "Whether launching a new company site, restructuring an e-commerce storefront, or building a custom web application, we focus on clean code, responsive layouts, and maintainable systems.";

  return (
    <section className="py-32 px-6 md:px-10 lg:px-16 bg-deep-dark">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <div className="lg:col-span-4">
          <h2 className="hero-heading font-black uppercase text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[0.9] sticky top-32">
            About<br />TulSip<br />Media
          </h2>
        </div>

        <div className="lg:col-span-8 pt-4">
          <AnimatedText text={p1} />
          <AnimatedText text={p2} />
          <AnimatedText text={p3} />
          <AnimatedText text={p4} />
        </div>

      </div>
    </section>
  );
};

export default AboutStory;
