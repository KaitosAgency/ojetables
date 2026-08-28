import { site } from "@/lib/site";

type ProductOpenGraphMetaProps = {
  priceTtc: number;
  availability?: "instock" | "outofstock";
};

/** Balises OG produit en `property=` — Next Metadata `other` émet `name=` incorrect. */
export function ProductOpenGraphMeta({
  priceTtc,
  availability = "instock",
}: ProductOpenGraphMetaProps) {
  return (
    <>
      <meta property="og:type" content="product" />
      <meta property="product:price:amount" content={priceTtc.toFixed(2)} />
      <meta property="product:price:currency" content="EUR" />
      <meta property="product:availability" content={availability} />
      <meta property="product:brand" content={site.name} />
    </>
  );
}
