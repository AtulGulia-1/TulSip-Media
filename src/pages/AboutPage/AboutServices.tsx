import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const services = [
  'Custom Business Websites',
  'E-Commerce Storefronts',
  'Landing Page Development',
  'Custom Web Applications',
  'UI/UX Design Systems',
  'Technical SEO Foundations',
  'Website Maintenance & Care',
  'Brand & Campaign Creative'
];

const AboutServices = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo('.service-header', 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: '.service-header', start: 'top 80%' }
      }
    );

    gsap.fromTo('.service-item',
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.service-grid', start: 'top 75%' }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-light-beige text-deep-dark rounded-t-[60px] py-32 px-6 md:px-10 lg:px-20 mt-10 relative z-10">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-20 lg:gap-32">
        <div className="service-header flex-shrink-0 w-full pb-8 lg:pb-0">
          <h2 className="font-zentry text-[14vw] md:text-[10vw] lg:text-[8rem] font-black uppercase leading-[0.9] tracking-tighter break-words">
            Services
          </h2>
        </div>

        <div className="service-grid flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 pt-4">
          {services.map((service, index) => (
            <div key={index} className="service-item group flex flex-col border-b border-deep-dark/10 pb-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-zentry text-3xl md:text-4xl font-bold uppercase tracking-tight text-deep-dark group-hover:text-deep-dark/60 transition-colors duration-500 break-words flex-1">
                  {service}
                </h3>
                <div className="flex-shrink-0 w-10 h-10 rounded-full border border-deep-dark/20 flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.25,0.1,0.25,1]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutServices;
