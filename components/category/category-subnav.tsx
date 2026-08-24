import { CategorySubfamiliesSlider } from "@/components/category/category-subfamilies-slider";
import { SectionHeader } from "@/components/sections/section-header";
import type { Category } from "@/lib/categories";

type CategorySubnavProps = {
  category: Category;
};

export function CategorySubnav({ category }: CategorySubnavProps) {
  return (
    <section
      aria-label="Sous-familles de la catégorie"
      className="border-b border-border/60 bg-white section-padding !py-10 md:!py-14"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label="Parcourir la gamme"
          title="Gammes associées"
          description="Assiettes, couverts, bols, barquettes et emballages : explorez les sous-familles de notre catalogue vaisselle jetable."
          descriptionClassName="text-sm md:text-base"
        />

        <CategorySubfamiliesSlider subfamilies={category.subfamilies} className="mt-8" />
      </div>
    </section>
  );
}
