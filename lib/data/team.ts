export type TeamMember = {
  name: string;
  role: string;
  image: string;
  specialties: string[];
};

// Replace only image URLs here to update team photos site-wide.
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "Sagar Gulia",
    role: "Account Director",
    image: "/images/team/sagar.jpeg",
    specialties: ["Positioning", "Go-to-market", "Funnel planning"]
  },
  {
    name: "Sahil Lakra",
    role: "Creative Lead",
    image: "/images/team/Sahil lakra.png",
    specialties: ["Meta ads", "Google ads", "Attribution"]
  },
  {
    name: "Sahil Sehrawat",
    role: "Performance Marketing",
    image: "/images/team/shail sehrawat.jpg",
    specialties: ["Brand design", "Campaign creative", "Visual systems"]
  },
  {
    name: "Mandeep",
    role: "Growth Strategist",
    image: "/images/team/mandeep.jpg",
    specialties: ["Client success", "Planning", "Delivery ops"]
  }
];
