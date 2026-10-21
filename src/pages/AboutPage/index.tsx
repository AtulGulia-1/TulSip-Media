import React, { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import AboutHero from './AboutHero';
import AboutMarquee from './AboutMarquee';
import AboutStory from './AboutStory';
import AboutTeam from './AboutTeam';
import AboutProcess from './AboutProcess';
import AboutServices from './AboutServices';
import AboutWhyChooseUs from './AboutWhyChooseUs';
import AboutProjects from './AboutProjects';
import AboutCTA from './AboutCTA';

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-deep-dark text-light-beige overflow-x-clip min-h-screen font-inter">
      <PageMeta
        title="About TulSip Media | Website Development & Digital Experience Studio"
        description="Learn about TulSip Media, an independent web development studio led by Atul Gulia, building custom business websites, e-commerce storefronts, and digital brand systems."
        canonicalPath="/about"
      />
      <AboutHero />
      <AboutMarquee />
      <AboutStory />
      <AboutTeam />
      <AboutProcess />
      <AboutServices />
      <AboutWhyChooseUs />
      <AboutProjects />
      <AboutCTA />
    </div>
  );
};

export default AboutPage;
