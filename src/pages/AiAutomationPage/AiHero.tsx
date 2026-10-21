import React from 'react';
import { Mail, Twitter, Github } from 'lucide-react';

const AiHero = () => {
  const socialLinks = [
    { Icon: Mail, href: 'mailto:hello@tulsipmedia.com', target: '', label: 'Email TulSip Media' },
    { Icon: Twitter, href: 'https://x.com/TulSipMedia', target: '_blank', label: 'TulSip Media on X' },
    { Icon: Github, href: 'https://github.com/AtulGulia-1', target: '_blank', label: 'Atul Gulia on GitHub' }
  ];

  return (
    <section className="relative w-full h-screen min-h-[600px] flex justify-center bg-deep-dark rounded-b-[32px] overflow-hidden">
      {/* Background Video — digital_architecture.mp4 */}
      <video
        src="/videos/digital_architecture.mp4"
        poster="/img/posters/digital_architecture.webp"
        preload="metadata"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Digital architecture and custom web application systems"
        className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-dark/85 via-deep-dark/55 to-deep-dark/75 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-20 w-full max-w-[1831px] px-6 md:px-12 pt-24 pb-12 flex flex-col justify-center h-full">
        
        {/* Desktop Social Icons (Top Right) */}
        <div className="hidden lg:flex flex-col gap-2 absolute top-24 right-12">
          {socialLinks.map(({ Icon, href, target, label }, idx) => (
            <a
              key={idx}
              href={href}
              target={target || undefined}
              rel={target ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="liquid-glass w-14 h-14 rounded-[1rem] flex items-center justify-center hover:bg-dark-brown/55 transition-colors text-light-beige"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative max-w-[820px] lg:ml-32 mt-12 lg:mt-0">
          <p className="font-mono uppercase tracking-[0.22em] text-royal-beige text-xs md:text-sm mb-4">
            Creative Technology Laboratory · Custom Web Systems
          </p>
          <h1 className="font-grotesk uppercase text-light-beige text-[36px] sm:text-[56px] md:text-[70px] lg:text-[84px] leading-[1.05] md:leading-[1]">
            Custom Web Apps
            <br />
            &amp; ( Workflow ) Automation
          </h1>
          <p className="font-mono text-light-beige/85 text-xs sm:text-sm md:text-base max-w-xl mt-6 leading-relaxed">
            We design and engineer custom web applications, AI-assisted customer journeys, and connected CRM workflows that turn complex operational bottlenecks into reliable digital products.
          </p>
          
          <span className="font-condiment text-royal-beige mix-blend-exclusion opacity-90 absolute right-0 -bottom-8 sm:-bottom-10 lg:bottom-16 md:right-8 lg:-right-16 text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px] -rotate-1 pointer-events-none">
            TulSip Systems
          </span>
        </div>

        {/* Mobile Social Icons (Bottom) */}
        <div className="flex lg:hidden gap-4 justify-center mt-16">
          {socialLinks.map(({ Icon, href, target, label }, idx) => (
            <a
              key={idx}
              href={href}
              target={target || undefined}
              rel={target ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="liquid-glass w-14 h-14 rounded-[1rem] flex items-center justify-center hover:bg-dark-brown/55 transition-colors text-light-beige"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AiHero;
