import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/**
 * Règles crawl prod (Magento + maquette) :
 * - tunnel transactionnel et compte client exclus du budget crawl
 * - facettes / tris URL (spider traps) bloqués en amont (canonical seul ne suffit pas)
 * - pagination ?page= et ?limit= volontairement autorisées (canonical auto-référente)
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/checkout/",
          "/customer/",
          "/catalogsearch/",
          "/wishlist/",
          "/qquoteadv/",
          "/sendfriend/",
          "/*?*color=",
          "/*?*manufacturer=",
          "/*?*material=",
          "/*?*price=",
          "/*?*dir=",
          "/*?*order=",
          "/*?*mode=",
          "/*?*cat=",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
