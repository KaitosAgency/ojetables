import type { Metadata } from "next";

import { ProductCard } from "@/components/product/product-card";
import { SectionHeader } from "@/components/sections/section-header";
import { LinkButton } from "@/components/ui/link-button";
import { createPageMetadata } from "@/lib/page-metadata";
import { destockageItems, destockagePage } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Destockage vaisselle jetable",
  description: destockagePage.description,
  path: "/destockage",
});

export default function DestockagePage() {
  return (
    <div className="bg-background">
      <section className="border-b border-brand-kraft/20 bg-gradient-to-br from-brand-kraft/15 via-brand-beige to-white section-padding">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeader
            label="Destockage"
            title={destockagePage.title}
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
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="text-sm font-semibold text-brand-navy">
            {destockageItems.length} offres en preview maquette
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {destockageItems.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
