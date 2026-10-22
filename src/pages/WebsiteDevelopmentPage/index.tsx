import { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import WebDevHero from './WebDevHero';
import WebDevCapabilities from './WebDevCapabilities';
import WebDevEngineeringStandards from './WebDevEngineeringStandards';
import WebDevProcess from './WebDevProcess';
import WebDevProjects from './WebDevProjects';
import WebDevFAQ from './WebDevFAQ';
import WebDevCTA from './WebDevCTA';

const WebsiteDevelopmentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-deep-dark text-light-beige min-h-screen overflow-x-clip font-inter">
      <PageMeta
        title="Custom Website Design & Development Services | TulSip Media"
        description="TulSip Media designs and develops custom business websites, high-converting landing pages, e-commerce storefronts, and web applications built for speed, credibility, and growth."
        canonicalPath="/website-development"
      />
      <WebDevHero />
      <WebDevCapabilities />
      <WebDevEngineeringStandards />
      <WebDevProcess />
      <WebDevProjects />
      <WebDevFAQ />
      <WebDevCTA />
    </div>
  );
};

export default WebsiteDevelopmentPage;
