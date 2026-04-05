"use client";

import { useState } from "react";
import { PACKAGE_PLANS } from "@/lib/data/packages";
import { CONFIG } from "@/lib/config";

type PortalPlanPurchaseProps = {
  defaultEmail?: string;
  defaultClientName?: string;
};

export function PortalPlanPurchase({ defaultEmail = "", defaultClientName = "" }: PortalPlanPurchaseProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [clientName, setClientName] = useState(defaultClientName);
  const paymentsDisabled = !CONFIG.paymentsEnabled;

  function getUpiUrl(planId: string) {
    const plan = PACKAGE_PLANS.find((item) => item.id === planId);
    if (!plan) return "#";
    const amount = (plan.amountPaise / 100).toFixed(2);
    return `upi://pay?pa=${encodeURIComponent(CONFIG.upiId)}&pn=${encodeURIComponent(
      CONFIG.upiPayeeName
    )}&am=${encodeURIComponent(amount)}&cu=INR&tn=${encodeURIComponent(
      `${plan.name} plan payment`
    )}`;
  }

  return (
    <article className="theme-card rounded-2xl p-5">
      <h2 className="font-display text-3xl text-[#f6f0cf]">Activate Your Plan</h2>
      <p className="theme-muted mt-2 text-sm">
        You have not purchased a plan yet. Choose one to unlock full campaign execution.
      </p>
      {paymentsDisabled && (
        <p className="mt-3 inline-flex rounded-sm border border-[#f6f0cf]/30 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f6f0cf]">
          Payments are temporarily disabled.
        </p>
      )}
      <div className="mt-4 grid gap-2 rounded-xl border border-white/10 bg-black/15 p-3 sm:grid-cols-2">
        <input
          type="text"
          value={clientName}
          onChange={(event) => setClientName(event.target.value)}
          placeholder="Business name"
          className="theme-input rounded-sm px-3 py-2 text-xs"
        />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email for confirmation"
          className="theme-input rounded-sm px-3 py-2 text-xs"
        />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {PACKAGE_PLANS.map((plan) => (
          <div key={plan.id} className="rounded-xl border border-white/10 bg-black/15 p-4">
            <p className="font-semibold text-[#f3e7c5]">{plan.name}</p>
            <p className="mt-2 text-sm">
              {plan.originalPrice && <span className="mr-2 text-[#9f9483] line-through">{plan.originalPrice}</span>}
              <span className="font-semibold text-[#f6f0cf]">{plan.currentPrice}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={paymentsDisabled ? undefined : getUpiUrl(plan.id)}
                onClick={(event) => {
                  if (paymentsDisabled) event.preventDefault();
                }}
                className="rounded-sm border border-[#25D366] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#baf2cf] transition hover:bg-[#25D366]/15"
              >
                Open UPI
              </a>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
