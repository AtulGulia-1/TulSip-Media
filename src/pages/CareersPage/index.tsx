import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  Send, 
  GraduationCap, 
  Building2, 
  Sparkles,
  ArrowRight,
  HelpCircle,
  Mail,
  MessageCircle,
  Info
} from 'lucide-react';
import PageMeta from '../../components/PageMeta';
import { trackAnalyticsEvent } from '../../components/AnalyticsManager';
import {
  FIELD_LIMITS,
  sanitizeText,
  isValidEmail,
  isValidPhone,
  isValidSafeUrl,
  checkRateLimitCooldown,
  recordRateLimitSubmission,
} from '../../utils/security';
import { VERIFICATION_DATABASE, StudentVerification } from '../../data/verificationData';

const JOB_ROLES = [
  { title: "Frontend Website Developer (React / Next.js)", type: "Internship / Expression of Interest", tag: "Web Dev", desc: "Component engineering, responsive layouts, Tailwind CSS & accessibility." },
  { title: "UI/UX Designer (Websites & Web Apps)", type: "Internship / Expression of Interest", tag: "UI/UX", desc: "Wireframes, design systems, interactive prototypes & user flows." },
  { title: "Technical SEO & Content Intern", type: "Internship / Expression of Interest", tag: "SEO & Content", desc: "On-page structure, keyword research, metadata & answer-first copy." },
  { title: "Video Editor & Short-Form Creator", type: "Internship / Expression of Interest", tag: "Creative", desc: "Brand reels, pacing, motion graphics & visual storytelling." },
  { title: "Graphic & Brand Designer", type: "Internship / Expression of Interest", tag: "Design", desc: "Brand assets, carousels, campaign visuals & layout systems." },
  { title: "Social Media & Brand Coordinator", type: "Internship / Expression of Interest", tag: "Social", desc: "Content calendars, editorial scheduling & community workflows." },
  { title: "Paid Media & Analytics Intern", type: "Internship / Expression of Interest", tag: "Paid Media", desc: "Search & social campaign setup, landing page alignment & reporting." },
  { title: "Digital Operations & Web Support Intern", type: "Internship / Expression of Interest", tag: "Operations", desc: "QA testing, content updates, documentation & client coordination." },
];

const INTERNSHIP_TERMS = [
  "Eligibility: Open to eligible Diploma, Undergraduate (UG), and Postgraduate (PG) students, including BCA and MCA candidates.",
  "Minimum Age: Applicants must be 18 years of age or older at the time of application.",
  "Duration: Minimum commitment of 3 months.",
  "Compensation Policy: The first 3 months are unpaid (structured learning and project-mentorship phase). Any extension or stipend after 3 months is performance-based and subject to formal review.",
  "Work Arrangement: Remote or hybrid workflow, with in-person shoots or coordination meetings where mutually agreed.",
  "Academic & College Verification: Official College NOC and institutional verification are required where applicable. Completion certificates require satisfactory completion of assigned project deliverables.",
  "Employment Disclaimer: Exceptional performance, reliability, skills, attendance, and conduct may be considered for a paid/stipend extension or employment, but neither outcome is guaranteed and any paid offer must be separately confirmed in writing.",
  "Work Mode & Regulatory Accuracy: Remote, hybrid, or on-site requirements are confirmed in the written offer letter for each opening. TulSip Media is not an AICTE-approved company; we issue official company offer letters, College NOC confirmations, and verifiable completion certificates."
];

const CareersPage = () => {
  const [activeTab, setActiveTab] = useState<'apply' | 'verify'>('apply');
  const [selectedRole, setSelectedRole] = useState<string>(JOB_ROLES[0].title);
  
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState<StudentVerification | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    role: JOB_ROLES[0].title,
    portfolioUrl: "",
    resumeUrl: "",
    needNOC: false,
    termsAccepted: false,
    message: ""
  });
  const [submitReady, setSubmitReady] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [hasStartedApply, setHasStartedApply] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = sanitizeText(searchId, 60, false);
    setSearchId(cleanId);
    setHasSearched(true);
    const found = VERIFICATION_DATABASE.find(
      v => v.id.toLowerCase() === cleanId.toLowerCase()
    );
    setSearchResult(found || null);
  };

  const buildApplicationMailto = () => {
    const subject = encodeURIComponent(`Internship / Role Application: ${formData.role} — ${formData.name}`);
    const body = encodeURIComponent(
      [
        'Hello TulSip Media,',
        '',
        'I would like to submit an application for the following role:',
        '',
        `• Role: ${formData.role}`,
        `• Full Name: ${formData.name}`,
        `• Email: ${formData.email}`,
        `• Phone / WhatsApp: ${formData.phone}`,
        `• College / University (Course): ${formData.college || 'Not specified'}`,
        `• Resume Link: ${formData.resumeUrl}`,
        `• Portfolio / GitHub / Work Link: ${formData.portfolioUrl || 'Not specified'}`,
        `• College NOC Required: ${formData.needNOC ? 'Yes' : 'No'}`,
        '• Confirmed 18+, min 3-month duration & unpaid first 3 months policy: Yes',
        '',
        `Why I want to join:\n${formData.message || 'N/A'}`,
      ].join('\n')
    );
    return `mailto:hello@tulsipmedia.com?subject=${subject}&body=${body}`;
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (sanitizeText(honeypot, 100) !== '') {
      setFormError('Submission blocked by spam filter.');
      return;
    }

    const cooldown = checkRateLimitCooldown('tulsip_careers_last_submit_ts', 30000);
    if (!cooldown.allowed) {
      setFormError(`Please wait ${cooldown.retryAfterSeconds} seconds before submitting another application.`);
      return;
    }

    const cleanName = sanitizeText(formData.name, FIELD_LIMITS.name, false);
    const cleanEmail = sanitizeText(formData.email, FIELD_LIMITS.email, false);
    const cleanPhone = sanitizeText(formData.phone, FIELD_LIMITS.phone, false);
    const cleanCollege = sanitizeText(formData.college, FIELD_LIMITS.college, false);
    const cleanResume = sanitizeText(formData.resumeUrl, FIELD_LIMITS.url, false);
    const cleanPortfolio = sanitizeText(formData.portfolioUrl, FIELD_LIMITS.url, false);
    const cleanMessage = sanitizeText(formData.message, FIELD_LIMITS.message, true);

    if (cleanName.length < 2) {
      setFormError('Please enter your full name (at least 2 characters).');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }
    if (!isValidPhone(cleanPhone)) {
      setFormError('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (!isValidSafeUrl(cleanResume, { required: true })) {
      setFormError('Please enter a valid http:// or https:// link for your resume.');
      return;
    }
    if (cleanPortfolio && !isValidSafeUrl(cleanPortfolio, { required: false })) {
      setFormError('Please enter a valid http:// or https:// link for your portfolio.');
      return;
    }
    if (!formData.termsAccepted) {
      setFormError('Please confirm the mandatory internship eligibility and programme terms.');
      return;
    }

    try {
      const resp = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'internship',
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          college: cleanCollege,
          role: formData.role,
          resumeUrl: cleanResume,
          portfolioUrl: cleanPortfolio,
          message: cleanMessage || 'Internship application submitted via tulsipmedia.com/careers',
          honeypot,
        }),
      });
      if (resp.status === 400 || resp.status === 429 || resp.status === 413) {
        const body = await resp.json().catch(() => ({}));
        setFormError(body.error || 'Please review your application fields and try again.');
        return;
      }
    } catch {
      // Static fallback continues to mailto
    }

    recordRateLimitSubmission('tulsip_careers_last_submit_ts');
    trackAnalyticsEvent('generate_lead', {
      form_name: 'internship_application',
      role_track: formData.role,
    });
    setSubmitReady(true);
    window.location.href = buildApplicationMailto();
  };

  return (
    <div className="min-h-screen bg-deep-dark text-light-beige pt-24 pb-16 px-4 md:px-8 font-sans">
      <PageMeta
        title="Careers, Internships & Credential Verification | TulSip Media"
        description="Review TulSip Media's internship programme terms, eligible student tracks (Diploma, UG, PG, BCA, MCA), and academic credential verification process."
        canonicalPath="/careers"
        robots="index, follow"
      />
      
      {/* Hero Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-royal-beige/10 border border-royal-beige/30 text-royal-beige text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <Sparkles size={14} /> Internships, Expressions of Interest &amp; Academic Credentials
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
        >
          Internships &amp; Careers at <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-royal-beige via-light-beige to-dark-brown">
            TulSip Media
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto text-royal-beige text-sm md:text-base leading-relaxed"
        >
          Explore our student internship tracks across website development, UI/UX design, technical SEO, and creative production—or request verification for an officially issued TulSip Media certificate or College NOC.
        </motion.p>

        {/* Tab Switcher */}
        <div className="flex justify-center mt-10">
          <div className="bg-dark-brown/35 border border-royal-beige/20 p-1.5 rounded-full flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('apply')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'apply'
                  ? 'bg-royal-beige text-deep-dark shadow-lg shadow-royal-beige/20'
                  : 'text-royal-beige hover:text-light-beige'
              }`}
            >
              <Briefcase size={16} /> Internship Tracks &amp; Apply
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('verify')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'verify'
                  ? 'bg-royal-beige text-deep-dark shadow-lg shadow-royal-beige/20'
                  : 'text-royal-beige hover:text-light-beige'
              }`}
            >
              <ShieldCheck size={16} /> Verify College NOC &amp; Certificates
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: APPLY FOR ROLES */}
          {activeTab === 'apply' && (
            <motion.div
              key="tab-apply"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* Mandatory Programme Terms Banner */}
              <div className="p-6 md:p-8 rounded-2xl bg-dark-brown/45 border border-royal-beige/30">
                <div className="flex items-center gap-2 text-sm md:text-base font-bold text-royal-beige uppercase tracking-wider mb-4">
                  <Info size={18} /> Official Internship Programme Terms &amp; Eligibility
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-light-beige/90 leading-relaxed">
                  {INTERNSHIP_TERMS.map((term, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-royal-beige font-bold mt-0.5">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Roles Grid */}
                <div className="lg:col-span-6 space-y-4">
                  <h2 className="text-xl font-bold text-light-beige mb-4 flex items-center gap-2">
                    <GraduationCap className="text-royal-beige" /> Role Tracks (Subject to Active Cohort Availability)
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {JOB_ROLES.map((job, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => {
                          setSelectedRole(job.title);
                          setFormData(prev => ({ ...prev, role: job.title }));
                        }}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          selectedRole === job.title 
                            ? 'bg-royal-beige/15 border-royal-beige text-light-beige' 
                            : 'bg-dark-brown/35 border-royal-beige/20 hover:border-royal-beige/35 text-light-beige/85'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-dark-brown/55 text-royal-beige">
                            {job.tag}
                          </span>
                          <span className="text-[10px] text-royal-beige">{job.type}</span>
                        </div>
                        <h3 className="font-bold text-sm text-light-beige mb-1">{job.title}</h3>
                        <p className="text-xs text-royal-beige">{job.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-dark-brown/30 to-royal-beige/15 border border-royal-beige/30 text-xs text-light-beige/85">
                    <div className="flex items-center gap-2 font-bold text-royal-beige mb-1">
                      <Building2 size={16} /> College Verification &amp; Academic Documentation
                    </div>
                    <p>
                      Where an internship is part of a recognised Diploma, UG, PG, BCA, or MCA academic requirement, TulSip Media provides official offer documentation and completion certificates upon verified completion of assigned project work.
                    </p>
                  </div>
                </div>

                {/* Right Column: Application Form */}
                <div className="lg:col-span-6 bg-dark-brown/35 border border-royal-beige/20 rounded-2xl p-6 md:p-8">
                  {submitReady ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 bg-royal-beige/20 text-royal-beige rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 size={36} />
                      </div>
                      <h3 className="text-2xl font-bold text-light-beige">Application Email Prepared</h3>
                      <p className="text-sm text-royal-beige max-w-md mx-auto">
                        Your email client has been opened with your formatted application for <span className="text-light-beige font-semibold">{formData.role}</span> addressed to <span className="text-light-beige">hello@tulsipmedia.com</span>. Please click send in your email app to complete submission.
                      </p>
                      <div className="flex flex-wrap justify-center gap-3 pt-2">
                        <a
                          href={buildApplicationMailto()}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-royal-beige text-deep-dark rounded-full text-xs font-bold uppercase tracking-wider hover:bg-light-beige transition-all"
                        >
                          <Mail size={14} /> Open Email App Again
                        </a>
                        <button
                          type="button"
                          onClick={() => setSubmitReady(false)}
                          className="px-6 py-2.5 bg-dark-brown/55 text-light-beige rounded-full text-xs font-semibold uppercase hover:bg-royal-beige/25 transition-all"
                        >
                          Edit Application
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleApplySubmit}
                      onFocus={() => {
                        if (!hasStartedApply) {
                          setHasStartedApply(true);
                          trackAnalyticsEvent('contact_form_start', { form_name: 'internship_application' });
                        }
                      }}
                      className="space-y-4"
                    >
                      <div className="sr-only" aria-hidden="true">
                        <label htmlFor="applicant-hp">Leave this field empty</label>
                        <input
                          id="applicant-hp"
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>
                      {formError && (
                        <div role="alert" className="rounded-xl border border-royal-beige/50 bg-deep-dark/90 p-3.5 text-xs text-light-beige">
                          {formError}
                        </div>
                      )}
                      <h2 className="text-xl font-bold text-light-beige mb-1">Submit Internship Application</h2>
                      <p className="text-xs text-royal-beige mb-4">Selected Track: <span className="text-light-beige font-semibold">{formData.role}</span></p>

                      <div>
                        <label htmlFor="applicant-name" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">Full Name *</label>
                        <input 
                          id="applicant-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                          className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="applicant-email" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">Email Address *</label>
                          <input 
                            id="applicant-email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            placeholder="you@example.com"
                            className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                          />
                        </div>
                        <div>
                          <label htmlFor="applicant-phone" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">Phone / WhatsApp *</label>
                          <input 
                            id="applicant-phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 ..."
                            className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="applicant-college" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">College &amp; Degree (e.g. BCA / MCA / UG) *</label>
                          <input 
                            id="applicant-college"
                            type="text"
                            required
                            value={formData.college}
                            onChange={e => setFormData({ ...formData, college: e.target.value })}
                            placeholder="Institution & Course"
                            className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                          />
                        </div>
                        <div>
                          <label htmlFor="applicant-role" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">Applying For Track</label>
                          <select
                            id="applicant-role"
                            value={formData.role}
                            onChange={e => {
                              setSelectedRole(e.target.value);
                              setFormData({ ...formData, role: e.target.value });
                            }}
                            className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                          >
                            {JOB_ROLES.map((r, i) => (
                              <option key={i} value={r.title} className="bg-deep-dark text-light-beige">{r.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="applicant-resume" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">Resume Link (Drive / PDF) *</label>
                          <input 
                            id="applicant-resume"
                            type="url"
                            required
                            value={formData.resumeUrl}
                            onChange={e => setFormData({ ...formData, resumeUrl: e.target.value })}
                            placeholder="https://drive.google.com/..."
                            className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                          />
                        </div>
                        <div>
                          <label htmlFor="applicant-portfolio" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">Portfolio / GitHub Link</label>
                          <input 
                            id="applicant-portfolio"
                            type="url"
                            value={formData.portfolioUrl}
                            onChange={e => setFormData({ ...formData, portfolioUrl: e.target.value })}
                            placeholder="https://github.com/... or portfolio"
                            className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="flex items-start gap-2.5">
                          <input 
                            type="checkbox"
                            id="nocCheck"
                            checked={formData.needNOC}
                            onChange={e => setFormData({ ...formData, needNOC: e.target.checked })}
                            className="w-4 h-4 mt-0.5 accent-royal-beige rounded cursor-pointer"
                          />
                          <label htmlFor="nocCheck" className="text-xs text-light-beige/85 cursor-pointer">
                            I require College NOC / academic internship documentation for university submission.
                          </label>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <input 
                            type="checkbox"
                            id="termsCheck"
                            required
                            checked={formData.termsAccepted}
                            onChange={e => setFormData({ ...formData, termsAccepted: e.target.checked })}
                            className="w-4 h-4 mt-0.5 accent-royal-beige rounded cursor-pointer"
                          />
                          <label htmlFor="termsCheck" className="text-xs text-light-beige/90 cursor-pointer">
                            I confirm that I am <strong>18+ years old</strong>, understand the <strong>minimum 3-month duration</strong>, acknowledge that the <strong>first 3 months are unpaid</strong>, and understand that completion does not guarantee a job offer. *
                          </label>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="applicant-message" className="block text-xs uppercase font-semibold text-light-beige/85 mb-1">Relevant Skills &amp; Project Experience</label>
                        <textarea
                          id="applicant-message"
                          rows={3}
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Briefly share projects you have built or skills you want to develop..."
                          className="w-full bg-deep-dark/50 border border-royal-beige/20 rounded-lg px-4 py-2.5 text-sm text-light-beige focus:outline-none focus:border-royal-beige"
                        />
                      </div>

                      <p className="text-[11px] text-royal-beige/85 leading-relaxed">
                        <a href="/policies#internship-terms" className="underline text-royal-beige hover:text-light-beige mr-2">Read Full Internship Terms &amp; Legal Policy →</a> <strong>Privacy Notice:</strong> Application details are used solely to evaluate your internship suitability and communicate with you. Submitting opens your email client addressed to <span className="text-light-beige">hello@tulsipmedia.com</span>.
                      </p>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-royal-beige hover:bg-light-beige text-deep-dark font-bold uppercase tracking-wider rounded-xl text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-royal-beige/20 mt-2"
                      >
                        Prepare Application Email <Send size={16} />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: VERIFY CREDENTIALS */}
          {activeTab === 'verify' && (
            <motion.div
              key="tab-verify"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-dark-brown/35 border border-royal-beige/20 rounded-2xl p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-bold text-light-beige mb-2 flex items-center gap-2">
                  <ShieldCheck className="text-royal-beige" /> Verify Certificate, Offer Letter or College NOC
                </h2>
                <p className="text-xs md:text-sm text-royal-beige mb-6 leading-relaxed">
                  Enter the unique Document Reference ID printed on a TulSip Media Certificate of Completion, Offer Letter, or College NOC to check its status or initiate an institutional verification request.
                </p>

                <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-beige" size={18} />
                    <input 
                      type="text"
                      required
                      aria-label="Enter Document Reference ID"
                      value={searchId}
                      onChange={e => setSearchId(e.target.value)}
                      placeholder="Enter Document Reference ID"
                      className="w-full bg-deep-dark/60 border border-royal-beige/25 rounded-xl pl-11 pr-4 py-3.5 text-sm font-mono text-light-beige placeholder:text-royal-beige/60 focus:outline-none focus:border-royal-beige"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-royal-beige hover:bg-light-beige text-deep-dark font-bold uppercase tracking-wider rounded-xl text-sm transition-all shadow-lg shadow-royal-beige/20 flex items-center justify-center gap-2"
                  >
                    Check Reference <ArrowRight size={16} />
                  </button>
                </form>
              </div>

              {hasSearched && (
                <div>
                  {searchResult ? (
                    <div className="bg-dark-brown/40 border border-royal-beige/40 rounded-2xl p-6 md:p-8">
                      <h3 className="text-xl font-bold text-light-beige">{searchResult.documentType}</h3>
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-dark-brown/30 border border-royal-beige/30 rounded-2xl p-8 text-center space-y-4"
                    >
                      <HelpCircle className="text-royal-beige mx-auto" size={40} />
                      <h3 className="text-lg font-bold text-light-beige">
                        Live Registry Lookup Requires Official Verification Request
                      </h3>
                      <p className="text-xs md:text-sm text-royal-beige max-w-lg mx-auto leading-relaxed">
                        The public web lookup is not currently connected to the live student credential database for reference <span className="font-mono text-light-beige">"{searchId}"</span>. To prevent unauthorised disclosure of student records, institutional and employer verifications are confirmed directly by TulSip Media.
                      </p>
                      <div className="pt-2 flex flex-wrap justify-center gap-3">
                        <a
                          href={`mailto:hello@tulsipmedia.com?subject=${encodeURIComponent('Credential Verification Request: ' + searchId)}&body=${encodeURIComponent('Hello TulSip Media,\n\nPlease verify the following student credential / NOC reference ID:\n\nReference ID: ' + searchId + '\nCandidate Name (if known): \nRequesting Institution / Company: \n')}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-royal-beige text-deep-dark text-xs font-bold uppercase tracking-wider hover:bg-light-beige transition-colors"
                        >
                          <Mail size={15} /> Request Verification via Email
                        </a>
                        <a
                          href={`https://wa.me/919821005996?text=${encodeURIComponent('Hello TulSip Media, please verify Credential Reference ID: ' + searchId)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-dark-brown border border-royal-beige/35 text-light-beige text-xs font-bold uppercase tracking-wider hover:bg-royal-beige/20 transition-colors"
                        >
                          <MessageCircle size={15} /> Verify via WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};

export default CareersPage;
