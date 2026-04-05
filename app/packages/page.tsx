import { PageIntro } from "@/components/common/PageIntro";
import { PackagesSection } from "@/components/sections/PackagesSection";

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
