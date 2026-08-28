import { PageContainer } from "@/components/layout/page-container";
import { BlogPostsSlider } from "@/components/sections/blog-posts-slider";
import { SectionHeader } from "@/components/sections/section-header";
import { blogPosts } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

type BlogPostsBandProps = {
  className?: string;
  /** Directement après StatsBand — fusionne l’arc sans bordure intermédiaire. */
  afterBandArc?: boolean;
};

export function BlogPostsBand({ className, afterBandArc = false }: BlogPostsBandProps) {
  return (
    <section
      aria-labelledby="blog-posts-band-title"
      className={cn(
        "bg-white",
        afterBandArc
          ? "section-after-band-arc pb-10 md:pb-12"
          : "border-t border-border/60 py-10 md:py-12",
        className,
      )}
    >
      <PageContainer>
        <SectionHeader
          label="Blog"
          title="Nos conseils & actualités"
          titleId="blog-posts-band-title"
          description="Guides pratiques, conformité AGEC et astuces pro pour mieux choisir votre vaisselle jetable."
          descriptionClassName="text-sm md:text-base"
        />

        <BlogPostsSlider posts={blogPosts} className="mt-8 min-w-0" />
      </PageContainer>
    </section>
  );
}
