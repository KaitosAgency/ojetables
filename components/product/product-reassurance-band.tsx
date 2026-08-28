import type { LucideIcon } from "lucide-react";
import { Leaf, ShieldCheck, Star, Truck } from "lucide-react";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ReassuranceItem = {
  icon: LucideIcon;
  lines: [string, string];
  detail: string;
};

const items: ReassuranceItem[] = [
  {
    icon: Truck,
    lines: ["Expédition", "24/72h"],
    detail: "Commande validée avant 12h expédiée le jour même.",
  },
  {
    icon: ShieldCheck,
    lines: ["Paiement", "pro"],
    detail: "Compte client, devis en ligne et paiement à 30 jours.",
  },
  {
    icon: Star,
    lines: [
      site.aggregateRating.display,
      `${site.aggregateRating.count.toLocaleString("fr-FR")} avis`,
    ],
    detail: `Avis certifiés ${site.aggregateRating.label}.`,
  },
  {
    icon: Leaf,
    lines: ["Conforme", "AGEC"],
    detail: "Contact alimentaire et matières recyclables.",
  },
];

function ReassuranceCard({ item }: { item: ReassuranceItem }) {
  const Icon = item.icon;

  return (
    <li
      className="flex aspect-square min-w-0 flex-col items-center justify-center rounded-[10px] bg-brand-beige/35 p-2 text-center sm:p-2.5"
      title={`${item.lines.join(" ")} — ${item.detail}`}
    >
      <span className="relative mb-1.5 grid size-9 shrink-0 place-items-center sm:mb-2 sm:size-10">
        <span
          className="col-start-1 row-start-1 size-8 rounded-full bg-brand-teal/14 sm:size-9"
          aria-hidden
        />
        <Icon
          className="col-start-1 row-start-1 size-[18px] text-brand-navy sm:size-5"
          strokeWidth={1.5}
          aria-hidden
        />
      </span>
      <p className="w-full truncate text-[10px] font-bold leading-tight text-brand-navy sm:text-[11px]">
        {item.lines[0]}
      </p>
      <p className="mt-0.5 w-full truncate text-[9px] leading-tight text-muted-foreground sm:text-[10px]">
        {item.lines[1]}
      </p>
    </li>
  );
}

type ProductReassuranceBandProps = {
  className?: string;
};

export function ProductReassuranceBand({ className }: ProductReassuranceBandProps) {
  return (
    <section aria-label="Nos engagements" className={cn(className)}>
      <ul className="grid grid-cols-4 gap-1">
        {items.map((item) => (
          <ReassuranceCard key={item.lines.join("-")} item={item} />
        ))}
      </ul>
    </section>
  );
}
