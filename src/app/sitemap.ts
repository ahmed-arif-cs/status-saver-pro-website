import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const routes = [
    {
      path: "/",
      priority: 1.0,
      changeFrequency: "monthly" as const,
      lastModified: now,
    },
    {
      path: "/support",
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: now,
    },
    {
      path: "/security",
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: new Date(`${siteConfig.lastUpdated.security}T00:00:00Z`).toISOString(),
    },
    {
      path: "/privacy",
      priority: 0.9,
      changeFrequency: "monthly" as const,
      lastModified: new Date(`${siteConfig.lastUpdated.privacy}T00:00:00Z`).toISOString(),
    },
    {
      path: "/terms",
      priority: 0.8,
      changeFrequency: "monthly" as const,
      lastModified: new Date(`${siteConfig.lastUpdated.terms}T00:00:00Z`).toISOString(),
    },
    {
      path: "/data-deletion",
      priority: 0.9,
      changeFrequency: "monthly" as const,
      lastModified: new Date(`${siteConfig.lastUpdated.dataDeletion}T00:00:00Z`).toISOString(),
    },
    {
      path: "/contact",
      priority: 0.7,
      changeFrequency: "yearly" as const,
      lastModified: now,
    },
  ];

  return routes.map((r) => ({
    url: `${siteConfig.siteUrl}${r.path}`,
    lastModified: r.lastModified,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
