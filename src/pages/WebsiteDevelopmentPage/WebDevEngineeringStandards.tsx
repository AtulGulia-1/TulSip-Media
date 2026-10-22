import { Code2, Gauge, Search, Smartphone, Lock, GitBranch } from 'lucide-react';

const STANDARDS = [
  {
    icon: Code2,
    title: 'Clean, Custom Codebase',
    description:
      'We write modular, type-safe React and modern web code. We do not build on fragile drag-and-drop page builders that generate excessive DOM depth, sluggish rendering, and security vulnerabilities.',
  },
  {
    icon: Gauge,
    title: 'Core Web Vitals Engineering',
    description:
      'Every layout is engineered to pass Google Core Web Vitals with high performance scores: optimized images (WebP/AVIF), deferred media loading, zero layout thrashing, and lightweight JavaScript.',
  },
  {
    icon: Search,
    title: 'Built-In Semantic Technical SEO',
    description:
      'Proper H1–H6 heading hierarchies, crawlable clean URLs, Open Graph social share tags, dynamic XML sitemaps, and Schema.org structured data (Organization, WebSite, Service) built-in directly.',
  },
  {
    icon: Smartphone,
    title: 'True Cross-Device Responsiveness',
    description:
      'Our interfaces are tested across modern mobile viewports (iOS Safari, Android Chrome), tablets, and ultrawide desktops, ensuring typography, tap targets, and interactive menus work effortlessly.',
  },
  {
    icon: Lock,
    title: 'Enterprise-Grade Security Foundations',
    description:
      'Hardened HTTP security headers (CSP, HSTS, X-Content-Type-Options), client-side honeypot form protection, rate limiting, and sanitized inputs to safeguard your brand from spam and malicious attacks.',
  },
  {
    icon: GitBranch,
    title: 'Full Intellectual Property Ownership',
    description:
      'You own 100% of your website code, assets, content, and design. Upon project completion, full Git repositories and documentation are handed over to your team with zero proprietary vendor lock-in.',
  },
];

const WebDevEngineeringStandards = () => {
  return (
    <section className="bg-dark-brown/25 px-4 py-20 text-light-beige lg:px-20 xl:px-32 border-y border-royal-beige/15">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-royal-beige mb-2">
            Technical Rigor · Architectural Integrity
          </p>
          <h2 className="font-zentry text-3xl sm:text-4xl uppercase tracking-tight text-light-beige">
            The TulSip Media Engineering Standard
          </h2>
          <p className="mt-4 font-general text-sm sm:text-base leading-relaxed text-light-beige/80">
            A website should never be a fragile marketing experiment that breaks with every browser update. We build dependable, enterprise-grade digital infrastructure built to endure.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STANDARDS.map((std, idx) => {
            const Icon = std.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-royal-beige/20 bg-deep-dark/70 p-6 shadow-sm hover:border-royal-beige/40 transition-colors"
              >
                <div className="flex size-10 items-center justify-center rounded-xl bg-royal-beige/15 text-royal-beige mb-4">
                  <Icon size={19} />
                </div>
                <h3 className="font-general text-lg font-bold text-light-beige mb-2">
                  {std.title}
                </h3>
                <p className="font-robert-regular text-xs sm:text-sm text-light-beige/80 leading-relaxed">
                  {std.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WebDevEngineeringStandards;
