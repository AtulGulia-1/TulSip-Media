import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    title: 'Clear Scope & Milestone Delivery',
  },
  {
    title: 'Custom Code Over Bloated Templates',
  },
  {
    title: 'Built-In Technical SEO & Accessibility',
  },
  {
    title: 'Direct Collaboration With The Builder',
  }
];

const AboutWhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.reason-text',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: containerRef.current, start: 'top 70%' }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-10 lg:px-20 bg-deep-dark text-light-beige">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-20">
          <h2 className="hero-heading font-black uppercase text-6xl md:text-8xl tracking-tighter leading-[0.9]">
            Why Partner<br />With TulSip?
          </h2>
        </div>

        <div className="flex flex-col border-t border-royal-beige/20">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="reason-text py-10 border-b border-royal-beige/20 group cursor-default"
            >
              <h3 className="font-zentry text-3xl md:text-5xl font-black uppercase text-royal-beige/60 group-hover:text-light-beige transition-colors duration-500 tracking-tight">
                {reason.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhyChooseUs;
