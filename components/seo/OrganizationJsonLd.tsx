import { CONFIG } from "@/lib/config";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: CONFIG.brandName,
    url: CONFIG.siteUrl,
    logo: `${CONFIG.siteUrl}/logo.png`,
    slogan: CONFIG.tagline,
    sameAs: [
      CONFIG.socialLinks.instagram,
      CONFIG.socialLinks.facebook,
      CONFIG.socialLinks.linkedin,
      CONFIG.socialLinks.youtube
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
