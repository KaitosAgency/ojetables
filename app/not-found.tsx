"use client";

import Link from "next/link";
import { LinkButton } from "@/components/ui/link-button";
import { routes } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="section-glow flex flex-1 items-center section-padding">
      <div className="mx-auto max-w-xl px-4 text-center md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">Erreur 404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
          Page introuvable
        </h1>
        <p className="mt-4 text-muted-foreground">
          Cette adresse n&apos;existe pas dans la maquette preview. Retournez à l&apos;accueil ou
          consultez la fiche produit exemple.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <LinkButton href="/" variant="brand" size="cta">
            Retour à l&apos;accueil
          </LinkButton>
          <LinkButton href={routes.product} variant="brandOutline" size="default">
            Voir la fiche produit
          </LinkButton>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-brand-navy">
            Ojetables — maquette Kaitos
          </Link>
        </p>
      </div>
    </section>
  );
}
