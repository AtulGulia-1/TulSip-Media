import { NextResponse } from "next/server";
import { sendDailyMotivationEmail, sendRenewalReminderEmail } from "@/lib/notifications/email";
import { createAdminClient } from "@/lib/supabase/admin";
import { PACKAGE_PLANS } from "@/lib/data/packages";

const QUOTES = [
  "Execution beats intention. Show up daily and your market will notice.",
  "Consistency is a growth moat. Keep publishing, keep improving.",
  "Strong brands are built by clear positioning and repeated proof.",
  "Data shows direction. Creativity gives momentum.",
  "Local trust plus digital discipline creates global opportunities."
];

function pickQuote() {
  return QUOTES[new Date().getDate() % QUOTES.length];
}

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const expected = process.env.CRON_SECRET;
  if (expected && authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json(
      { ok: false, error: "Supabase service key not configured" },
      { status: 500 }
    );
  }

  try {
    const admin = createAdminClient();
    const usersRes = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const quote = pickQuote();

    for (const user of usersRes.data.users) {
      const email = (user.email ?? "").trim().toLowerCase();
      if (!email) continue;
      await sendDailyMotivationEmail({ email, quote });
    }

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 25);
    const { data: nearRenewals } = await admin
      .from("payments")
      .select("plan_id,payer_email,created_at,status")
      .eq("status", "paid")
      .gte("created_at", cutoff.toISOString())
      .order("created_at", { ascending: false });

    for (const payment of nearRenewals ?? []) {
      if (!payment.payer_email) continue;
      const createdAt = new Date(payment.created_at);
      const daysSince = Math.floor((Date.now() - createdAt.getTime()) / 86400000);
      const daysLeft = Math.max(0, 30 - daysSince);
      if (daysLeft > 5) continue;
      const plan = PACKAGE_PLANS.find((item) => item.id === payment.plan_id);
      await sendRenewalReminderEmail({
        email: payment.payer_email,
        planName: plan?.name ?? "TulSip subscription",
        daysLeft
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Daily notification job failed" }, { status: 500 });
  }
}

