import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { JsonLd, breadcrumbJsonLd, type BreadcrumbItem } from "@/components/seo/json-ld";
import type { Category } from "@/lib/categories";
import { categoryPath } from "@/lib/categories";

type CategoryBreadcrumbProps = {
  category: Category;
};

export function CategoryBreadcrumb({ category }: CategoryBreadcrumbProps) {
  const path = categoryPath(category.slug);
  const items: BreadcrumbItem[] = [
    { name: "Accueil", path: "/" },
    { name: category.label },
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
          <li className="font-medium text-brand-navy">{category.label}</li>
        </ol>
      </nav>
    </>
  );
}
