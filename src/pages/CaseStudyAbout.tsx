import { useGSAP } from '@gsap/react';
import SectionHeader from '../components/sectionHeader';
import { useRef } from 'react';
import gsap from 'gsap';

const CaseStudyAbout = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const aboutImgRef = useRef<HTMLImageElement>(null);
  useGSAP(() => {
    gsap.fromTo(
      aboutImgRef.current,
      {
        clipPath: 'inset(25% 40% 25% 40% round 0.6%)',
      },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0%)',
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: aboutContentRef.current,
          scrub: 1,
          pin: true,
          pinSpacing: true,
        },
      },
    );
  }, []);
  return (
    <section ref={aboutRef} id="about" className="overflow-hidden">
      <SectionHeader
        H1={<>The Challenge</>}
        H2={
          <>
            Why S<span>a</span>les Were <br /> L<span>o</span>w Before Us
          </>
        }
      />
      <div ref={aboutContentRef} className="full-height relative">
        <div className="center absolute bottom-6 left-1/2 w-full -translate-x-1/2 flex-col px-10">
          <h3 className="text-center font-bold">
            No SEO strategy, weak positioning, and low-quality video content
          </h3>
          <p className="text-center">
            Organic discovery was almost non-existent. Nucleus remained dependent on Amazon & Flipkart instead of owning its audience.
          </p>
        </div>
        <img
          ref={aboutImgRef}
          src="/img/Brand Growth & Digital Strategy Plan.png"
          className="z-10 size-full object-cover"
          alt="TulSip Media brand and SEO strategy for Nucleus Derma Care"
          draggable="false"
          loading='lazy'
        />
      </div>
    </section>
  );
};

export default CaseStudyAbout;
