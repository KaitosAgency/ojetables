import Image from "next/image";
import Link from "next/link";

import {
  interactiveCardClassNameFor,
  type InteractiveCardAccent,
} from "@/components/ui/interactive-card";
import { cn } from "@/lib/utils";

export type CatalogFamilyCardData = {
  label: string;
  description: string;
  image: string;
  href: string;
  accent?: InteractiveCardAccent;
  ctaLabel?: string;
};

function familyLinkProps(href: string) {
  const isExternal = href.startsWith("http");
  return isExternal ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

export function CatalogFamilyCard({
  label,
  description,
  image,
  href,
  accent = "default",
  ctaLabel = "Voir la gamme",
  className,
}: CatalogFamilyCardData & { className?: string }) {
  return (
    <Link
      href={href}
      {...familyLinkProps(href)}
      className={cn(interactiveCardClassNameFor(accent), "catalog-family-card h-full", className)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-beige/40">
        <Image
          src={image}
          alt={label}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal-dim">
          {label}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
        <span className="mt-3 text-sm font-semibold text-brand-teal">
          {ctaLabel}
          <span aria-hidden> →</span>
        </span>
      </div>
    </Link>
  );
}
