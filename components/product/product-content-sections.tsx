import Link from "next/link";

import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeader } from "@/components/sections/section-header";
import { ProductAnchorNav, type ProductAnchor } from "@/components/product/product-anchor-nav";
import { ProductFeaturePictosAccordion } from "@/components/product/product-feature-pictos-accordion";
import { ProductCrossSell } from "@/components/product/product-cross-sell";
import { ProductReviewsPanel } from "@/components/product/product-reviews-panel";
import { ProductSpecsAccordion } from "@/components/product/product-specs-accordion";
import { ProductSpecsTable } from "@/components/product/product-specs-table";
import { ProductFaqVideos } from "@/components/product/product-faq-videos";
import type { Product, ProductDescriptionPart } from "@/lib/products";
import { routes } from "@/lib/site";

type ProductContentSectionsProps = {
  product: Product;
  /** Intégré dans la colonne éditoriale (sans marge haute). */
  embedded?: boolean;
};

const descriptionLinkClassName = "font-medium text-brand-teal hover:underline";

function DescriptionInlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} className={descriptionLinkClassName} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={descriptionLinkClassName}>
      {children}
    </Link>
  );
}

function ProductDescriptionParagraph({
  parts,
  breadcrumbs,
}: {
  parts: readonly ProductDescriptionPart[];
  breadcrumbs: Product["breadcrumbs"];
}) {
  return (
    <p>
      {parts.map((part, index) => {
        if (part.type === "text") {
          return <span key={`text-${index}`}>{part.value}</span>;
        }

        const breadcrumb = breadcrumbs[part.breadcrumbIndex];
        if (!breadcrumb) {
          return <span key={`link-${index}`}>{part.label}</span>;
        }

        return (
          <DescriptionInlineLink key={`link-${index}`} href={breadcrumb.path}>
            {part.label}
          </DescriptionInlineLink>
        );
      })}
    </p>
  );
}

const sectionScrollMargin =
  "scroll-mt-[calc(var(--site-header-height)+var(--site-header-gap)+3rem)]";
const headingClassName = "text-2xl font-bold tracking-tight text-brand-navy md:text-3xl";
const sectionClassName = `${sectionScrollMargin} border-t border-border/60 pt-10`;
const firstSectionClassName = `${sectionScrollMargin} pt-2`;

export function ProductContentSections({
  product,
  embedded = false,
}: ProductContentSectionsProps) {
  const anchors: ProductAnchor[] = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Spécifications" },
    { id: "avis", label: "Avis clients" },
    ...(product.faq.length > 0 ? [{ id: "faq", label: "FAQ" }] : []),
    ...(product.faqVideos?.length ? [{ id: "video", label: "Vidéo" }] : []),
  ];

  const updatedLabel = new Date(product.updatedAt).toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={embedded ? undefined : "mt-14"}>
      <ProductAnchorNav anchors={anchors} />

      <div className="space-y-12">
        <section id="description" className={embedded ? firstSectionClassName : sectionClassName}>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Description
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            Fiche mise à jour en {updatedLabel}
          </p>

          <div className="mt-8 space-y-8">
            {product.descriptionSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-32">
                <h2 className="text-xl font-bold text-brand-navy">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-muted-foreground">
                  {section.paragraphs.map((paragraph, paragraphIndex) => (
                    <ProductDescriptionParagraph
                      key={`${section.id}-${paragraphIndex}`}
                      parts={paragraph}
                      breadcrumbs={product.breadcrumbs}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Cette référence fait partie de notre gamme{" "}
            <Link
              href={product.categoryPath}
              className="font-semibold text-brand-teal hover:underline"
            >
              vaisselle jetable professionnelle
            </Link>
            . Pour un marquage à votre logo, consultez la{" "}
            <Link
              href={routes.personalization}
              className="font-semibold text-brand-teal hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              gamme personnalisation
            </Link>{" "}
            ou nos{" "}
            <Link href={routes.destockage} className="font-semibold text-brand-teal hover:underline">
              offres destockage
            </Link>{" "}
            pour les fins de série.
          </p>
        </section>

        <section id="specifications" className={sectionClassName}>
          <h2 className={headingClassName}>Spécifications techniques</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Dimensions, matières, conditionnement et usages : toutes les caractéristiques de cette
            référence pour valider votre choix en autonomie.
          </p>
          <ProductFeaturePictosAccordion pictos={product.featurePictos} />
          {product.specGroups?.length ? (
            <ProductSpecsAccordion groups={product.specGroups} />
          ) : (
            <ProductSpecsTable specs={product.specs} />
          )}
        </section>

        {product.crossSell.length > 0 ? (
          <ProductCrossSell product={product} className={sectionClassName} />
        ) : null}

        <section id="avis" className={sectionClassName} aria-labelledby="avis-title">
          <ProductReviewsPanel product={product} />
        </section>

        {product.faq.length > 0 ? (
          <section id="faq" className={sectionClassName} aria-labelledby="faq-title">
            <SectionHeader
              label="Aide & SAV"
              title="Questions sur ce produit"
              titleId="faq-title"
              description={`Réponses aux questions fréquentes sur ${product.shortName.toLowerCase()}.`}
              descriptionClassName="text-sm md:text-base"
            />
            {/* FAQPage déjà déclaré dans le @graph produit : accordéon sans JSON-LD dédié. */}
            <FaqAccordion items={product.faq} className="mt-8" />
          </section>
        ) : null}

        {product.faqVideos?.length ? (
          <section id="video" className={sectionClassName}>
            <div className="relative -mx-4 overflow-hidden rounded-3xl bg-brand-navy px-4 py-10 text-white sm:-mx-6 sm:px-8 md:-mx-0 md:px-10">
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_120%_at_0%_50%,rgb(209_125_60/0.14),transparent_55%)]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_100%_50%,rgb(255_255_255/0.04),transparent_50%)]"
                aria-hidden
              />
              <div className="relative">
                <h2 className="text-center text-2xl font-bold tracking-tight text-brand-beige md:text-3xl">
                  Les réponses à vos questions en vidéos
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-brand-beige/75 md:text-base">
                  Délais, suivi de commande et service client : trois réponses courtes pour
                  commander sereinement votre vaisselle jetable.
                </p>
                <div className="mt-8">
                  <ProductFaqVideos videos={product.faqVideos} />
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
