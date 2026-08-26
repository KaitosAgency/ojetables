import Image from "next/image";
import Link from "next/link";
import { Palette } from "lucide-react";
import { ProductCardFavoriteButton } from "@/components/product/product-card-quick-actions";
import { ProductCardFooterActions } from "@/components/product/product-card-footer-actions";
import { StarRating } from "@/components/ui/star-rating";
import { interactiveCardClassName } from "@/components/ui/interactive-card";
import { getProductCardImageSrc } from "@/lib/product-image";
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
  rating?: number;
  /** Nombre d'avis produit certifiés. */
  reviewCount?: number;
  /** Ex. « Lot de 100 » - conditionnement Magento. */
  packLabel?: string;
  className?: string;
  /** Sous le h1/h2 de page : h3 (défaut). Dans un bloc déjà en h3 (ex. secteurs) : h4. */
  titleAs?: "h3" | "h4";
  /** Favoris + ajout panier rapide — uniquement pages catégorie (`CategoryProductGrid`). */
  showQuickActions?: boolean;
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
  rating = 0,
  reviewCount = 0,
  packLabel,
  className,
  titleAs = "h3",
  showQuickActions = false,
}: ProductCardProps) {
  const isExternal = href.startsWith("http");
  const isQuote = priceFrom.toLowerCase().includes("devis");
  const discountPercent = priceWas ? getDiscountPercent(priceWas, priceFrom) : null;
  const hasDiscount = Boolean(priceWas && discountPercent);
  const TitleTag = titleAs;

  return (
    <article className={cn("product-card", interactiveCardClassName, className)}>
      <div className="product-card__media relative overflow-hidden">
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

        <Link
          href={href}
          className="product-card__image-link absolute inset-0 block outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          <Image
            src={getProductCardImageSrc(image)}
            alt={name}
            fill
            draggable={false}
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 33vw, 280px"
            className="product-card__image object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>
        {showQuickActions === true ? (
          <ProductCardFavoriteButton
            productKey={href}
            productName={name}
            className="absolute bottom-1.5 left-1.5 z-20"
          />
        ) : null}
        {packLabel ? (
          <span className="absolute bottom-1.5 right-1.5 z-10 rounded-md bg-brand-beige px-1.5 py-1 text-[10px] font-medium leading-none text-muted-foreground">
            {packLabel}
          </span>
        ) : null}
      </div>

      <Link
        href={href}
        className="flex min-h-0 flex-1 flex-col text-inherit no-underline outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <div className="flex flex-1 flex-col">
          <div className="da-hatch-divider shrink-0" aria-hidden />

          <div className="px-3 pb-2.5 pt-2.5">
            <p className="text-[10px] font-bold tracking-[0.12em] text-brand-kraft-dark/85">
              {category}
            </p>
            <TitleTag className="mt-1.5 line-clamp-2 text-[13px] font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal-dim">
              {name}
            </TitleTag>
            <p
              className="mt-1.5 flex items-center gap-1"
              aria-label={
                reviewCount > 0
                  ? `${rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} sur 5 - ${reviewCount.toLocaleString("fr-FR")} avis`
                  : undefined
              }
            >
              {reviewCount > 0 ? (
                <>
                  <StarRating size="sm" value={rating} />
                  <span className="text-[11px] tabular-nums text-muted-foreground">
                    ({reviewCount.toLocaleString("fr-FR")})
                  </span>
                </>
              ) : (
                <span className="text-[11px] text-muted-foreground">Pas encore d&apos;avis</span>
              )}
            </p>
          </div>
        </div>
      </Link>

      <div
        className={cn(
          "mt-auto border-t border-brand-beige bg-gradient-to-r from-brand-beige/90 via-brand-beige/70 to-brand-beige/50",
          showQuickActions === true ? "py-1.5 px-3" : "px-3 py-2.5",
        )}
      >
        {showQuickActions === true ? (
          <ProductCardFooterActions
            productKey={href}
            productName={name}
            isQuote={isQuote}
            price={
              <p className="min-w-0 text-sm leading-none">
                {isQuote ? (
                  <span className="font-semibold text-brand-navy">{priceFrom}</span>
                ) : hasDiscount ? (
                  <>
                    <span className="mr-1.5 text-[13px] text-muted-foreground line-through">
                      {priceWas}
                    </span>
                    <span className="text-[15px] font-bold text-brand-kraft-dark">{priceFrom}</span>
                  </>
                ) : (
                  <span className="text-[15px] font-bold text-brand-navy">{priceFrom}</span>
                )}
              </p>
            }
          />
        ) : (
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
        )}
      </div>
    </article>
  );
}
