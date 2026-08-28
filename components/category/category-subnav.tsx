import { PageContainer } from "@/components/layout/page-container";
import { CategorySubfamiliesSlider } from "@/components/category/category-subfamilies-slider";
import { SectionHeader } from "@/components/sections/section-header";
import type { Category } from "@/lib/categories";
import { cn } from "@/lib/utils";

type CategorySubnavProps = {
  category: Category;
  variant?: "default" | "compact";
};

export function CategorySubnav({ category, variant = "default" }: CategorySubnavProps) {
  const isCompact = variant === "compact";

  return (
    <section
      aria-labelledby="category-subnav-heading"
      className={cn(
        "border-t border-border/60 bg-white",
        isCompact ? "py-8 md:py-10" : "section-padding !py-10 md:!py-14",
      )}
    >
      <PageContainer>
        {isCompact ? (
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">
              Parcourir la gamme
            </p>
            <h2
              id="category-subnav-heading"
              className="mt-2 text-xl font-bold tracking-tight text-brand-navy md:text-2xl"
            >
              Gammes associées
            </h2>
          </div>
        ) : (
          <SectionHeader
            label="Parcourir la gamme"
            title="Gammes associées"
            titleId="category-subnav-heading"
            description="Assiettes, couverts, bols, barquettes et emballages : explorez les sous-familles de notre catalogue vaisselle jetable."
            descriptionClassName="text-sm md:text-base"
          />
        )}

        <CategorySubfamiliesSlider
          subfamilies={category.subfamilies}
          className={isCompact ? "mt-0" : "mt-8"}
        />

        <nav aria-label="Ancres sous-familles" className="sr-only">
          <ul>
            {category.subfamilies.map((subfamily) => (
              <li key={subfamily.id}>
                <a href={`#${subfamily.id}`}>{subfamily.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sr-only">
          {category.subfamilies.map((subfamily) => (
            <span key={`anchor-${subfamily.id}`} id={subfamily.id} className="scroll-mt-36" />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
