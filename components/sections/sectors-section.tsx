import { ProductCard } from "@/components/product/product-card";
import { ProductCardList, ProductCardListItem } from "@/components/product/product-card-list";
import { LinkButton } from "@/components/ui/link-button";
import { sectors } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./section-header";

export function SectorsSection() {
  return (
    <section id="secteurs" className="section-padding section-glow">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Par métier"
          title="Solutions adaptées à votre activité"
          description="Traiteurs, associations, restaurateurs, collectivités : découvrez les produits recommandés pour votre secteur."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {sectors.map((sector) => (
            <article
              key={sector.title}
              className={cn(
                "flex flex-col rounded-2xl p-5 md:p-6",
                "highlight" in sector && sector.highlight ? "card-outline-teal" : "card-outline",
              )}
            >
              <div className="max-w-xl">
                <h3 className="text-xl font-bold text-brand-navy">{sector.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{sector.description}</p>
              </div>

              <ProductCardList
                ariaLabel={`Produits recommandés ${sector.title}`}
                className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3"
              >
                {sector.products.map((product) => (
                  <ProductCardListItem key={product.name}>
                    <ProductCard {...product} titleAs="h4" />
                  </ProductCardListItem>
                ))}
              </ProductCardList>

              <div className="mt-5 border-t border-border/70 pt-5">
                <LinkButton href={sector.href} variant="link" className="h-auto p-0 text-brand-teal">
                  {sector.cta} →
                </LinkButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
