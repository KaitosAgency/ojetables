import { ProductCard } from "@/components/product/product-card";
import { ProductCardList, ProductCardListItem } from "@/components/product/product-card-list";
import { LinkButton } from "@/components/ui/link-button";
import type { Category } from "@/lib/categories";
import { routes } from "@/lib/site";

type CategoryProductGridProps = {
  category: Category;
  embedded?: boolean;
};

export function CategoryProductGrid({ category, embedded = false }: CategoryProductGridProps) {
  return (
    <div>
      <ProductCardList
        ariaLabel={`Produits ${category.label}`}
        className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4"
      >
        {category.products.map((product) => (
          <ProductCardListItem key={product.id ?? product.href}>
            <ProductCard {...product} showQuickActions />
          </ProductCardListItem>
        ))}
      </ProductCardList>

      <div
        className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${embedded ? "mt-6" : "mt-8 border-t border-border/60 pt-6"}`}
      >
        <LinkButton
          href={routes.quote}
          variant="brand"
          size="ctaSm"
          className="w-full justify-center sm:w-auto"
        >
          Demander un devis
        </LinkButton>
        <LinkButton
          href={routes.personalization}
          variant="brandOutline"
          size="ctaSm"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full justify-center sm:w-auto"
        >
          Personnalisation logo
        </LinkButton>
      </div>
    </div>
  );
}
