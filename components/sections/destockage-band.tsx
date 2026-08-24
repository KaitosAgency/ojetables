import dynamic from "next/dynamic";
import { Flame, Tag, Truck } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/section-header";
import { routes } from "@/lib/site";
import { cn } from "@/lib/utils";

function DestockageCarouselSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("min-h-[17.5rem] animate-pulse rounded-xl bg-brand-kraft/10", className)}
      aria-hidden
    />
  );
}

const DestockageCarousel = dynamic(
  () =>
    import("@/components/sections/destockage-carousel").then((module) => ({
      default: module.DestockageCarousel,
    })),
  { loading: () => <DestockageCarouselSkeleton className="min-w-0 lg:col-span-8" /> },
);

export function DestockageBand() {
  return (
    <section className="relative scroll-mt-36 overflow-hidden border-y border-brand-kraft/20 bg-gradient-to-br from-brand-kraft/15 via-brand-beige to-white py-12 md:py-16">
      <div
        className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-6 xl:gap-8">
          <div className="min-w-0 lg:col-span-4">
            <SectionHeader
              badge={
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-kraft/30 bg-white/70 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-kraft-dark shadow-sm">
                  <Flame className="size-3.5" aria-hidden />
                  Destockage
                </span>
              }
              title="Promotions & fins de série"
            />

            <div className="mt-6 grid grid-cols-2 gap-3 sm:max-w-md">
              <div className="rounded-xl border border-brand-kraft/10 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-kraft/12"
                    aria-hidden
                  >
                    <Tag className="size-3.5 text-brand-kraft-dark" strokeWidth={2.25} />
                  </span>
                  <p className="text-2xl font-bold tracking-tight text-brand-navy">−21 %</p>
                </div>
                <p className="mt-2 text-xs leading-snug text-muted-foreground">Remise maximale</p>
              </div>
              <div className="rounded-xl border border-brand-kraft/10 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-teal/12"
                    aria-hidden
                  >
                    <Truck className="size-3.5 text-brand-teal-dim" strokeWidth={2.25} />
                  </span>
                  <p className="text-2xl font-bold tracking-tight text-brand-navy">24/72h</p>
                </div>
                <p className="mt-2 text-xs leading-snug text-muted-foreground">Livraison rapide</p>
              </div>
            </div>

            <Link
              href={routes.destockage}
              className={cn(
                buttonVariants({ variant: "brand", size: "cta" }),
                "destockage-cta-btn mt-6 w-full sm:w-auto",
              )}
            >
              <Flame className="destockage-cta-flame size-4 shrink-0" aria-hidden />
              Voir tout le destockage
              <Flame className="destockage-cta-flame size-4 shrink-0" aria-hidden />
            </Link>
          </div>

          <DestockageCarousel className="min-w-0 lg:col-span-8" />
        </div>
      </div>
    </section>
  );
}
