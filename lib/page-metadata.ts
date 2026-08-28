import type { Metadata } from "next";
import { categoryPagePath } from "@/lib/category-pagination";
import { openGraphImage, twitterImage } from "@/lib/og-metadata";
import { getSiteUrl, site } from "@/lib/site";

type OpenGraphImageInput = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Page courante (1 = URL canonique sans query page). */
  page?: number;
  perPage?: number;
  /** Exclure de l’index (404, erreurs). */
  noIndex?: boolean;
  /** Image OG dédiée (sinon image par défaut du site). */
  openGraphImages?: OpenGraphImageInput[];
};

export function createPageMetadata({
  title,
  description,
  path,
  page = 1,
  perPage,
  noIndex = false,
  openGraphImages,
}: PageMetadataInput): Metadata {
  const canonicalPath = categoryPagePath(path, page, perPage);
  const pageTitle = `${title} | Ojetables`;
  const pageUrl = `${getSiteUrl()}${canonicalPath}`;
  const ogImages =
    openGraphImages?.map((image) => ({
      url: image.url,
      width: image.width ?? openGraphImage.width,
      height: image.height ?? openGraphImage.height,
      alt: image.alt ?? openGraphImage.alt,
    })) ?? [openGraphImage];
  const twitterImageUrl = openGraphImages?.[0]?.url ?? twitterImage.url;

  return {
    title,
    description,
    ...(noIndex
      ? { robots: { index: false, follow: true } as const }
      : {}),
    alternates: noIndex
      ? undefined
      : {
          canonical: canonicalPath,
        },
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      title: pageTitle,
      description,
      url: pageUrl,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [twitterImageUrl],
    },
  };
}

/**
 * Metadata fiche produit : image produit sans `og:type`.
 * `product` n'existe pas dans le type OpenGraph de Next et `other` produirait un `name=`
 * au lieu du `property=` attendu par les scrapers : la balise est rendue dans la page.
 */
export function createProductPageMetadata(
  input: PageMetadataInput,
): Metadata {
  const metadata = createPageMetadata(input);
  const { type, ...openGraphWithoutType } = metadata.openGraph as { type?: string };
  void type;

  return {
    ...metadata,
    openGraph: openGraphWithoutType,
  };
}
