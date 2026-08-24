"use client";

import { useState } from "react";
import { faqItemClassName } from "@/components/ui/interactive-card";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/lib/site";
import { ChevronDown, Plus } from "lucide-react";

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
    <div className={cn("w-full space-y-2", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={item.question} className={faqItemClassName(isOpen)}>
            <button
              type="button"
              id={triggerId(index)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors sm:px-5 sm:py-4"
              aria-expanded={isOpen}
              aria-controls={panelId(index)}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <h3 className="text-sm font-semibold leading-snug text-brand-navy sm:text-base">
                {item.question}
              </h3>
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-md border border-border/90 bg-brand-beige/40 text-brand-teal transition-[border-color,background-color,box-shadow] duration-200",
                  isOpen && "border-brand-teal/30 bg-brand-teal/10 shadow-[0_1px_0_rgb(61_44_38/0.04)]",
                )}
                aria-hidden
              >
                {isOpen ? (
                  <ChevronDown className="size-4" strokeWidth={2.25} />
                ) : (
                  <Plus className="size-3.5" strokeWidth={2.25} />
                )}
              </span>
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
                <p className="border-t border-border/90 px-4 pb-4 pt-3 text-sm leading-relaxed text-muted-foreground sm:px-5 sm:pb-4 sm:pt-3.5">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
