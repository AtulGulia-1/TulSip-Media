import WordsPullUpMultiStyle, { Segment } from './components/WordsPullUpMultiStyle';
import AnimatedLetter from './components/AnimatedLetter';

const AdsAbout = () => {
  const headingSegments: Segment[] = [
    { text: "We are TulSip Media, ", className: "font-normal" },
    { text: "performance marketers. ", className: "italic font-serif" },
    { text: "We have skills in search SEO, media buying, and growth hacking.", className: "font-normal" }
  ];

  return (
    <section className="bg-deep-dark w-full py-16 md:py-24 px-4 md:px-6">
      <div className="bg-deep-dark rounded-2xl md:rounded-[2rem] p-8 md:p-16 lg:p-24 max-w-6xl mx-auto flex flex-col items-center text-center">
        
        {/* Label */}
        <span className="text-primary text-[10px] sm:text-xs tracking-wider uppercase mb-8 md:mb-12">
          Digital Marketing
        </span>

        {/* Heading */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9] text-light-beige mb-12 md:mb-16">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* Scroll-Linked Text */}
        <div className="max-w-2xl mx-auto text-light-beige text-xs sm:text-sm md:text-base leading-relaxed">
          <AnimatedLetter text="Over the last several years, we have partnered with innovative brands and global enterprises. Together, we engineer high-converting digital funnels that aggressively lower acquisition costs while maximizing your total lifetime value." />
        </div>
        
      </div>
    </section>
  );
};

export default AdsAbout;
