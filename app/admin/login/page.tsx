import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { PortalConstructionPopup } from "@/components/auth/PortalConstructionPopup";

export default function AdminLoginPage() {
  return (
    <section className="section-shell section-y" data-reveal>
      <PortalConstructionPopup />
      <Suspense>
        <LoginForm
          title="Admin Login"
          description="Manage clients, content, approvals, deliverables, and reports."
          defaultRedirect="/admin/dashboard"
          portalType="admin"
        />
      </Suspense>
    </section>
  );
}

