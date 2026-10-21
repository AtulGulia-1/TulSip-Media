import React from 'react';
import { motion } from 'framer-motion';

interface CarouselItem {
  id: number;
  title: string;
  image: string;
  height: string;
  alt?: string;
}

const carousels: CarouselItem[] = [
  { id: 1, title: "SEO Guide", image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=800&auto=format&fit=crop", height: "h-[300px]" },
  { id: 2, title: "Brand Identity", image: "/img/brand_identity.jpg", height: "h-[450px]", alt: "TulSip Media Brand Identity design system and visual guidelines carousel" },
  { id: 3, title: "Ad Strategy", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", height: "h-[400px]" },
  { id: 4, title: "Content Hooks", image: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=800&auto=format&fit=crop", height: "h-[350px]" },
  { id: 5, title: "Engagement", image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=800&auto=format&fit=crop", height: "h-[300px]" },
  { id: 6, title: "Analytics", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop", height: "h-[450px]" },
];

const CarouselDesigns = () => {
  return (
    <section className="py-24 md:py-32 px-6 bg-bg text-text-primary">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-social-display tracking-tight mb-4">
              Carousel <span className="italic text-transparent bg-clip-text accent-gradient">Systems</span>
            </h2>
            <p className="max-w-xl text-muted text-sm md:text-base font-social-body">
              Educational, SEO-driven carousel designs optimized for saves, shares, and audience retention.
            </p>
          </div>
        </div>

        {/* Masonry Grid Simulation */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {carousels.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative rounded-3xl overflow-hidden group cursor-pointer border border-stroke bg-surface w-full ${item.height} break-inside-avoid`}
            >
              <img 
                src={item.image} 
                alt={item.alt || item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-deep-dark/30 group-hover:bg-transparent transition-colors duration-500" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="px-4 py-2 bg-deep-dark/60 backdrop-blur-md rounded-2xl border border-royal-beige/20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h4 className="text-light-beige font-social-body font-semibold text-sm">{item.title}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CarouselDesigns;
