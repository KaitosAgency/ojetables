import Image from "next/image";
import Link from "next/link";
import { Palette } from "lucide-react";
import { StarRating } from "@/components/ui/star-rating";
import { cn } from "@/lib/utils";

export type ProductCardProps = {
  name: string;
  image: string;
  category: string;
  priceFrom: string;
  priceWas?: string;
  href: string;
  personalizable?: boolean;
  /** Note produit sur 5 (Avis Garantis). */
  rating: number;
  /** Nombre d'avis produit certifiés. */
  reviewCount: number;
  /** Ex. « Lot de 100 » — conditionnement Magento. */
  packLabel?: string;
  className?: string;
};

function parseFrenchPrice(value: string): number | null {
  const amount = Number.parseFloat(value.replace(/\s/g, "").replace("€", "").replace(",", "."));
  return Number.isFinite(amount) ? amount : null;
}

function getDiscountPercent(priceWas: string, priceFrom: string): number | null {
  const was = parseFrenchPrice(priceWas);
  const from = parseFrenchPrice(priceFrom);
  if (!was || !from || from >= was) return null;
  return Math.round((1 - from / was) * 100);
}

export function ProductCard({
  name,
  image,
  category,
  priceFrom,
  priceWas,
  href,
  personalizable = false,
  rating,
  reviewCount,
  packLabel,
  className,
}: ProductCardProps) {
  const isExternal = href.startsWith("http");
  const isQuote = priceFrom.toLowerCase().includes("devis");
  const discountPercent = priceWas ? getDiscountPercent(priceWas, priceFrom) : null;
  const hasDiscount = Boolean(priceWas && discountPercent);

  return (
    <Link
      href={href}
      className={cn(
        "product-card group flex h-full flex-col overflow-hidden rounded-lg border border-border/90 bg-white shadow-[0_1px_0_rgb(61_44_38/0.04)] transition-all hover:border-brand-kraft/30 hover:shadow-[0_10px_28px_-14px_rgb(61_44_38/0.22)]",
        className,
      )}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <div className="relative overflow-hidden bg-white">
        {hasDiscount ? (
          <span className="product-card__promo-ribbon" aria-hidden>
            -{discountPercent}%
          </span>
        ) : null}

        {personalizable ? (
          <span
            className="pointer-events-auto absolute right-1.5 top-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-md border border-brand-teal/25 bg-white text-brand-teal-dim transition-colors hover:border-brand-teal hover:bg-brand-teal hover:text-white"
            title="Personnalisation disponible"
            aria-label="Personnalisation disponible"
          >
            <Palette className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
          </span>
        ) : null}

        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 45vw, 200px"
            className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
          {packLabel ? (
            <span className="absolute bottom-1.5 right-1.5 z-10 rounded-md bg-brand-beige px-1.5 py-1 text-[10px] font-medium leading-none text-muted-foreground">
              {packLabel}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="da-hatch-divider shrink-0" aria-hidden />

        <div className="px-3 pb-2.5 pt-2.5">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-brand-kraft-dark/85">
            {category}
          </p>
          <h4 className="mt-1.5 line-clamp-2 text-[13px] font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal-dim">
            {name}
          </h4>
          <p
            className="mt-1.5 flex items-center gap-1"
            aria-label={`${rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} sur 5 — ${reviewCount.toLocaleString("fr-FR")} avis`}
          >
            <StarRating size="sm" value={rating} />
            <span className="text-[11px] tabular-nums text-muted-foreground">
              ({reviewCount.toLocaleString("fr-FR")})
            </span>
          </p>
        </div>

        <div className="mt-auto border-t border-brand-beige bg-gradient-to-r from-brand-beige/90 via-brand-beige/70 to-brand-beige/50 px-3 py-2">
          <p className="text-sm leading-none">
            {isQuote ? (
              <span className="font-semibold text-brand-navy">{priceFrom}</span>
            ) : hasDiscount ? (
              <>
                <span className="mr-1.5 text-[13px] text-muted-foreground line-through">{priceWas}</span>
                <span className="text-[15px] font-bold text-brand-kraft-dark">{priceFrom}</span>
              </>
            ) : (
              <span className="text-[15px] font-bold text-brand-navy">{priceFrom}</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
