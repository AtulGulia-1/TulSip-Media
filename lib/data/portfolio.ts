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
    name: "Local Cafe Launch",
    result: "+280% reach",
    mediaUrl: "/images/portfolio/local-cafe-launch.jpg",
    mediaType: "image",
    image: "/images/portfolio/local-cafe-launch.jpg",
    isPublished: true,
    sortOrder: 1
  },
  {
    id: "fashion-brand-ugc",
    name: "Fashion Brand UGC",
    result: "4.3x ROAS",
    mediaUrl: "/images/portfolio/fashion-brand-ugc.jpg",
    mediaType: "image",
    image: "/images/portfolio/fashion-brand-ugc.jpg",
    isPublished: true,
    sortOrder: 2
  },
  {
    id: "healthcare-campaign",
    name: "Healthcare Campaign",
    result: "62% lead cost drop",
    mediaUrl: "/images/portfolio/healthcare-campaign.jpg",
    mediaType: "image",
    image: "/images/portfolio/healthcare-campaign.jpg",
    isPublished: true,
    sortOrder: 3
  }
];
