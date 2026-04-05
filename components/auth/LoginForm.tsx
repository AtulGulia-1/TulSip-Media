"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type LoginFormProps = {
  title?: string;
  description?: string;
  defaultRedirect?: string;
  portalType?: "client" | "admin";
};

type PortalRole = "owner" | "admin" | "manager" | "client" | undefined;

export function LoginForm({
  title = "Client Login",
  description = "Access your content calendar, approvals, and reports.",
  defaultRedirect = "/dashboard",
  portalType = "client"
}: LoginFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nextUrl = useMemo(
    () => searchParams.get("next") ?? defaultRedirect,
    [searchParams, defaultRedirect]
  );

  const resolveRoleAndRoute = useCallback(async (userId: string) => {
    const supabase = createClient();
    const initialProfileRes = await supabase
      .from("users")
      .select("role")
      .eq("auth_user_id", userId)
      .maybeSingle();
    if (initialProfileRes.error) {
      await supabase.auth.signOut();
      setError(`Profile read failed: ${initialProfileRes.error.message}`);
      return;
    }
    let profile = initialProfileRes.data;

    if (!profile && portalType === "client") {
      await fetch("/api/auth/bootstrap-client", { method: "POST" });
      const clientBootstrapProfileRes = await supabase
        .from("users")
        .select("role")
        .eq("auth_user_id", userId)
        .maybeSingle();
      if (clientBootstrapProfileRes.error) {
        await supabase.auth.signOut();
        setError(`Client bootstrap failed: ${clientBootstrapProfileRes.error.message}`);
        return;
      }
      profile = clientBootstrapProfileRes.data;
    }
    if (!profile && portalType === "admin") {
      const bootstrapRes = await fetch("/api/auth/bootstrap-admin", { method: "POST" });
      if (!bootstrapRes.ok) {
        const body = (await bootstrapRes.json().catch(() => ({}))) as { error?: string };
        await supabase.auth.signOut();
        setError(body.error ?? "Admin profile bootstrap failed. Contact owner.");
        return;
      }
      const adminBootstrapProfileRes = await supabase
        .from("users")
        .select("role")
        .eq("auth_user_id", userId)
        .maybeSingle();
      if (adminBootstrapProfileRes.error) {
        await supabase.auth.signOut();
        setError(`Admin profile read failed: ${adminBootstrapProfileRes.error.message}`);
        return;
      }
      profile = adminBootstrapProfileRes.data;
    }

    const role = profile?.role as PortalRole;
    const isAdminRole = role === "owner" || role === "admin" || role === "manager";
    const isClientRole = role === "client";

    if (portalType === "admin" && !isAdminRole) {
      await supabase.auth.signOut();
      setError("This account is not allowed for admin login.");
      return;
    }

    if (portalType === "client" && isAdminRole) {
      await supabase.auth.signOut();
      setError("Admin/Owner accounts must login from the admin portal.");
      return;
    }

    if (portalType === "client" && !isClientRole) {
      await supabase.auth.signOut();
      setError("This account is not allowed for client login.");
      return;
    }

    router.push(nextUrl);
  }, [nextUrl, portalType, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    const enteredIdentifier = identifier;
    const enteredPassword = password;
    // User requested fresh credential entry after pressing login.
    setIdentifier("");
    setPassword("");

    const resolveRes = await fetch("/api/auth/resolve-identifier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: enteredIdentifier })
    });
    const resolveData = (await resolveRes.json().catch(() => ({}))) as {
      ok?: boolean;
      email?: string;
      error?: string;
    };
    const resolvedEmail = resolveData.email?.trim().toLowerCase();
    if (!resolveRes.ok || !resolveData.ok || !resolvedEmail) {
      setLoading(false);
      setError(resolveData.error ?? "Invalid credentials.");
      return;
    }

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: resolvedEmail,
      password: enteredPassword
    });

    if (signInError || !data.user) {
      setLoading(false);
      setError(signInError?.message ?? "Unable to sign in.");
      return;
    }

    await resolveRoleAndRoute(data.user.id);
    setLoading(false);
  }

  async function handleOAuth(provider: "google" | "facebook", isInstagram = false) {
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const redirectTo = `${window.location.origin}/login?portal=${portalType}&oauth=1${
      isInstagram ? "&provider=instagram" : ""
    }`;

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo,
        ...(isInstagram ? { scopes: "instagram_basic email public_profile" } : {})
      }
    });

    if (oauthError) {
      setError(oauthError.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchParams.get("oauth") !== "1") return;

    let cancelled = false;

    async function finishOAuth() {
      const supabase = createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user || cancelled) {
        setLoading(false);
        return;
      }

      await resolveRoleAndRoute(user.id);
      if (!cancelled) setLoading(false);
    }

    finishOAuth();

    return () => {
      cancelled = true;
    };
  }, [resolveRoleAndRoute, searchParams]);

  return (
    <form onSubmit={handleSubmit} className="theme-card mx-auto w-full max-w-md space-y-4 rounded-2xl p-6">
      <h1 className="font-display text-4xl font-semibold text-[#f6f0cf]">{title}</h1>
      <p className="theme-muted text-sm">{description}</p>

      <label className="block text-sm font-medium text-[#f3e7c5]" htmlFor="identifier">
        Email or Username
      </label>
      <input
        id="identifier"
        name="identifier"
        type="text"
        autoComplete="username"
        required
        value={identifier}
        onChange={(event) => setIdentifier(event.target.value)}
        className="theme-input w-full rounded-xl px-3 py-2 text-sm transition"
      />

      <label className="block text-sm font-medium text-[#f3e7c5]" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="theme-input w-full rounded-xl px-3 py-2 text-sm transition"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="theme-btn-primary w-full rounded-sm px-4 py-2 text-sm font-semibold transition disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {portalType === "client" && (
        <>
          <p className="theme-muted text-xs">
            No account yet?{" "}
            <Link href="/register" className="text-[#f6f0cf] underline underline-offset-4">
              Create account
            </Link>
          </p>
          <div className="grid gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              className="w-full rounded-sm border border-white/20 px-4 py-2 text-sm font-semibold text-[#f6f0cf] transition hover:bg-white/10"
            >
              Continue with Google
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("facebook")}
              className="w-full rounded-sm border border-white/20 px-4 py-2 text-sm font-semibold text-[#f6f0cf] transition hover:bg-white/10"
            >
              Continue with Facebook
            </button>
            <button
              type="button"
              onClick={() => handleOAuth("facebook", true)}
              className="w-full rounded-sm border border-white/20 px-4 py-2 text-sm font-semibold text-[#f6f0cf] transition hover:bg-white/10"
            >
              Continue with Instagram (Meta)
            </button>
          </div>
        </>
      )}
    </form>
  );
}
