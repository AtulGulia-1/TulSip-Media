/**
 * Serverless Form Validation & Rate-Limiting Endpoint (/api/enquiry)
 * Enforces server-side method checks, payload limits, field whitelisting,
 * input sanitization, URL protocol validation, honeypot anti-spam, and per-IP rate limiting.
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 4;
const ipRequests = new Map();

const ALLOWED_FIELDS = new Set([
  'formType',
  'name',
  'email',
  'phone',
  'businessName',
  'engagementModel',
  'message',
  'consentAccepted',
  'honeypot',
  'instagram',
  'website',
  'monthlySpend',
  'challenge',
  'college',
  'role',
  'portfolioUrl',
  'resumeUrl',
]);

function cleanString(val, maxLen = 500, allowNewlines = false) {
  if (typeof val !== 'string') return '';
  let s = val
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '');
  if (!allowNewlines) {
    s = s.replace(/[\r\n]+/g, ' ');
  }
  return s.trim().slice(0, maxLen);
}

function isValidEmailServer(email) {
  const clean = cleanString(email, 120, false);
  return (
    clean.length >= 5 &&
    clean.length <= 120 &&
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(clean)
  );
}

function isSafeOptionalUrlServer(rawUrl) {
  const clean = cleanString(rawUrl, 250, false);
  if (!clean) return true;
  if (/^(javascript|data|vbscript|file|blob):/i.test(clean)) return false;
  const withProtocol = /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
  try {
    const parsed = new URL(withProtocol);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return false;
    return parsed.hostname.includes('.') && parsed.hostname.length >= 4;
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed. Use POST.',
    });
  }

  const clientIp =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  const now = Date.now();
  const record = ipRequests.get(clientIp) || { count: 0, start: now };
  if (now - record.start > RATE_LIMIT_WINDOW_MS) {
    record.count = 0;
    record.start = now;
  }
  record.count += 1;
  ipRequests.set(clientIp, record);

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      ok: false,
      error: 'Too many requests. Please wait a minute before trying again.',
    });
  }

  const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {});
  if (rawBody.length > 16384) {
    return res.status(413).json({
      ok: false,
      error: 'Request payload is too large.',
    });
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};

  // Reject unexpected fields
  for (const key of Object.keys(body)) {
    if (!ALLOWED_FIELDS.has(key)) {
      return res.status(400).json({
        ok: false,
        error: 'Invalid form field submitted.',
      });
    }
  }

  // Honeypot check
  if (cleanString(body.honeypot, 100) !== '') {
    return res.status(400).json({
      ok: false,
      error: 'Submission blocked by spam protection.',
    });
  }

  // Validate optional URL fields against javascript:/data: or malformed URLs
  for (const urlField of ['website', 'portfolioUrl', 'resumeUrl']) {
    if (body[urlField] !== undefined && !isSafeOptionalUrlServer(body[urlField])) {
      return res.status(400).json({
        ok: false,
        error: `Please provide a valid http/https URL for ${urlField}.`,
      });
    }
  }

  const name = cleanString(body.name, 100, false);
  const email = cleanString(body.email, 120, false);
  const message = cleanString(body.message, 1500, true);

  if (name.length < 2) {
    return res.status(400).json({
      ok: false,
      error: 'Please provide a valid name (at least 2 characters).',
    });
  }

  if (!isValidEmailServer(email)) {
    return res.status(400).json({
      ok: false,
      error: 'Please provide a valid email address.',
    });
  }

  if (message.length < 10) {
    return res.status(400).json({
      ok: false,
      error: 'Please provide a brief project overview (at least 10 characters).',
    });
  }

  return res.status(200).json({
    ok: true,
    sanitized: {
      name,
      email,
      message,
    },
    validatedAt: new Date(now).toISOString(),
  });
}
