import React from 'react';

const IMAGES = [
  "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
  "https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif",
  "https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif",
  "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
  "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
  "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
  "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
  "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif"
];

const InfiniteMarquee = () => {
  const marqueeImages = [...IMAGES, ...IMAGES];

  return (
    <section aria-hidden="true" className="w-full mt-16 md:mt-20 mb-16 overflow-hidden relative">
      <div className="flex w-max animate-marquee-fast md:animate-marquee">
        {marqueeImages.map((src, idx) => (
          <div key={idx} className="flex-shrink-0 mx-3">
            <img 
              src={src} 
              alt="" 
              className="h-[280px] md:h-[500px] w-auto object-cover rounded-2xl shadow-[0_0_20px_rgba(241, 234, 218,0.05)] border border-royal-beige/20"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-deep-dark to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-deep-dark to-transparent pointer-events-none" />
    </section>
  );
};

export default InfiniteMarquee;
