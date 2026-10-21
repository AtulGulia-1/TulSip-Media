import { useGSAP } from '@gsap/react';
import SectionHeader from '../components/sectionHeader';
import { useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);
  const aboutImgRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutContentRef.current,
        scrub: 1,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.fromTo(
      aboutVideoRef.current,
      {
        clipPath: 'inset(25% 40% 25% 40% round 0.6%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0%)',
        ease: 'power3.inOut',
      },
      0
    );

    tl.fromTo(
      aboutImgRef.current,
      {
        scale: 0.5,
        opacity: 1,
      },
      {
        scale: 1.3,
        opacity: 0,
        ease: 'power3.inOut',
      },
      0
    );
  }, []);
  return (
    <section ref={aboutRef} id="about" className="overflow-hidden">
      <SectionHeader
        H1={<>Website Development Studio</>}
        H2={
          <>
            Websites b<span>u</span>ilt around <br /> your business g<span>o</span>als
          </>
        }
      />
      <div ref={aboutContentRef} className="full-height relative">
        <div className="center absolute bottom-6 left-1/2 w-full -translate-x-1/2 flex-col px-10">
          <h3 className="text-center font-bold">
            Clear structure, purposeful design, and dependable engineering
          </h3>
          <p className="mt-1 max-w-2xl text-center">
            TulSip Media builds custom business websites, e-commerce storefronts, landing pages, and web applications designed to make your offering clear, trustworthy, and easy to act on.
          </p>
        </div>
        <img
          ref={aboutImgRef}
          src="/img/Petals.png"
          className="center-position z-20 size-full object-cover pointer-events-none"
          alt=""
          draggable="false"
          loading="lazy"
        />
        <video
          ref={aboutVideoRef}
          src="/videos/left to right.mp4"
          poster="/img/posters/left to right.webp"
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          className="z-10 size-full object-cover max-lg:scale-x-125 max-md:scale-x-[2]"
          aria-label="TulSip Media website design and development showcase"
        />
      </div>
    </section>
  );
};

export default About;
