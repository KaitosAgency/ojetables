import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd, breadcrumbJsonLd, type BreadcrumbItem } from "@/components/seo/json-ld";
import type { Product } from "@/lib/products";
import { productPath } from "@/lib/site";

type ProductBreadcrumbProps = {
  product: Product;
};

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const path = productPath(product.slug);
  const items: BreadcrumbItem[] = [
    { name: "Accueil", path: "/" },
    { name: product.category, path: product.categoryPath },
    { name: product.shortName },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(path, items)} />
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
          <li>{product.category}</li>
          <li aria-hidden>
            <ChevronRight className="h-4 w-4" />
          </li>
          <li className="font-medium text-brand-navy">{product.shortName}</li>
        </ol>
      </nav>
    </>
  );
}
