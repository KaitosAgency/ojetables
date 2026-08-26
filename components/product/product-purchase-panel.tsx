import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { routes } from "@/lib/site";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const hasPromo = product.priceWasHt != null && product.priceWasHt > product.priceHt;

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="border-brand-teal/30 text-brand-teal">
          {product.stockLabel}
        </Badge>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
          {product.name}
        </h1>
        <p className="mt-3 text-muted-foreground">{product.description}</p>

        <p
          className="mt-4 flex items-center gap-2"
          aria-label={`${product.rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} sur 5 - ${product.reviewCount.toLocaleString("fr-FR")} avis`}
        >
          <StarRating size="sm" value={product.rating} />
          <span className="text-sm tabular-nums text-muted-foreground">
            {product.rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} ·{" "}
            {product.reviewCount.toLocaleString("fr-FR")} avis
          </span>
        </p>

        {product.badges.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <li key={badge.title}>
                <span
                  className="inline-flex items-center rounded-md border border-brand-kraft/30 bg-brand-beige/60 px-2.5 py-1 text-xs font-semibold text-brand-kraft-dark"
                  title={badge.title}
                >
                  {badge.label}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border bg-brand-beige/30 p-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {hasPromo ? (
            <p className="text-lg text-muted-foreground line-through">
              {formatPrice(product.priceWasHt!)} € HT
            </p>
          ) : null}
          <p className="text-3xl font-bold text-brand-navy">
            {formatPrice(product.priceHt)} €{" "}
            <span className="text-lg font-medium text-muted-foreground">HT</span>
          </p>
          {hasPromo ? (
            <Badge className="bg-brand-kraft-dark text-white hover:bg-brand-kraft-dark">
              Promo
            </Badge>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(product.priceTtc)} € TTC · {product.unit}
        </p>
        {product.unitPriceHt != null ? (
          <p className="mt-2 text-sm font-semibold text-brand-kraft-dark">
            À partir de {formatPrice(product.unitPriceHt)} € HT la pièce
          </p>
        ) : null}

        <ul className="mt-4 space-y-2 text-sm">
          {product.volumeTiers.map((tier) => (
            <li key={tier.quantity} className="flex justify-between gap-4 text-muted-foreground">
              <span>{tier.quantity}</span>
              <span className="font-medium text-brand-navy">{tier.discount}</span>
            </li>
          ))}
        </ul>
      </div>

      <ul className="grid grid-cols-2 gap-2">
        {product.reassurance.map((item) => (
          <li
            key={item}
            className="rounded-lg border border-brand-teal/15 bg-white px-3 py-2 text-xs font-medium text-brand-navy"
          >
            ✓ {item}
          </li>
        ))}
      </ul>

      <div className="rounded-lg border border-border bg-white p-4 text-sm">
        <div className="mb-3 flex items-center gap-2 font-semibold text-brand-navy">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand-teal"
            aria-hidden
          >
            <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
            <path d="M15 18H9" />
            <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
            <circle cx="17" cy="18" r="2" />
            <circle cx="7" cy="18" r="2" />
          </svg>
          Frais de livraison estimés
        </div>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex justify-between">
            <span>Standard (24/72h)</span>
            <span className="font-medium text-brand-navy">dès 6,90 € HT</span>
          </li>
          <li className="flex justify-between">
            <span>Express</span>
            <span className="font-medium text-brand-navy">26,90 € HT</span>
          </li>
          <li className="mt-1 flex justify-between border-t border-border pt-1 font-medium text-brand-teal">
            <span>Offerte</span>
            <span>dès 250 € HT</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <LinkButton href={routes.cart} variant="brand" size="cta" className="flex-1">
          Ajouter au panier
        </LinkButton>
        <LinkButton href={routes.quote} variant="brandOutline" size="cta" className="flex-1">
          Demander un devis
        </LinkButton>
      </div>
    </div>
  );
}
