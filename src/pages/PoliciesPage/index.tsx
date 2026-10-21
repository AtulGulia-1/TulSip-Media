import React, { useEffect } from 'react';
import PageMeta from '../../components/PageMeta';
import { ShieldCheck, FileText, AlertTriangle, Mail, Phone } from 'lucide-react';

const POLICY_SECTIONS = [
  { id: 'terms-of-service', number: '01', title: 'Terms of Service' },
  { id: 'privacy-policy', number: '02', title: 'Privacy Policy' },
  { id: 'cookie-analytics', number: '03', title: 'Cookie & Analytics Notice' },
  { id: 'subscription-policy', number: '04', title: 'Subscription Plans, Billing & Cancellation Policy' },
  { id: 'refund-policy', number: '05', title: 'Refund Policy' },
  { id: 'service-delivery', number: '06', title: 'Website Development & Service Delivery Terms' },
  { id: 'ip-portfolio', number: '07', title: 'Intellectual Property & Portfolio Usage Terms' },
  { id: 'acceptable-use', number: '08', title: 'Acceptable Use & Security Policy' },
  { id: 'internship-terms', number: '09', title: 'Internship Terms & Conditions' },
  { id: 'grievance-contact', number: '10', title: 'Contact & Grievance Information' },
];

const PENDING_OWNER_DECISIONS = [
  'Finalized subscription tier names and recurring monthly/annual price points',
  'Standard billing cycle, accepted payment methods, and applicable GST/tax invoicing details',
  'One-time onboarding/setup fee amounts (if any) and minimum subscription commitment period',
  'Exact monthly content/design edit allocations, page limits, and storage/bandwidth thresholds per plan',
  'Overdue payment grace period, account suspension timeline, and reactivation charges',
  'Post-cancellation website export, buyout fee structure, and archival/deletion retention window',
  'Standard support operating hours and target response windows by severity',
  'Formal legal entity registration particulars and designated jurisdiction clause (to be confirmed with Indian legal counsel)',
];

const PoliciesPage: React.FC = () => {
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-deep-dark text-light-beige pt-28 pb-24 px-4 sm:px-8 lg:px-16 font-robert-regular">
      <PageMeta
        title="Legal Policies, Subscription Terms & Privacy | TulSip Media"
        description="Read TulSip Media's Terms of Service, Privacy Policy, Cookie & Analytics Notice, Website Subscription & Billing Policy, Refund Policy, IP Terms, and Internship Terms."
        canonicalPath="/policies"
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="border-b border-royal-beige/25 pb-10 mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-royal-beige mb-3">
            Transparency, Governance &amp; Commercial Terms
          </p>
          <h1 className="font-zentry text-4xl sm:text-6xl font-black uppercase text-light-beige tracking-wide leading-none mb-4">
            Policies, Terms &amp; Legal Notices
          </h1>
          <p className="text-sm sm:text-base text-light-beige/85 max-w-3xl leading-relaxed">
            These public policies describe how TulSip Media operates its website, handles enquiries, structures its recurring website service arrangements and custom website development engagements, and administers its student internship programme. Where a specific client Master Client Service Agreement (MCSA), Statement of Work (SOW), Order Schedule, or written Internship Agreement is executed, that signed document governs to the extent of any conflict.
          </p>
        </header>

        {/* Quick Table of Contents */}
        <nav
          aria-label="Policy Sections"
          className="rounded-3xl border border-royal-beige/25 bg-dark-brown/40 p-6 mb-12"
        >
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-4 flex items-center gap-2">
            <FileText size={15} aria-hidden="true" /> Policy Directory
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {POLICY_SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="flex items-center gap-2.5 rounded-xl border border-royal-beige/15 bg-deep-dark/60 px-4 py-2.5 text-xs sm:text-sm text-light-beige hover:border-royal-beige hover:text-royal-beige transition-colors"
              >
                <span className="font-mono text-royal-beige font-bold">{sec.number}</span>
                <span>{sec.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Policy Content Sections */}
        <div className="space-y-10">
          {/* 01. Terms of Service */}
          <section id="terms-of-service" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 01</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">1. Terms of Service</h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                By accessing or using <strong>tulsipmedia.com</strong> (the &ldquo;Website&rdquo;), you agree to use the Website lawfully and in accordance with these Terms of Service. Information on this Website is provided for general informational and business-enquiry purposes and does not constitute a binding offer until a written Order Schedule, Statement of Work (SOW), or Master Client Service Agreement is signed by both parties.
              </p>
              <p>
                TulSip Media provides digital services through <strong>recurring website service arrangements</strong> alongside <strong>individually scoped custom website and web application development</strong>. We do not guarantee search engine rankings, third-party platform approvals, specific traffic volumes, enquiries, or commercial revenue outcomes.
              </p>
              <p>
                Nothing in these terms seeks to exclude or waive mandatory statutory rights available to consumers, applicants, or businesses under applicable law.
              </p>
            </div>
          </section>

          {/* 02. Privacy Policy */}
          <section id="privacy-policy" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 02</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">2. Privacy Policy</h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                <strong>Data We Collect:</strong> When you contact us via our enquiry forms, audit request form, internship application form, email (<a href="mailto:hello@tulsipmedia.com" className="underline text-royal-beige">hello@tulsipmedia.com</a>), or WhatsApp (<a href="tel:+919821005996" className="underline text-royal-beige">+91 9821005996</a>), you voluntarily provide details such as your name, email address, phone/WhatsApp number, business or academic details, portfolio/URL links, and message content.
              </p>
              <p>
                <strong>How Enquiries Are Processed:</strong> Our website forms validate your input in the browser and prepare a structured message for delivery via your email client or WhatsApp, and/or transmit basic non-PII interaction events if analytics is enabled.
              </p>
              <p>
                <strong>Purposes &amp; Lawful Basis:</strong> We process your information to respond to your enquiries, prepare subscription or custom project proposals, evaluate internship applications, verify academic credentials issued by TulSip Media, maintain security, and comply with legal obligations.
              </p>
              <p>
                <strong>Service Providers &amp; Sharing:</strong> We do not sell personal data. However, data is processed through infrastructure and communication providers necessary to operate our business—such as email hosting providers, WhatsApp/Meta communication channels, web hosting/CDN infrastructure, font delivery services (Google Fonts / Fontshare), and analytics tools when configured.
              </p>
              <p>
                <strong>Retention &amp; Your Rights:</strong> We retain enquiry and client records only for as long as reasonably necessary to fulfil the purpose for which they were collected or to comply with legal, tax, or contractual record-keeping requirements. Subject to applicable law (including India&rsquo;s Digital Personal Data Protection Act, 2023), you may request access to, correction of, or erasure of your personal data, or withdraw consent, by emailing <a href="mailto:hello@tulsipmedia.com" className="underline text-royal-beige">hello@tulsipmedia.com</a>.
              </p>
            </div>
          </section>

          {/* 03. Cookie & Analytics Notice */}
          <section id="cookie-analytics" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 03</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">3. Cookie &amp; Analytics Notice</h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                <strong>Essential Browser Storage:</strong> We use lightweight browser <code>sessionStorage</code> keys to prevent accidental duplicate form submissions (rate-limiting cooldown) and custom events to remember your in-page video motion pause/play preference.
              </p>
              <p>
                <strong>Google Analytics 4 (When Enabled):</strong> Where a verified Google Analytics 4 measurement ID is configured in production, GA4 uses first-party cookies to measure aggregate page views and non-sensitive interaction events (such as clicking an enquiry button). IP anonymization is enabled, browser Do-Not-Track (<code>DNT: 1</code>) signals are respected, and we never transmit form text, personal names, emails, or phone numbers into analytics parameters.
              </p>
            </div>
          </section>

          {/* 04. Subscription Plans, Billing & Cancellation Policy */}
          <section id="subscription-policy" className="scroll-mt-28 rounded-3xl border-2 border-royal-beige/45 bg-dark-brown/35 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 04 · Recurring Service Arrangements</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">
              4. Subscription Plans, Billing &amp; Cancellation Policy
            </h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                <strong>Recurring Website Service Arrangements:</strong> TulSip Media offers recurring website service plans designed to provide a lower initial financial barrier for eligible businesses alongside structured ongoing maintenance and care. Custom website and web application development is also offered under an individually scoped Statement of Work and milestone quotation.
              </p>
              <p>
                <strong>Separation of Charges:</strong> Your written Order Schedule distinguishes between: (a) the recurring subscription fee covering the agreed website scope and routine maintenance; (b) any one-time onboarding, initial setup, or legacy data migration fee; and (c) third-party pass-through costs such as domain registration/renewal, external hosting/bandwidth, paid plugins, third-party APIs, and advertising media spend.
              </p>
              <p>
                <strong>Billing, Renewals &amp; Overdue Accounts:</strong> Subscription fees are billed in advance on the recurring cycle specified in your Order Schedule. If a scheduled payment fails or becomes overdue beyond the contractual grace period, TulSip Media may pause routine updates or temporarily suspend managed hosting/services after providing written notice, until the account is brought current.
              </p>
              <p>
                <strong>Cancellation &amp; Effect of Termination:</strong> Either party may cancel or elect not to renew a subscription by providing written notice in accordance with the notice period and any minimum commitment term stated in the signed Order Schedule. Upon termination or non-renewal, access to managed subscription hosting, proprietary subscription templates, and ongoing maintenance ceases at the end of the paid billing period unless a written buyout, migration, or export arrangement has been agreed and paid for. Client-owned domain names, client-supplied brand assets, and original text/images provided by the client remain the client&rsquo;s property.
              </p>
            </div>
          </section>

          {/* 05. Refund Policy */}
          <section id="refund-policy" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 05</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">5. Refund Policy</h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                Because website design, engineering, and creative production involve dedicated specialist labour allocated upon project or billing-cycle commencement:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Recurring Subscription Periods:</strong> Fees for a billing period already underway or completed, and one-time onboarding/setup work already performed, are generally non-refundable once work or service allocation has commenced, except as expressly stated in your signed Order Schedule or required by mandatory consumer/commercial law.
                </li>
                <li>
                  <strong>Custom / On-Demand Milestones:</strong> Milestone payments for custom development correspond to defined project phases and are non-refundable once the respective phase deliverables have been approved or work on that milestone has been substantially performed, subject to the terms of the applicable Statement of Work.
                </li>
                <li>
                  <strong>Third-Party Fees:</strong> Domain registrations, third-party software licences, hosting charges, and ad platform spend paid to external vendors on your behalf are governed by those vendors&rsquo; policies and are non-refundable through TulSip Media.
                </li>
              </ul>
            </div>
          </section>

          {/* 06. Website Development & Service Delivery Terms */}
          <section id="service-delivery" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <div id="delivery-terms" className="scroll-mt-28" />
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 06</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">
              6. Website Development &amp; Service Delivery Terms
            </h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                <strong>Client Cooperation &amp; Content:</strong> Timely delivery depends on prompt client feedback, brand guidelines, accurate business/product information, and necessary account credentials. Delays in client approvals or content supply extend estimated timelines accordingly.
              </p>
              <p>
                <strong>Revisions &amp; Change Requests:</strong> Each subscription plan or custom Statement of Work specifies the included scope of pages, design iterations, or monthly update requests. We do not offer &ldquo;unlimited&rdquo; un-scoped development; requests outside the agreed plan or SOW are quoted transparently before execution.
              </p>
              <p>
                <strong>Third-Party Dependencies:</strong> Websites may integrate third-party browsers, hosting providers, CMS platforms, analytics, payment gateways, or APIs. While we engineer for high reliability, no provider can guarantee 100% uninterrupted uptime or immunity from upstream third-party changes.
              </p>
            </div>
          </section>

          {/* 07. Intellectual Property & Portfolio Usage Terms */}
          <section id="ip-portfolio" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 07</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">
              7. Intellectual Property &amp; Portfolio Usage Terms
            </h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                <strong>Client Materials:</strong> You retain full ownership of all trademarks, logos, written copy, photography, and proprietary data that you supply to TulSip Media.
              </p>
              <p>
                <strong>Subscription vs. Custom Deliverable Licensing:</strong> Under a recurring website subscription plan, you receive an active licence to use the website and design system for the duration of your paid subscription (unless a source-code/asset buyout is executed under your Order Schedule). Under a custom/on-demand Statement of Work, ownership or licensing of bespoke deliverables transfers upon full payment of all agreed milestone fees, as specified in the SOW.
              </p>
              <p>
                <strong>Reusable Libraries &amp; Open-Source Software:</strong> TulSip Media retains ownership of its pre-existing code libraries, internal utilities, and design frameworks. Open-source packages (such as React, Tailwind CSS, GSAP, Framer Motion, and Lucide icons) remain governed by their respective open-source licences.
              </p>
              <p>
                <strong>Portfolio Display:</strong> Unless a written confidentiality or non-disclosure restriction is agreed in advance, TulSip Media may reference non-confidential aspects of completed work or display visual previews in its portfolio.
              </p>
            </div>
          </section>

          {/* 08. Acceptable Use & Security Policy */}
          <section id="acceptable-use" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 08</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">
              8. Acceptable Use &amp; Security Policy
            </h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                Visitors and clients must not use this Website or any TulSip Media-managed website to transmit unlawful, defamatory, infringing, fraudulent, or malicious material, or attempt automated scraping, form-spamming, or unauthorized security probing. While we apply reasonable technical safeguards, no internet transmission or hosting environment can be guaranteed to be 100% immune from security incidents.
              </p>
            </div>
          </section>

          {/* 09. Internship Terms & Conditions */}
          <section id="internship-terms" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 09 · Student &amp; Graduate Programme</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">
              9. Internship Terms &amp; Conditions
            </h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                TulSip Media&rsquo;s internship programme is structured around the following transparent terms, which must be read alongside any individual written Offer Letter, Internship Agreement, and Confidentiality Undertaking:
              </p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>
                  <strong>Eligibility:</strong> Applicants must be at least 18 years of age and meet the stated educational or skill prerequisites for the selected track (open to eligible Diploma, UG, PG, BCA, MCA, and equivalent students/graduates).
                </li>
                <li>
                  <strong>Expected Minimum Duration:</strong> The expected minimum internship duration is <strong>three (3) months</strong> unless an applicable academic programme or written offer letter expressly states otherwise.
                </li>
                <li>
                  <strong>Compensation &amp; Mentorship Structure:</strong> The initial three-month period is an <strong>unpaid learning and project-mentorship phase</strong> unless the individual written offer expressly provides otherwise, subject to applicable law.
                </li>
                <li>
                  <strong>Performance Consideration (No Guarantee):</strong> Exceptional performance, reliability, work quality, attendance, conduct, client feedback, and business needs may lead to consideration for a paid/stipend extension or employment opportunity. <strong>Neither a paid extension nor employment is guaranteed</strong>, and any paid arrangement must be separately confirmed in writing.
                </li>
                <li>
                  <strong>Work Mode:</strong> Each opening specifies whether participation is remote, hybrid, or on-site (Delhi NCR) in the written offer letter.
                </li>
                <li>
                  <strong>Portal &amp; Regulatory Accuracy:</strong> TulSip Media does not claim to be an &ldquo;AICTE-approved company.&rdquo; Where relevant for university documentation, TulSip Media issues official offer letters, College NOC confirmations, and completion certificates with unique verification IDs for interns who satisfactorily complete their programme.
                </li>
              </ul>
              <p className="text-xs text-royal-beige/90 bg-deep-dark/60 p-3.5 rounded-xl border border-royal-beige/20 mt-3">
                <strong>Legal Safeguard Notice:</strong> Calling a role an internship does not automatically make unpaid work lawful in every circumstance. Programme duties, mentorship structure, and individual internship agreements should be reviewed by a qualified Indian advocate prior to onboarding.
              </p>
            </div>
          </section>

          {/* 10. Contact & Grievance Information */}
          <section id="grievance-contact" className="scroll-mt-28 rounded-3xl border border-royal-beige/20 bg-dark-brown/25 p-6 sm:p-8">
            <span className="font-mono text-xs uppercase tracking-widest text-royal-beige">Section 10</span>
            <h2 className="text-2xl font-bold text-light-beige mt-1 mb-4">
              10. Contact &amp; Grievance Information
            </h2>
            <div className="space-y-3 text-sm text-light-beige/85 leading-relaxed">
              <p>
                For any questions, policy clarifications, privacy requests, billing enquiries, or grievances regarding this Website or TulSip Media&rsquo;s services, please contact:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="rounded-2xl border border-royal-beige/20 bg-deep-dark/70 p-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-royal-beige mb-1">
                    Primary Contact &amp; Grievance Officer
                  </div>
                  <div className="font-bold text-light-beige">Atul Gulia — Founder, TulSip Media</div>
                  <div className="text-xs text-light-beige/75 mt-1">Region: Delhi NCR, India</div>
                </div>
                <div className="rounded-2xl border border-royal-beige/20 bg-deep-dark/70 p-4 space-y-1.5">
                  <a href="mailto:hello@tulsipmedia.com" className="flex items-center gap-2 text-xs sm:text-sm text-royal-beige hover:text-light-beige">
                    <Mail size={14} /> hello@tulsipmedia.com
                  </a>
                  <a href="tel:+919821005996" className="flex items-center gap-2 text-xs sm:text-sm text-royal-beige hover:text-light-beige">
                    <Phone size={14} /> +91 9821005996 (Phone &amp; WhatsApp)
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Draft Commercial & Legal Review Schedule Box (Flagged for Owner Confirmation) */}
          <section className="rounded-3xl border-2 border-dashed border-royal-beige/45 bg-deep-dark/90 p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-4">
              <AlertTriangle size={20} className="text-royal-beige shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-bold text-light-beige">
                  Commercial &amp; Legal Confirmation Schedule (Owner &amp; Counsel Review)
                </h2>
                <p className="text-xs text-light-beige/80 mt-1 leading-relaxed">
                  To ensure zero invented prices, SLAs, or unverified legal claims are published on the public site, the following specific commercial and legal parameters are governed by each client&rsquo;s written Order Schedule / SOW and are flagged for final owner and Indian legal counsel confirmation:
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-light-beige/85">
              {PENDING_OWNER_DECISIONS.map((item, i) => (
                <li key={i} className="flex items-start gap-2 rounded-xl bg-dark-brown/35 p-3 border border-royal-beige/15">
                  <ShieldCheck size={14} className="text-royal-beige shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;
