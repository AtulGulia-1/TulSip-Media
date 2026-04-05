import { FAQSection } from "@/components/sections/FAQSection";
import { PageIntro } from "@/components/common/PageIntro";

export default function HelpCenterPage() {
  return (
    <>
      <PageIntro
        title="Help Center"
        description="Find answers quickly and use the AI chatbot for instant guidance in your preferred language."
      />
      <FAQSection />
    </>
  );
}

