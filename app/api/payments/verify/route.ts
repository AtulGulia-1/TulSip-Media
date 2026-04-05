import crypto from "crypto";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { CONFIG } from "@/lib/config";

export async function POST(request: Request) {
  if (!CONFIG.paymentsEnabled) {
    return NextResponse.json(
      { verified: false, error: "Payments are temporarily disabled" },
      { status: 503 }
    );
  }

  try {
    const body = (await request.json()) as {
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      email?: string;
      planId?: string;
    };

    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      email,
      planId
    } = body;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ verified: false, error: "Missing payment data" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { verified: false, error: "Payment gateway is not configured" },
        { status: 500 }
      );
    }

    const digest = crypto
      .createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    const verified = digest === signature;
    if (!verified) {
      return NextResponse.json({ verified: false }, { status: 400 });
    }

    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const admin = createAdminClient();
      await admin.from("payments").insert({
        order_id: orderId,
        payment_id: paymentId,
        status: "paid",
        plan_id: planId ?? null,
        payer_email: email ?? null
      });
    }

    return NextResponse.json({ verified: true });
  } catch {
    return NextResponse.json({ verified: false, error: "Verification failed" }, { status: 500 });
  }
}
