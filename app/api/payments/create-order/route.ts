import { NextResponse } from "next/server";
import { PACKAGE_PLANS } from "@/lib/data/packages";
import { CONFIG } from "@/lib/config";
import { createRazorpayClient } from "@/lib/payments/razorpay";

export async function POST(request: Request) {
  if (!CONFIG.paymentsEnabled) {
    return NextResponse.json({ error: "Payments are temporarily disabled" }, { status: 503 });
  }

  try {
    const body = (await request.json()) as { planId?: string };
    const plan = PACKAGE_PLANS.find((item) => item.id === body.planId);

    if (!plan) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ error: "Payment gateway is not configured" }, { status: 500 });
    }

    const razorpay = createRazorpayClient();
    const order = await razorpay.orders.create({
      amount: plan.amountPaise,
      currency: "INR",
      receipt: `plan_${plan.id}_${Date.now()}`,
      notes: {
        plan_id: plan.id,
        plan_name: plan.name
      }
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      planName: plan.name
    });
  } catch {
    return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
  }
}
