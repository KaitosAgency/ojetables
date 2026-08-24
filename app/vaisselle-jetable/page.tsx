import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryEditorialSection } from "@/components/category/category-editorial-section";
import { CategoryFiltersBar } from "@/components/category/category-filters-bar";
import { CategoryHero } from "@/components/category/category-hero";
import { CategoryProductGrid } from "@/components/category/category-product-grid";
import { CategorySectorLinks } from "@/components/category/category-sector-links";
import { CategorySubnav } from "@/components/category/category-subnav";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { ReviewsBand } from "@/components/sections/reviews-band";
import { SectionHeader } from "@/components/sections/section-header";
import { JsonLd, categoryPageJsonLd } from "@/components/seo/json-ld";
import { featuredCategorySlug, getCategory, categoryPath } from "@/lib/categories";
import { createPageMetadata } from "@/lib/page-metadata";

export async function generateMetadata(): Promise<Metadata> {
  const category = getCategory(featuredCategorySlug);
  if (!category) return {};

  return createPageMetadata({
    title: category.metaTitle,
    description: category.metaDescription,
    path: categoryPath(category.slug),
  });
}

export default function VaisselleJetableCategoryPage() {
  const category = getCategory(featuredCategorySlug);

  if (!category) {
    notFound();
  }

  const path = categoryPath(category.slug);

  return (
    <>
      <JsonLd data={categoryPageJsonLd(category, path)} />
      <div className="bg-background">
        <CategoryHero category={category} />
        <CategorySubnav category={category} />
        <CategoryFiltersBar />
        <CategoryProductGrid category={category} />
        <CategoryEditorialSection category={category} />
        <CategorySectorLinks category={category} />
        <ReviewsBand />
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <SectionHeader
              label="FAQ"
              title={`Questions sur la ${category.label.toLowerCase()}`}
              description="Usages pro, conformité AGEC, tarifs et livraison : les réponses essentielles."
              align="center"
            />
            <FaqAccordion items={category.faq} className="mt-10" />
          </div>
        </section>
      </div>
    </>
  );
}
