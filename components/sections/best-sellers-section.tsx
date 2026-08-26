import { ProductCard } from "@/components/product/product-card";
import { ProductCardList, ProductCardListItem } from "@/components/product/product-card-list";
import { bestSellers } from "@/lib/site";
import { SectionHeader } from "./section-header";

export function BestSellersSection() {
  return (
    <section id="produits" className="section-after-band-arc bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Catalogue"
          title="Nos best-sellers"
          description="Les produits préférés des traiteurs, CHR et organisateurs d'événements. Qualité éprouvée au quotidien."
        />

        <ProductCardList
          ariaLabel="Best-sellers Ojetables"
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5"
        >
          {bestSellers.map((product) => (
            <ProductCardListItem key={product.name}>
              <ProductCard {...product} />
            </ProductCardListItem>
          ))}
        </ProductCardList>
      </div>
    </section>
  );
}
