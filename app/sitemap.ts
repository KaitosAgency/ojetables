import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/seo-routes";
import { products } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

function getRouteLastModified(path: string, fallback?: string): Date | undefined {
  const productSlug = path.replace(/^\/produit\//, "");
  const product = products[productSlug];
  if (product?.updatedAt) {
    return new Date(product.updatedAt);
  }

  return fallback ? new Date(fallback) : undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return indexableRoutes.map((route) => {
    const path = route.path.startsWith("/") ? route.path : `/${route.path}`;
    const canonicalPath = path === "/" ? "" : path;

    return {
      url: `${siteUrl}${canonicalPath || "/"}`,
      lastModified: getRouteLastModified(path, route.lastModified),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    };
  });
}
