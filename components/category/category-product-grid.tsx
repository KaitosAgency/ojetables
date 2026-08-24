import { ProductCard } from "@/components/product/product-card";
import { SectionHeader } from "@/components/sections/section-header";
import type { Category } from "@/lib/categories";

type CategoryProductGridProps = {
  category: Category;
};

export function CategoryProductGrid({ category }: CategoryProductGridProps) {
  return (
    <section id="produits" className="section-padding scroll-mt-36 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Produits"
          title={`Notre sélection ${category.label.toLowerCase()}`}
          description={`${category.products.length} références en preview maquette. Stock permanent, livraison 24/72h et tarifs dégressifs pour les professionnels.`}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {category.products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
