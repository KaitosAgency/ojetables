"use client";

import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { ExpandableClampText } from "@/components/ui/expandable-clamp-text";
import { ProductPersonalizePanel } from "@/components/product/product-personalize-panel";
import { ProductShippingAccordion } from "@/components/product/product-shipping-accordion";
import { ProductReassuranceBand } from "@/components/product/product-reassurance-band";
import { ProductVolumeBundles } from "@/components/product/product-volume-bundles";
import { ProductFeaturePictos } from "@/components/product/product-feature-pictos";
import type { Product } from "@/lib/products";
import { formatPriceWithEuro } from "@/lib/product-format";
import { buildSameProductVolumeBundles, getLineTotalHt } from "@/lib/volume-pricing";
import {
  getAmountUntilFreeShippingHt,
} from "@/lib/shipping";
import { routes } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProductPurchasePanelProps = {
  product: Product;
};

/** Date limite de livraison (J+1 avant 12h, sinon J+2 — jours ouvrés, hors dimanche). */
function getDeliveryDeadlineDate(): Date {
  const now = new Date();
  let daysToAdd = now.getHours() < 12 ? 1 : 2;

  const delivery = new Date(now);
  delivery.setDate(delivery.getDate() + daysToAdd);

  while (delivery.getDay() === 0) {
    delivery.setDate(delivery.getDate() + 1);
  }

  return delivery;
}

function formatDeliveryDeadline(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date);
}

function ProductShortDescription({
  pitchLead,
  pitchSupport,
}: {
  pitchLead: string;
  pitchSupport: string;
}) {
  return (
    <ExpandableClampText
      wrapperClassName="mt-4"
      expandLabel="Voir plus"
      className="text-muted-foreground"
      lines={3}
    >
      <strong className="font-semibold text-brand-navy">{pitchLead}</strong> {pitchSupport}
    </ExpandableClampText>
  );
}

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const [quantity, setQuantity] = useState(1);
  const [deliveryDeadline, setDeliveryDeadline] = useState<string | null>(null);
  const hasPromo = product.priceWasHt != null && product.priceWasHt > product.priceHt;
  const volumeBundles = product.volumeBundles ?? buildSameProductVolumeBundles(product);
  const lineTotalHt = getLineTotalHt(product.priceHt, quantity);
  const lineTotalWasHt =
    product.priceWasHt != null ? product.priceWasHt * quantity : null;
  const untilFreeShippingHt = getAmountUntilFreeShippingHt(lineTotalHt);

  useEffect(() => {
    setDeliveryDeadline(formatDeliveryDeadline(getDeliveryDeadlineDate()));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <Badge variant="outline" className="border-brand-teal/30 text-brand-teal">
          {product.stockLabel}
        </Badge>
        <h1 className="mt-4 text-[2rem] font-bold tracking-tight text-brand-navy md:text-[2.5rem] md:leading-tight">
          {product.name}
        </h1>
        <p className="mt-2 text-xs text-muted-foreground">
          {product.packLabel ? (
            <>
              <Badge
                variant="outline"
                className="inline-flex rounded-md border-brand-kraft-dark/70 bg-transparent px-1.5 py-0 text-xs font-semibold text-brand-kraft-dark"
              >
                {product.packLabel}
              </Badge>
              <span aria-hidden> · </span>
            </>
          ) : null}
          Réf. <span className="font-medium text-brand-navy">{product.sku}</span>
          <span aria-hidden> · </span>
          {product.category}
        </p>

        <div className="mt-4 inline-flex items-center gap-2 text-muted-foreground">
          <StarRating size="md" value={product.rating} />
          <span className="text-sm tabular-nums">
            {product.rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })}
            <span aria-hidden> · </span>
            <a
              href="#avis"
              className="font-medium text-brand-teal underline-offset-2 transition-colors hover:underline"
            >
              {product.reviewCount.toLocaleString("fr-FR")} avis
            </a>
          </span>
        </div>

        <ProductFeaturePictos pictos={product.featurePictos} variant="highlight" />

        <ProductShortDescription
          pitchLead={product.pitchLead}
          pitchSupport={product.pitchSupport}
        />

        <div className="mt-6 space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm leading-snug text-muted-foreground">
                Livraison au plus tard le{" "}
                <strong className="font-semibold text-brand-navy">
                  {deliveryDeadline ?? "—"}
                </strong>
              </p>
              {untilFreeShippingHt != null && untilFreeShippingHt <= 80 ? (
                <p className="mt-1 text-xs text-brand-kraft-dark">
                  Plus que {formatPriceWithEuro(untilFreeShippingHt)} pour la livraison offerte
                </p>
              ) : null}
            </div>
            <div className="text-right">
              {hasPromo && lineTotalWasHt != null ? (
                <p className="text-sm tabular-nums text-muted-foreground line-through whitespace-nowrap">
                  {formatPriceWithEuro(lineTotalWasHt)}
                </p>
              ) : null}
              <p
                className="whitespace-nowrap text-[2.25rem] font-bold leading-none tabular-nums text-brand-teal md:text-[2.5rem]"
                aria-live="polite"
              >
                {formatPriceWithEuro(lineTotalHt)}
              </p>
            </div>
          </div>

          <div className="flex items-stretch gap-2.5">
            <div className="flex shrink-0 items-center rounded-[10px] border border-brand-navy/25 bg-white">
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                disabled={quantity <= 1}
                className="flex size-10 cursor-pointer items-center justify-center text-brand-navy outline-none transition-colors hover:bg-brand-beige/60 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-teal/45"
                aria-label="Diminuer la quantité"
              >
                <Minus className="size-4" strokeWidth={2.25} aria-hidden />
              </button>
              <span
                className="w-8 text-center text-sm font-semibold tabular-nums text-brand-navy"
                aria-live="polite"
                aria-label={`Quantité : ${quantity} ${product.unit}`}
              >
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                disabled={quantity >= 99}
                className="flex size-10 cursor-pointer items-center justify-center text-brand-navy outline-none transition-colors hover:bg-brand-beige/60 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-teal/45"
                aria-label="Augmenter la quantité"
              >
                <Plus className="size-4" strokeWidth={2.25} aria-hidden />
              </button>
            </div>

            <LinkButton href={routes.cart} variant="brand" size="cta" className="min-h-10 min-w-0 flex-[1.15]">
              Ajouter au panier
            </LinkButton>
          </div>

          {volumeBundles.length > 0 ? (
            <ProductVolumeBundles bundles={volumeBundles} quantity={quantity} />
          ) : null}

          <ProductPersonalizePanel product={product} />

          <ProductShippingAccordion product={product} lineTotalHt={lineTotalHt} />

          <div className="rounded-[10px] bg-brand-teal/15 px-4 py-3 text-left ring-1 ring-inset ring-brand-teal/25">
            <p className="text-sm font-bold leading-snug text-brand-navy">
              <span className="text-brand-teal-dim">-5%</span> sur votre 1ère commande !
            </p>
            <p className="mt-1 text-sm leading-snug text-brand-navy/90">
              Avec le code{" "}
              <span className="font-bold text-brand-teal-dim">BIENVENUE</span> à ajouter dans
              votre panier.
            </p>
          </div>

          <ProductReassuranceBand />

          <LinkButton
            href={routes.quote}
            variant="brandOutline"
            size="default"
            className="h-10 w-full border-brand-teal/25 bg-white text-brand-navy hover:border-brand-teal/40 hover:bg-brand-teal/10"
          >
            Demander un devis
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
