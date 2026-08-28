import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostsBand } from "@/components/sections/blog-posts-band";
import { StatsBand } from "@/components/sections/stats-band";
import { ProductAdviceBlock } from "@/components/product/product-advice-block";
import { PageScrollReset } from "@/components/layout/page-scroll-reset";
import { ProductBreadcrumb } from "@/components/product/product-breadcrumb";
import { ProductMainGrid } from "@/components/product/product-main-grid";
import { ProductStickyBar } from "@/components/product/product-sticky-bar";
import { JsonLd, productPageJsonLd } from "@/components/seo/json-ld";
import { ProductOpenGraphMeta } from "@/components/seo/product-open-graph-meta";
import { createProductPageMetadata } from "@/lib/page-metadata";
import { getProduct } from "@/lib/products";
import { getSiteUrl, productPath } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** @maquette-only — une seule fiche produit en static ; généraliser depuis `products` ou l’API Magento en prod. */
export function generateStaticParams() {
  return [{ slug: "gobelet-carton-24cl-kraft-individuel" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  const primaryImage = product.images[0];
  const siteUrl = getSiteUrl();

  return createProductPageMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: productPath(slug),
    openGraphImages: primaryImage
      ? [
          {
            url: primaryImage.src.startsWith("http")
              ? primaryImage.src
              : `${siteUrl}${primaryImage.src}`,
            width: 1200,
            height: 1200,
            alt: primaryImage.alt,
          },
        ]
      : undefined,
  });
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const path = productPath(slug);

  return (
    <>
      <ProductOpenGraphMeta priceTtc={product.priceTtc} />
      <JsonLd data={productPageJsonLd(product, path)} />
      <PageScrollReset mode="product" />
      <div className="mx-auto max-w-6xl px-4 py-8 pb-24 md:px-6 md:py-12 lg:pb-12">
        <ProductBreadcrumb product={product} />

        <ProductMainGrid product={product} />

        <ProductAdviceBlock />
      </div>

      <StatsBand variant="footer" />
      <BlogPostsBand afterBandArc />
      <ProductStickyBar product={product} />
    </>
  );
}
