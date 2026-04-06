import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendFeedbackReceiptEmail } from "@/lib/notifications/email";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      rating?: number;
      message?: string;
    };
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const message = String(body.message ?? "").trim();
    const rating = Number(body.rating ?? 5);

    if (!email || !message) {
      return NextResponse.json({ ok: false, error: "Email and feedback are required" }, { status: 400 });
    }

    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const admin = createAdminClient();
      // Optional table: if missing in DB, continue gracefully.
      try {
        await admin.from("feedback_submissions").insert({
          name: name || null,
          email,
          rating: Number.isFinite(rating) ? Math.max(1, Math.min(5, rating)) : 5,
          message
        });
      } catch {
        // no-op
      }
    }

    await sendFeedbackReceiptEmail({ email, name: name || undefined });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to submit feedback" }, { status: 500 });
  }
}
