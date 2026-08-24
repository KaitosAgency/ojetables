"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

const materialFilters = ["Tous", "Compostable", "Bois", "Carton", "Réutilisable"] as const;
const usageFilters = ["Tous usages", "Traiteur", "Collectivité", "CHR", "Événement"] as const;

export function CategoryFiltersBar() {
  const [material, setMaterial] = useState<string>("Tous");
  const [usage, setUsage] = useState<string>("Tous usages");

  return (
    <div className="border-b border-border/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-4 md:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-teal">
          Filtrer la sélection
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Preview maquette — filtres visuels sans URL indexable (facettes noindex en production).
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs font-medium text-muted-foreground self-center">Matière :</span>
          {materialFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setMaterial(filter)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                material === filter
                  ? "border-brand-teal bg-brand-teal text-white"
                  : "border-border bg-white text-brand-navy hover:border-brand-teal/40",
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-xs font-medium text-muted-foreground self-center">Usage :</span>
          {usageFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setUsage(filter)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-semibold transition-colors",
                usage === filter
                  ? "border-brand-kraft bg-brand-kraft text-white"
                  : "border-border bg-white text-brand-navy hover:border-brand-kraft/40",
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
