import { ProductCard } from "@/components/product/product-card";
import { SectionHeader } from "@/components/sections/section-header";
import type { Product } from "@/lib/products";
import { maquetteProductHref } from "@/lib/site";

type ProductCrossSellProps = {
  product: Product;
};

export function ProductCrossSell({ product }: ProductCrossSellProps) {
  return (
    <section className="mt-16">
      <SectionHeader
        label="Complétez votre commande"
        title="Souvent achetés avec"
        description="Produits fréquemment commandés avec ce gobelet carton kraft."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {product.crossSell.map((item) => (
          <ProductCard
            key={item.name}
            name={item.name}
            image={item.image}
            category={item.category}
            priceFrom={item.priceFrom}
            href={maquetteProductHref}
            rating={item.rating}
            reviewCount={item.reviewCount}
            packLabel={item.packLabel}
            className="h-full"
          />
        ))}
      </div>
    </section>
  );
}
