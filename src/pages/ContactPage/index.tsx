import React, { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import ContactHero from './ContactHero';
import FAQ from '../../components/FAQ';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page-wrapper flex flex-col">
      <PageMeta
        title="Contact TulSip Media | Start a Website or Web App Project"
        description="Contact TulSip Media to discuss your custom business website, e-commerce storefront, landing page, or web application project. Email hello@tulsipmedia.com or message on WhatsApp."
        canonicalPath="/contact"
      />
      <ContactHero />
      <FAQ />
    </div>
  );
};

export default ContactPage;
