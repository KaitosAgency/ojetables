import type { MetadataRoute } from "next";
import { routes } from "@/lib/site";

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;

export type SeoRoute = {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
  lastModified?: string;
};

export const indexableRoutes: SeoRoute[] = [
  { path: "", changeFrequency: "weekly", priority: 1, lastModified: "2026-08-20" },
  {
    path: routes.product,
    changeFrequency: "weekly",
    priority: 0.9,
    lastModified: "2026-08-20",
  },
  {
    path: routes.destockage,
    changeFrequency: "weekly",
    priority: 0.85,
    lastModified: "2026-08-21",
  },
];
