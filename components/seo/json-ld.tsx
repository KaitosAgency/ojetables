export type { BreadcrumbItem } from "@/lib/types/breadcrumb";

export {
  breadcrumbJsonLd,
  catalogItemListJsonLd,
  categoryPageJsonLd,
  destockagePageJsonLd,
  faqJsonLd,
  faqPageEntity,
  homePageJsonLd,
  organizationJsonLd,
  pressVideoJsonLd,
  productPageJsonLd,
  siteNavigationJsonLd,
  websiteJsonLd,
} from "./schemas";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
