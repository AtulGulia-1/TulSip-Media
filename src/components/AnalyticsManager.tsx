import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = (
  import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-11KLKCN7BW'
).trim();

const FORBIDDEN_PII_KEY_PATTERN = /(name|email|mail|phone|tel|mobile|message|body|text|resume|portfolio|address|whatsapp)/i;

function sanitizeAnalyticsParams(
  params?: Record<string, string | number | boolean>
): Record<string, string | number | boolean> {
  if (!params) return {};
  const safe: Record<string, string | number | boolean> = {};
  for (const [key, val] of Object.entries(params)) {
    if (FORBIDDEN_PII_KEY_PATTERN.test(key)) continue;
    if (typeof val === 'string') {
      // Never send strings containing email '@' symbols or long user-typed sequences
      if (val.includes('@') || val.length > 100) continue;
      safe[key] = val.trim();
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      safe[key] = val;
    }
  }
  return safe;
}

export function trackAnalyticsEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  try {
    if (typeof window === 'undefined') return;
    if (navigator.doNotTrack === '1') return;
    if (typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
      window.gtag('event', eventName, sanitizeAnalyticsParams(params));
    }
  } catch {
    // Keep analytics failures from ever breaking the website
  }
}

const AnalyticsManager = () => {
  const location = useLocation();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
      if (navigator.doNotTrack === '1') return;

      // Only inject gtag.js if index.html has not already loaded it
      const existingScript =
        document.getElementById('tulsip-ga4-script') ||
        document.querySelector('script[src*="googletagmanager.com/gtag/js"]');

      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'tulsip-ga4-script';
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
        document.head.appendChild(script);
      }

      if (typeof window.gtag !== 'function') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: unknown[]) {
          window.dataLayer?.push(args);
        };
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
          anonymize_ip: true,
          send_page_view: false,
        });
      }
    } catch {
      // Ignore script initialization errors when blocked by client extensions
    }
  }, []);

  useEffect(() => {
    try {
      if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return;
      if (navigator.doNotTrack === '1') return;

      const cleanPath = location.pathname + (location.hash || '');
      if (lastTrackedPathRef.current === cleanPath) return;
      lastTrackedPathRef.current = cleanPath;

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'page_view', {
          page_path: location.pathname,
          page_title: document.title,
          page_location: window.location.origin + location.pathname,
        });
      }
    } catch {
      // Ignore analytics errors
    }
  }, [location.pathname, location.hash]);

  return null;
};

export default AnalyticsManager;
