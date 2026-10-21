import React, { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import HeroSection from './components/HeroSection';
import InfiniteMarquee from './components/InfiniteMarquee';
import TheChallengeSection from './components/TheChallengeSection';
import StrategySection from './components/StrategySection';
import ProcessSection from './components/ProcessSection';
import TestimonialSection from './components/TestimonialSection';
import ResultsSection from './components/ResultsSection';
import CaseStudyFAQ from './components/CaseStudyFAQ';
import { Footer, CopyrightBar, BottomNav } from './components/Footer';

const RESEARCH_ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Great Local Businesses Deserve to Be Discovered.",
  "name": "The Local Business Digital Gap",
  "description": "Explore TulSip Media's founder-led research into local business website challenges, online discoverability, local SEO and digital identity.",
  "url": "https://tulsipmedia.com/case-studies/local-business-digital-gap",
  "author": {
    "@type": "Organization",
    "name": "TulSip Media",
    "url": "https://tulsipmedia.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "TulSip Media",
    "url": "https://tulsipmedia.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://tulsipmedia.com/Logo.png"
    }
  },
  "about": [
    "Local business website challenges",
    "Digital discoverability",
    "Local SEO",
    "Digital identity in Delhi NCR"
  ]
};

const ViktorOddyCaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-deep-dark min-h-screen text-light-beige overflow-hidden pt-16 pb-20">
      <PageMeta
        title="Local Business Website Research | TulSip Media"
        description="Explore TulSip Media's founder-led research into local business website challenges, online discoverability, local SEO and digital identity."
        canonicalPath="/case-studies/local-business-digital-gap"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(RESEARCH_ARTICLE_SCHEMA) }}
      />
      <HeroSection />
      <InfiniteMarquee />
      <TheChallengeSection />
      <StrategySection />
      <ProcessSection />
      <TestimonialSection />
      <ResultsSection />
      <CaseStudyFAQ />
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </div>
  );
};

export default ViktorOddyCaseStudy;
