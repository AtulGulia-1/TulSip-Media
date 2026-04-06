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
      "Within 60 days of structured creative testing, admission enquiries became consistent and our local visibility improved noticeably.",
    rating: 5,
    clientName: "Operations Team",
    clientRole: "Mother's Pride Bahadurgarh",
    socialLabel: "Instagram",
    socialUrl: "https://www.instagram.com/tulsipmedia/"
  },
  {
    quote:
      "Our daily offer campaigns started bringing measurable footfall. The messaging became clearer and repeat buyers increased month over month.",
    rating: 5,
    clientName: "Store Management",
    clientRole: "Shop24 Seven Bahadurgarh",
    socialLabel: "Instagram",
    socialUrl: "https://www.instagram.com/tulsipmedia/"
  },
  {
    quote:
      "We now get better quality sports enquiries from the right age group. Campaigns are more focused and inquiries are easier to track.",
    rating: 5,
    clientName: "Admin Desk",
    clientRole: "Shree Shyam Cricket Academy",
    socialLabel: "Instagram",
    socialUrl: "https://www.instagram.com/tulsipmedia/"
  },
  {
    quote:
      "TulSip improved our campaign structure and reporting discipline. Lead quality became better while ad waste reduced across platforms.",
    rating: 5,
    clientName: "Growth Team",
    clientRole: "Ad Guru",
    socialLabel: "LinkedIn",
    socialUrl: "https://www.linkedin.com/in/tulsip-media-189251401"
  },
  {
    quote:
      "Our pet-care service campaigns now convert more reliably. Better local targeting and clearer creatives helped us scale appointments steadily.",
    rating: 5,
    clientName: "Customer Success",
    clientRole: "Prime Pet Care",
    socialLabel: "Instagram",
    socialUrl: "https://www.instagram.com/tulsipmedia/"
  }
];
