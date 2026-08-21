import Image from "next/image";
import Link from "next/link";
import {
  Award,
  CupSoda,
  Leaf,
  PackageOpen,
  Palette,
  Percent,
  Sandwich,
  ShoppingBag,
  Sparkles,
  Table2,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { JsonLd, catalogItemListJsonLd } from "@/components/seo/json-ld";
import { SectionHeader } from "@/components/sections/section-header";
import {
  catalogFamilies,
  catalogSeo,
  catalogUniverses,
  partnerLogos,
  routes,
  type CatalogFamily,
} from "@/lib/site";
import { cn } from "@/lib/utils";

const familyIcons: Record<string, LucideIcon> = {
  "vaisselle-jetable": UtensilsCrossed,
  verrine: Wine,
  "gobelet-verre": CupSoda,
  "nappe-serviette": Table2,
  "bio-ecolo": Leaf,
  snack: Sandwich,
  sac: ShoppingBag,
  "plateau-boite": PackageOpen,
  "hygiene-resto": Sparkles,
  "garcia-de-pou": Award,
  personnalisation: Palette,
  destockage: Percent,
};

function familyLinkProps(href: string) {
  const isExternal = href.startsWith("http");
  return isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
}

function FamilyInlineLink({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const family = catalogFamilies.find((item) => item.id === id);
  if (!family) return <>{children}</>;

  return (
    <Link
      href={family.href}
      className="font-medium text-brand-teal underline-offset-2 hover:underline"
      {...familyLinkProps(family.href)}
    >
      {children}
    </Link>
  );
}

function CatalogFamilyCard({ family }: { family: CatalogFamily }) {
  const Icon = familyIcons[family.id] ?? UtensilsCrossed;
  const isPartner = family.accent === "partner";
  const isKraft = family.accent === "kraft";
  const isTeal = family.accent === "teal";

  return (
    <Link
      href={family.href}
      {...familyLinkProps(family.href)}
      className={cn(
        "group flex h-full flex-col rounded-2xl p-4 transition-all md:p-5",
        isKraft &&
          "border-2 border-brand-kraft/40 bg-gradient-to-br from-brand-kraft/15 to-white shadow-sm hover:border-brand-kraft hover:shadow-md",
        isTeal &&
          "card-outline-teal hover:shadow-[0_12px_40px_-16px_rgb(61_44_38/0.16)]",
        isPartner &&
          "border-2 border-brand-navy/10 bg-white shadow-sm hover:border-brand-navy/25 hover:shadow-md",
        !family.accent && "card-outline hover:border-brand-teal/40",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            isKraft && "bg-brand-kraft/20 text-brand-kraft-dark",
            isTeal && "bg-brand-teal/10 text-brand-teal",
            isPartner && "bg-brand-beige text-brand-navy",
            !family.accent && "bg-brand-beige text-brand-navy",
          )}
        >
          {isPartner ? (
            <Image
              src={partnerLogos.garciaDePou.src}
              alt=""
              width={partnerLogos.garciaDePou.width}
              height={partnerLogos.garciaDePou.height}
              className="h-5 w-auto max-w-[2.75rem]"
            />
          ) : (
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          )}
        </div>
        {isKraft ? (
          <span className="rounded-full bg-brand-kraft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Offres
          </span>
        ) : null}
        {isTeal ? (
          <span className="rounded-full bg-brand-teal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-teal-dim">
            Logo
          </span>
        ) : null}
      </div>

      <h4 className="mt-4 text-base font-bold leading-snug text-brand-navy transition-colors group-hover:text-brand-teal-dim">
        {family.label}
      </h4>
      {family.originalLabel && family.originalLabel !== family.label ? (
        <p className="mt-0.5 text-[11px] text-muted-foreground">{family.originalLabel}</p>
      ) : null}
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">{family.description}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {family.highlights.map((tag) => (
          <li
            key={tag}
            className="rounded-full bg-brand-beige px-2 py-0.5 text-[11px] font-medium text-brand-navy/80"
          >
            {tag}
          </li>
        ))}
      </ul>
      <span className="mt-4 text-sm font-semibold text-brand-teal">
        Voir la gamme
        <span aria-hidden> →</span>
      </span>
    </Link>
  );
}

export function CatalogFamiliesSection() {
  return (
    <section id="catalogue" className="section-padding scroll-mt-36 section-glow">
      <JsonLd data={catalogItemListJsonLd(catalogFamilies)} />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeader label={catalogSeo.label} title={catalogSeo.title} description={catalogSeo.intro} />

        <p className="mt-4 text-sm text-muted-foreground">
          {catalogFamilies.length} catégories d&apos;origine · +3 000 références · regroupées par usage pour
          trouver plus vite.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {catalogUniverses.map((universe) => (
            <div key={universe.id} className="flex flex-col">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-teal">{universe.label}</p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-brand-navy">{universe.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{universe.description}</p>
              <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {universe.families.map((family) => (
                  <CatalogFamilyCard key={family.id} family={family} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border/80 bg-white/80 p-6 shadow-sm md:p-10">
          <h3 className="max-w-3xl text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            {catalogSeo.editorial.heading}
          </h3>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <article>
              <h4 className="text-lg font-bold text-brand-navy">{catalogSeo.editorial.columns[0].title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                En activité depuis 2011, Ojetables met à disposition des professionnels et des particuliers une{" "}
                <FamilyInlineLink id="vaisselle-jetable">vaisselle jetable</FamilyInlineLink> élégante, pratique
                et bio.{" "}
                <FamilyInlineLink id="bio-ecolo">Assiettes en pulpe de canne</FamilyInlineLink>, couverts en bois,
                vaisselle en palmier ou{" "}
                <FamilyInlineLink id="gobelet-verre">gobelets carton</FamilyInlineLink> : les matières naturelles
                remplacent le plastique à usage unique, dans le respect de la loi AGEC et des exigences contact
                alimentaire des collectivités et du CHR.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Formes classiques ou design, palette de couleurs pour l&apos;événementiel : la gamme s&apos;adapte
                au cocktail avec les <FamilyInlineLink id="verrine">verrines</FamilyInlineLink>, au repas traiteur
                comme à la cantine. Plus de 3 000 références en stock, avec un rapport qualité-prix pensé pour
                l&apos;achat en volume.
              </p>
            </article>

            <article>
              <h4 className="text-lg font-bold text-brand-navy">{catalogSeo.editorial.columns[1].title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Marquez <FamilyInlineLink id="personnalisation">gobelets, sacs kraft et emballages au logo</FamilyInlineLink>{" "}
                de votre enseigne : devis sous 24h, bon à tirer sous 48h. Les professionnels de la restauration,
                les collectivités et les associations y trouvent aussi{" "}
                <FamilyInlineLink id="nappe-serviette">nappes et serviettes</FamilyInlineLink>,{" "}
                <FamilyInlineLink id="sac">sacs papier kraft</FamilyInlineLink> et{" "}
                <FamilyInlineLink id="hygiene-resto">consommables d&apos;hygiène</FamilyInlineLink> pour équiper
                l&apos;établissement de A à Z.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                Les fins de série et{" "}
                <FamilyInlineLink id="destockage">promotions destockage</FamilyInlineLink> permettent d&apos;acheter
                vaisselle jetable et <FamilyInlineLink id="snack">emballages snack</FamilyInlineLink> à prix cassés,
                stocks limités. Livraison 24/72h partout en France, tarifs dégressifs compte pro et devis volume
                en ligne — y compris la gamme <FamilyInlineLink id="garcia-de-pou">Garcia de Pou</FamilyInlineLink>{" "}
                et les <FamilyInlineLink id="plateau-boite">plateaux repas</FamilyInlineLink>.
              </p>
            </article>
          </div>

          <nav aria-label="Plan des 12 catégories" className="mt-8 border-t border-border/70 pt-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Accès direct aux 12 catégories
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-1 gap-y-2 text-sm">
              {catalogFamilies.map((family, index) => (
                <li key={family.id} className="inline-flex items-center">
                  <Link
                    href={family.href}
                    className="text-brand-navy underline-offset-2 hover:text-brand-teal hover:underline"
                    {...familyLinkProps(family.href)}
                  >
                    {family.label}
                  </Link>
                  {index < catalogFamilies.length - 1 ? (
                    <span className="mx-2 text-border" aria-hidden>
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          Ensuite, les{" "}
          <Link href={routes.destockage} className="font-semibold text-brand-kraft-dark underline-offset-2 hover:underline">
            promotions destockage
          </Link>{" "}
          — stocks limités, juste en dessous.
        </p>
      </div>
    </section>
  );
}
