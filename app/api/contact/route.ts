import { NextResponse } from "next/server";
import { sendContactInquiryEmail } from "@/lib/notifications/email";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

type RateBucket = {
  count: number;
  resetAt: number;
};

const globalForRateLimit = globalThis as typeof globalThis & {
  __contactRateLimit?: Map<string, RateBucket>;
};

const rateLimitStore = globalForRateLimit.__contactRateLimit ?? new Map<string, RateBucket>();
globalForRateLimit.__contactRateLimit = rateLimitStore;

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim();
  return ip || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || now > current.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(key, current);
  return false;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const rateKey = `${getClientIp(request)}:${email}`;
    if (isRateLimited(rateKey)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Too many inquiries in a short time. Please wait 10 minutes and try again."
        },
        { status: 429 }
      );
    }

    await sendContactInquiryEmail({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unable to submit inquiry right now."
      },
      { status: 500 }
    );
  }
}
