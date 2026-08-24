import Link from "next/link";
import { personalizationSteps, routes } from "@/lib/site";

export function ProductPersonalizationCallout() {
  return (
    <aside className="mt-10 rounded-2xl border border-brand-teal/20 bg-brand-beige/40 p-6">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-teal">
        Personnalisation logo
      </p>
      <h2 className="mt-2 text-lg font-bold text-brand-navy">
        Comment personnaliser ce type de produit ?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Sur le site actuel, les règles varient selon la gamme et ne sont pas visibles au moment de
        l&apos;achat. Voici le parcours proposé dans la refonte :
      </p>
      <ol className="mt-4 space-y-3">
        {personalizationSteps.map((step) => (
          <li key={step.step} className="flex gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-teal text-xs font-bold text-white">
              {step.step}
            </span>
            <span>
              <strong className="text-brand-navy">{step.title}</strong>
              {". "}
              {step.description}
            </span>
          </li>
        ))}
      </ol>
      <Link
        href={routes.personalization}
        className="mt-5 inline-flex text-sm font-semibold text-brand-teal hover:text-brand-teal-dim"
      >
        Voir le parcours complet personnalisation →
      </Link>
    </aside>
  );
}
