"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

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

function TabPanel({
  id,
  label,
  active,
  children,
}: {
  id: TabId;
  label: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      id={`product-tab-${id}`}
      role="tabpanel"
      aria-labelledby={`product-tab-btn-${id}`}
      hidden={!active}
      className="mt-6 text-sm leading-relaxed text-muted-foreground"
    >
      <h2 className="sr-only">{label}</h2>
      {children}
    </div>
  );
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>("description");

  return (
    <div className="mt-12">
      <div
        role="tablist"
        aria-label="Informations produit"
        className="flex flex-wrap gap-2 border-b border-border pb-4"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`product-tab-btn-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`product-tab-${tab.id}`}
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

      <TabPanel id="description" label="Description" active={activeTab === "description"}>
        <div className="prose prose-sm max-w-none whitespace-pre-line text-muted-foreground">
          {product.longDescription.replace(/\*\*/g, "")}
        </div>
      </TabPanel>

      <TabPanel id="specs" label="Spécifications" active={activeTab === "specs"}>
        <dl className="grid gap-3 sm:grid-cols-2">
          {product.specs.map((spec) => (
            <div key={spec.label} className="rounded-xl border border-border bg-white px-4 py-3">
              <dt className="text-xs font-bold uppercase tracking-wide text-brand-teal">{spec.label}</dt>
              <dd className="mt-1 font-medium text-brand-navy">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </TabPanel>

      <TabPanel id="shipping" label="Livraison" active={activeTab === "shipping"}>
        <p>{product.shipping}</p>
      </TabPanel>

      <TabPanel id="personalization" label="Personnalisation" active={activeTab === "personalization"}>
        <p>{product.personalization}</p>
      </TabPanel>

      <TabPanel id="reviews" label="Avis clients" active={activeTab === "reviews"}>
        <p>
          {product.rating.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} sur 5 sur{" "}
          {product.reviewCount.toLocaleString("fr-FR")} avis certifiés. Les avis produit Avis Garantis
          seraient intégrés ici en production.
        </p>
      </TabPanel>
    </div>
  );
}
