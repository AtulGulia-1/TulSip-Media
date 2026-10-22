import { ArrowUpRight } from 'lucide-react';
import { trackAnalyticsEvent } from '../../components/AnalyticsManager';

const PROJECTS = [
  {
    title: 'Nucleus Derma Care',
    category: 'E-Commerce Storefront & Brand Architecture',
    summary:
      'Engineered a fast, trustworthy direct-to-consumer skincare platform with clean product specification browsing, mobile cart optimization, and integrated customer trust architecture.',
    deliverables: ['Custom Storefront UX', 'Mobile Checkout Optimization', 'Product Architecture', 'Technical SEO'],
    link: '/case-studies/nucleus-derma-care-d2c-skincare',
    img: '/img/luxary_branding.jpg',
  },
  {
    title: 'Local Business Digital Asset Transformation',
    category: 'Custom Business Website & Local Search Discovery',
    summary:
      'Transformed a local service provider with zero digital discoverability into an authoritative, search-optimized business asset generating consistent organic enquiries.',
    deliverables: ['Responsive Business Website', 'Local Search SEO Architecture', 'Conversion Journey', 'Lead Capture Form'],
    link: '/case-studies/local-business-digital-gap',
    img: '/img/brand_identity.jpg',
  },
];

const WebDevProjects = () => {
  return (
    <section className="bg-dark-brown/25 px-4 py-20 text-light-beige lg:px-20 xl:px-32 border-t border-royal-beige/15">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-2">
              Verified Work · Commercial Proof
            </p>
            <h2 className="font-zentry text-3xl sm:text-4xl uppercase tracking-tight text-light-beige">
              Real Websites We Have Engineered
            </h2>
            <p className="mt-3 font-general text-sm text-light-beige/80">
              Explore how our web design and development engineering transforms client credibility and customer acquisition.
            </p>
          </div>
          <a
            href="/case-studies"
            onClick={() => trackAnalyticsEvent('portfolio_item_click', { item_slug: 'webdev_all_work' })}
            className="inline-flex items-center gap-1.5 font-general text-xs font-bold uppercase tracking-wider text-royal-beige hover:text-light-beige transition-colors"
          >
            View All Case Studies <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-3xl border border-royal-beige/25 bg-deep-dark/80 transition-all hover:border-royal-beige/50 flex flex-col justify-between shadow-token-card"
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-dark-brown/60 relative">
                <img
                  src={proj.img}
                  alt={proj.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 rounded-full bg-deep-dark/80 backdrop-blur-md px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-royal-beige border border-royal-beige/30">
                  {proj.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-general text-xl sm:text-2xl font-bold text-light-beige group-hover:text-royal-beige transition-colors">
                    {proj.title}
                  </h3>
                  <p className="mt-3 font-robert-regular text-xs sm:text-sm text-light-beige/80 leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {proj.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="rounded-full bg-royal-beige/10 border border-royal-beige/25 px-2.5 py-1 text-[11px] font-mono text-royal-beige"
                      >
                        {del}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-royal-beige/15">
                  <a
                    href={proj.link}
                    onClick={() => trackAnalyticsEvent('portfolio_item_click', { item_slug: proj.title })}
                    className="inline-flex items-center gap-1.5 font-general text-xs font-bold uppercase tracking-wider text-royal-beige group-hover:text-light-beige transition-colors"
                  >
                    Read Case Study <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevProjects;
