import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";

type ProductBreadcrumbProps = {
  product: Product;
};

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="transition-colors hover:text-brand-teal">
              Accueil
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li>
            <Link href={product.categoryPath} className="transition-colors hover:text-brand-teal">
              {product.category}
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="font-medium text-brand-navy">{product.shortName}</li>
        </ol>
      </nav>
  );
}
