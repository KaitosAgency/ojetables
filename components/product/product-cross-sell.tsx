import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";

type ProductCrossSellProps = {
  product: Product;
};

export function ProductCrossSell({ product }: ProductCrossSellProps) {
  return (
    <section className="mt-16">
      <h2 className="text-xl font-bold text-brand-navy">Souvent achetés avec</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {product.crossSell.map((item) => (
          <article key={item.slug} className="card-outline rounded-2xl p-5">
            <div className="product-placeholder mb-4 aspect-[4/3] rounded-xl" />
            <h3 className="font-semibold text-brand-navy">{item.name}</h3>
            <p className="mt-2 text-sm text-muted-foreground">dès {formatPrice(item.priceHt)} € HT</p>
          </article>
        ))}
      </div>
    </section>
  );
}
