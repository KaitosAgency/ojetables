import Link from "next/link";

import { interactiveCardClassName } from "@/components/ui/interactive-card";
import { SectionHeader } from "@/components/sections/section-header";
import type { Category } from "@/lib/categories";
import { cn } from "@/lib/utils";

type CategorySectorLinksProps = {
  category: Category;
};

export function CategorySectorLinks({ category }: CategorySectorLinksProps) {
  return (
    <section className="section-padding border-t border-border/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Par métier"
          title={`${category.label} par activité`}
          description="Traiteurs, CHR, collectivités, associations : accédez aux gammes et conseils adaptés à votre secteur."
          descriptionClassName="text-sm md:text-base"
        />

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {category.sectorLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  interactiveCardClassName,
                  "flex items-center justify-between gap-3 p-4",
                )}
              >
                <span className="font-semibold text-brand-navy transition-colors group-hover:text-brand-teal-dim">
                  {link.label}
                </span>
                <span className="text-sm font-semibold text-brand-teal shrink-0">
                  Voir
                  <span aria-hidden> →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
