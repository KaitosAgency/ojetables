import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { ProductCard } from "@/components/product/product-card";
import { ProductCardList, ProductCardListItem } from "@/components/product/product-card-list";
import { SectionHeader } from "@/components/sections/section-header";
import { LinkButton } from "@/components/ui/link-button";
import { JsonLd, destockagePageJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/lib/page-metadata";
import { toProductCardProps } from "@/lib/site/product-teasers";
import { destockageItems, destockagePage } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Destockage vaisselle jetable",
  description: destockagePage.description,
  path: "/destockage",
});

export default function DestockagePage() {
  return (
    <div className="bg-background">
      <JsonLd data={destockagePageJsonLd(destockagePage, destockageItems, "/destockage")} />
      <section className="border-b border-brand-kraft/20 bg-gradient-to-br from-brand-kraft/15 via-brand-beige to-white section-padding">
        <PageContainer>
          <SectionHeader
            label="Destockage"
            title={destockagePage.title}
            titleAs="h1"
            description={destockagePage.description}
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton
              href={destockagePage.externalCatalogUrl}
              variant="brandOutline"
              size="ctaSm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Catalogue live ojetables.fr
            </LinkButton>
          </div>
        </PageContainer>
      </section>

      <section className="section-padding bg-white">
        <PageContainer>
          <p className="text-sm font-semibold text-brand-navy">
            {destockageItems.length} offres en preview maquette
          </p>
          <ProductCardList
            ariaLabel="Produits destockage"
            className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
          >
            {destockageItems.map((product) => (
              <ProductCardListItem key={product.id}>
                <ProductCard {...toProductCardProps(product)} showQuickActions={false} />
              </ProductCardListItem>
            ))}
          </ProductCardList>
        </PageContainer>
      </section>
    </div>
  );
}
