import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import { CategoryEditorialSection } from "@/components/category/category-editorial-section";
import { CategoryCatalog } from "@/components/category/category-catalog";
import { CategoryHero } from "@/components/category/category-hero";
import { CategoryReviewsBand } from "@/components/category/category-reviews-band";
import { CategorySubnav } from "@/components/category/category-subnav";
import { BlogPostsBand } from "@/components/sections/blog-posts-band";
import { StatsBand } from "@/components/sections/stats-band";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeader } from "@/components/sections/section-header";
import { CategoryPaginationLinks } from "@/components/seo/category-pagination-links";
import { JsonLd, categoryPageJsonLd } from "@/components/seo/json-ld";
import { featuredCategorySlug, getCategory, categoryPath } from "@/lib/categories";
import {
  clampCategoryPage,
  getCategoryPageCount,
  parseCategoryPage,
  parseCategoryPerPage,
} from "@/lib/category-pagination";
import { vaisselleJetableProducts } from "@/lib/vaisselle-jetable-data";
import { createPageMetadata } from "@/lib/page-metadata";

type PageProps = {
  searchParams: Promise<{ page?: string; limit?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const category = getCategory(featuredCategorySlug);
  if (!category) return {};

  const { page: pageParam, limit: limitParam } = await searchParams;
  const perPage = parseCategoryPerPage(limitParam);
  const totalPages = getCategoryPageCount(vaisselleJetableProducts.length, perPage);
  const currentPage = clampCategoryPage(parseCategoryPage(pageParam), totalPages);
  const path = categoryPath(category.slug);

  return createPageMetadata({
    title:
      currentPage > 1
        ? `${category.metaTitle} — Page ${currentPage}`
        : category.metaTitle,
    description: category.metaDescription,
    path,
    page: currentPage,
    perPage,
  });
}

function CatalogFallback() {
  return (
    <section className="bg-white pb-16 pt-8 md:pb-24 md:pt-10">
      <PageContainer>
        <p className="text-sm text-muted-foreground">Chargement du catalogue…</p>
      </PageContainer>
    </section>
  );
}

export default async function VaisselleJetableCategoryPage({ searchParams }: PageProps) {
  const category = getCategory(featuredCategorySlug);

  if (!category) {
    notFound();
  }

  const { page: pageParam, limit: limitParam } = await searchParams;
  const path = categoryPath(category.slug);
  const perPage = parseCategoryPerPage(limitParam);
  const totalPages = getCategoryPageCount(vaisselleJetableProducts.length, perPage);
  const currentPage = clampCategoryPage(parseCategoryPage(pageParam), totalPages);

  return (
    <>
      <CategoryPaginationLinks
        basePath={path}
        page={currentPage}
        totalPages={totalPages}
        perPage={perPage}
      />
      <JsonLd data={categoryPageJsonLd(category, path)} />
      <div className="bg-background">
        <CategoryHero category={category} />
        <Suspense fallback={<CatalogFallback />}>
          <CategoryCatalog category={category} products={vaisselleJetableProducts} />
        </Suspense>
        <CategorySubnav category={category} variant="compact" />
        <CategoryEditorialSection category={category} />
        <StatsBand variant="footer" />
        <section className="section-padding border-t border-border/60 bg-white">
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
        <CategoryReviewsBand categoryLabel={category.label} products={vaisselleJetableProducts} />
        <BlogPostsBand />
      </div>
    </>
  );
}
