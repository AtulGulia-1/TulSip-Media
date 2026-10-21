export interface CaseStudy {
  id: string;
  slug: string;
  brandName: string;
  category: "Market Research · Digital Strategy" | "D2C Brands" | "Education Sector" | "Building Materials & Retail" | "Cafe & Hospitality";
  tagline: string;
  heroImage: string;
  founderStory?: string;
  challenge: string;
  strategy: string;
  results: {
    stat1: string;
    label1: string;
    stat2: string;
    label2: string;
    stat3: string;
    label3: string;
  };
  highlights: string[];
  gradient: string;
  detailUrl?: string;
  projectScopeNote?: {
    summary: string;
    role: string;
    deliverables: string;
  };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "local-business-digital-gap",
    slug: "local-business-digital-gap",
    brandName: "The Local Business Digital Gap",
    category: "Market Research · Digital Strategy",
    tagline: "Great Local Businesses Deserve to Be Discovered — Founder-Led Market Research in Delhi NCR",
    heroImage: "/img/Social Media Marketing.jpg",
    founderStory: "Founder-led local market research and opportunity analysis in Delhi NCR exploring what happens when established local businesses remain difficult to discover online.",
    challenge: "Many local businesses invest heavily in offline operations while relying solely on referrals, walk-ins, or social media—leaving a gap across online Discovery, Understanding, Trust, and Action.",
    strategy: "Developed a five-opportunity digital identity framework and a five-stage website strategy (Discover, Position, Build, Improve discoverability, Measure and refine) tailored to real business needs.",
    results: {
      stat1: "Field Notes",
      label1: "Delhi NCR Market Research",
      stat2: "4-Stage Gap",
      label2: "Discovery · Understanding · Trust · Action",
      stat3: "5 Pillars",
      label3: "Website & Local Search Framework"
    },
    highlights: [
      "Qualitative observations of recurring local business website and discoverability challenges",
      "Five strategic opportunities connecting websites, local search, and customer action",
      "Practical six-question diagnostic framework to guide local business website projects"
    ],
    gradient: "from-royal-beige/20 via-dark-brown/20 to-transparent",
    detailUrl: "/case-studies/local-business-digital-gap",
    projectScopeNote: {
      summary: "Qualitative, founder-led local market research and digital strategy framework for local businesses in Delhi NCR and beyond.",
      role: "Market Research · Digital Strategy · Local Business Growth",
      deliverables: "TulSip Media Research Case Study"
    }
  },
  {
    id: "nucleus-derma-care",
    slug: "nucleus-derma-care-d2c-skincare",
    brandName: "Nucleus Derma Care",
    category: "D2C Brands",
    tagline: "Restructuring a D2C Skincare Brand Across Website, Search & Social Touchpoints",
    heroImage: "/img/NucleusDerma.png",
    challenge: "Early sales were concentrated on third-party marketplaces while the brand website had thin product pages, unclear offer hierarchy, and disconnected social content.",
    strategy: "Aligned website product pages, offer tiers, on-page SEO metadata, trust policies, and educational skincare content around specific skin concerns (Pigmentation, Acne, Wrinkles, and Hair Care).",
    results: {
      stat1: "D2C Web",
      label1: "Storefront & Offer Hierarchy",
      stat2: "On-Page SEO",
      label2: "Product & Category Structure",
      stat3: "Multi-Channel",
      label3: "Website + Marketplace Alignment"
    },
    highlights: [
      "Restructured product pages with clear routine guidance, ingredient context, and shipping/return policies",
      "Added custom title tags, meta descriptions, and internal links connecting social campaigns to the website",
      "Shifted social content from generic product posts to concern-led educational reels and carousels"
    ],
    gradient: "from-royal-beige/20 via-dark-brown/20 to-transparent",
    projectScopeNote: {
      summary: "Website UX audit, product page copy & SEO restructuring, offer system alignment, and educational social content framework.",
      role: "Website Optimization, On-Page SEO & Brand Content Strategy",
      deliverables: "TulSip Media Project Engagement"
    }
  },
  {
    id: "saronia-learning",
    slug: "saronia-institute-of-learning",
    brandName: "SARONIA - Institute of Learning",
    category: "Education Sector",
    tagline: "Building Digital Visibility & Parent Enquiry Workflows for an Inclusive Learning Institute",
    heroImage: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80",
    founderStory: "Built around an inclusive educational philosophy where both neurotypical learners and children with special needs receive patient, structured, and empathetic instruction tailored to their individual pace.",
    challenge: "As a newly launched local institute, SARONIA needed a clear digital presence to explain its inclusive methodology to parents and provide a low-friction way to book consultations.",
    strategy: "Developed community-focused storytelling, clarified curriculum and methodology messaging, and connected local awareness campaigns directly to a structured WhatsApp parent enquiry workflow.",
    results: {
      stat1: "Local Reach",
      label1: "Parent-Focused Positioning",
      stat2: "Direct Intake",
      label2: "WhatsApp Consultation Flow",
      stat3: "Inclusive UX",
      label3: "Curriculum Story & Trust"
    },
    highlights: [
      "Founder-led storytelling explaining the institute's inclusive teaching methodology",
      "Localised awareness creative tailored for parents seeking specialised educational support",
      "Direct WhatsApp consultation routing for parent questions and campus visits"
    ],
    gradient: "from-dark-brown/20 via-royal-beige/10 to-transparent",
    projectScopeNote: {
      summary: "Brand positioning, parent communication hierarchy, local campaign creative, and direct consultation intake setup.",
      role: "Brand Positioning, Content Systems & Lead Routing",
      deliverables: "TulSip Media Project Engagement"
    }
  },
  {
    id: "ts-traders",
    slug: "ts-traders-tiles-and-adhesive",
    brandName: "TS Traders - Tiles & Adhesive",
    category: "Building Materials & Retail",
    tagline: "Establishing Digital Catalogue Presentation & Brand Trust for a Retail Showroom",
    heroImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
    challenge: "Operating in a traditional offline building-materials market with no digital footprint, relying solely on price-led pitches rather than showcasing product quality and application ideas.",
    strategy: "Shifted the digital presentation from push-selling to architectural inspiration—showcasing tile finishes, durability education, and bathroom/interior layout concepts for homeowners and contractors.",
    results: {
      stat1: "Digital First",
      label1: "Showroom Brand Identity",
      stat2: "Visual Catalogue",
      label2: "Product & Application Reels",
      stat3: "Trade & Retail",
      label3: "Homeowner & Contractor Discovery"
    },
    highlights: [
      "Educational short-form visuals demonstrating tile finishes, adhesive selection, and modern interior aesthetics",
      "Transitioned messaging from transactional price posts to trust-building showroom presentation",
      "Structured digital discovery for local homeowners, architects, and interior contractors"
    ],
    gradient: "from-royal-beige/20 via-dark-brown/20 to-transparent",
    projectScopeNote: {
      summary: "Digital brand positioning, visual product showcase system, and educational short-form content direction.",
      role: "Digital Positioning & Visual Content Strategy",
      deliverables: "TulSip Media Project Engagement"
    }
  }
];
