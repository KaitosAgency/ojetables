import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/seo-routes";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return indexableRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    ...(route.lastModified ? { lastModified: new Date(route.lastModified) } : {}),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
