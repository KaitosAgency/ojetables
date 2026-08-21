import { CreditCard, Truck } from "lucide-react";
import { LinkButton } from "@/components/ui/link-button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { HeroRotatingTagline } from "@/components/sections/hero-rotating-tagline";
import { nav, routes, site } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[520px] overflow-hidden border-b border-border/60 bg-gradient-to-b from-brand-beige/80 via-background to-background text-brand-navy md:min-h-[560px] lg:min-h-[600px]">
      <div className="absolute inset-0 grid-glow opacity-25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(61,44,38,0.06),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_20%,_rgba(209,125,60,0.14),_transparent_45%)]" />

      <div
        className="pointer-events-none absolute inset-0 bg-[url('/heroojetables_transparent_v2.png')] bg-[length:auto_88%] bg-[position:right_bottom] bg-no-repeat sm:bg-[length:auto_92%] md:bg-[length:auto_100%] md:max-[1199px]:bg-[position:calc(100%+50px)_bottom]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-12 md:px-6 md:pb-28 md:pt-16 lg:pb-32 lg:pt-20">
        <div className="max-w-xl text-center md:max-w-lg md:text-left lg:max-w-xl">
          <Badge
            variant="outline"
            className="mb-6 inline-flex border-brand-kraft/35 bg-white/80 text-[11px] uppercase tracking-[0.2em] text-brand-navy"
          >
            Depuis 2011 · +3 000 références
          </Badge>

          <h1 className="mx-auto max-w-2xl text-4xl font-bold leading-[1.05] tracking-tight text-brand-navy md:mx-0 md:text-6xl">
            Vaisselle jetable éco-responsable
            <HeroRotatingTagline />
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:mx-0">
            Traiteurs, restaurateurs, collectivités : +3 000 références en stock, livraison 24/48h et tarifs dégressifs. Particuliers & événements : petites quantités disponibles.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:flex-row sm:items-stretch md:justify-start">
            <LinkButton href={nav.productsHref} variant="brand" size="cta" className="w-full sm:w-auto">
              Voir le catalogue
            </LinkButton>
            <LinkButton href={routes.personalization} variant="brandOutline" size="cta" className="w-full sm:w-auto">
              Personnaliser mes produits
            </LinkButton>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-sm text-muted-foreground md:justify-start">
            <a
              href={site.aggregateRating.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-brand-navy"
              aria-label={`${site.aggregateRating.display} sur ${site.aggregateRating.count.toLocaleString("fr-FR")} avis — voir les avis ${site.aggregateRating.label}`}
            >
              <StarRating size="sm" />
              <span className="underline underline-offset-2">
                {site.aggregateRating.display} sur {site.aggregateRating.count.toLocaleString("fr-FR")} avis
              </span>
            </a>
            <span className="hidden text-border sm:inline" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 shrink-0 text-brand-kraft" aria-hidden />
              Livraison 24/48h
            </span>
            <span className="hidden text-border sm:inline" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CreditCard className="h-3.5 w-3.5 shrink-0 text-brand-kraft" aria-hidden />
              Paiement 30j pro
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
