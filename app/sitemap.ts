import type { MetadataRoute } from "next";
import { CONFIG } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/packages",
    "/portfolio",
    "/team",
    "/clients",
    "/testimonials",
    "/help-center",
    "/contact",
    "/login",
    "/admin/login"
  ];

  return routes.map((route) => ({
    url: `${CONFIG.siteUrl}${route}`,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
