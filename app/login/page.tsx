import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/LoginForm";
import { PortalConstructionPopup } from "@/components/auth/PortalConstructionPopup";

export default async function LoginPage({
  searchParams
}: {
  searchParams?: Promise<{ portal?: "client" | "admin" }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const selectedPortal = resolvedSearchParams?.portal === "admin" ? "admin" : "client";

  return (
    <section className="section-shell section-y" data-reveal>
      <PortalConstructionPopup />
      <div className="theme-card mx-auto mb-4 grid w-full max-w-md grid-cols-2 rounded-xl p-1">
        <Link
          href="/login?portal=client"
          className={`rounded-lg px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] ${
            selectedPortal === "client" ? "bg-[#b31313] text-white" : "text-[#c9c0a3]"
          }`}
        >
          User Login
        </Link>
        <Link
          href="/login?portal=admin"
          className={`rounded-lg px-3 py-2 text-center text-xs font-semibold uppercase tracking-[0.08em] ${
            selectedPortal === "admin" ? "bg-[#b31313] text-white" : "text-[#c9c0a3]"
          }`}
        >
          Admin Login
        </Link>
      </div>

      <Suspense>
        <LoginForm
          title={selectedPortal === "admin" ? "Admin Login" : "User Login"}
          description={
            selectedPortal === "admin"
              ? "Access client operations, approvals, reports, and settings."
              : "Access your content calendar, approvals, deliverables, and reports."
          }
          defaultRedirect={selectedPortal === "admin" ? "/admin/dashboard" : "/dashboard"}
          portalType={selectedPortal}
        />
      </Suspense>
      <p className="theme-muted mx-auto mt-2 w-full max-w-md text-sm">
        New client?{" "}
        <Link href="/register" className="text-[#f6f0cf] underline underline-offset-4">
          Register here
        </Link>
      </p>
      <p className="theme-muted mx-auto mt-2 w-full max-w-md text-xs">
        Owner/Admin accounts must login using{" "}
        <Link href="/login?portal=admin" className="text-[#f6f0cf] underline underline-offset-4">
          Admin Login
        </Link>.
      </p>
      <p className="theme-muted mx-auto mt-2 w-full max-w-md text-sm">
        Forgot password?{" "}
        <Link href="/forgot-password" className="text-[#f6f0cf] underline underline-offset-4">
          Reset with OTP
        </Link>
      </p>
    </section>
  );
}

