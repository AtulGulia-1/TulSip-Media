import { HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does a custom business website project take?',
    a: 'A focused, multi-page business website typically takes 3 to 5 weeks from discovery kickoff to production launch. Complex custom e-commerce storefronts or web applications with bespoke API integrations take 6 to 10 weeks depending on custom features and client review cycles. We provide a firm milestone schedule in your written Statement of Work before development starts.',
  },
  {
    q: 'Do I own the website and source code when the project finishes?',
    a: 'Yes, 100%. Upon final project completion, you retain complete ownership of all visual assets, design files, content, and the source code repository. We hand over the entire codebase with zero proprietary platform lock-in, meaning any competent developer can maintain or expand your site in the future.',
  },
  {
    q: 'Can you redesign our existing website without damaging our search rankings?',
    a: 'Absolutely. A major part of our redesign process is technical SEO migration: preserving existing URL structures, configuring comprehensive 301 redirects for any altered paths, maintaining title and heading relevance, and ensuring your site retains all existing organic search equity while improving page speed.',
  },
  {
    q: 'How does website development integrate with digital marketing and advertising?',
    a: 'A website is the destination where marketing investment converts into revenue. We engineer custom websites and landing pages specifically designed to handle traffic from Google Ads, Meta campaigns, and organic search. We configure clean conversion event tracking, fast mobile rendering to maximize ad quality scores, and compelling value propositions that reduce cost-per-acquisition.',
  },
  {
    q: 'What technologies and frameworks do you use to build websites?',
    a: 'We use modern, enterprise-proven technologies including React 19, TypeScript, Tailwind CSS, Vite, and Next.js for custom web applications. For content management, we work with headless CMS solutions, WordPress, and Shopify depending on whether your priority is editorial ease, content publishing, or e-commerce catalog control.',
  },
  {
    q: 'What happens after the website goes live—do you provide maintenance?',
    a: 'Yes. We offer continuous website care arrangements that cover regular security monitoring, core dependency updates, uptime tracking, and monthly content adjustments. If you prefer to manage the website independently, we provide documentation and administrative walkthroughs upon handover.',
  },
];

const WebDevFAQ = () => {
  return (
    <section id="faq" className="bg-deep-dark px-4 py-20 text-light-beige lg:px-20 xl:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-2 flex items-center gap-2">
            <HelpCircle size={14} aria-hidden="true" /> Common Client Inquiries
          </p>
          <h2 className="font-zentry text-3xl sm:text-4xl uppercase tracking-tight text-light-beige">
            Frequently Asked Questions About Website Development
          </h2>
          <p className="mt-3 font-general text-sm text-light-beige/80">
            Clear, honest answers about our technical standards, delivery timelines, intellectual property, and working process.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-royal-beige/20 bg-dark-brown/30 p-6 sm:p-8"
            >
              <h3 className="font-general text-base sm:text-lg font-bold text-light-beige mb-3">
                {faq.q}
              </h3>
              <p className="font-robert-regular text-xs sm:text-sm text-light-beige/80 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebDevFAQ;
