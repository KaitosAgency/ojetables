import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import { routes } from "@/lib/site";

type ProductPurchasePanelProps = {
  product: Product;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
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
      </div>

      <div className="rounded-2xl border border-border bg-brand-beige/30 p-5">
        <p className="text-3xl font-bold text-brand-navy">
          {formatPrice(product.priceHt)} € <span className="text-lg font-medium text-muted-foreground">HT</span>
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {formatPrice(product.priceTtc)} € TTC · {product.unit}
        </p>

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
        <div className="flex items-center gap-2 font-semibold text-brand-navy mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-teal"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
          Frais de livraison estimés
        </div>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex justify-between">
            <span>Standard (24/72h)</span>
            <span className="font-medium text-brand-navy">dès 6,90€ HT</span>
          </li>
          <li className="flex justify-between">
            <span>Express</span>
            <span className="font-medium text-brand-navy">26,90€ HT</span>
          </li>
          <li className="flex justify-between text-brand-teal font-medium mt-1 pt-1 border-t border-border">
            <span>Offerte</span>
            <span>dès 250€ HT</span>
          </li>
        </ul>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <LinkButton href="#" variant="brand" size="cta" className="flex-1">
          Ajouter au panier
        </LinkButton>
        <LinkButton href={routes.quote} variant="brandOutline" size="cta" className="flex-1">
          Demander un devis
        </LinkButton>
      </div>
    </div>
  );
}
