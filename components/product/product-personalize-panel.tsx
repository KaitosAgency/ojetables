"use client";

import { useCallback, useId, useRef, useState } from "react";
import { Download, FileCheck2, Palette, Upload, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DisclosureCard } from "@/components/ui/disclosure-card";
import type { Product } from "@/lib/products";
import {
  formatFileSize,
  PERSONALIZATION_ACCEPT_ATTRIBUTE,
  validatePersonalizationFile,
} from "@/lib/personalization-upload";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/site";
import { LinkButton } from "@/components/ui/link-button";

type ProductPersonalizePanelProps = {
  product: Product;
};

const DEFAULT_TEMPLATE_HREF = "/products/gabarits/gobelet-carton-gabarit.svg";

export const PRODUCT_PERSONALIZE_ANCHOR_ID = "product-personalize";

export function ProductPersonalizePanel({ product }: ProductPersonalizePanelProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const templateHref = product.personalizationTemplateHref ?? DEFAULT_TEMPLATE_HREF;
  const templateName = `gabarit-${product.slug}.svg`;

  const handleFile = useCallback((file: File | undefined) => {
    if (!file) return;

    const result = validatePersonalizationFile(file);
    if (!result.ok) {
      setSelectedFile(null);
      setError(result.message);
      return;
    }

    setSelectedFile(result.file);
    setError(null);
  }, []);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const onDrop = (event: React.DragEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setDragActive(false);
    handleFile(event.dataTransfer.files[0]);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  if (!product.personalizable) {
    return (
      <DisclosureCard
        id={PRODUCT_PERSONALIZE_ANCHOR_ID}
        title="Personnalisation"
        icon={<Palette className="size-5 shrink-0" aria-hidden />}
        variant="accent"
        size="lg"
        scrollMarginClassName="scroll-mt-[calc(var(--site-header-height)+var(--site-header-gap)+1rem)]"
        contentClassName="space-y-4 px-4 pb-5 pt-4 sm:px-5"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">{product.personalization}</p>
        <LinkButton
          href={routes.personalization}
          variant="brandOutline"
          size="default"
          className="h-10 w-full border-brand-teal/30 bg-white text-brand-navy hover:border-brand-teal/40 hover:bg-brand-teal/10"
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir la gamme personnalisable
        </LinkButton>
      </DisclosureCard>
    );
  }

  return (
    <DisclosureCard
      id={PRODUCT_PERSONALIZE_ANCHOR_ID}
      title="Personnaliser"
      icon={<Palette className="size-5 shrink-0" aria-hidden />}
      variant="accent"
      size="lg"
      scrollMarginClassName="scroll-mt-[calc(var(--site-header-height)+var(--site-header-gap)+1rem)]"
      contentClassName="space-y-4 px-4 pb-5 pt-4 sm:px-5"
    >
      <div>
        <p className="text-sm font-semibold text-brand-navy">Préparez votre visuel</p>
        <p className="mt-1 text-sm leading-snug text-muted-foreground">
          Téléchargez le gabarit, intégrez votre logo aux emplacements indiqués, puis déposez le
          fichier final ici. Un BAT vous sera envoyé sous 48 h.
        </p>
      </div>

      <a
        href={templateHref}
        download={templateName}
        className={cn(
          buttonVariants({ variant: "outline", size: "default" }),
          "h-10 w-full border-brand-teal/30 bg-white text-brand-navy hover:bg-brand-teal/5",
        )}
      >
        <Download className="size-4" aria-hidden />
        Télécharger le gabarit
      </a>

      <div className="space-y-2">
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          accept={PERSONALIZATION_ACCEPT_ATTRIBUTE}
          className="sr-only"
          onChange={onInputChange}
        />

        {!selectedFile ? (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragEnter={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(event) => {
              event.preventDefault();
              if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
              setDragActive(false);
            }}
            onDrop={onDrop}
            className={cn(
              "flex w-full cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed px-4 py-7 text-center transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-teal/45",
              dragActive
                ? "border-brand-teal bg-brand-teal/10"
                : "border-brand-teal/35 bg-white hover:border-brand-teal/55 hover:bg-brand-teal/[0.04]",
            )}
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
              <Upload className="size-5" strokeWidth={2} aria-hidden />
            </span>
            <span className="mt-3 text-sm font-semibold text-brand-navy">
              Glissez votre fichier ici
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              ou cliquez pour parcourir votre ordinateur
            </span>
          </button>
        ) : (
          <div className="flex items-start gap-3 rounded-[10px] border border-brand-teal/25 bg-white px-3 py-3">
            <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
              <FileCheck2 className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-brand-navy">{selectedFile.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {formatFileSize(selectedFile.size)} · prêt à être joint au devis
              </p>
            </div>
            <button
              type="button"
              onClick={clearFile}
              className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-brand-beige/80 hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal/45"
              aria-label="Retirer le fichier"
            >
              <X className="size-4" aria-hidden />
            </button>
          </div>
        )}

        {error ? (
          <p className="text-sm font-medium text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <p className="text-xs leading-relaxed text-muted-foreground">
          Formats acceptés : PDF, AI, SVG, PNG, JPG, EPS · taille max. 5 Mo · résolution
          recommandée 300 dpi.
        </p>
      </div>
    </DisclosureCard>
  );
}
