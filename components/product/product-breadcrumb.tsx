import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProductPageBreadcrumbs, type Product } from "@/lib/products";

type ProductBreadcrumbProps = {
  product: Product;
};

function BreadcrumbLink({ href, children }: { href: string; children: ReactNode }) {
  const className = "transition-colors hover:text-brand-teal";

  if (href.startsWith("http")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const items = getProductPageBreadcrumbs(product);

  return (
    <nav aria-label="Fil d'Ariane" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.name}-${index}`} className="flex flex-wrap items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
              ) : null}
              {item.path && !isLast ? (
                <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
              ) : (
                <span className={isLast ? "font-medium text-brand-navy" : undefined}>{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
