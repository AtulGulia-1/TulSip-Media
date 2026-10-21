import React from 'react';
import { Mail, Twitter, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const AiCTA = () => {
  const socialLinks = [
    { Icon: Mail, href: 'mailto:hello@tulsipmedia.com', target: '', label: 'Email TulSip Media' },
    { Icon: Twitter, href: 'https://x.com/TulSipMedia', target: '_blank', label: 'TulSip Media on X' },
    { Icon: Github, href: 'https://github.com/AtulGulia-1', target: '_blank', label: 'Atul Gulia on GitHub' }
  ];

  return (
    <section className="relative w-full bg-deep-dark overflow-hidden min-h-[420px]">
      {/* Native Aspect Ratio Video — programming_overnight.mp4 */}
      <video
        src="/videos/programming_overnight.mp4"
        poster="/img/posters/programming_overnight.webp"
        preload="none"
        autoPlay
        loop
        muted
        playsInline
        aria-label="Late-night custom software engineering and web development studio"
        className="block w-full h-auto min-h-[420px] object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-l from-deep-dark/85 via-deep-dark/45 to-deep-dark/70 pointer-events-none" />

      {/* CTA Text Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-end lg:pr-[20%] lg:pl-[15%] px-6">
        <div className="relative text-right">
          <span className="font-condiment text-royal-beige mix-blend-exclusion absolute -top-8 lg:-top-16 -left-4 lg:-left-8 text-[17px] sm:text-[32px] md:text-[48px] lg:text-[68px] -rotate-2">
            Build smarter
          </span>
          <h2 className="font-grotesk uppercase text-light-beige text-[16px] sm:text-[32px] md:text-[45px] lg:text-[60px] leading-[1.1] text-right">
            READY TO BUILD?
            <div className="mb-4 md:mb-8 lg:mb-12" />
            CUSTOM WEB APPS.<br />
            CONNECTED WORKFLOWS.<br />
            CLEAN ARCHITECTURE.
          </h2>
          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-full bg-cta text-deep-dark text-xs md:text-sm font-bold uppercase tracking-wider glow-cta transition-all"
            >
              Discuss Your Web App
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Left Social Icons */}
      <div className="absolute left-[8%] bottom-[12%] lg:bottom-[20%] z-20">
        <div className="liquid-glass rounded-[0.5rem] lg:rounded-[1.25rem] flex flex-col">
          {socialLinks.map(({ Icon, href, target, label }, idx) => (
            <a 
              key={idx} 
              href={href}
              target={target || undefined}
              rel={target ? "noopener noreferrer" : undefined}
              aria-label={label}
              className={`w-[14vw] sm:w-[14.375rem] md:w-[10.78125rem] lg:w-[16.77rem] aspect-[3/1] lg:aspect-[4/1] flex items-center justify-center hover:bg-dark-brown/55 transition-colors text-light-beige ${idx !== 2 ? 'border-b border-royal-beige/20' : ''}`}
            >
              <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
            </a>
          ))}
        </div>
      </div>
      
    </section>
  );
};

export default AiCTA;
