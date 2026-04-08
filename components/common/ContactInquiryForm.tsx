"use client";

import { FormEvent, useState } from "react";

export function ContactInquiryForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? "")
    };

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
    };

    if (!response.ok || !data.ok) {
      setStatus(data.error ?? "Please complete the required details so we can respond properly.");
      setLoading(false);
      return;
    }

    form.reset();
    setStatus("Thanks - your request is in. We will review your details and get back to you shortly.");
    setLoading(false);
  }

  return (
    <form id="contact-form" onSubmit={onSubmit} className="theme-card grid gap-4 rounded-2xl p-6">
      <h3 className="font-display text-3xl text-[#f6f0cf]">Book your free Journey Audit</h3>
      <p className="theme-muted text-sm leading-7">
        Tell us about your brand, goals, and current growth challenges. We will review your touchpoints and recommend the next steps.
      </p>
      <input
        type="text"
        name="name"
        required
        placeholder="Full name"
        className="theme-input w-full rounded-xl px-3 py-2 text-sm transition"
      />
      <input
        type="email"
        name="email"
        required
        placeholder="Email address"
        className="theme-input w-full rounded-xl px-3 py-2 text-sm transition"
      />
      <textarea
        name="message"
        required
        placeholder="What do you want to improve?"
        rows={5}
        className="theme-input w-full rounded-xl px-3 py-2 text-sm transition"
      />
      <button
        type="submit"
        disabled={loading}
        className="theme-btn-primary w-fit rounded-sm px-5 py-2 text-sm font-semibold transition disabled:opacity-60"
      >
        {loading ? "Sending your request..." : "Request My Journey Audit"}
      </button>
      {status && <p className="text-xs text-[#e9ddba]">{status}</p>}
    </form>
  );
}

export default ContactInquiryForm;
