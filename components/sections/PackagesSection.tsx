"use client";

import { useState } from "react";
import { PACKAGE_PLANS } from "@/lib/data/packages";
import { CONFIG } from "@/lib/config";

export function PackagesSection() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
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

  const selectedPlan = selectedPlanId
    ? PACKAGE_PLANS.find((item) => item.id === selectedPlanId) ?? null
    : null;

  return (
    <section className="section-shell section-y" data-reveal>
      <div className="mb-10 space-y-3">
        <h2 className="font-display text-[clamp(2rem,5vw,3rem)] text-[#f6f0cf]">
          Transparent Packages. <span className="text-[#c62828] italic">Real Results.</span>
        </h2>
        <p className="theme-muted max-w-2xl">
          Flexible plans for local growth and global brand expansion.
        </p>
        <p className="inline-flex rounded-sm border border-[#ce1919]/50 bg-[#7d0f0f]/25 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#ffd8d8]">
          We onboard only 5 clients per month. Limited slots available, book your call now.
        </p>
        {paymentsDisabled && (
          <p className="inline-flex rounded-sm border border-[#f6f0cf]/30 bg-black/20 px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f6f0cf]">
            Payments are temporarily disabled.
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {PACKAGE_PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`theme-card relative flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-1 ${
              plan.isMostPopular ? "border-[#ce1919]" : ""
            }`}
          >
            {plan.isMostPopular && (
              <span className="absolute -top-3 left-4 rounded-full bg-[#ce1919] px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}

            <h3 className="font-display text-2xl font-semibold text-[#f6f0cf]">{plan.name}</h3>
            <div className="mt-4 flex items-center gap-2">
              {plan.originalPrice && (
                <span className="text-base text-[#9f9483] line-through">{plan.originalPrice}</span>
              )}
              <span className="text-2xl font-bold text-[#f6f0cf]">{plan.currentPrice}</span>
            </div>

            <ul className="theme-muted mt-4 space-y-2 text-sm">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() => setSelectedPlanId(plan.id)}
              disabled={paymentsDisabled || selectedPlanId === plan.id}
              className="mt-6 inline-flex rounded-sm border border-[#ce1919] px-4 py-2 text-sm font-semibold text-[#f6f0cf] transition hover:bg-[#ce1919] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {paymentsDisabled ? "Temporarily Unavailable" : "Choose Plan"}
            </button>
          </article>
        ))}
      </div>

      {selectedPlan && !paymentsDisabled && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4">
          <div className="theme-card w-full max-w-md rounded-2xl p-6">
            <h3 className="font-display text-3xl text-[#f6f0cf]">{selectedPlan.name}</h3>
            <p className="theme-muted mt-2 text-sm">
              Select your payment method for {selectedPlan.currentPrice}.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href={getUpiUrl(selectedPlan.id)}
                className="rounded-sm border border-[#25D366] px-4 py-2 text-center text-sm font-semibold text-[#baf2cf] transition hover:bg-[#25D366]/15"
              >
                Open UPI App to Pay
              </a>
              <button
                type="button"
                onClick={() => setSelectedPlanId(null)}
                className="rounded-sm border border-white/20 px-4 py-2 text-sm font-semibold text-[#f6f0cf] transition hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
