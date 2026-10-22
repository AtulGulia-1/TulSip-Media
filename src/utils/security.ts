/**
 * Centralized input validation, sanitization, URL verification, and client rate-limiting utilities.
 */

export const FIELD_LIMITS = {
  name: 100,
  email: 120,
  phone: 25,
  businessName: 120,
  socialHandle: 100,
  url: 240,
  budget: 80,
  challenge: 120,
  role: 120,
  college: 140,
  referenceId: 64,
  message: 1500,
} as const;

/**
 * Strips HTML angle brackets, ASCII control characters (except newline/tab in multiline mode),
 * and enforces strict maximum character length.
 */
export function sanitizeText(
  input: unknown,
  maxLength = 500,
  allowNewlines = false
): string {
  if (typeof input !== 'string') return '';
  let cleaned = input
    // Remove null bytes and dangerous control characters
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    // Strip HTML/script angle brackets
    .replace(/[<>]/g, '');

  if (!allowNewlines) {
    // Prevent email header injection (CR/LF) in single-line fields
    cleaned = cleaned.replace(/[\r\n]+/g, ' ');
  } else {
    cleaned = cleaned.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  }

  return cleaned.trim().slice(0, maxLength);
}

/**
 * Validates standard email format and rejects header-injection characters.
 */
export function isValidEmail(email: string): boolean {
  const clean = sanitizeText(email, FIELD_LIMITS.email, false);
  if (!clean || clean.length < 5 || clean.length > FIELD_LIMITS.email) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(
    clean
  );
}

/**
 * Validates optional phone / WhatsApp number format.
 */
export function isValidPhone(phone: string): boolean {
  const clean = sanitizeText(phone, FIELD_LIMITS.phone, false);
  if (!clean) return true; // Optional when empty; callers check required separately
  return /^[+\d\s()-]{7,20}$/.test(clean);
}

/**
 * Validates URLs and prevents dangerous schemes (javascript:, data:, vbscript:, file:).
 * Allows "none" or "none yet" when allowNoneKeyword is true.
 */
export function isValidSafeUrl(
  rawUrl: string,
  options: { required?: boolean; allowNoneKeyword?: boolean } = {}
): boolean {
  const clean = sanitizeText(rawUrl, FIELD_LIMITS.url, false);
  if (!clean) return !options.required;

  if (
    options.allowNoneKeyword &&
    /^(none|none yet|n\/a|na|no website)$/i.test(clean)
  ) {
    return true;
  }

  // Reject dangerous protocols explicitly
  if (/^(javascript|data|vbscript|file|blob):/i.test(clean)) {
    return false;
  }

  const candidate = /^https?:\/\//i.test(clean) ? clean : `https://${clean}`;
  try {
    const parsed = new URL(candidate);
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      parsed.hostname.includes('.') &&
      !parsed.hostname.includes('..')
    );
  } catch {
    return false;
  }
}

/**
 * Checks and records per-form submission cooldown in sessionStorage.
 */
export function checkRateLimitCooldown(
  storageKey: string,
  cooldownMs = 30000
): { allowed: boolean; retryAfterSeconds: number } {
  if (typeof window === 'undefined') {
    return { allowed: true, retryAfterSeconds: 0 };
  }
  try {
    const lastTs = Number(window.sessionStorage.getItem(storageKey) || '0');
    const now = Date.now();
    if (lastTs > 0 && now - lastTs < cooldownMs) {
      return {
        allowed: false,
        retryAfterSeconds: Math.max(1, Math.ceil((cooldownMs - (now - lastTs)) / 1000)),
      };
    }
    return { allowed: true, retryAfterSeconds: 0 };
  } catch {
    return { allowed: true, retryAfterSeconds: 0 };
  }
}

export function recordRateLimitSubmission(storageKey: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(storageKey, String(Date.now()));
  } catch {
    // Ignore storage quota errors
  }
}
