import type { Metadata } from "next";
import { PageIntro } from "@/components/common/PageIntro";
import { ServicesSection } from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description: "Execution pods for strategy, creative, paid growth, content, and analytics.",
  alternates: { canonical: "/services" }
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        title="Services"
        description="Execution pods for strategy, creative, paid growth, content, and analytics."
      />
      <ServicesSection />
    </>
  );
}
