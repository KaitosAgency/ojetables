import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { BlogPost } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

type BlogPostCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogPostCard({ post, className }: BlogPostCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border/70 bg-white transition-shadow hover:shadow-sm",
        className,
      )}
    >
      <Link
        href={post.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-[16/10] overflow-hidden bg-brand-beige/40"
      >
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-brand-navy/75 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-brand-beige backdrop-blur-sm">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-3.5 sm:p-4">
        <p className="text-xs font-medium text-muted-foreground">{post.readTime} de lecture</p>
        <h3 className="mt-1.5 text-sm font-bold leading-snug text-brand-navy sm:text-base">
          <Link
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="line-clamp-2 outline-offset-4 transition-colors group-hover:text-brand-teal-dim focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal/45"
          >
            {post.title}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
        <Link
          href={post.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal-dim transition-colors hover:text-brand-teal"
        >
          Lire l&apos;article
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
