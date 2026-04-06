export type ClientItem = {
  name: string;
  logo: string;
  website?: string;
  socialProfile?: string;
  socialLabel?: string;
};

// Replace logo files in /public/images/clients and keep the same path format.
export const CLIENT_ITEMS: ClientItem[] = [
  {
    name: "Mother's Pride Bahadurgarh",
    logo: "/images/clients/mothers-pride-bahadurgarh.png",
    socialProfile: "https://www.instagram.com/tulsipmedia/",
    socialLabel: "Instagram"
  },
  {
    name: "Shop24 Seven Bahadurgarh",
    logo: "/images/clients/shop24-seven-bahadurgarh.jpg",
    socialProfile: "https://www.instagram.com/tulsipmedia/",
    socialLabel: "Instagram"
  },
  {
    name: "Shree Shyam Cricket Academy",
    logo: "/images/clients/shree-shyam-cricket-academy.jpg",
    socialProfile: "https://www.instagram.com/tulsipmedia/",
    socialLabel: "Instagram"
  },
  {
    name: "Ad Guru",
    logo: "/images/clients/ad-guru.png",
    socialProfile: "https://www.linkedin.com/in/tulsip-media-189251401",
    socialLabel: "LinkedIn"
  },
  {
    name: "Prime Pet Care",
    logo: "/images/clients/prime-pet-care.png",
    socialProfile: "https://www.instagram.com/tulsipmedia/",
    socialLabel: "Instagram"
  }
];
