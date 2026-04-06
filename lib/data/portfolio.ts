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
    id: "work-snapshot-01",
    name: "Work Snapshot 01",
    result: "Campaign highlight and measurable growth snapshot.",
    mediaUrl: "/images/portfolio/local-cafe-launch.jpg",
    mediaType: "image",
    image: "/images/portfolio/local-cafe-launch.jpg",
    isPublished: true,
    sortOrder: 1
  },
  {
    id: "work-snapshot-02",
    name: "Work Snapshot 02",
    result: "Creative execution with performance outcome summary.",
    mediaUrl: "/images/portfolio/fashion-brand-ugc.jpg",
    mediaType: "image",
    image: "/images/portfolio/fashion-brand-ugc.jpg",
    isPublished: true,
    sortOrder: 2
  },
  {
    id: "work-snapshot-03",
    name: "Work Snapshot 03",
    result: "Paid + organic growth sequence for local brand scale-up.",
    mediaUrl: "/images/portfolio/healthcare-campaign.jpg",
    mediaType: "image",
    image: "/images/portfolio/healthcare-campaign.jpg",
    isPublished: true,
    sortOrder: 3
  }
];
