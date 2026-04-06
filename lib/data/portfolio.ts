export type PortfolioProject = {
  id?: string;
  name: string;
  result: string;
  image?: string;
  mediaUrl?: string;
  mediaType?: "image" | "video";
  link?: string;
  isPublished?: boolean;
  sortOrder?: number;
};

// Fallback local data. If `portfolio_items` table has published rows,
// the site uses database content first and keeps this as backup.
export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "local-cafe-launch",
    name: "Shop24 Seven Bahadurgarh - Local Retail Growth",
    result: "Reach +34%, walk-ins +21% in 60 days",
    mediaUrl: "/images/portfolio/local-cafe-launch.jpg",
    mediaType: "image",
    image: "/images/portfolio/local-cafe-launch.jpg",
    isPublished: true,
    sortOrder: 1
  },
  {
    id: "fashion-brand-ugc",
    name: "Mother's Pride Bahadurgarh - Admission Campaign",
    result: "Qualified inquiries +38%, cost per lead -17%",
    mediaUrl: "/images/portfolio/fashion-brand-ugc.jpg",
    mediaType: "image",
    image: "/images/portfolio/fashion-brand-ugc.jpg",
    isPublished: true,
    sortOrder: 2
  },
  {
    id: "healthcare-campaign",
    name: "Prime Pet Care - Performance Funnel",
    result: "Booking conversions +27% with structured ad retargeting",
    mediaUrl: "/images/portfolio/healthcare-campaign.jpg",
    mediaType: "image",
    image: "/images/portfolio/healthcare-campaign.jpg",
    isPublished: true,
    sortOrder: 3
  }
];
