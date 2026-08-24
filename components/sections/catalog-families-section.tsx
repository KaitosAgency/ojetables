import Image from "next/image";
import Link from "next/link";

import { Ban, Handshake, Scale, Sprout, type LucideIcon } from "lucide-react";

import { JsonLd, catalogItemListJsonLd } from "@/components/seo/json-ld";
import { SectionHeader } from "@/components/sections/section-header";
import {
  interactiveCardClassNameFor,
  type InteractiveCardAccent,
} from "@/components/ui/interactive-card";
import { catalogFamilies, catalogSeo, ecoCommitments, ecoSeo, type CatalogFamily } from "@/lib/site";
import { cn } from "@/lib/utils";

function familyLinkProps(href: string) {
  const isExternal = href.startsWith("http");
  return isExternal ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};
}

const ecoCommitmentIcons: Record<typeof ecoCommitments[number]["icon"], LucideIcon> = {
  scale: Scale,
  sprout: Sprout,
  handshake: Handshake,
  ban: Ban,
};

function catalogFamilyAccent(family: CatalogFamily): InteractiveCardAccent {
  switch (family.accent) {
    case "teal":
      return "teal";
    case "kraft":
      return "kraft";
    case "partner":
      return "partner";
    default:
      return "default";
  }
}

function CatalogFamilyCard({ family }: { family: CatalogFamily }) {
  const accent = catalogFamilyAccent(family);

  return (
    <Link
      href={family.href}
      {...familyLinkProps(family.href)}
      className={cn(interactiveCardClassNameFor(accent), "catalog-family-card")}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-beige/40">
        <Image
          src={family.image}
          alt={family.label}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal-dim">
          {family.label}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {family.description}
        </p>
        <span className="mt-3 text-sm font-semibold text-brand-teal">
          Voir la gamme
          <span aria-hidden> →</span>
        </span>
      </div>
    </Link>
  );
}

export function CatalogFamiliesSection() {
  return (
    <section id="catalogue" className="section-padding scroll-mt-36 section-glow">
      <JsonLd data={catalogItemListJsonLd(catalogFamilies)} />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader
          label={catalogSeo.label}
          title={catalogSeo.title}
          description={catalogSeo.metaLine}
          descriptionClassName="text-sm md:text-base"
        />

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {catalogFamilies.map((family) => (
            <li key={family.id}>
              <CatalogFamilyCard family={family} />
            </li>
          ))}
        </ul>

        <div
          id="eco"
          className="mt-10 scroll-mt-36 rounded-lg border border-brand-teal/20 bg-brand-beige/50 p-5 md:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">
                {ecoSeo.label}
              </p>
              <h3 className="mt-1 text-lg font-bold tracking-tight text-brand-navy md:text-xl">
                {ecoSeo.title}
              </h3>
            </div>
            <Link
              href={ecoSeo.bioCategoryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-sm font-semibold text-brand-teal underline-offset-2 hover:underline sm:inline"
            >
              {ecoSeo.bioCategoryLabel} →
            </Link>
          </div>

          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {ecoCommitments.map((item) => {
              const Icon = ecoCommitmentIcons[item.icon];

              return (
                <li
                  key={item.label}
                  className="flex items-center gap-2.5 rounded-md border border-white/80 bg-white/80 px-3 py-2.5 text-sm text-brand-navy"
                >
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-teal/12 text-brand-teal"
                    aria-hidden
                  >
                    <Icon className="size-3.5" strokeWidth={2} />
                  </span>
                  <span className="leading-snug">{item.label}</span>
                </li>
              );
            })}
          </ul>

          <Link
            href={ecoSeo.bioCategoryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-brand-teal underline-offset-2 hover:underline sm:hidden"
          >
            {ecoSeo.bioCategoryLabel} →
          </Link>
        </div>
      </div>
    </section>
  );
}
