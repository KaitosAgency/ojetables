"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const tabs = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Spécifications" },
  { id: "shipping", label: "Livraison" },
  { id: "personalization", label: "Personnalisation" },
  { id: "reviews", label: "Avis clients" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type ProductTabsProps = {
  product: Product;
};

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <div className="mt-12">
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "bg-brand-teal text-white"
                : "text-muted-foreground hover:bg-muted hover:text-brand-navy",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6 text-sm leading-relaxed text-muted-foreground">
        {activeTab === "description" && (
          <div className="prose prose-sm max-w-none whitespace-pre-line text-muted-foreground">
            {product.longDescription.replace(/\*\*/g, "")}
          </div>
        )}
        {activeTab === "specs" && (
          <dl className="grid gap-3 sm:grid-cols-2">
            {product.specs.map((spec) => (
              <div key={spec.label} className="rounded-xl border border-border bg-white px-4 py-3">
                <dt className="text-xs font-bold uppercase tracking-wide text-brand-teal">{spec.label}</dt>
                <dd className="mt-1 font-medium text-brand-navy">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {activeTab === "shipping" && <p>{product.shipping}</p>}
        {activeTab === "personalization" && <p>{product.personalization}</p>}
        {activeTab === "reviews" && (
          <p>
            {site.aggregateRating.display} sur {site.aggregateRating.count.toLocaleString("fr-FR")} avis
            certifiés {site.aggregateRating.label}. Les avis produit seraient intégrés ici en production.
          </p>
        )}
      </div>
    </div>
  );
}
