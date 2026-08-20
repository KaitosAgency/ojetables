"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="flex flex-1 items-center bg-white section-padding">
      <div className="mx-auto max-w-xl px-4 text-center md:px-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">Erreur</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-brand-navy md:text-5xl">
          Un problème est survenu
        </h1>
        <p className="mt-4 text-muted-foreground">
          Nous n&apos;avons pas pu afficher cette page. Réessayez ou retournez à l&apos;accueil.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button type="button" variant="brand" size="cta" onClick={() => reset()}>
            Réessayer
          </Button>
          <LinkButton href="/" variant="brandOutline" size="default">
            Retour à l&apos;accueil
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
