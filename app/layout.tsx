import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { InactivityLogout } from "@/components/auth/InactivityLogout";
import { SmartChatbot } from "@/components/common/SmartChatbot";
import { ScrollEffects } from "@/components/effects/ScrollEffects";
import { CursorMotion } from "@/components/effects/CursorMotion";
import { MarketingScripts } from "@/components/seo/MarketingScripts";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { CONFIG } from "@/lib/config";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"]
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600", "700"]
});

const socialPreviewImage = "/logo.png";

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: {
    default: "TulSip Media | Local brands. Global Voices.",
    template: "%s | TulSip Media"
  },
  description: "Performance-first digital marketing agency and client portal.",
  keywords: [
    "digital marketing agency",
    "social media marketing",
    "performance marketing",
    "local business marketing",
    "SEO services",
    "TulSip Media"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "TulSip Media | Local brands. Global Voices.",
    description: "We turn local brands into global attention.",
    url: CONFIG.siteUrl,
    siteName: "TulSip Media",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: socialPreviewImage,
        width: 1200,
        height: 630,
        alt: "TulSip Media"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "TulSip Media | Local brands. Global Voices.",
    description: "We turn local brands into global attention.",
    images: [socialPreviewImage]
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png", sizes: "192x192" }],
    shortcut: ["/logo.png"],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable} font-sans`}>
        <OrganizationJsonLd />
        <div className="site-theme-bg min-h-screen">
          <CursorMotion />
          <InactivityLogout />
          <ScrollEffects />
          <MarketingScripts />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <SmartChatbot />
        </div>
      </body>
    </html>
  );
}


