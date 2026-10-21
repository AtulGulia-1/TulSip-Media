import Card from '../components/card';

const CaseStudyFeatures = () => {
  const cardsData = [
    {
      title: (
        <h3 className="bento-title special-font">
          B<span>R</span>AND
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Positioned around dermatology-inspired skincare concerns with a structured educational content calendar.
        </p>
      ),
      video: '/videos/SEO.mp4',
      altText: 'Brand positioning and skincare content architecture',
      box: 1,
    },
    {
      title: (
        <h3 className="bento-title special-font">
          ENGAG<span>E</span>MENT
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Shifted from influencer-only posts to branded educational reels and concern-focused carousels.
        </p>
      ),
      video: '/videos/Social.mp4',
      altText: 'Educational skincare reels and carousel content',
      box: 2,
    },
    {
      title: (
        <h3 className="bento-title special-font">
          SE<span>O</span>
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Improved product-page copy, added custom title tags and meta descriptions, and connected social traffic to the website.
        </p>
      ),
      video: '/videos/PPC.mp4',
      altText: 'On-page SEO and product page structure',
      box: 3,
    },
    {
      title: (
        <h3 className="bento-title special-font">
          ST<span>O</span>RE
        </h3>
      ),
      description: (
        <p className="pt-2 text-sm text-light-beige/85 max-md:text-xs">
          Aligned offer tiers, shipping/return clarity, and visual identity across the website, Amazon, and Flipkart.
        </p>
      ),
      video: '/videos/Web Dev.mp4',
      altText: 'D2C storefront and marketplace consistency',
      box: 4,
    },
    {
      video: '/videos/ROI.mp4',
      altText: 'Multi-channel D2C brand system showcase',
      box: 5,
    },
    {
      title: (
        <h3 className="bento-title special-font text-light-beige">
          MUL<span>T</span>I
          <br />
          PL<span>A</span>Y
        </h3>
      ),
      box: 6,
    },
  ];
  return (
    <section
      id="features"
      className="bg-deep-dark px-4 py-20 text-light-beige lg:px-24 xl:px-40"
    >
      <header>
        <h2 className="max-mg:text-base text-xl font-bold max-lg:text-lg">
          Our Audit &amp; Multi-Channel Strategy
        </h2>
        <p className="max-mg:text-sm mt-2 max-w-[28rem] text-lg opacity-75 max-lg:text-base">
          Following our initial audit, we executed a four-pillar strategy across the website, search metadata, and social channels.
        </p>
      </header>
      <div className="grid h-[80rem] grid-cols-2 grid-rows-9 gap-3 py-20 md:h-[85rem] md:gap-5 md:py-24 lg:h-[90rem] lg:py-32 xl:h-[100rem] xl:gap-10 xl:py-40 2xl:h-[125rem]">
        {cardsData.map((card) => (
          <Card
            key={card.box}
            title={card.title}
            description={card.description}
            video={card.video}
            altText={card.altText}
            box={card.box}
          />
        ))}
      </div>
    </section>
  );
};

export default CaseStudyFeatures;
