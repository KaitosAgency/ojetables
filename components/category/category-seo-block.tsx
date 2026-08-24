import type { Category } from "@/lib/categories";

type CategorySeoBlockProps = {
  category: Category;
};

export function CategorySeoBlock({ category }: CategorySeoBlockProps) {
  return (
    <section className="border-t border-border/60 bg-brand-beige/40 section-padding">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {category.seoContent.heading}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
          {category.seoContent.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
