"use client";

import { FormEvent, useState } from "react";

export function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      rating: Number(formData.get("rating") ?? 5),
      message: String(formData.get("message") ?? "")
    };

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      setStatus(data.error ?? "Unable to submit feedback right now.");
      setLoading(false);
      return;
    }

    form.reset();
    setLoading(false);
    setStatus("Thank you. Your feedback was submitted successfully.");
  }

  return (
    <form onSubmit={onSubmit} className="theme-card grid gap-3 rounded-2xl p-5">
      <h3 className="font-display text-3xl text-[#f6f0cf]">Share Feedback</h3>
      <p className="theme-muted text-sm">
        Help us improve your growth experience. We read every response.
      </p>
      <input
        name="name"
        placeholder="Your name"
        className="theme-input rounded-lg px-3 py-2 text-sm"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="theme-input rounded-lg px-3 py-2 text-sm"
      />
      <select name="rating" defaultValue="5" className="theme-input rounded-lg px-3 py-2 text-sm">
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Very Good</option>
        <option value="3">3 - Good</option>
        <option value="2">2 - Fair</option>
        <option value="1">1 - Needs Improvement</option>
      </select>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Write your feedback"
        className="theme-input rounded-lg px-3 py-2 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="theme-btn-primary w-fit rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
      {status && <p className="text-xs text-[#e9ddba]">{status}</p>}
    </form>
  );
}

