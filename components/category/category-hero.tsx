import Image from "next/image";
import { CreditCard, Truck } from "lucide-react";

import { TrustRatingInline } from "@/components/trust/trust-rating-inline";
import { LinkButton } from "@/components/ui/link-button";
import type { Category } from "@/lib/categories";
import { routes } from "@/lib/site";

type CategoryHeroProps = {
  category: Category;
};

export function CategoryHero({ category }: CategoryHeroProps) {
  return (
    <section className="border-b border-brand-kraft/20 bg-gradient-to-br from-brand-kraft/15 via-brand-beige to-white">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">
              Catalogue
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight text-brand-navy md:text-5xl">
              {category.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {category.intro}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButton href="#produits" variant="brand" size="ctaSm">
                Voir les produits
              </LinkButton>
              <LinkButton href={routes.quote} variant="brandOutline" size="ctaSm">
                Demander un devis
              </LinkButton>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-muted-foreground">
              <TrustRatingInline />
              <span className="hidden text-border sm:inline" aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5 shrink-0 text-brand-kraft" aria-hidden />
                Livraison 24/72h
              </span>
              <span className="hidden text-border sm:inline" aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <CreditCard className="h-3.5 w-3.5 shrink-0 text-brand-kraft" aria-hidden />
                Tarifs dégressifs pro
              </span>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-brand-kraft/25 bg-brand-beige/40 shadow-sm">
            <Image
              src={category.image}
              alt={category.imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 352px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
