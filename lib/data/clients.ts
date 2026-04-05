export type ClientItem = {
  name: string;
  logo: string;
  website: string;
  socialProfile: string;
  socialLabel: string;
};

// Replace logo files in /public/images/clients and keep the same path format.
// Using local assets avoids third-party runtime failures.
export const CLIENT_ITEMS: ClientItem[] = [
  {
    name: "Aroma Co.",
    logo: "/images/clients/aroma-co.png",
    website: "https://aroma.co",
    socialProfile: "https://instagram.com/aroma.co",
    socialLabel: "Instagram"
  },
  {
    name: "ZestFit",
    logo: "/images/clients/zestfit.png",
    website: "https://zestfit.com",
    socialProfile: "https://linkedin.com/company/zestfit",
    socialLabel: "LinkedIn"
  },
  {
    name: "Sparkle Studio",
    logo: "/images/clients/sparkle-studio.png",
    website: "https://sparklestudio.com",
    socialProfile: "https://instagram.com/sparklestudio",
    socialLabel: "Instagram"
  },
  {
    name: "UrbanNest",
    logo: "/images/clients/urbannest.png",
    website: "https://urbannest.com",
    socialProfile: "https://linkedin.com/company/urbannest",
    socialLabel: "LinkedIn"
  },
  {
    name: "Noorani Biryani",
    logo: "/images/clients/noorani-biryani.png",
    website: "https://nooranibiryani.com",
    socialProfile: "https://instagram.com/nooranibiryani",
    socialLabel: "Instagram"
  },
  {
    name: "FarmNest Foods",
    logo: "/images/clients/farmnest-foods.png",
    website: "https://farmnestfoods.com",
    socialProfile: "https://facebook.com/farmnestfoods",
    socialLabel: "Facebook"
  }
];
