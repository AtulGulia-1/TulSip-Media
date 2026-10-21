import { trackAnalyticsEvent } from '../components/AnalyticsManager';
import SectionHeader from '../components/sectionHeader';
import CardHoverEffect from '../hook/cardHoverEffect';
const Story = () => {
  const handleMouseMove = CardHoverEffect();
  return (
    <section id="story" className="overflow-hidden bg-deep-dark py-20">
      <SectionHeader
        H1={<>Selected Work & Process</>}
        H2={
          <>
            how we pl<span>a</span>n, design
            <br />&amp; build webs<span>i</span>tes
          </>
        }
        color="blue"
      />
      <div className="lg:full-height relative h-[55vh] md:h-[85vh]">
        <div
          className="group absolute -top-24 left-1/2 h-64 w-[26rem] opacity-90 [transform:rotateY(30deg)_rotateZ(5deg)_translateX(-50%)] md:h-96 md:w-[32rem] lg:h-[40rem] lg:w-[65rem]"
          onMouseMove={handleMouseMove}
        >
          <video
            src="/videos/CaseStudy.mp4"
            poster="/img/posters/CaseStudy.webp"
            preload="metadata"
            className="size-full object-cover transition-transform ease-linear will-change-transform [perspective:1000px] group-hover:[transform:rotateX(var(--rotate-x))_rotateY(var(--rotate-y))]"
            aria-label="TulSip Media website design and brand strategy case study reel"
            autoPlay
            muted
            loop
            playsInline
            draggable="false"
            controls={false}
            disablePictureInPicture
            style={{
              clipPath: 'polygon(4% 0, 83% 21%, 100% 73%, 0% 100%)',
            }}
          />
        </div>
        <div className="absolute bottom-3 right-3 w-1/3 pe-2 max-md:w-2/3 md:pe-5 lg:pe-10">
          <p className="text-light-beige">
            Every project follows a clear sequence: discovery and scope alignment, information architecture and UI/UX design, responsive frontend and backend engineering, and pre-launch technical QA.
          </p>
          <a href="/case-studies" onClick={() => trackAnalyticsEvent('portfolio_item_click', { item_slug: 'story_explore_work' })} className="btn relative mt-10 h-8 w-44 overflow-hidden rounded-full bg-light-beige text-sm font-semibold text-deep-dark max-md:w-36 max-md:text-[0.7rem]">
            <span className="btn-text-one flex h-full items-center justify-center">EXPLORE OUR WORK</span>
            <span className="btn-text-two flex h-full items-center justify-center" aria-hidden="true">EXPLORE OUR WORK</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Story;
