import Link from "next/link";

import type { Category } from "@/lib/categories";
import { routes, productPath, featuredProductSlug } from "@/lib/site";

type CategoryEditorialSectionProps = {
  category: Category;
};

export function CategoryEditorialSection({ category }: CategoryEditorialSectionProps) {
  return (
    <section className="border-t border-border/60 bg-brand-beige/40 section-padding">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {category.seoHeading}
        </h2>

        <div className="mt-8 space-y-10">
          {category.seoSections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-36">
              <h3 className="text-xl font-bold text-brand-navy">{section.heading}</h3>
              <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Découvrez aussi notre{" "}
          <Link href={productPath(featuredProductSlug)} className="font-semibold text-brand-teal hover:underline">
            assiette biodégradable 15 cm
          </Link>
          {" "}ou la{" "}
          <Link
            href={routes.personalization}
            className="font-semibold text-brand-teal hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            personnalisation logo
          </Link>
          {" "}sur gobelets et emballages.
        </p>
      </div>
    </section>
  );
}
