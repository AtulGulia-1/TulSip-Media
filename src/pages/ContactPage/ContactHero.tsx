import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, CheckCircle2, AlertCircle, Copy, Check, Shield } from 'lucide-react';
import TypingMessages from './TypingMessages';
import { trackAnalyticsEvent } from '../../components/AnalyticsManager';
import {
  FIELD_LIMITS,
  sanitizeText,
  isValidEmail,
  isValidPhone,
  checkRateLimitCooldown,
  recordRateLimitSubmission,
} from '../../utils/security';

interface EnquiryFormState {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  engagementModel: 'subscription' | 'custom' | 'general';
  message: string;
  consentAccepted: boolean;
  honeypot: string;
}

const RATE_LIMIT_KEY = 'tulsip_contact_last_submit_ts';
const COOLDOWN_MS = 30000;

const ContactHero = () => {
  const location = useLocation();
  const [form, setForm] = useState<EnquiryFormState>({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    engagementModel: 'subscription',
    message: '',
    consentAccepted: false,
    honeypot: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    title: string;
    detail: string;
    preparedSummary?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const handleFormFocus = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackAnalyticsEvent('contact_form_start', { form_name: 'contact_enquiry' });
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const model = params.get('model');
    if (model === 'custom') {
      setForm((prev) => ({ ...prev, engagementModel: 'custom' }));
    } else if (model === 'subscription' || model === 'recurring') {
      setForm((prev) => ({ ...prev, engagementModel: 'subscription' }));
    }
  }, [location.search]);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    const cleanName = sanitizeText(form.name, FIELD_LIMITS.name, false);
    const cleanEmail = sanitizeText(form.email, FIELD_LIMITS.email, false);
    const cleanMessage = sanitizeText(form.message, FIELD_LIMITS.message, true);

    if (cleanName.length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!isValidEmail(cleanEmail)) {
      nextErrors.email = 'Please enter a valid business or personal email address.';
    }
    if (form.phone.trim() && !isValidPhone(form.phone)) {
      nextErrors.phone = 'Please enter a valid phone or WhatsApp number.';
    }
    if (cleanMessage.length < 15) {
      nextErrors.message = 'Please share a brief overview of your website needs (at least 15 characters).';
    }
    if (!form.consentAccepted) {
      nextErrors.consentAccepted = 'Please confirm that you have reviewed our Privacy & Terms notice.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 1. Honeypot anti-spam check
    if (sanitizeText(form.honeypot, 100) !== '') {
      setStatusMessage({
        type: 'error',
        title: 'Submission blocked by spam filter',
        detail: 'If you are a human visitor, please clear the hidden field or email hello@tulsipmedia.com directly.',
      });
      return;
    }

    // 2. Rate-limiting cooldown check
    const cooldown = checkRateLimitCooldown(RATE_LIMIT_KEY, COOLDOWN_MS);
    if (!cooldown.allowed) {
      setStatusMessage({
        type: 'error',
        title: 'Please wait before submitting again',
        detail: `To prevent duplicate enquiries, please wait ${cooldown.retryAfterSeconds} seconds before sending another request.`,
      });
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const modelLabel =
        form.engagementModel === 'subscription'
          ? 'Website Solution with Recurring Payments (Lower Upfront Cost)'
          : form.engagementModel === 'custom'
          ? 'Custom Website / Web App Development (Individually Scoped)'
          : 'General Service / Policy Enquiry';

      const cleanName = sanitizeText(form.name, FIELD_LIMITS.name, false);
      const cleanEmail = sanitizeText(form.email, FIELD_LIMITS.email, false);
      const cleanPhone = sanitizeText(form.phone || 'Not provided', FIELD_LIMITS.phone, false);
      const cleanBiz = sanitizeText(form.businessName || 'Not specified', FIELD_LIMITS.businessName, false);
      const cleanMsg = sanitizeText(form.message, FIELD_LIMITS.message, true);

      const summaryLines = [
        `Name: ${cleanName}`,
        `Email: ${cleanEmail}`,
        `Phone / WhatsApp: ${cleanPhone}`,
        `Business / Brand: ${cleanBiz}`,
        `Preferred Option: ${modelLabel}`,
        '',
        'Project Details:',
        cleanMsg,
      ].join('\n');

      recordRateLimitSubmission(RATE_LIMIT_KEY);

      // Privacy-safe analytics event (no PII / email / message sent)
      trackAnalyticsEvent('contact_enquiry_prepared', {
        engagement_model: form.engagementModel,
      });

      const subject = encodeURIComponent(
        `[${form.engagementModel === 'subscription' ? 'Recurring Website Solution' : 'Custom Website Project'}] ${sanitizeText(form.businessName || form.name, 80, false)} — TulSip Media`
      );
      const body = encodeURIComponent(summaryLines);

      window.location.href = `mailto:hello@tulsipmedia.com?subject=${subject}&body=${body}`;

      setStatusMessage({
        type: 'success',
        title: 'Enquiry Prepared — Complete Send in Your Email App',
        detail:
          'We have formatted your enquiry and opened your email client addressed to hello@tulsipmedia.com. Please press Send in your mail app to complete delivery, or copy the summary below to send via WhatsApp or webmail.',
        preparedSummary: summaryLines,
      });
    } catch {
      setStatusMessage({
        type: 'error',
        title: 'Could not open your email client automatically',
        detail:
          'Your form data has been preserved. Please email hello@tulsipmedia.com directly or message us on WhatsApp (+91 9821005996).',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    if (!statusMessage?.preparedSummary) return;
    try {
      await navigator.clipboard.writeText(statusMessage.preparedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard error
    }
  };

  return (
    <div className="min-h-screen bg-light-beige pt-24 md:pt-32 pb-20 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260427_054418_a6d194f0-ac86-4df9-abe5-ded73e596d7c.mp4"
          preload="metadata"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-light-beige/85 via-light-beige/75 to-light-beige pointer-events-none" />
      </div>

      <div className="relative z-20 px-4 w-full max-w-5xl mx-auto mt-6">
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-dark-brown mb-3">
            Website Development &amp; Digital Solutions
          </p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-deep-dark text-[36px] md:text-[52px] lg:text-[64px] leading-[0.94] tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-instrument)' }}
          >
            Start a Website or <br /> Digital Project.
          </motion.h1>

          <p
            className="text-deep-dark/85 text-[15px] md:text-[17px] leading-relaxed font-normal max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Tell TulSip Media about your business goals, required pages or features, and timeline. Choose between a <strong>recurring website service arrangement</strong> (lower initial barrier) or an <strong>individually scoped custom website project</strong>.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <a
              href="mailto:hello@tulsipmedia.com?subject=Website%20Project%20Enquiry%20%E2%80%94%20TulSip%20Media"
              onClick={() => trackAnalyticsEvent('direct_email_click')}
              className="flex items-center justify-center gap-2 px-7 py-3 bg-cta glow-cta text-deep-dark rounded-full text-sm font-semibold transition-colors w-full sm:w-auto"
            >
              <Mail size={16} />
              hello@tulsipmedia.com
            </a>
            <a
              href="https://wa.me/919821005996?text=Hello%20TulSip%20Media%2C%20I%20would%20like%20to%20discuss%20a%20website%20development%20project."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAnalyticsEvent('whatsapp_enquiry_click')}
              className="flex items-center justify-center gap-2 px-7 py-3 bg-deep-dark text-light-beige border border-royal-beige/40 rounded-full text-sm font-semibold transition-colors w-full sm:w-auto shadow-lg"
            >
              <MessageCircle size={16} />
              WhatsApp (+91 9821005996)
            </a>
          </div>
        </div>

        {/* Protected Enquiry Form Card */}
        <div className="rounded-3xl border border-royal-beige/40 bg-deep-dark text-light-beige p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto">
          <div className="flex items-center justify-between border-b border-royal-beige/20 pb-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-light-beige">
                Project &amp; Website Solutions Enquiry
              </h2>
              <p className="text-xs text-royal-beige mt-0.5">
                Protected against automated spam • Direct to TulSip Media
              </p>
            </div>
            <Shield size={20} className="text-royal-beige shrink-0" aria-hidden="true" />
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Honeypot Field */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company_url_trap">Leave this field blank</label>
              <input
                id="company_url_trap"
                name="company_url_trap"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.honeypot}
                onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              />
            </div>

            {/* Engagement Option Radio Selector */}
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-wider text-royal-beige mb-2.5">
                Preferred Way to Work Together *
              </legend>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'subscription',
                    title: 'Recurring Website Solution',
                    badge: 'Option A',
                    desc: 'Lower upfront barrier + ongoing care & support',
                  },
                  {
                    id: 'custom',
                    title: 'Custom Website Build',
                    badge: 'Option B',
                    desc: 'Individually scoped project & milestone quote',
                  },
                  {
                    id: 'general',
                    title: 'General Enquiry',
                    badge: 'Other',
                    desc: 'Audit, partnership, or policy question',
                  },
                ].map((opt) => {
                  const selected = form.engagementModel === opt.id;
                  return (
                    <label
                      key={opt.id}
                      className={`cursor-pointer rounded-2xl border p-3.5 transition-all flex flex-col justify-between ${
                        selected
                          ? 'border-royal-beige bg-dark-brown/85 shadow-md'
                          : 'border-royal-beige/25 bg-dark-brown/30 hover:border-royal-beige/50'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-royal-beige">
                          {opt.badge}
                        </span>
                        <input
                          type="radio"
                          name="engagementModel"
                          value={opt.id}
                          checked={selected}
                          onChange={() =>
                            setForm({
                              ...form,
                              engagementModel: opt.id as EnquiryFormState['engagementModel'],
                            })
                          }
                          className="accent-[#BDA07E]"
                        />
                      </div>
                      <span className="text-sm font-bold text-light-beige">{opt.title}</span>
                      <span className="text-[11px] text-light-beige/70 mt-1">{opt.desc}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase tracking-wider text-royal-beige mb-1.5">
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  maxLength={FIELD_LIMITS.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'err-contact-name' : undefined}
                  placeholder="e.g. Rohan Sharma"
                  className="w-full rounded-xl border border-royal-beige/30 bg-dark-brown/50 px-4 py-3 text-sm text-light-beige placeholder:text-light-beige/40 focus:border-royal-beige focus:outline-none"
                />
                {errors.name && (
                  <p id="err-contact-name" className="mt-1 text-xs text-royal-beige flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase tracking-wider text-royal-beige mb-1.5">
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={FIELD_LIMITS.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-contact-email' : undefined}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-royal-beige/30 bg-dark-brown/50 px-4 py-3 text-sm text-light-beige placeholder:text-light-beige/40 focus:border-royal-beige focus:outline-none"
                />
                {errors.email && (
                  <p id="err-contact-email" className="mt-1 text-xs text-royal-beige flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="block text-xs font-bold uppercase tracking-wider text-royal-beige mb-1.5">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  maxLength={FIELD_LIMITS.phone}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'err-contact-phone' : undefined}
                  placeholder="+91 98210 05996"
                  className="w-full rounded-xl border border-royal-beige/30 bg-dark-brown/50 px-4 py-3 text-sm text-light-beige placeholder:text-light-beige/40 focus:border-royal-beige focus:outline-none"
                />
                {errors.phone && (
                  <p id="err-contact-phone" className="mt-1 text-xs text-royal-beige flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="contact-business" className="block text-xs font-bold uppercase tracking-wider text-royal-beige mb-1.5">
                  Business / Website URL (Optional)
                </label>
                <input
                  id="contact-business"
                  type="text"
                  maxLength={FIELD_LIMITS.businessName}
                  value={form.businessName}
                  onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                  placeholder="Your brand name or current URL"
                  className="w-full rounded-xl border border-royal-beige/30 bg-dark-brown/50 px-4 py-3 text-sm text-light-beige placeholder:text-light-beige/40 focus:border-royal-beige focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase tracking-wider text-royal-beige mb-1.5">
                How Can We Help? *
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                maxLength={FIELD_LIMITS.message}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'err-contact-message' : undefined}
                placeholder="Tell us about your business, key pages or features needed, preferred payment arrangement, and target timeline."
                className="w-full rounded-xl border border-royal-beige/30 bg-dark-brown/50 px-4 py-3 text-sm text-light-beige placeholder:text-light-beige/40 focus:border-royal-beige focus:outline-none"
              />
              {errors.message && (
                <p id="err-contact-message" className="mt-1 text-xs text-royal-beige flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </div>

            <div>
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-light-beige/85">
                <input
                  type="checkbox"
                  checked={form.consentAccepted}
                  onChange={(e) => setForm({ ...form, consentAccepted: e.target.checked })}
                  className="mt-0.5 accent-[#BDA07E]"
                />
                <span>
                  I have reviewed TulSip Media&apos;s{' '}
                  <a href="/policies" className="underline text-royal-beige hover:text-light-beige">
                    Terms, Privacy &amp; Service Policies
                  </a>{' '}
                  and consent to being contacted regarding this enquiry. *
                </span>
              </label>
              {errors.consentAccepted && (
                <p className="mt-1 text-xs text-royal-beige flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.consentAccepted}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-cta glow-cta py-3.5 font-general text-xs font-bold uppercase tracking-wider text-deep-dark transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              {isSubmitting ? 'Preparing Enquiry...' : 'Prepare & Send Enquiry'}
            </button>
          </form>

          {/* Accessible Submission Status & Confirmation Panel */}
          <div aria-live="polite" role="status" className="mt-5">
            {statusMessage && (
              <div
                className={`rounded-2xl border p-5 ${
                  statusMessage.type === 'success'
                    ? 'border-royal-beige bg-dark-brown/90 text-light-beige'
                    : 'border-royal-beige/60 bg-dark-brown/60 text-light-beige'
                }`}
              >
                <div className="flex items-start gap-3">
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 size={20} className="text-royal-beige shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <AlertCircle size={20} className="text-royal-beige shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-light-beige">{statusMessage.title}</h3>
                    <p className="text-xs text-light-beige/85 mt-1 leading-relaxed">
                      {statusMessage.detail}
                    </p>
                    {statusMessage.preparedSummary && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="inline-flex items-center gap-1.5 rounded-full border border-royal-beige/45 bg-deep-dark px-4 py-1.5 text-xs font-semibold text-royal-beige hover:border-royal-beige hover:text-light-beige"
                        >
                          {copied ? <Check size={13} /> : <Copy size={13} />}
                          <span>{copied ? 'Copied Enquiry Summary' : 'Copy Enquiry Summary'}</span>
                        </button>
                        <a
                          href="https://wa.me/919821005996"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-royal-beige px-4 py-1.5 text-xs font-semibold text-deep-dark"
                        >
                          <MessageCircle size={13} /> Send via WhatsApp Instead
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <TypingMessages />
      </div>
    </div>
  );
};

export default ContactHero;
