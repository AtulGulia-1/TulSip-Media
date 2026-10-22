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
        this.emitFile({
          type: 'asset',
          fileName: '404.html',
          source: indexAsset.source,
        });
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
