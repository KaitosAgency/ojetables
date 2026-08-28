"use client";

import { Check, Download, Upload } from "lucide-react";

import {
  PersoProcessCursor,
  PersoProcessDragUnit,
} from "@/components/personalization/perso-process-cursor";
import { useProcessCycle } from "@/components/personalization/use-process-cycle";

type MockupProps = {
  active: boolean;
};

function MockupShell({
  active,
  children,
  className = "",
}: {
  active: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`perso-process-mockup relative mx-auto aspect-[4/5] w-full min-h-[240px] max-h-[320px] overflow-hidden rounded-lg border border-brand-teal/25 bg-white shadow-[0_4px_20px_rgb(61_44_38/0.06)] ${active ? "is-active" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/** Étape 1 — aligné panneau Personnaliser fiche produit. */
export function DownloadTemplateMockup({ active }: MockupProps) {
  useProcessCycle(active);

  return (
    <MockupShell active={active} className="perso-process-mockup--download">
      <div className="flex h-full flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Gabarit produit
        </p>

        <div className="perso-process-template-preview mt-3 flex flex-1 flex-col items-center justify-center rounded-lg border border-border/80 bg-brand-beige/25 px-3 py-4">
          <svg
            className="perso-process-cup-outline h-32 w-24 text-brand-navy/25"
            viewBox="0 0 72 96"
            fill="none"
            aria-hidden
          >
            <path
              d="M14 34 C14 24 58 24 58 34 L52 86 C52 92 20 92 20 86 Z"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeDasharray="5 4"
              strokeLinejoin="round"
            />
            <path
              d="M12 34 C12 28 60 28 60 34"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeDasharray="5 4"
              strokeLinecap="round"
            />
            <rect
              x="26"
              y="46"
              width="20"
              height="22"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeDasharray="4 3"
            />
          </svg>
          <p className="mt-3 text-center text-[9px] leading-snug text-muted-foreground">
            Zones d&apos;impression · cotes · fond perdu
          </p>
        </div>

        <div className="perso-process-download-btn mt-3 inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-[10px] border border-brand-teal/30 bg-white text-[10px] font-semibold text-brand-navy">
          <Download
            className="perso-process-download-icon size-3.5 shrink-0 text-brand-teal"
            strokeWidth={2}
            aria-hidden
          />
          Télécharger le gabarit
        </div>
      </div>

      <div className="perso-process-overlay pointer-events-none absolute inset-0">
        <PersoProcessCursor variant="download" />
      </div>
    </MockupShell>
  );
}

/** Étape 2 — zone drag & drop fiche produit. */
export function UploadMockup({ active }: MockupProps) {
  useProcessCycle(active);

  return (
    <MockupShell active={active} className="perso-process-mockup--upload">
      <div className="flex h-full flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Votre visuel
        </p>
        <div className="perso-process-upload-zone relative mt-3 flex flex-1 flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-brand-teal/35 bg-white px-3 py-4">
          <span className="perso-process-upload-icon flex size-11 items-center justify-center rounded-full bg-brand-teal/10 text-brand-teal">
            <Upload className="size-5" strokeWidth={2} aria-hidden />
          </span>
          <p className="mt-3 text-[10px] font-semibold text-brand-navy">Glissez votre fichier ici</p>
          <p className="mt-0.5 text-center text-[9px] text-muted-foreground">
            ou cliquez pour parcourir
          </p>
          <div className="perso-process-upload-file mt-3 flex items-center gap-2 rounded-md border border-brand-teal/25 bg-white px-2.5 py-1.5 shadow-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-teal/10 text-[8px] font-bold text-brand-teal">
              AI
            </span>
            <span className="text-[9px] font-medium text-brand-navy">logo-club.ai</span>
            <Check
              className="perso-process-upload-check ml-0.5 size-3.5 text-brand-teal"
              strokeWidth={2.5}
              aria-hidden
            />
          </div>
          <div className="perso-process-upload-bar mt-3 h-1 w-full overflow-hidden rounded-full bg-border/60">
            <div className="perso-process-upload-bar-fill h-full rounded-full bg-brand-teal" />
          </div>
        </div>
      </div>

      <div className="perso-process-overlay pointer-events-none absolute inset-0">
        <PersoProcessDragUnit />
      </div>
    </MockupShell>
  );
}

/** Étape 3 — panier / paiement. */
export function OrderMockup({ active }: MockupProps) {
  useProcessCycle(active);

  return (
    <MockupShell active={active} className="perso-process-mockup--order">
      <div className="perso-process-order-toast absolute left-3 right-3 top-3 z-10 flex items-center justify-center gap-1.5 rounded-full border border-brand-teal/25 bg-white px-3 py-1.5 text-[9px] font-semibold text-brand-navy shadow-[0_4px_16px_rgb(61_44_38/0.1)]">
        <Check className="size-3.5 shrink-0 text-brand-teal" strokeWidth={2.5} aria-hidden />
        Commande enregistrée
      </div>

      <div className="flex h-full flex-col p-4 pt-5">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Panier
        </p>

        <div className="perso-process-order-lines mt-2.5 flex-1 overflow-hidden rounded-lg border border-border/80 bg-brand-beige/15">
          <div className="flex items-start justify-between gap-2 border-b border-border/60 px-2.5 py-2">
            <p className="min-w-0 text-[9px] leading-snug text-brand-navy">
              <span className="font-semibold">Gobelet carton 24 cl</span>
              <span className="text-muted-foreground"> · ×250</span>
            </p>
            <span className="shrink-0 text-[9px] font-semibold tabular-nums text-brand-navy">
              205,00&nbsp;€ HT
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 border-b border-border/60 px-2.5 py-2">
            <span className="text-[9px] text-brand-navy">Personnalisation logo</span>
            <span className="text-[9px] font-semibold text-brand-teal">Gratuit</span>
          </div>
          <div className="flex items-center justify-between gap-2 px-2.5 py-2">
            <span className="text-[9px] text-brand-navy">Livraison standard</span>
            <span className="text-[9px] font-semibold tabular-nums text-brand-navy">9,90&nbsp;€ HT</span>
          </div>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
          <span className="text-[10px] font-bold text-brand-navy">Total HT</span>
          <span className="perso-process-order-price text-[11px] font-bold tabular-nums text-brand-teal">
            214,90&nbsp;€ HT
          </span>
        </div>

        <div className="perso-process-order-cta mt-2 flex h-9 w-full items-center justify-center rounded-[10px] bg-brand-teal text-[10px] font-semibold text-white">
          Payer
        </div>

        <p className="perso-process-order-bat mt-2 rounded-md bg-brand-teal/10 px-2 py-1.5 text-center text-[8px] font-medium text-brand-teal-dim">
          BAT sous 48 h avant fabrication
        </p>
      </div>

      <div className="perso-process-overlay pointer-events-none absolute inset-0">
        <PersoProcessCursor variant="order" />
      </div>
    </MockupShell>
  );
}

export const PERSONALIZATION_PROCESS_MOCKUPS = [
  DownloadTemplateMockup,
  UploadMockup,
  OrderMockup,
] as const;
