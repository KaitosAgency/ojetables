export const openGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Ojetables — Vaisselle jetable professionnelle & éco",
  type: "image/png",
} as const;

export const twitterImage = {
  url: "/twitter-image",
  width: 1200,
  height: 630,
  alt: openGraphImage.alt,
  type: "image/png",
} as const;

export function createDefaultMetadata(siteUrl: string) {
  const metadataBase = new URL(siteUrl);

  return {
    metadataBase,
    title: {
      default:
        "Ojetables | Vaisselle jetable professionnelle & éco — Livraison 24/72h",
      template: "%s | Ojetables",
    },
    openGraph: {
      type: "website" as const,
      locale: "fr_FR",
      siteName: "Ojetables",
      title:
        "Ojetables | Vaisselle jetable professionnelle & éco — Livraison 24/72h",
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image" as const,
      title:
        "Ojetables | Vaisselle jetable professionnelle & éco — Livraison 24/72h",
      images: [twitterImage.url],
    },
  };
}
