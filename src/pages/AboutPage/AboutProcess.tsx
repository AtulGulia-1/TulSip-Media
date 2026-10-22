import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const processes = [
  {
    num: '01',
    title: 'Discovery, Scope & Information Architecture',
    description: 'We clarify your business goals, target buyers, required pages, integrations, and content inputs before writing code—so scope and timelines stay predictable.',
  },
  {
    num: '02',
    title: 'UI/UX Design & Content Hierarchy',
    description: 'We structure user journeys, navigation, copy hierarchy, and responsive layouts that guide visitors from initial discovery to a clear enquiry or checkout.',
  },
  {
    num: '03',
    title: 'Responsive Website & Web App Engineering',
    description: 'We build fast, accessible websites and custom browser applications using React, Next.js, TypeScript, and Tailwind CSS with clean component architecture.',
  },
  {
    num: '04',
    title: 'Technical SEO, QA & Post-Launch Support',
    description: 'We configure semantic headings, metadata, canonicals, sitemaps, structured data, and cross-device testing, followed by smooth handover and ongoing maintenance.',
  },
];

const AboutProcess = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.process-card');
    
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-10 lg:px-20 max-w-[1400px] mx-auto bg-deep-dark">
      <div className="mb-20">
        <h2 className="hero-heading font-black uppercase text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9] mb-4">
          Our Website<br />Development Process
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {processes.map((process, index) => (
          <div 
            key={index} 
            className="process-card liquid-glass rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center border border-royal-beige/15 hover:border-royal-beige/30 transition-colors duration-500 bg-dark-brown/50 backdrop-blur-md"
          >
            <div className="font-zentry text-6xl md:text-8xl font-black text-royal-beige/15 leading-none tracking-tighter">
              {process.num}
            </div>
            <div className="flex-1">
              <h3 className="hero-heading !text-transparent !bg-clip-text text-3xl md:text-4xl font-black uppercase mb-4 tracking-tight leading-[1]">{process.title}</h3>
              <p className="font-general text-light-beige text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                {process.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutProcess;
