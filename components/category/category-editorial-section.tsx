import Link from "next/link";

import type { Category } from "@/lib/categories";
import { categoryPath } from "@/lib/categories";
import { routes, productPath, featuredProductSlug } from "@/lib/site";

type CategoryEditorialSectionProps = {
  category: Category;
};

export function CategoryEditorialSection({ category }: CategoryEditorialSectionProps) {
  const basePath = categoryPath(category.slug);

  return (
    <section className="border-t border-border/60 bg-brand-beige/40 section-padding text-left">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
          {category.seoHeading}
        </h2>

        <div className="mt-8 space-y-10">
          {/* Section 1 : Usages pro */}
          <section id="usages-pro" className="scroll-mt-36">
            <h3 className="text-xl font-bold text-brand-navy">
              Vaisselle jetable pour traiteurs, CHR et collectivités
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                Notre catalogue vaisselle jetable couvre les besoins quotidiens des{" "}
                <strong>traiteurs, restaurants, hôtels, cantines et associations</strong>.{" "}
                <Link href={`${basePath}#assiettes`} className="font-medium text-brand-teal hover:underline">
                  Assiettes compostables
                </Link>{" "}
                pour réceptions,{" "}
                <Link href={`${basePath}#couverts`} className="font-medium text-brand-teal hover:underline">
                  kits couverts bois
                </Link>{" "}
                pour buffets,{" "}
                <Link href={`${basePath}#plateaux`} className="font-medium text-brand-teal hover:underline">
                  plateaux repas biodégradables
                </Link>{" "}
                pour la restauration collective.
              </p>
              <p>
                Chaque gamme est disponible en lots adaptés à votre volume : de quelques packs pour un{" "}
                événement privé à des palettes pour les collectivités.
              </p>
            </div>
          </section>

          {/* Section 2 : Matières éco */}
          <section id="matieres-eco" className="scroll-mt-36">
            <h3 className="text-xl font-bold text-brand-navy">
              Matières éco : compostable, bois, carton et réutilisable
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                Choisissez entre <strong>pulpe de canne, bagasse, bois et bambou</strong> pour une{" "}
                <Link href={`${basePath}#assiettes`} className="font-medium text-brand-teal hover:underline">
                  vaisselle jetable compostable
                </Link>{" "}
                conforme AGEC, ou optez pour le plastique réutilisable pour un usage intensif en CHR et événementiel.
              </p>
              <ul className="mt-3 space-y-2 list-disc list-inside">
                <li>
                  <strong>Pulpe de canne & bagasse</strong> : compostable industriel, réglementaire AGEC
                </li>
                <li>
                  <strong>Bois et bambou</strong> : aspect naturel premium pour réceptions haut de gamme
                </li>
                <li>
                  <strong>Carton kraft</strong> : recyclable, sobre et professionnel
                </li>
                <li>
                  <strong>Plastique réutilisable</strong> : robuste pour usage intensif CHR et festivals
                </li>
              </ul>
              <p>
                Nos{" "}
                <Link href={`${basePath}#assiettes`} className="font-medium text-brand-teal hover:underline">
                  assiettes biodégradables
                </Link>{" "}
                et{" "}
                <Link href={`${basePath}#couverts`} className="font-medium text-brand-teal hover:underline">
                  couverts en bois
                </Link>{" "}
                sont des alternatives crédibles au plastique à usage unique pour vos clients sensibles à l'image éco-responsable.
              </p>
            </div>
          </section>

          {/* Section 3 : Tarifs livraison */}
          <section id="tarifs-livraison" className="scroll-mt-36">
            <h3 className="text-xl font-bold text-brand-navy">
              Tarifs dégressifs et livraison 24/72h
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                <strong>Comptes professionnels</strong> : remises dès 10 packs, devis volume en ligne et paiement sous 30 jours pour les encours validés. Particuliers et associations : commande sans minimum sur les références en stock.
              </p>
              <p>
                <strong>Livraison 24/72h</strong> partout en France sur plus de 3 000 références. Frais de port calculés au panier, possibilité de livraison en palette pour les grands volumes. Consultez aussi notre{" "}
                <Link href={routes.destockage} className="font-medium text-brand-teal hover:underline">
                  sélection destockage
                </Link>{" "}
                pour des prix réduits.
              </p>
            </div>
          </section>

          {/* Section 4 : Conformité AGEC */}
          <section id="conformite-avec" className="scroll-mt-36">
            <h3 className="text-xl font-bold text-brand-navy">
              Conformité AGEC et contact alimentaire
            </h3>
            <div className="mt-4 space-y-3 text-base leading-relaxed text-muted-foreground">
              <p>
                Les gammes{" "}
                <Link href={`${basePath}#assiettes`} className="font-medium text-brand-teal hover:underline">
                  compostables et biodégradables
                </Link>{" "}
                répondent aux exigences de la <strong>loi AGEC</strong> pour la restauration et les événements. Certifications contact alimentaire sur les références adaptées à la{" "}
                <Link href={`${basePath}#vente-emporter`} className="font-medium text-brand-teal hover:underline">
                  vente à emporter
                </Link>{" "}
                et la restauration collective.
              </p>
              <p>
                Besoin d'un conseil produit ou d'un devis volume ? Notre équipe accompagne traiteurs, CHR et acheteurs publics au <strong>09 74 06 00 74</strong> ou via le formulaire de devis en ligne.
              </p>
            </div>
          </section>
        </div>

        <p className="mt-10 text-sm text-muted-foreground">
          Découvrez aussi notre{" "}
          <Link href={productPath(featuredProductSlug)} className="font-semibold text-brand-teal hover:underline">
            assiette biodégradable 15 cm
          </Link>
          {" "}ou la{" "}
          <Link
            href={routes.personalization}
            className="font-semibold text-brand-teal hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            personnalisation logo
          </Link>
          {" "}sur gobelets et emballages.
        </p>
      </div>
    </section>
  );
}
