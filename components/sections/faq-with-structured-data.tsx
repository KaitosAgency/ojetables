import type { ReactNode } from "react";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { JsonLd, faqJsonLd } from "@/components/seo/json-ld";
import type { FaqItem } from "@/lib/site";
import { cn } from "@/lib/utils";

type FaqWithStructuredDataProps = {
  items: readonly FaqItem[];
  className?: string;
  children?: ReactNode;
};

/**
 * Accordéon FAQ + JSON-LD FAQPage au même endroit :
 * impossible d'afficher une FAQ sans rich snippet tant qu'on passe par ce composant.
 */
export function FaqWithStructuredData({
  items,
  className,
  children,
}: FaqWithStructuredDataProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <JsonLd data={faqJsonLd(items)} />
      {children}
      <FaqAccordion items={items} className={cn(className)} />
    </>
  );
}
