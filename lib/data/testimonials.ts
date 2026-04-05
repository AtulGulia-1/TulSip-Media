export type TestimonialItem = {
  quote: string;
  rating: 5 | 4;
  clientName: string;
  clientRole: string;
  socialLabel: string;
  socialUrl: string;
};

export const TESTIMONIAL_ITEMS: TestimonialItem[] = [
  {
    quote:
      "TulSip did not just manage our social media, they transformed how people see our brand and we now get discovery-driven customers every week.",
    rating: 5,
    clientName: "Priya Sharma",
    clientRole: "Founder, Aroma Co.",
    socialLabel: "Instagram",
    socialUrl: "https://instagram.com/aroma.co"
  },
  {
    quote:
      "We were burning money on ads with no direction. TulSip restructured everything and we hit strong ROAS in under two months.",
    rating: 5,
    clientName: "Arjun Mehta",
    clientRole: "CEO, ZestFit",
    socialLabel: "LinkedIn",
    socialUrl: "https://linkedin.com/company/zestfit"
  },
  {
    quote:
      "The rebrand quality was beyond expectations. Our positioning improved, clients trusted us faster, and our pricing power increased.",
    rating: 5,
    clientName: "Deepika Nair",
    clientRole: "Owner, Sparkle Studio",
    socialLabel: "Instagram",
    socialUrl: "https://instagram.com/sparklestudio"
  }
];
