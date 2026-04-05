import { PageIntro } from "@/components/common/PageIntro";
import Link from "next/link";
import ContactInquiryForm from "@/components/common/ContactInquiryForm";
import { CONFIG } from "@/lib/config";

export default function ContactPage() {
  const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    CONFIG.whatsappMessage
  )}`;

  return (
    <>
      <PageIntro
        title="Contact"
        description="Tell us about your brand goals and we will propose a performance roadmap."
      />
      <section className="section-shell section-b" data-reveal>
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <ContactInquiryForm />
            <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#e9ddba]">
              <a href={CONFIG.socialLinks.instagram} target="_blank" rel="noreferrer">Instagram</a>
              <a href={CONFIG.socialLinks.twitter} target="_blank" rel="noreferrer">Twitter</a>
              <a href={CONFIG.socialLinks.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
            <Link
              href="/help-center"
              className="mt-2 inline-flex w-fit rounded-sm border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
            >
              Help Center + FAQs
            </Link>
          </div>

          <div className="theme-card overflow-hidden rounded-2xl p-3">
            <iframe
              title="TulSip Media Location"
              src={CONFIG.googleMapsEmbedUrl}
              className="h-[340px] w-full rounded-xl border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2 pb-1">
              <p className="theme-muted text-sm">{CONFIG.officeAddress}</p>
              <div className="flex flex-wrap gap-2">
                <a
                  href={CONFIG.googleMapsLocationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f3e7c5] transition hover:bg-white/10"
                >
                  Open Location
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="theme-btn-primary rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
