"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/site";
import { Plus, X } from "lucide-react";

type FaqAccordionProps = {
  items: readonly FaqItem[];
  className?: string;
};

function panelId(index: number): string {
  return `faq-panel-${index}`;
}

function triggerId(index: number): string {
  return `faq-trigger-${index}`;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={cn("w-full space-y-3", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <Card key={item.question} variant="surface" className="gap-0 rounded-2xl py-0">
            <button
              type="button"
              id={triggerId(index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:text-brand-teal"
              aria-expanded={isOpen}
              aria-controls={panelId(index)}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <h3 className="text-base font-semibold text-brand-navy">{item.question}</h3>
              {isOpen ? (
                <X className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
              ) : (
                <Plus className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
              )}
            </button>
            <div
              id={panelId(index)}
              role="region"
              aria-labelledby={triggerId(index)}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
