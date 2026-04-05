"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function sendOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/auth/forgot-password/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    setLoading(false);
    if (!res.ok) {
      setMessage("Unable to send OTP. Try again.");
      return;
    }

    setSent(true);
    setMessage("OTP sent to your email.");
  }

  async function verifyOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);

    const res = await fetch("/api/auth/forgot-password/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword })
    });
    const data = (await res.json()) as { error?: string };

    setLoading(false);
    if (!res.ok) {
      setMessage(data.error ?? "Unable to reset password.");
      return;
    }

    setMessage("Password reset successful. Redirecting to login...");
    setTimeout(() => router.push("/login"), 1000);
  }

  return (
    <>
      <section className="section-shell section-y" data-reveal>
        <h1 className="font-display text-5xl font-semibold text-[#f6f0cf]">Forgot Password</h1>
        <p className="theme-muted mt-2">
          We will send an OTP to your email. Verify OTP and set a new password.
        </p>
      </section>

      <section className="section-shell section-b" data-reveal>
        {!sent ? (
          <form onSubmit={sendOtp} className="theme-card mx-auto grid max-w-md gap-4 rounded-2xl p-6">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Client email"
              className="theme-input rounded-xl px-3 py-2 text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="theme-btn-primary w-fit rounded-sm px-5 py-2 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="theme-card mx-auto grid max-w-md gap-4 rounded-2xl p-6">
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
              placeholder="Enter OTP"
              className="theme-input rounded-xl px-3 py-2 text-sm"
              required
            />
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="New password"
              className="theme-input rounded-xl px-3 py-2 text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="theme-btn-primary w-fit rounded-sm px-5 py-2 text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify OTP & Reset Password"}
            </button>
          </form>
        )}
        {message && <p className="theme-muted mx-auto mt-4 max-w-md text-sm">{message}</p>}
      </section>
    </>
  );
}

