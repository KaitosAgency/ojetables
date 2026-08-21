import { Flame, Percent, Timer } from "lucide-react";

import { DestockageCarousel } from "@/components/sections/destockage-carousel";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/lib/site";

export function DestockageBand() {
  return (
    <section className="relative scroll-mt-36 overflow-hidden border-y border-brand-kraft/20 bg-gradient-to-br from-brand-kraft/15 via-brand-beige to-white py-12 md:py-16">
      <div
        className="pointer-events-none absolute -left-16 top-8 select-none font-bold leading-none text-brand-kraft/[0.07] sm:-left-8"
        aria-hidden
      >
        <span className="block text-[7rem] md:text-[9rem]">%</span>
      </div>
      <div
        className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-kraft/30 bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-kraft-dark shadow-sm">
            <Flame className="size-3.5" aria-hidden />
            Destockage
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
            Promotions &amp; fins de série
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
            Stocks limités, prix cassés sur références sélectionnées — mise à jour en temps réel sur
            le catalogue destockage.
          </p>

          <div className="mt-6 grid max-w-md grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <Percent className="size-4 text-brand-kraft" aria-hidden />
              <p className="mt-2 text-2xl font-bold text-brand-navy">−21 %</p>
              <p className="text-xs text-muted-foreground">Remise max constatée</p>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <Timer className="size-4 text-brand-teal" aria-hidden />
              <p className="mt-2 text-2xl font-bold text-brand-navy">24/72h</p>
              <p className="text-xs text-muted-foreground">Expédition rapide</p>
            </div>
          </div>

          <LinkButton href={routes.destockage} variant="brand" size="cta" className="mt-6">
            Voir tout le destockage
          </LinkButton>
        </div>

        <DestockageCarousel className="mt-10" />
      </div>
    </section>
  );
}
