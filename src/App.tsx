import { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Loading from './components/loading';
import ChatbotWidget from './components/ChatbotWidget';
import AnalyticsManager from './components/AnalyticsManager';

const Navbar = lazy(() => import('./components/navbar'));
const Home = lazy(() => import('./pages/Home'));
const NucleusCaseStudy = lazy(() => import('./pages/NucleusCaseStudy'));
const ViktorOddyCaseStudy = lazy(() => import('./pages/ViktorOddyCaseStudy/index'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const WebsiteDevelopmentPage = lazy(() => import('./pages/WebsiteDevelopmentPage'));
const SocialWorksPage = lazy(() => import('./pages/SocialPage'));
const AdsPage = lazy(() => import('./pages/AdsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AiAutomationPage = lazy(() => import('./pages/AiAutomationPage'));
const AuditPage = lazy(() => import('./pages/AuditPage'));
const PoliciesPage = lazy(() => import('./pages/PoliciesPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const App = () => {
  const location = useLocation();
  const [motionPaused, setMotionPaused] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Smooth scroll to hash targets (e.g. /#solutions, /#features, /#subscriptions, /policies#subscription-policy)
  useEffect(() => {
    if (!location.hash) return;
    const targetId = location.hash.replace(/^#/, '');
    if (!targetId) return;

    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    if (tryScroll()) return;

    const interval = window.setInterval(() => {
      attempts += 1;
      if (tryScroll() || attempts >= 12) {
        window.clearInterval(interval);
      }
    }, 120);

    return () => window.clearInterval(interval);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleToggleMotion = (e: Event) => {
      const custom = e as CustomEvent<{ paused?: boolean }>;
      setMotionPaused((prev) => {
        const next = typeof custom.detail?.paused === 'boolean' ? custom.detail.paused : !prev;
        document.querySelectorAll('video:not([data-hero-transition="true"])').forEach((v) => {
          const video = v as HTMLVideoElement;
          if (next) {
            video.dataset.userPaused = 'true';
            video.pause();
          } else {
            delete video.dataset.userPaused;
            if (video.hasAttribute('autoplay') && video.dataset.inView === 'true') {
              video.play().catch(() => {});
            }
          }
        });
        window.dispatchEvent(new CustomEvent('tulsip:motion-state', { detail: { paused: next } }));
        return next;
      });
    };

    window.addEventListener('tulsip:toggle-motion', handleToggleMotion);
    return () => window.removeEventListener('tulsip:toggle-motion', handleToggleMotion);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (video.dataset.heroTransition === 'true') return;
          video.dataset.inView = entry.isIntersecting ? 'true' : 'false';
          if (!entry.isIntersecting) {
            if (!video.paused) video.pause();
          } else if (
            !motionPaused &&
            video.dataset.userPaused !== 'true' &&
            !document.hidden &&
            (video.hasAttribute('autoplay') || video.dataset.autoResume === 'true')
          ) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.12 }
    );

    const handleVisibilityChange = () => {
      document.querySelectorAll('video:not([data-hero-transition="true"])').forEach((v) => {
        const video = v as HTMLVideoElement;
        if (document.hidden) {
          if (!video.paused) video.pause();
        } else if (
          !motionPaused &&
          video.dataset.userPaused !== 'true' &&
          video.dataset.inView === 'true' &&
          (video.hasAttribute('autoplay') || video.dataset.autoResume === 'true')
        ) {
          video.play().catch(() => {});
        }
      });
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const timer = setTimeout(() => {
      document.querySelectorAll('video:not([data-hero-transition="true"])').forEach((v) => {
        const video = v as HTMLVideoElement;
        if (motionPaused) {
          video.dataset.userPaused = 'true';
          video.pause();
        }
        observer.observe(video);
      });
    }, 350);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, [location.pathname, motionPaused]);

  return (
    <main className="bg-light-beige text-deep-dark">
      <Suspense fallback={<Loading />}>
        <AnalyticsManager />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Navigate to="/#solutions" replace />} />
          <Route path="/subscriptions" element={<Navigate to="/#solutions" replace />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/case-studies/nucleus-derma-care-d2c-skincare" element={<NucleusCaseStudy />} />
          <Route path="/case-studies/local-business-digital-gap" element={<ViktorOddyCaseStudy />} />
          <Route path="/work/local-business-digital-gap" element={<Navigate to="/case-studies/local-business-digital-gap" replace />} />
          <Route path="/case-studies/viktor-oddy" element={<Navigate to="/case-studies/local-business-digital-gap" replace />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/website-development" element={<WebsiteDevelopmentPage />} />
          <Route path="/web-development" element={<Navigate to="/website-development" replace />} />
          <Route path="/web-design" element={<Navigate to="/website-development" replace />} />
          <Route path="/social" element={<SocialWorksPage />} />
          <Route path="/ads" element={<AdsPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ai-automation" element={<AiAutomationPage />} />
          <Route path="/audit" element={<AuditPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ChatbotWidget />
      </Suspense>
    </main>
  );
};

export default App;
