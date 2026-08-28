"use client";

import { BlogPostCard } from "@/components/sections/blog-post-card";
import { ContentSlider, ContentSliderSlide } from "@/components/ui/content-slider";
import { blogPostsSliderConfig } from "@/lib/content-slider-configs";
import type { BlogPost } from "@/lib/blog-posts";

type BlogPostsSliderProps = {
  posts: readonly BlogPost[];
  className?: string;
};

export function BlogPostsSlider({ posts, className }: BlogPostsSliderProps) {
  const { slideClassName, ...sliderProps } = blogPostsSliderConfig;

  return (
    <ContentSlider ariaLabel="Articles de blog" className={className} {...sliderProps}>
      {posts.map((post) => (
        <ContentSliderSlide key={post.slug} className={slideClassName}>
          <BlogPostCard post={post} className="h-full" />
        </ContentSliderSlide>
      ))}
    </ContentSlider>
  );
}
