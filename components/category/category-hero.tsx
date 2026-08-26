import Image from "next/image";
import { Truck } from "lucide-react";

import { CategoryBreadcrumb } from "@/components/category/category-breadcrumb";
import { CategoryHeroIntro } from "@/components/category/category-hero-intro";
import { TrustRatingInline } from "@/components/trust/trust-rating-inline";
import type { Category } from "@/lib/categories";

type CategoryHeroProps = {
  category: Category;
};

export function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section
      className="category-hero-under-crans relative overflow-hidden border-b border-border/60 text-brand-navy"
    >
      <div className="category-hero-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-0 grid-glow opacity-[0.12]" aria-hidden />

      <div className="category-hero-image-overlay" aria-hidden>
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          priority
          sizes="(max-width: 768px) 45vw, 33vw"
          className="category-hero-image-overlay__photo"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-5 md:px-6 md:pb-6">
        <CategoryBreadcrumb category={category} />

        <div className="mt-4 max-w-xl md:max-w-2xl">
          <h1 className="text-2xl font-bold tracking-tight text-brand-navy md:text-4xl">
            {category.title}
          </h1>

          <CategoryHeroIntro text={category.description} className="mt-3" />

          <div
            className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-2 rounded-lg border border-border/90 bg-white/85 px-3 py-2 text-sm text-muted-foreground shadow-[0_1px_0_rgb(61_44_38/0.04)] backdrop-blur-sm"
          >
            <TrustRatingInline />
            <span className="hidden text-border sm:inline" aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 shrink-0 text-brand-kraft" aria-hidden />
              <span className="sm:hidden">
                <span className="sr-only">Livraison </span>
                24/72h
              </span>
              <span className="hidden sm:inline">Livraison 24/72h</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
