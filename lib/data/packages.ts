export type PackagePlan = {
  id: string;
  name: string;
  currentPrice: string;
  originalPrice?: string;
  amountPaise: number;
  isMostPopular?: boolean;
  features: string[];
};

const CORE_PACKAGE_PLANS: PackagePlan[] = [
  {
    id: "starter",
    name: "Starter Spark",
    currentPrice: "Rs 4,999",
    originalPrice: "Rs 7,999",
    amountPaise: 499900,
    features: ["8 social posts", "1 ad creative set", "Monthly review call"]
  },
  {
    id: "website-builder",
    name: "Website Builder",
    currentPrice: "Rs 9,999",
    originalPrice: "Rs 14,999",
    amountPaise: 999900,
    features: ["Mobile-first business website", "Lead form + conversion sections", "Speed + SEO baseline setup"]
  },
  {
    id: "scale",
    name: "Scale Plus",
    currentPrice: "Rs 14,999",
    originalPrice: "Rs 17,999",
    amountPaise: 1499900,
    isMostPopular: true,
    features: ["24 social posts", "Landing page optimization", "Weekly growth experiments"]
  },
  {
    id: "pro",
    name: "Pro Velocity",
    currentPrice: "Rs 24,999",
    originalPrice: "Rs 29,999",
    amountPaise: 2499900,
    features: ["Performance ads management", "SEO/SEM support", "Weekly strategy sync"]
  },
  {
    id: "elite",
    name: "Elite Global",
    currentPrice: "Rs 34,999",
    originalPrice: "Rs 39,999",
    amountPaise: 3499900,
    features: ["Full-funnel ownership", "Cross-platform content engine", "Executive dashboard"]
  }
];

// Add future packages here without touching core plans.
// Example:
// const CUSTOM_PACKAGE_PLANS: PackagePlan[] = [
//   { id: "new-plan", name: "New Plan", currentPrice: "Rs 19,999", amountPaise: 1999900, features: [] }
// ];
const CUSTOM_PACKAGE_PLANS: PackagePlan[] = [];

export const PACKAGE_PLANS: PackagePlan[] = [...CORE_PACKAGE_PLANS, ...CUSTOM_PACKAGE_PLANS];
