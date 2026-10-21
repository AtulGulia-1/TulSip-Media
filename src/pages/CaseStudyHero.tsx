import AnimatedHeading from '../components/AnimatedHeading';
import FadeIn from '../components/FadeIn';

const CaseStudyHero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-deep-dark text-light-beige flex flex-col">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="relative z-10 flex flex-col flex-1 px-6 md:px-12 lg:px-16 pt-6 pb-12 lg:pb-16">
        <div className="flex-1 flex flex-col justify-end lg:grid lg:grid-cols-2 lg:items-end">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-royal-beige mb-3">
              Case Study • Nucleus Derma Care
            </p>
            <AnimatedHeading
              text={"Building brands\nthat people remember."}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[0.95] mb-4"
              style={{ letterSpacing: '-0.04em' }}
            />
            
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-light-beige/85 max-w-xl mb-5">
                How we restructured a D2C skincare startup's website product pages, offer hierarchy, on-page SEO foundations, and educational content system.
              </p>
            </FadeIn>
            
            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-wrap gap-4">
                <a href="#about" className="bg-light-beige text-deep-dark px-8 py-3 rounded-lg font-medium transition-colors hover:bg-royal-beige">
                  View Case Study
                </a>
                <a href="#story" className="liquid-glass border border-royal-beige/30 text-light-beige px-8 py-3 rounded-lg font-medium hover:bg-light-beige hover:text-deep-dark transition-all duration-500">
                  Explore Process
                </a>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={1400} duration={1000}>
            <div className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
              <div className="liquid-glass border border-royal-beige/30 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light">
                  Website UX. On-Page SEO. Brand Systems.
                </span>
              </div>
            </div>
          </FadeIn>
          
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;
