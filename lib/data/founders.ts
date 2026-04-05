export type FounderProfile = {
  name: string;
  title: string;
  image: string;
  bio: string;
  location: string;
  linkedin?: string;
};

export const COMPANY_STORY = {
  heading: "Our Brand Story",
  body:
    "TulSip Media was born from a single observation: small brands have big dreams, but their signals get lost in digital noise. Like a tulip breaking through winter soil, we nurture local businesses through their quiet growth phase, then amplify their voices to global stages. TULIP represents elegant transformation from local to legendary, and SIP is the steady signal that carries your story worldwide."
};

// Replace founder images by dropping files inside /public/images/founders
// and updating only the `image` values below.
export const FOUNDERS: FounderProfile[] = [
  {
    name: "Atul Gulia",
    title: "Founder & CEO",
    image: "/images/team/Atul.jpeg",
    bio:
      "Built TulSip Media to create a measurable, execution-first growth model for local brands ready to scale across markets.",
    location: "New Delhi, India",
    linkedin: "https://linkedin.com"
  },
 /* {
    name: "Ritika Saini",
    title: "Co-Founder & Creative Director",
    image: "/camera-fallback1.png",
    bio:
      "Leads the creative direction, brand systems, and campaign storytelling that turn attention into trust and conversions.",
    location: "Gurugram, India",
    linkedin: "https://linkedin.com"
  } */
];

export const PRIMARY_FOUNDER_NAME = "Atul Gulia";
export const PRIMARY_FOUNDER =
  FOUNDERS.find((founder) => founder.name === PRIMARY_FOUNDER_NAME) ?? FOUNDERS[0];
