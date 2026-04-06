import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { PackagesSection } from "@/components/sections/PackagesSection";

export const metadata: Metadata = {
  title: "Packages",
  description: "Simple monthly plans, transparent scope, and measurable growth outcomes.",
  alternates: { canonical: "/packages" }
};

export default function PackagesPage() {
  return (
    <>
      <PageIntro
        title="Packages"
        description="Simple monthly plans, transparent scope, and measurable growth outcomes."
      />
      <PackagesSection />
    </>
  );
}
