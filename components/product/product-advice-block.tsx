import { Headset, Mail, Phone } from "lucide-react";

import { LinkButton } from "@/components/ui/link-button";
import { routes, ojetablesLive, site } from "@/lib/site";
import { cn } from "@/lib/utils";

type ContactChipProps = {
  icon: typeof Phone;
  href?: string;
  label: string;
  value: string;
  highlight?: boolean;
  valueClassName?: string;
};

function ContactChip({
  icon: Icon,
  href,
  label,
  value,
  highlight = false,
  valueClassName,
}: ContactChipProps) {
  const inner = (
    <>
      <span
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-lg border",
          highlight
            ? "border-brand-teal/30 bg-brand-teal/12 text-brand-teal-dim"
            : "border-border/70 bg-white/90 text-brand-navy",
        )}
      >
        <Icon className="size-4" strokeWidth={2} aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span
          className={cn(
            "mt-0.5 block text-sm font-bold leading-snug text-brand-navy",
            valueClassName,
          )}
        >
          {value}
        </span>
      </span>
    </>
  );

  const chipClassName = cn(
    "flex h-full min-w-0 items-center gap-3 rounded-lg border p-3.5 transition-colors",
    highlight
      ? "border-brand-teal/25 bg-white hover:border-brand-teal/40"
      : "border-border/60 bg-white/70 hover:border-brand-kraft/25 hover:bg-white",
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          chipClassName,
          "outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-teal/45",
        )}
      >
        {inner}
      </a>
    );
  }

  return <div className={chipClassName}>{inner}</div>;
}

export function ProductAdviceBlock() {
  return (
    <section
      aria-labelledby="product-advice-title"
      className="mt-14 rounded-2xl border border-brand-kraft/20 bg-brand-beige/30"
    >
      <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
        <div>
          <div className="flex items-start gap-4">
            <span
              className="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-brand-teal/25 bg-brand-teal/10 text-brand-teal-dim shadow-sm"
              aria-hidden
            >
              <Headset className="size-6" strokeWidth={1.75} />
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-kraft-dark">
                Conseil expert
              </p>
              <h2 id="product-advice-title" className="mt-1 text-xl font-bold text-brand-navy md:text-2xl">
                Besoin d&apos;un conseil sur cette référence ?
              </h2>
            </div>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Volumes, compatibilité couvercles, délais sur devis : notre équipe accompagne les
            traiteurs, CHR et acheteurs publics depuis {site.foundedYear}.
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            <li>
              <ContactChip
                icon={Phone}
                href={site.phoneHref}
                label="Appelez-nous"
                value={site.phone}
                highlight
              />
            </li>
            <li>
              <ContactChip
                icon={Mail}
                href={`mailto:${site.email}`}
                label="Écrivez-nous"
                value={site.email}
                valueClassName="truncate"
              />
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-brand-kraft/15 pt-6 lg:min-w-[14rem] lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          <LinkButton
            href={routes.quote}
            variant="brand"
            size="cta"
            className="w-full justify-center shadow-md shadow-brand-teal/15"
          >
            Demander un devis
          </LinkButton>
          <LinkButton href={ojetablesLive.contact} variant="brandOutline" size="cta" className="w-full justify-center">
            Formulaire de contact
          </LinkButton>
          <p className="text-center text-xs leading-relaxed text-muted-foreground lg:text-left">
            Réponse sous 24&nbsp;h ouvrées · Devis volume sur mesure
          </p>
        </div>
      </div>
    </section>
  );
}
