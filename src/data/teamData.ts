import { DESIGN_TOKENS } from '../theme/tokens';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  bg: string;
  skills: string[];
  linkedin?: string;
  email?: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "atul-gulia",
    name: "Atul Gulia",
    role: "Founder & Web Development Lead",
    description: "Leads website architecture, frontend engineering, technical SEO foundations, and digital brand systems at TulSip Media—helping businesses translate complex offerings into clear, credible web experiences.",
    image: "https://fifth-gentle-45902158.figma.site/_components/v2/4de492f6d9cf8244ad5293233e5c6f52407d42fc/1.02464a56.png",
    bg: DESIGN_TOKENS.palette.darkBrown,
    skills: ["Website Development", "React & Next.js", "UI/UX Architecture", "Technical SEO"],
    email: "hello@tulsipmedia.com"
  }
];
