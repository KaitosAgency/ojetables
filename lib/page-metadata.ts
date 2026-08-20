import type { Metadata } from "next";
import { openGraphImage, twitterImage } from "@/lib/og-metadata";
import { getSiteUrl, site } from "@/lib/site";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataInput): Metadata {
  const pageTitle = `${title} | Ojetables`;
  const pageUrl = `${getSiteUrl()}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      title: pageTitle,
      description,
      url: pageUrl,
      images: [openGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [twitterImage.url],
    },
  };
}
