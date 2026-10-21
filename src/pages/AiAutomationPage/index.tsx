import React, { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import AiHero from './AiHero';
import AiAbout from './AiAbout';
import AiSystems from './AiSystems';
import AiCTA from './AiCTA';

const AiAutomationPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ai-page-wrapper">
      <PageMeta
        title="Web Workflow & AI Automation Systems | TulSip Media"
        description="Explore TulSip Media's custom web workflow automations, lead-routing assistants, and operational integrations built around your website."
        canonicalPath="/ai-automation"
      />
      <div 
        className="fixed inset-0 z-50 pointer-events-none mix-blend-lighten opacity-60"
        style={{
          backgroundImage: 'url("https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/texture.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      <AiHero />
      <AiAbout />
      <AiSystems />
      <AiCTA />
    </div>
  );
};

export default AiAutomationPage;
