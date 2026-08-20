import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

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

      <div className="flex flex-col gap-3 sm:flex-row">
        <LinkButton href="#" variant="brand" size="cta" className="flex-1">
          Ajouter au panier
        </LinkButton>
        <LinkButton href="#devis" variant="brandOutline" size="cta" className="flex-1">
          Demander un devis
        </LinkButton>
      </div>
    </div>
  );
}
