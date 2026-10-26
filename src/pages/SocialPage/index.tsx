import React, { useState, useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import LoadingScreen from './LoadingScreen';
import SocialHero from './SocialHero';
import FeaturedWorks from './FeaturedWorks';
import ReelsShowcase from './ReelsShowcase';
import CarouselDesigns from './CarouselDesigns';
import ContentSystems from './ContentSystems';
import CampaignMetrics from './CampaignMetrics';
import SocialFooter from './SocialFooter';

const SocialPage = () => {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return false;
      }
      if (/bot|googlebot|crawler|spider|robot|crawling|lighthouse/i.test(navigator.userAgent)) {
        return false;
      }
    }
    return true;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isLoading) return;
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="social-page-wrapper">
      <PageMeta
        title="Social Media Content & Brand Creative Systems | TulSip Media"
        description="Explore TulSip Media's social-first brand storytelling, educational carousels, short-form video production, and creative systems connected to your website."
        canonicalPath="/social"
      />
      <div className="w-full relative z-10">
        <SocialHero />
        <FeaturedWorks />
        <ReelsShowcase />
        <CarouselDesigns />
        <ContentSystems />
        <CampaignMetrics />
        <SocialFooter />
      </div>
      {isLoading && <LoadingScreen />}
    </div>
  );
};

export default SocialPage;
