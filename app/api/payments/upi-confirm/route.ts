import { NextResponse } from "next/server";
import { PACKAGE_PLANS } from "@/lib/data/packages";
import { CONFIG } from "@/lib/config";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendPurchaseConfirmationEmail } from "@/lib/notifications/email";

function makeRef(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request: Request) {
  if (!CONFIG.paymentsEnabled) {
    return NextResponse.json(
      { ok: false, error: "Payments are temporarily disabled" },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      planId?: string;
      email?: string;
      clientName?: string;
      transactionRef?: string;
    };
    const plan = PACKAGE_PLANS.find((item) => item.id === body.planId);
    const email = String(body.email ?? "").trim().toLowerCase();
    const clientName = String(body.clientName ?? "").trim();

    if (!plan || !email) {
      return NextResponse.json({ ok: false, error: "Missing plan or email" }, { status: 400 });
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json(
        { ok: false, error: "Supabase service key not configured" },
        { status: 500 }
      );
    }

    const admin = createAdminClient();
    const orderId = makeRef("upi_order");
    const paymentId = body.transactionRef?.trim() || makeRef("upi_payment");

    await admin.from("payments").insert({
      order_id: orderId,
      payment_id: paymentId,
      status: "paid",
      plan_id: plan.id,
      payer_email: email
    });

    await sendPurchaseConfirmationEmail({
      email,
      clientName: clientName || undefined,
      planName: plan.name,
      amountInr: Math.round(plan.amountPaise / 100)
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to confirm payment" }, { status: 500 });
  }
}
