import React, { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import AdsHero from './AdsHero';
import AdsAbout from './AdsAbout';
import AdsFeatures from './AdsFeatures';

const AdsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="prisma-page-wrapper">
      <PageMeta
        title="Paid Media & Conversion Landing Page Systems | TulSip Media"
        description="Explore how TulSip Media aligns paid search and social ad campaigns with fast, conversion-focused landing pages and structured audience testing."
        canonicalPath="/ads"
      />
      <AdsHero />
      <AdsAbout />
      <AdsFeatures />
    </div>
  );
};

export default AdsPage;
