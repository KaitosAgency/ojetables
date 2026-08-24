import Link from "next/link";

import { interactiveCardClassNameFor } from "@/components/ui/interactive-card";
import type { Category } from "@/lib/categories";
import { categoryPath } from "@/lib/categories";
import { cn } from "@/lib/utils";

type CategorySubnavProps = {
  category: Category;
};

export function CategorySubnav({ category }: CategorySubnavProps) {
  const href = categoryPath(category.slug);

  return (
    <nav aria-label="Sous-familles de la catégorie" className="border-b border-border/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-teal">
          Parcourir la gamme
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {category.subfamilies.map((subfamily) => (
            <li key={subfamily.id}>
              <Link
                href={`${href}#${subfamily.id}`}
                className={cn(
                  interactiveCardClassNameFor("default"),
                  "flex flex-col p-4",
                )}
              >
                <span className="text-base font-bold text-brand-navy transition-colors group-hover:text-brand-teal-dim">
                  {subfamily.label}
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {subfamily.description}
                </span>
                <span className="mt-3 text-sm font-semibold text-brand-teal">
                  Explorer
                  <span aria-hidden> →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
