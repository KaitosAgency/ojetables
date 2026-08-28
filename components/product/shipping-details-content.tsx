import type { Product } from "@/lib/products";
import { formatPriceWithEuro } from "@/lib/product-format";
import {
  formatShippingCostLabel,
  getStandardShippingCostHt,
  shippingDeliverySubtitle,
  shippingExtraOptions,
  shippingFreeFromLabel,
  shippingRateTiers,
} from "@/lib/shipping";

type ShippingDetailsContentProps = {
  product: Product;
  lineTotalHt?: number;
  /** Variante compacte pour sheet / modale latérale. */
  density?: "default" | "compact";
};

/** Grille tarifs + texte livraison — partagée panneau achat et sheet. */
export function ShippingDetailsContent({
  product,
  lineTotalHt,
  density = "default",
}: ShippingDetailsContentProps) {
  const shippingCostHt =
    lineTotalHt != null ? getStandardShippingCostHt(lineTotalHt) : null;
  const isCompact = density === "compact";

  return (
    <div className={isCompact ? "space-y-5 text-sm" : "space-y-3"}>
      <p className={isCompact ? "font-medium text-brand-navy" : "text-sm font-medium text-brand-navy"}>
        {shippingDeliverySubtitle}
      </p>

      {shippingCostHt != null ? (
        <p className="text-sm text-muted-foreground">
          Frais estimés pour cette commande :{" "}
          <strong className="font-semibold text-brand-navy">
            {formatShippingCostLabel(shippingCostHt)}
          </strong>
        </p>
      ) : null}

      <ul
        className={
          isCompact
            ? "space-y-0"
            : "divide-y divide-border/60 rounded-[10px] border border-border/60 bg-brand-beige/20"
        }
      >
        {shippingRateTiers.map((tier) => (
          <li
            key={tier.label}
            className={
              isCompact
                ? "flex items-baseline justify-between gap-3 border-b border-border/60 py-2.5 last:border-0"
                : "flex flex-wrap items-baseline justify-between gap-2 px-3 py-2 text-sm"
            }
          >
            <span className={isCompact ? "text-brand-navy" : "text-muted-foreground"}>
              {tier.label}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-brand-navy">
              {formatPriceWithEuro(tier.priceHt)}
            </span>
          </li>
        ))}
        {shippingExtraOptions.map((option) => (
          <li
            key={option.label}
            className={
              isCompact
                ? "flex items-baseline justify-between gap-3 border-b border-border/60 py-2.5 last:border-0"
                : "flex flex-wrap items-baseline justify-between gap-2 px-3 py-2 text-sm"
            }
          >
            <span className={isCompact ? "text-brand-navy" : "text-muted-foreground"}>
              {option.label}
            </span>
            <span className="shrink-0 font-semibold tabular-nums text-brand-navy">
              {option.priceLabel}
            </span>
          </li>
        ))}
      </ul>

      <p
        className={
          isCompact
            ? "rounded-xl bg-brand-beige/60 px-4 py-3 text-base font-bold text-brand-kraft-dark"
            : "rounded-[10px] bg-brand-beige/60 px-3 py-2 text-sm font-bold text-brand-kraft-dark"
        }
      >
        {shippingFreeFromLabel}
      </p>

      <p className={isCompact ? "text-muted-foreground" : "text-sm leading-relaxed text-muted-foreground"}>
        {product.shipping}
      </p>
    </div>
  );
}
