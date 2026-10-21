import { trackAnalyticsEvent } from '../components/AnalyticsManager';
import SectionHeader from '../components/sectionHeader';
import CardHoverEffect from '../hook/cardHoverEffect';
const Contact = () => {
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
            H1={<>Start a Project</>}
            H2={
              <>
                let's b<span>u</span>ild a website
                <br /> that w<span>o</span>rks for your <br />b<span>u</span>siness.
              </>
            }
            color="light"
          />
          <a href="/contact" onClick={() => trackAnalyticsEvent('project_cta_click', { cta_location: 'home_contact_card' })} className="btn relative mt-4 h-12 w-56 overflow-hidden rounded-full bg-cta glow-cta text-base font-semibold text-deep-dark max-md:w-44 max-md:text-sm">
            <span className="btn-text-one flex h-full items-center justify-center">DISCUSS YOUR PROJECT</span>
            <span className="btn-text-two flex h-full items-center justify-center" aria-hidden="true">DISCUSS YOUR PROJECT</span>
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
          <div className="flex flex-col gap-3">
            <p className="font-general text-xs font-semibold uppercase tracking-[0.2em] text-royal-beige">
              Local brands. Global Voices.
            </p>
            <h2 className="font-zentry text-4xl uppercase md:text-5xl">Ready to discuss your website project?</h2>
            <p className="max-w-lg font-general text-base font-medium text-light-beige/85">
              Share your business goals, required pages or features, and target timeline with TulSip Media. We will review your brief and outline a clear, practical roadmap.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="/contact"
              onClick={() => trackAnalyticsEvent('project_cta_click', { cta_location: 'footer_consultation' })}
              className="rounded-full bg-deep-dark border border-royal-beige/35 shadow-token-card px-8 py-4 font-general text-sm font-semibold text-light-beige transition-transform hover:scale-105"
            >
              Request a Project Consultation
            </a>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-royal-beige/25 pt-6 text-sm font-medium md:flex-row">
          <p>© 2026 TulSip Media. All rights reserved.</p>
          <div className="flex gap-5 flex-wrap justify-center">
            <a href="/about" className="hover:text-royal-beige transition-colors">About</a>
            <a href="/case-studies" className="hover:text-royal-beige transition-colors">Work</a>
            <a href="/audit" className="hover:text-royal-beige transition-colors">Audit</a>
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

export default Contact;
