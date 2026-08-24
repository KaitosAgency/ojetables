import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientLogosBand } from "@/components/sections/client-logos-band";
import { FaqWithStructuredData } from "@/components/sections/faq-with-structured-data";
import { SectionHeader } from "@/components/sections/section-header";
import { ProductPersonalizationCallout } from "@/components/product/product-personalization-callout";
import { ProductBreadcrumb } from "@/components/product/product-breadcrumb";
import { ProductCrossSell } from "@/components/product/product-cross-sell";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductProBanner } from "@/components/product/product-pro-banner";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";
import { ProductTabs } from "@/components/product/product-tabs";
import { JsonLd, productPageJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";
import { getProduct } from "@/lib/products";
import { productPath } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [{ slug: "gobelet-carton-24cl-kraft-individuel" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return createPageMetadata({
    title: product.metaTitle,
    description: product.metaDescription,
    path: productPath(slug),
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
      <JsonLd data={productPageJsonLd(product, path)} />
      <ProductProBanner />
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <ProductBreadcrumb product={product} />

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />
          <ProductPurchasePanel product={product} />
        </div>

        <ProductTabs product={product} />
        <ProductPersonalizationCallout />
        <ProductCrossSell product={product} />

        <section className="mt-16">
          <SectionHeader
            label="Aide & SAV"
            title="Questions sur ce produit"
            description="Réponses aux questions fréquentes sur le gobelet carton kraft 24 cl."
          />
          <FaqWithStructuredData items={product.faq} className="mt-8 max-w-3xl" />
        </section>
      </div>

      <ClientLogosBand compact />
    </>
  );
}
