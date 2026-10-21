import React, { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import AuditHero from './AuditHero';
import AuditBenefits from './AuditBenefits';
import AuditAnalyze from './AuditAnalyze';
import AuditProcess from './AuditProcess';
import AuditResults from './AuditResults';
import AuditForm from './AuditForm';
import AuditCTA from './AuditCTA';

const AuditPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-deep-dark text-light-beige overflow-x-hidden font-sans">
      <PageMeta
        title="Website, Creative & Brand Audit | TulSip Media"
        description="Request a manual website UX, technical SEO, content, and brand audit from TulSip Media to identify conversion gaps and practical next steps."
        canonicalPath="/audit"
      />
      
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03] bg-noise"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter3'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter3)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-royal-beige/10 blur-[120px] mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-royal-beige/5 blur-[150px] mix-blend-screen animate-pulse" style={{ animationDuration: '12s' }} />
      </div>

      <div className="relative z-10 w-full pt-16 md:pt-20">
        <AuditHero />
        <AuditBenefits />
        <AuditAnalyze />
        <AuditProcess />
        <AuditResults />
        <AuditForm />
        <AuditCTA />
      </div>
    </div>
  );
};

export default AuditPage;
