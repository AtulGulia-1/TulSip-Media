import { trackAnalyticsEvent } from '../../components/AnalyticsManager';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ChevronDown, AlertCircle, Mail, MessageCircle } from 'lucide-react';
import {
  FIELD_LIMITS,
  sanitizeText,
  isValidEmail,
  isValidSafeUrl,
  checkRateLimitCooldown,
  recordRateLimitSubmission,
} from '../../utils/security';

interface FormState {
  fullName: string;
  brandName: string;
  instagram: string;
  website: string;
  email: string;
  monthlySpend: string;
  challenge: string;
  helpText: string;
  honeypot: string;
}

const AUDIT_RATE_LIMIT_KEY = 'tulsip_audit_last_submit_ts';

const initialFormState: FormState = {
  fullName: '',
  brandName: '',
  instagram: '',
  website: '',
  email: '',
  monthlySpend: '',
  challenge: '',
  helpText: '',
  honeypot: '',
};

const AuditForm = () => {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'rateLimit', string>>>({});
  const [submittedPayload, setSubmittedPayload] = useState<FormState | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasStartedAuditForm, setHasStartedAuditForm] = useState(false);

  const challenges = [
    'Website Redesign or New Build',
    'Low Website Conversions / Enquiries',
    'Technical SEO & Search Visibility',
    'E-Commerce Storefront UX',
    'Brand Positioning & Messaging',
    'Social Content & Ad Creatives',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!hasStartedAuditForm) {
      setHasStartedAuditForm(true);
      trackAnalyticsEvent('contact_form_start', { form_name: 'brand_audit' });
    }
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState] || errors.rateLimit) {
      setErrors((prev) => ({ ...prev, [name]: '', rateLimit: '' }));
    }
  };

  const selectChallenge = (val: string) => {
    setForm((prev) => ({ ...prev, challenge: val }));
    setErrors((prev) => ({ ...prev, challenge: '' }));
    setIsDropdownOpen(false);
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof FormState | 'rateLimit', string>> = {};
    const cleanName = sanitizeText(form.fullName, FIELD_LIMITS.name, false);
    const cleanBrand = sanitizeText(form.brandName, FIELD_LIMITS.businessName, false);
    const cleanSocial = sanitizeText(form.instagram, FIELD_LIMITS.socialHandle, false);
    const cleanWebsite = sanitizeText(form.website, FIELD_LIMITS.url, false);
    const cleanEmail = sanitizeText(form.email, FIELD_LIMITS.email, false);

    if (cleanName.length < 2) newErrors.fullName = 'Full name is required (at least 2 characters)';
    if (cleanBrand.length < 2) newErrors.brandName = 'Brand or business name is required';
    if (cleanSocial.length < 2) newErrors.instagram = 'Instagram handle or social profile is required';
    if (!cleanWebsite) {
      newErrors.website = "Website URL (or 'None yet') is required";
    } else if (!isValidSafeUrl(cleanWebsite, { required: true, allowNoneKeyword: true })) {
      newErrors.website = "Please enter a valid http/https domain or 'None yet'";
    }
    if (!cleanEmail) {
      newErrors.email = 'Email address is required';
    } else if (!isValidEmail(cleanEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!challenges.includes(form.challenge)) {
      newErrors.challenge = 'Please select your primary focus area';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMailtoUrl = (data: FormState) => {
    const cleanBrand = sanitizeText(data.brandName, FIELD_LIMITS.businessName, false);
    const subject = encodeURIComponent(`Website & Brand Audit Request — ${cleanBrand}`);
    const body = encodeURIComponent(
      [
        'Hello TulSip Media,',
        '',
        'I would like to request a Website & Brand Audit:',
        '',
        `• Full Name: ${sanitizeText(data.fullName, FIELD_LIMITS.name, false)}`,
        `• Brand Name: ${cleanBrand}`,
        `• Website URL: ${sanitizeText(data.website, FIELD_LIMITS.url, false)}`,
        `• Instagram / Social: ${sanitizeText(data.instagram, FIELD_LIMITS.socialHandle, false)}`,
        `• Email: ${sanitizeText(data.email, FIELD_LIMITS.email, false)}`,
        `• Approximate Budget / Monthly Spend: ${sanitizeText(data.monthlySpend || 'Not specified', FIELD_LIMITS.budget, false)}`,
        `• Primary Focus Area: ${sanitizeText(data.challenge, FIELD_LIMITS.challenge, false)}`,
        `• Additional Context: ${sanitizeText(data.helpText || 'None provided', FIELD_LIMITS.message, true)}`,
      ].join('\n')
    );
    return `mailto:hello@tulsipmedia.com?subject=${subject}&body=${body}`;
  };

  const buildWhatsAppUrl = (data: FormState) => {
    const text = encodeURIComponent(
      [
        `Hi TulSip Media, I'd like to request an Audit for *${sanitizeText(data.brandName, FIELD_LIMITS.businessName, false)}*.`,
        `Name: ${sanitizeText(data.fullName, FIELD_LIMITS.name, false)}`,
        `Website: ${sanitizeText(data.website, FIELD_LIMITS.url, false)}`,
        `Social: ${sanitizeText(data.instagram, FIELD_LIMITS.socialHandle, false)}`,
        `Focus: ${sanitizeText(data.challenge, FIELD_LIMITS.challenge, false)}`,
      ].join('\n')
    );
    return `https://wa.me/919821005996?text=${text}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sanitizeText(form.honeypot, 100) !== '') {
      setErrors({ rateLimit: 'Submission blocked by spam filter.' });
      return;
    }

    const cooldown = checkRateLimitCooldown(AUDIT_RATE_LIMIT_KEY, 30000);
    if (!cooldown.allowed) {
      setErrors({
        rateLimit: `Please wait ${cooldown.retryAfterSeconds} seconds before submitting another audit request.`,
      });
      return;
    }

    if (!validate()) return;
    recordRateLimitSubmission(AUDIT_RATE_LIMIT_KEY);
    trackAnalyticsEvent('generate_lead', {
      form_name: 'brand_audit',
      focus_area: form.challenge,
    });
    const snapshot: FormState = {
      ...form,
      fullName: sanitizeText(form.fullName, FIELD_LIMITS.name, false),
      brandName: sanitizeText(form.brandName, FIELD_LIMITS.businessName, false),
      instagram: sanitizeText(form.instagram, FIELD_LIMITS.socialHandle, false),
      website: sanitizeText(form.website, FIELD_LIMITS.url, false),
      email: sanitizeText(form.email, FIELD_LIMITS.email, false),
      monthlySpend: sanitizeText(form.monthlySpend, FIELD_LIMITS.budget, false),
      helpText: sanitizeText(form.helpText, FIELD_LIMITS.message, true),
    };
    setSubmittedPayload(snapshot);
    window.location.href = buildMailtoUrl(snapshot);
  };

  return (
    <section id="audit-form" className="py-24 px-6 md:px-12 lg:px-20 bg-deep-dark border-b border-royal-beige/15 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-[10%] w-[60vw] h-[50vh] rounded-full bg-royal-beige/5 blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vh] rounded-full bg-royal-beige/5 blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-[800px] w-full mx-auto relative z-10">
        <div className="mb-16 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-royal-beige mb-2 block">
            REQUEST AUDIT
          </span>
          <h2 className="font-zentry text-4xl sm:text-5xl md:text-6xl font-black uppercase text-light-beige tracking-tighter leading-none mb-4">
            Request Your <span className="font-serif italic text-transparent bg-clip-text accent-gradient font-normal tracking-normal lowercase">audit.</span>
          </h2>
          <p className="text-xs sm:text-sm text-light-beige/75 font-light leading-relaxed max-w-md mx-auto">
            Share your website and brand details below. Submitting prepares your structured audit brief for direct delivery via email or WhatsApp.
          </p>
        </div>

        <div className="relative rounded-[32px] border border-royal-beige/20 bg-dark-brown/30 backdrop-blur-xl p-8 sm:p-12 shadow-[0_20px_50px_rgba(30, 17, 16,0.3)] overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-light-beige/30 to-transparent" />
          
          <AnimatePresence mode="wait">
            {!submittedPayload ? (
              <motion.form 
                key="audit-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 md:gap-8 w-full"
                noValidate
              >
                {/* Honeypot anti-spam trap */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="audit_website_trap">Leave blank</label>
                  <input
                    type="text"
                    id="audit_website_trap"
                    name="honeypot"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honeypot}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="fullName" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Full Name *</label>
                    <input 
                      type="text" 
                      id="fullName" 
                      name="fullName"
                      maxLength={FIELD_LIMITS.name}
                      value={form.fullName}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? "err-fullName" : undefined}
                      placeholder="e.g. Atul Gulia"
                      className={`w-full bg-dark-brown/35 border rounded-xl px-4 py-3.5 text-sm text-light-beige placeholder-royal-beige/40 focus:outline-none focus:ring-1 transition-all ${
                        errors.fullName ? 'border-royal-beige/60 focus:ring-royal-beige' : 'border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E]'
                      }`}
                      required
                    />
                    {errors.fullName && (
                      <span id="err-fullName" className="text-[10px] text-royal-beige mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.fullName}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="brandName" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Brand / Business Name *</label>
                    <input 
                      type="text" 
                      id="brandName" 
                      name="brandName"
                      maxLength={FIELD_LIMITS.businessName}
                      value={form.brandName}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.brandName}
                      aria-describedby={errors.brandName ? "err-brandName" : undefined}
                      placeholder="e.g. Nucleus Derma Care"
                      className={`w-full bg-dark-brown/35 border rounded-xl px-4 py-3.5 text-sm text-light-beige placeholder-royal-beige/40 focus:outline-none focus:ring-1 transition-all ${
                        errors.brandName ? 'border-royal-beige/60 focus:ring-royal-beige' : 'border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E]'
                      }`}
                      required
                    />
                    {errors.brandName && (
                      <span id="err-brandName" className="text-[10px] text-royal-beige mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.brandName}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="instagram" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Instagram Handle / Social Profile *</label>
                    <input 
                      type="text" 
                      id="instagram" 
                      name="instagram"
                      maxLength={FIELD_LIMITS.socialHandle}
                      value={form.instagram}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.instagram}
                      aria-describedby={errors.instagram ? "err-instagram" : undefined}
                      placeholder="e.g. @yourbrand"
                      className={`w-full bg-dark-brown/35 border rounded-xl px-4 py-3.5 text-sm text-light-beige placeholder-royal-beige/40 focus:outline-none focus:ring-1 transition-all ${
                        errors.instagram ? 'border-royal-beige/60 focus:ring-royal-beige' : 'border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E]'
                      }`}
                      required
                    />
                    {errors.instagram && (
                      <span id="err-instagram" className="text-[10px] text-royal-beige mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.instagram}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="website" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Current Website URL (or &quot;None&quot;) *</label>
                    <input 
                      type="text" 
                      id="website" 
                      name="website"
                      maxLength={FIELD_LIMITS.url}
                      value={form.website}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.website}
                      aria-describedby={errors.website ? "err-website" : undefined}
                      placeholder="e.g. https://yourbusiness.com"
                      className={`w-full bg-dark-brown/35 border rounded-xl px-4 py-3.5 text-sm text-light-beige placeholder-royal-beige/40 focus:outline-none focus:ring-1 transition-all ${
                        errors.website ? 'border-royal-beige/60 focus:ring-royal-beige' : 'border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E]'
                      }`}
                      required
                    />
                    {errors.website && (
                      <span id="err-website" className="text-[10px] text-royal-beige mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.website}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Email Address *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      maxLength={FIELD_LIMITS.email}
                      value={form.email}
                      onChange={handleInputChange}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      placeholder="e.g. you@company.com"
                      className={`w-full bg-dark-brown/35 border rounded-xl px-4 py-3.5 text-sm text-light-beige placeholder-royal-beige/40 focus:outline-none focus:ring-1 transition-all ${
                        errors.email ? 'border-royal-beige/60 focus:ring-royal-beige' : 'border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E]'
                      }`}
                      required
                    />
                    {errors.email && (
                      <span id="err-email" className="text-[10px] text-royal-beige mt-1 flex items-center gap-1">
                        <AlertCircle size={10} /> {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="monthlySpend" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Project Budget / Monthly Spend (Optional)</label>
                    <input 
                      type="text" 
                      id="monthlySpend" 
                      name="monthlySpend"
                      maxLength={FIELD_LIMITS.budget}
                      value={form.monthlySpend}
                      onChange={handleInputChange}
                      placeholder="Optional"
                      className="w-full bg-dark-brown/35 border border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E] rounded-xl px-4 py-3.5 text-sm text-light-beige placeholder-royal-beige/40 focus:outline-none focus:ring-1 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative z-50">
                  <label id="challenge-label" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Primary Focus Area *</label>
                  <button
                    type="button"
                    aria-labelledby="challenge-label"
                    aria-expanded={isDropdownOpen}
                    onClick={() => setIsDropdownOpen(prev => !prev)}
                    className={`w-full bg-dark-brown/35 border rounded-xl px-4 py-3.5 text-sm text-left flex items-center justify-between text-light-beige focus:outline-none focus:ring-1 transition-all ${
                      errors.challenge ? 'border-royal-beige/60 focus:ring-royal-beige' : 'border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E]'
                    }`}
                  >
                    <span>{form.challenge || "Select your primary focus area..."}</span>
                    <ChevronDown size={16} className={`text-royal-beige/45 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <div className="absolute top-[100%] inset-x-0 mt-2 rounded-xl border border-royal-beige/20 bg-deep-dark backdrop-blur-2xl shadow-2xl max-h-[220px] overflow-y-auto z-50">
                      {challenges.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => selectChallenge(c)}
                          className="w-full px-4 py-3 text-xs sm:text-sm text-left text-light-beige/85 hover:text-light-beige hover:bg-dark-brown/55 transition-colors border-b border-royal-beige/15 last:border-b-0 cursor-pointer"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                  {errors.challenge && (
                    <span className="text-[10px] text-royal-beige mt-1 flex items-center gap-1">
                      <AlertCircle size={10} /> {errors.challenge}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="helpText" className="text-[10px] font-bold uppercase text-royal-beige/80 tracking-wider">Project Goals &amp; Context (Optional)</label>
                  <textarea 
                    id="helpText" 
                    name="helpText"
                    maxLength={FIELD_LIMITS.message}
                    value={form.helpText}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your business, what your website needs to achieve, or current challenges..."
                    className="w-full bg-dark-brown/35 border border-royal-beige/20 focus:border-royal-beige focus:ring-[#BDA07E] rounded-xl px-4 py-3.5 text-sm text-light-beige placeholder-royal-beige/40 focus:outline-none focus:ring-1 transition-all resize-none"
                  />
                </div>

                {errors.rateLimit && (
                  <p role="alert" className="text-xs text-royal-beige flex items-center gap-1.5">
                    <AlertCircle size={14} /> {errors.rateLimit}
                  </p>
                )}

                <p className="text-[11px] text-light-beige/65 leading-relaxed">
                  <strong>Privacy Note:</strong> The details you enter are used solely to prepare your audit request message to TulSip Media (<span className="text-royal-beige">hello@tulsipmedia.com</span>) and are not sold or shared with third parties.
                </p>

                <button
                  type="submit"
                  className="btn relative h-14 w-full mt-2 overflow-hidden rounded-xl bg-royal-beige glow-cta text-sm font-bold text-deep-dark uppercase tracking-wider flex items-center justify-center transition-transform hover:scale-[1.02] duration-300"
                >
                  <span className="btn-text-one center text-deep-dark gap-2">
                    <Send size={14} /> Prepare &amp; Send Audit Request
                  </span>
                  <span className="btn-text-two center text-deep-dark gap-2" aria-hidden="true">
                    <Send size={14} /> Prepare &amp; Send Audit Request
                  </span>
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-royal-beige/10 border border-royal-beige/30 flex items-center justify-center text-royal-beige mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-zentry text-2xl sm:text-3xl font-black uppercase text-light-beige mb-3">
                  Audit Brief Prepared
                </h3>
                <p className="text-xs sm:text-sm text-light-beige/80 font-light leading-relaxed max-w-md mb-6">
                  Your email client has been opened with your formatted audit request for <strong>{submittedPayload.brandName}</strong>. Please click send in your email app—or send the brief directly via WhatsApp below.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                  <a
                    href={buildMailtoUrl(submittedPayload)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-royal-beige text-deep-dark text-xs font-bold uppercase tracking-wider hover:bg-light-beige transition-colors"
                  >
                    <Mail size={15} /> Open Email Again
                  </a>
                  <a
                    href={buildWhatsAppUrl(submittedPayload)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-brown border border-royal-beige/35 text-light-beige text-xs font-bold uppercase tracking-wider hover:bg-royal-beige/20 transition-colors"
                  >
                    <MessageCircle size={15} /> Send via WhatsApp
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedPayload(null);
                    setForm(initialFormState);
                  }}
                  className="px-5 py-2 rounded-full border border-royal-beige/20 hover:border-royal-beige/30 text-xs text-light-beige/75 hover:text-light-beige transition-all uppercase tracking-wider font-semibold"
                >
                  Edit Details
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default AuditForm;
