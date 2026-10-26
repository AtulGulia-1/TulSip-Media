import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const KNOWN_SPA_ROUTES = new Set([
  '/',
  '/solutions',
  '/subscriptions',
  '/case-studies',
  '/case-studies/nucleus-derma-care-d2c-skincare',
  '/case-studies/local-business-digital-gap',
  '/work/local-business-digital-gap',
  '/case-studies/viktor-oddy',
  '/about',
  '/website-development',
  '/web-development',
  '/web-design',
  '/social',
  '/ads',
  '/careers',
  '/contact',
  '/ai-automation',
  '/audit',
  '/policies',
]);

const CSP_VALUE =
  "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com; font-src 'self' data: https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com; img-src 'self' data: blob: https:; media-src 'self' blob: https://d8j0ntlcm91z4.cloudfront.net; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://*.analytics.google.com; frame-src 'self' https://www.instagram.com https://*.instagram.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:; object-src 'none'";

const securityHeaders: Record<string, string> = {
  'Content-Security-Policy': CSP_VALUE,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  'X-Frame-Options': 'DENY',
};

function isUnknownSpaHtmlRequest(rawReq: unknown): boolean {
  const req = rawReq as { url?: string; headers?: Record<string, unknown> };
  const urlPath = (req.url || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  const accept = String(req.headers?.accept || '');
  const isAssetOrInternal =
    urlPath.startsWith('/@') ||
    urlPath.startsWith('/src/') ||
    urlPath.startsWith('/node_modules/') ||
    urlPath.startsWith('/assets/') ||
    urlPath.startsWith('/videos/') ||
    urlPath.startsWith('/img/') ||
    urlPath.startsWith('/fonts/') ||
    urlPath.startsWith('/api/') ||
    /\.[a-zA-Z0-9]+$/.test(urlPath);

  if (!isAssetOrInternal && (accept.includes('text/html') || accept === '*/*' || !accept)) {
    return !KNOWN_SPA_ROUTES.has(urlPath);
  }
  return false;
}

function attach404StatusInterceptor(rawRes: unknown) {
  const res = rawRes as {
    statusCode: number;
    writeHead: (...args: unknown[]) => unknown;
  };
  res.statusCode = 404;
  const origWriteHead = res.writeHead.bind(res);
  res.writeHead = (...args: unknown[]) => {
    if (typeof args[0] === 'number' && args[0] === 200) {
      args[0] = 404;
    }
    res.statusCode = 404;
    return origWriteHead(...args);
  };
}

const ROUTE_METADATA: Record<string, { title: string; description: string; canonical: string }> = {
  '/website-development': {
    title: 'Custom Website Design & Development Services | TulSip Media',
    description: 'TulSip Media designs and develops custom business websites, high-converting landing pages, e-commerce storefronts, and web applications built for speed, credibility, and growth.',
    canonical: 'https://www.tulsipmedia.com/website-development',
  },
  '/ads': {
    title: 'Paid Media & Conversion Landing Page Systems | TulSip Media',
    description: 'Explore how TulSip Media aligns paid search and social ad campaigns with fast, conversion-focused landing pages and structured audience testing.',
    canonical: 'https://www.tulsipmedia.com/ads',
  },
  '/social': {
    title: 'Social Media Content & Brand Creative Systems | TulSip Media',
    description: "Explore TulSip Media's social-first brand storytelling, educational carousels, short-form video production, and creative systems connected to your website.",
    canonical: 'https://www.tulsipmedia.com/social',
  },
  '/ai-automation': {
    title: 'Web Workflow & AI Automation Systems | TulSip Media',
    description: "Explore TulSip Media's custom web workflow automations, lead-routing assistants, and operational integrations built around your website.",
    canonical: 'https://www.tulsipmedia.com/ai-automation',
  },
  '/audit': {
    title: 'Website & Digital Performance Audit | TulSip Media',
    description: 'Request a plain-English audit of your existing website, user journeys, and discoverability with TulSip Media.',
    canonical: 'https://www.tulsipmedia.com/audit',
  },
  '/about': {
    title: 'About TulSip Media | Creative Engineering & Brand Performance',
    description: 'Learn about TulSip Media, our mission, standards, and the multidisciplinary team building modern websites and growth systems.',
    canonical: 'https://www.tulsipmedia.com/about',
  },
  '/case-studies': {
    title: 'Client Case Studies & Digital Portfolio | TulSip Media',
    description: 'Real business results, technical architecture, and creative execution across TulSip Media client projects.',
    canonical: 'https://www.tulsipmedia.com/case-studies',
  },
  '/case-studies/nucleus-derma-care-d2c-skincare': {
    title: 'Nucleus Derma Care Case Study | TulSip Media',
    description: 'D2C skincare e-commerce platform and conversion journey case study by TulSip Media.',
    canonical: 'https://www.tulsipmedia.com/case-studies/nucleus-derma-care-d2c-skincare',
  },
  '/case-studies/local-business-digital-gap': {
    title: 'Local Business Digital Gap Case Study | TulSip Media',
    description: 'Bridging the local business digital discovery gap through high-performance web presence.',
    canonical: 'https://www.tulsipmedia.com/case-studies/local-business-digital-gap',
  },
  '/careers': {
    title: 'Careers & Student Credential Verification | TulSip Media',
    description: 'Explore internship opportunities and verify student NOC and credential references with TulSip Media.',
    canonical: 'https://www.tulsipmedia.com/careers',
  },
  '/contact': {
    title: 'Contact TulSip Media | Website Development & Growth Enquiries',
    description: 'Contact TulSip Media to discuss your custom business website, e-commerce storefront, landing page, or web application project.',
    canonical: 'https://www.tulsipmedia.com/contact',
  },
  '/policies': {
    title: 'Policies, Terms of Service & Privacy | TulSip Media',
    description: 'Terms of service, privacy practices, and client engagement framework for TulSip Media.',
    canonical: 'https://www.tulsipmedia.com/policies',
  },
};

function spaGenuine404Plugin(): Plugin {
  return {
    name: 'tulsip-genuine-404-status',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (isUnknownSpaHtmlRequest(req)) {
          attach404StatusInterceptor(res);
        }
        next();
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use((req, res, next) => {
        if (isUnknownSpaHtmlRequest(req)) {
          attach404StatusInterceptor(res);
        }
        next();
      });
    },
    generateBundle(_, bundle) {
      const indexAsset = bundle['index.html'];
      if (indexAsset && indexAsset.type === 'asset') {
        const rawHtml = String(indexAsset.source);

        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: rawHtml,
        });

        // Emit route-specific static HTML with accurate canonical & metadata
        for (const [routePath, meta] of Object.entries(ROUTE_METADATA)) {
          let routeHtml = rawHtml;
          routeHtml = routeHtml.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);
          routeHtml = routeHtml.replace(/<meta\s+name="title"\s+content=".*?"\s*\/?>/i, `<meta name="title" content="${meta.title}" />`);
          routeHtml = routeHtml.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${meta.description}" />`);
          routeHtml = routeHtml.replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${meta.title}" />`);
          routeHtml = routeHtml.replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${meta.description}" />`);
          routeHtml = routeHtml.replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${meta.canonical}" />`);
          routeHtml = routeHtml.replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${meta.title}" />`);
          routeHtml = routeHtml.replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${meta.description}" />`);
          routeHtml = routeHtml.replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${meta.canonical}" />`);

          const cleanPath = routePath.replace(/^\//, '');
          this.emitFile({
            type: 'asset',
            fileName: `${cleanPath}/index.html`,
            source: routeHtml,
          });
        }
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), spaGenuine404Plugin()],
  server: {
    headers: securityHeaders,
  },
  preview: {
    headers: securityHeaders,
  },
  build: {
    sourcemap: false,
  },
});
