import SectionHeader from '../components/sectionHeader';
import CardHoverEffect from '../hook/cardHoverEffect';
const CaseStudyContact = () => {
  const handleMouseMove = CardHoverEffect();
  return (
    <section
      id="contact"
      className="full-height flex flex-col pt-12 text-light-beige"
    >
      <div
        className="center group relative mx-10 my-auto h-5/6 rounded-lg bg-deep-dark border border-royal-beige/25 shadow-token-card"
        onMouseMove={handleMouseMove}
      >
        <div className="center z-10 flex-col">
          <SectionHeader
            H1={<>Outcomes &amp; Next Phase</>}
            H2={
              <>
                n<span>o</span> longer just a
                <br /> pr<span>o</span>duct seller.
              </>
            }
            color="light"
          />
          <a href="/contact" className="btn relative mt-4 h-12 w-52 overflow-hidden rounded-full bg-cta glow-cta text-base font-semibold text-deep-dark max-md:w-44 max-md:text-sm">
            <span className="btn-text-one flex h-full items-center justify-center">DISCUSS A PROJECT</span>
            <span className="btn-text-two flex h-full items-center justify-center" aria-hidden="true">DISCUSS A PROJECT</span>
          </a>
        </div>
        <div className="hovering-effect contact-clip-path-1 absolute -top-[6.4rem] left-4 size-96 max-md:hidden">
          <img
            src="/img/Ads.jpg"
            className="size-[36rem] object-cover pt-32"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="hovering-effect contact-clip-path-2 absolute bottom-0 right-[60%] size-96 max-md:hidden">
          <img
            src="/img/Meta.jpg"
            className="size-96 object-cover"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="hovering-effect contact-clip-path-3 absolute -right-16 -top-32 size-80 max-md:-right-0">
          <img
            src="/img/SocialMediaMarketing.png"
            className="absolute top-[65px] left-[55px] w-[190px] h-[190px] object-cover"
            alt=""
            loading="lazy"
          />
        </div>
      </div>
      <footer className="bg-dark-brown border-t border-royal-beige/25 px-10 py-16 text-light-beige">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-4">
            <h2 className="font-zentry text-4xl uppercase md:text-5xl">Future Roadmap</h2>
            <p className="max-w-md font-general text-lg font-medium">Expanding concern-specific skincare guides, structured routine builders, and ongoing technical SEO refinements.</p>
          </div>
          <div className="flex">
            <a href="/contact" className="rounded-full bg-deep-dark border border-royal-beige/25 shadow-token-card px-8 py-4 font-general text-sm font-semibold text-light-beige transition-transform hover:scale-105">
              Discuss Your Website Project
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-royal-beige/25 pt-6 text-sm font-medium md:flex-row">
          <p>© 2026 TulSip Media. All rights reserved.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            <a href="/about" className="hover:text-royal-beige transition-colors">About</a>
            <a href="/case-studies" className="hover:text-royal-beige transition-colors">Work</a>
            <a href="/careers" className="hover:text-royal-beige transition-colors">Careers &amp; Internships</a>
            <a href="/policies" className="hover:text-royal-beige transition-colors">Policies &amp; Terms</a>
          <a href="/contact" className="hover:text-royal-beige transition-colors">Contact</a>
            <a href="https://x.com/TulSipMedia" target="_blank" rel="noopener noreferrer" className="hover:text-royal-beige transition-colors">X (Twitter)</a>
            <a href="https://github.com/AtulGulia-1" target="_blank" rel="noopener noreferrer" className="hover:text-royal-beige transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default CaseStudyContact;
