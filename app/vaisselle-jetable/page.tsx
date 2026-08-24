import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CategoryBreadcrumb } from "@/components/category/category-breadcrumb";
import { CategoryHero } from "@/components/category/category-hero";
import { CategoryProductGrid } from "@/components/category/category-product-grid";
import { CategorySeoBlock } from "@/components/category/category-seo-block";
import { CategorySubnav } from "@/components/category/category-subnav";
import { FaqWithStructuredData } from "@/components/sections/faq-with-structured-data";
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
      <JsonLd data={categoryPageJsonLd(category, category.products, path)} />
      <div className="bg-background">
        <div className="mx-auto max-w-6xl px-4 pt-6 md:px-6 md:pt-8">
          <CategoryBreadcrumb category={category} />
        </div>
        <CategoryHero category={category} />
        <CategorySubnav category={category} />
        <CategoryProductGrid category={category} />
        <CategorySeoBlock category={category} />
        <ReviewsBand />
        <section className="section-padding bg-white">
          <div className="mx-auto max-w-3xl px-4 md:px-6">
            <SectionHeader
              label="FAQ"
              title={`Questions sur la ${category.label.toLowerCase()}`}
              description="Usages pro, conformité AGEC, tarifs et livraison : les réponses essentielles."
              align="center"
            />
            <FaqWithStructuredData items={category.faq} className="mt-10" />
          </div>
        </section>
      </div>
    </>
  );
}
