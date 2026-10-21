import { lazy, useEffect } from 'react';
import PageMeta from '../components/PageMeta';

const CaseStudyHero = lazy(() => import('./CaseStudyHero'));
const CaseStudyAbout = lazy(() => import('./CaseStudyAbout'));
const CaseStudyFeatures = lazy(() => import('./CaseStudyFeatures'));
const CaseStudyStory = lazy(() => import('./CaseStudyStory'));
const CaseStudyContact = lazy(() => import('./CaseStudyContact'));

const NucleusCaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <PageMeta
        title="Nucleus Derma Care Case Study | Website & Brand Strategy | TulSip Media"
        description="Explore how TulSip Media audited and restructured Nucleus Derma Care's website product pages, offer hierarchy, on-page SEO, and multi-channel content strategy."
        canonicalPath="/case-studies/nucleus-derma-care-d2c-skincare"
      />
      <CaseStudyHero />
      <CaseStudyAbout />
      <CaseStudyFeatures />
      <CaseStudyStory />
      <CaseStudyContact />
    </>
  );
};

export default NucleusCaseStudy;
