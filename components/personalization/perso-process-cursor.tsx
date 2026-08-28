import { cn } from "@/lib/utils";

type PersoProcessCursorProps = {
  variant: "download" | "order";
  className?: string;
};

/** Curseur animé partagé pour les mockups étapes 1 et 3. */
export function PersoProcessCursor({ variant, className }: PersoProcessCursorProps) {
  return (
    <div
      className={cn(
        "perso-process-cursor",
        variant === "download" && "perso-process-cursor--download",
        variant === "order" && "perso-process-cursor--order",
        className,
      )}
      aria-hidden
    >
      <span className="perso-process-cursor__ripple" />
    </div>
  );
}

type PersoProcessDragUnitProps = {
  className?: string;
};

/** Curseur + puce fichier animés ensemble (étape 2). */
export function PersoProcessDragUnit({ className }: PersoProcessDragUnitProps) {
  return (
    <div className={cn("perso-process-drag-unit", className)} aria-hidden>
      <div className="perso-process-drag-chip">
        <span className="flex h-5 w-5 items-center justify-center rounded bg-brand-teal/10 text-[8px] font-bold text-brand-teal">
          AI
        </span>
        <span className="text-[9px] font-medium text-brand-navy">logo-club.ai</span>
      </div>
      <div className="perso-process-drag-cursor">
        <span className="perso-process-cursor__ripple" />
      </div>
    </div>
  );
}
