"use client";

import {
  ClipboardList,
  Flame,
  Leaf,
  Package,
  Ruler,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { DisclosureCardGroup } from "@/components/ui/disclosure-card";
import type { ProductSpecGroup } from "@/lib/products";

type ProductSpecsAccordionProps = {
  groups: readonly ProductSpecGroup[];
  footnote?: string;
};

const groupIcons: Record<string, LucideIcon> = {
  dimensions: Ruler,
  matieres: Leaf,
  conditionnement: Package,
  usage: Flame,
};

function getGroupIcon(id: string): LucideIcon {
  return groupIcons[id] ?? ClipboardList;
}

export function ProductSpecsAccordion({ groups, footnote }: ProductSpecsAccordionProps) {
  return (
    <>
      <DisclosureCardGroup
        className="mt-8"
        heading={
          <>
            <span className="size-2 shrink-0 rounded-full bg-brand-teal" aria-hidden />
            Caractéristiques détaillées
          </>
        }
        defaultOpenId={groups[0]?.id ?? null}
        items={groups.map((group) => {
          const Icon = getGroupIcon(group.id);

          return {
            id: group.id,
            title: group.title,
            subtitle: group.subtitle,
            icon: <Icon className="size-[1.125rem]" strokeWidth={2} aria-hidden />,
            content: (
              <>
                <dl className="space-y-3">
                  {group.items.map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm"
                    >
                      <dt className="font-medium text-muted-foreground">{item.label}</dt>
                      <dd className="font-semibold text-brand-navy">{item.value}</dd>
                    </div>
                  ))}
                </dl>
                {group.note ? (
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{group.note}</p>
                ) : null}
              </>
            ),
          };
        })}
      />

      {footnote ? (
        <div className="mt-4 flex gap-3 rounded-xl border border-brand-teal/20 bg-brand-teal/5 px-4 py-3.5">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-teal-dim" strokeWidth={2} aria-hidden />
          <p className="text-sm leading-relaxed text-muted-foreground">{footnote}</p>
        </div>
      ) : null}
    </>
  );
}
