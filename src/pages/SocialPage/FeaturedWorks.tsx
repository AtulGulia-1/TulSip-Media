import { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowUpRight, Film } from 'lucide-react';

interface WorkItem {
  id: number;
  title: string;
  category: string;
  span: string;
  image: string;
  video?: string;
  subtitle?: string;
  alt?: string;
}

const works: WorkItem[] = [
  {
    id: 1,
    title: 'Instagram Reels & Short-Form Video',
    category: 'Social Content · Concept Preview',
    span: 'col-span-1 md:col-span-7',
    image: '/img/posters/views.webp',
    video: '/videos/views.mp4',
    subtitle: 'Brand-aligned vertical video hooks, pacing systems, and visual storytelling (Social Media vertical launching soon).',
    alt: 'TulSip Media short-form video and Instagram Reels production preview',
  },
  {
    id: 2,
    title: 'Luxury Branding',
    category: 'Visual Identity',
    span: 'col-span-1 md:col-span-5',
    image: '/img/luxary_branding.jpg',
    alt: 'TulSip Media Luxury Branding & Visual Identity',
    subtitle: 'Elevated brand identity systems, typography guidelines, and digital growth strategy.',
  },
  {
    id: 3,
    title: 'Restaurant Campaign',
    category: 'Growth Ads',
    span: 'col-span-1 md:col-span-5',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Fitness Ads',
    category: 'Performance',
    span: 'col-span-1 md:col-span-7',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Clinic Marketing',
    category: 'Lead Gen',
    span: 'col-span-1 md:col-span-7',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Real Estate Creatives',
    category: 'Carousel Design',
    span: 'col-span-1 md:col-span-5',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
  },
];

const FeaturedWorks = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section id="works" className="py-24 md:py-32 px-6 bg-bg text-text-primary" ref={containerRef}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <span className="uppercase tracking-[0.2em] text-xs text-muted mb-4 font-social-body">
            Creative Direction Preview
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-social-display tracking-tight leading-none mb-6">
            Scroll-Stopping <span className="italic text-transparent bg-clip-text accent-gradient">content</span>
          </h2>
          <p className="max-w-2xl text-muted text-sm md:text-base font-social-body">
            A concept showcase of our short-form video reels, educational carousels, and visual branding systems designed to complement your website once our Social Media vertical launches.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {works.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`relative group rounded-3xl overflow-hidden border border-stroke bg-surface h-[400px] md:h-[500px] ${work.span}`}
            >
              <div className="absolute inset-0 overflow-hidden">
                {work.video ? (
                  <video
                    src={work.video}
                    poster={work.image}
                    preload="metadata"
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={work.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={work.image}
                    alt={work.alt || work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
              </div>

              {/* Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-dark/85 via-deep-dark/25 to-deep-dark/40 transition-all duration-500 z-10" />

              {/* Gold Border Glow on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-royal-beige/50 rounded-3xl transition-colors duration-500 z-20 pointer-events-none" />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-30">
                <div className="flex justify-between items-start gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-deep-dark/75 backdrop-blur-md border border-royal-beige/30 text-xs text-light-beige uppercase tracking-wider">
                    {work.video && <Film size={13} className="text-royal-beige" aria-hidden="true" />}
                    <span>{work.category}</span>
                  </div>

                  <a
                    href="/contact"
                    aria-label={`Enquire about ${work.title}`}
                    className="w-12 h-12 rounded-full bg-light-beige text-deep-dark flex items-center justify-center opacity-90 group-hover:scale-105 transition-all duration-300"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-social-display text-light-beige mb-2">
                    {work.title}
                  </h3>
                  {work.subtitle && (
                    <p className="text-xs md:text-sm text-light-beige/85 font-social-body max-w-xl">
                      {work.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
