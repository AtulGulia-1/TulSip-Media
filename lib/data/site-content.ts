export const SITE_COPY = {
  hero: {
    badge: "Digital Marketing Agency - India",
    line1: "Local Brands.",
    highlight: "Global",
    line2: "Voices.",
    description:
      "We transform local businesses into globally recognized brands through precision marketing, scroll-stopping creatives, and data-backed growth strategies.",
    primaryCta: "Book a Free Call",
    secondaryCta: "See Our Work"
  },
  footer: {
    description: "Performance-focused digital marketing for local brands ready to scale globally."
  },
  loginPopup: {
    title: "Under Construction",
    text:
      "Client/Admin portal is actively being upgraded with new modules. Current login and core tools are available while advanced features roll out."
  }
} as const;

export const EDITABLE_NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Clients", href: "/clients" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" }
] as const;

export const EDITABLE_FOOTER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Team", href: "/team" },
  { label: "Help Center", href: "/help-center" },
  { label: "Contact", href: "/contact" }
] as const;

export const EDITABLE_SOCIAL_LINKS = [
  { label: "Instagram", key: "instagram" },
  { label: "Twitter", key: "twitter" },
  { label: "LinkedIn", key: "linkedin" }
] as const;
