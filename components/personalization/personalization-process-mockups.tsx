"use client";

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
      className={`perso-process-mockup relative mx-auto aspect-[4/5] w-full min-h-[240px] max-h-[320px] overflow-hidden rounded-lg border border-border/80 bg-white shadow-[0_4px_20px_rgb(61_44_38/0.06)] ${active ? "is-active" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

const PRODUCT_OPTIONS = [
  { label: "Gobelet carton", detail: "Sérigraphie · dès 250 pcs" },
  { label: "Gobelet réutilisable", detail: "Digital · dès 1 pc" },
  { label: "Sac kraft", detail: "Flexo · sur devis" },
];

export function ChooseProductMockup({ active }: MockupProps) {
  useProcessCycle(active, 8000);

  return (
    <MockupShell active={active} className="perso-process-mockup--choose">
      <div className="flex h-full flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Type de produit
        </p>
        <ul className="mt-3 flex flex-1 flex-col gap-2">
          {PRODUCT_OPTIONS.map((option, index) => (
            <li
              key={option.label}
              className={`perso-process-choose-option perso-process-choose-option--${index} rounded-lg border px-3 py-2.5 text-left transition-colors`}
            >
              <p className="text-[11px] font-semibold text-brand-navy">{option.label}</p>
              <p className="mt-0.5 text-[9px] text-muted-foreground">{option.detail}</p>
            </li>
          ))}
        </ul>
        <div className="perso-process-cursor perso-process-cursor--choose" aria-hidden />
      </div>
    </MockupShell>
  );
}

export function QuantityMockup({ active }: MockupProps) {
  useProcessCycle(active, 8000);

  return (
    <MockupShell active={active} className="perso-process-mockup--qty">
      <div className="flex h-full flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Quantité & tarif
        </p>
        <div className="mt-4 rounded-lg border border-border bg-brand-beige/40 px-3 py-3">
          <label className="text-[9px] font-medium text-muted-foreground">Quantité</label>
          <p className="perso-process-qty-value mt-1 text-2xl font-bold tabular-nums text-brand-navy">
            250
          </p>
        </div>
        <dl className="mt-4 space-y-2 text-[10px]">
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Minimum</dt>
            <dd className="font-medium text-brand-navy">250 pcs</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Prix unitaire</dt>
            <dd className="perso-process-qty-price font-semibold text-brand-kraft-dark">0,82 € HT</dd>
          </div>
          <div className="flex justify-between gap-2">
            <dt className="text-muted-foreground">Délai indicatif</dt>
            <dd className="font-medium text-brand-navy">2–3 sem.</dd>
          </div>
        </dl>
        <p className="perso-process-qty-badge mt-auto rounded-md bg-brand-teal/10 px-2 py-1.5 text-center text-[9px] font-medium text-brand-teal-dim">
          Tarif dégressif dès 500 pcs
        </p>
      </div>
    </MockupShell>
  );
}

export function UploadMockup({ active }: MockupProps) {
  useProcessCycle(active, 8000);

  return (
    <MockupShell active={active} className="perso-process-mockup--upload">
      <div className="flex h-full flex-col p-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Votre visuel
        </p>
        <div className="perso-process-upload-zone relative mt-3 flex flex-1 flex-col items-center justify-center rounded-lg border-2 border-dashed border-brand-teal/30 bg-brand-beige/20 px-3 py-4">
          <div className="perso-process-upload-icon flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-teal shadow-sm">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M12 16V4m0 0l-4 4m4-4l4 4M4 20h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="mt-3 text-[10px] font-medium text-brand-navy">Glissez votre logo</p>
          <p className="mt-0.5 text-[9px] text-muted-foreground">PDF, AI, SVG ou PNG HD</p>
          <div className="perso-process-upload-file mt-3 flex items-center gap-2 rounded-md border border-border bg-white px-2.5 py-1.5 shadow-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-teal/10 text-[8px] font-bold text-brand-teal">
              AI
            </span>
            <span className="text-[9px] font-medium text-brand-navy">logo-club.ai</span>
          </div>
          <div className="perso-process-upload-bar mt-3 h-1 w-full overflow-hidden rounded-full bg-border/60">
            <div className="perso-process-upload-bar-fill h-full rounded-full bg-brand-teal" />
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export function BatMockup({ active }: MockupProps) {
  useProcessCycle(active, 8000);

  return (
    <MockupShell active={active} className="perso-process-mockup--bat">
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Bon à tirer
          </p>
          <span className="perso-process-bat-status rounded-full bg-amber-100 px-2 py-0.5 text-[8px] font-semibold text-amber-800">
            En attente
          </span>
        </div>
        <div className="perso-process-bat-preview relative mt-3 flex flex-1 items-center justify-center rounded-lg border border-border bg-brand-beige/30">
          <div className="flex h-24 w-16 flex-col items-center justify-end rounded-t-full border-2 border-brand-navy/15 bg-white pb-2 shadow-sm">
            <span className="perso-process-bat-logo text-[7px] font-bold tracking-tight text-brand-teal">
              CLUB
            </span>
          </div>
          <div className="perso-process-bat-check absolute inset-0 flex items-center justify-center rounded-lg bg-brand-teal/10">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-teal text-lg font-bold text-white shadow-md">
              ✓
            </span>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="perso-process-bat-step perso-process-bat-step--1 flex items-center gap-2 text-[9px]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            <span className="text-muted-foreground">BAT envoyé sous 48h</span>
          </div>
          <div className="perso-process-bat-step perso-process-bat-step--2 flex items-center gap-2 text-[9px]">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal" />
            <span className="font-medium text-brand-navy">Validé — lancement fabrication</span>
          </div>
        </div>
      </div>
    </MockupShell>
  );
}

export const PERSONALIZATION_PROCESS_MOCKUPS = [
  ChooseProductMockup,
  QuantityMockup,
  UploadMockup,
  BatMockup,
] as const;
