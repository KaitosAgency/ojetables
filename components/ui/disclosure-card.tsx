"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type DisclosureCardVariant = "default" | "accent";
export type DisclosureCardSize = "md" | "lg";

const variantStyles: Record<
  DisclosureCardVariant,
  { root: string; rootOpen: string; trigger: string; separator: string }
> = {
  default: {
    root: "border-border/70 hover:border-brand-kraft/35",
    rootOpen: "border-border/80",
    trigger: "hover:bg-brand-beige/40",
    separator: "border-border/60",
  },
  accent: {
    root: "border-brand-teal/25",
    rootOpen:
      "border-brand-teal/35 bg-brand-beige/20 shadow-[0_4px_18px_-8px_rgb(45_140_120/0.28)]",
    trigger: "hover:bg-brand-teal/[0.06]",
    separator: "border-brand-teal/15",
  },
};

const sizeStyles: Record<DisclosureCardSize, string> = {
  md: "min-h-10 px-3 py-2 text-sm sm:px-4",
  lg: "min-h-14 px-4 py-3 text-base sm:px-5",
};

type DisclosureCardProps = {
  id?: string;
  title: ReactNode;
  icon?: ReactNode;
  variant?: DisclosureCardVariant;
  size?: DisclosureCardSize;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  scrollMarginClassName?: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

/** Panneau repliable unique — fiche produit (livraison, personnalisation…). */
export function DisclosureCard({
  id,
  title,
  icon,
  variant = "default",
  size = "md",
  defaultOpen = false,
  open,
  onOpenChange,
  scrollMarginClassName,
  className,
  contentClassName,
  children,
}: DisclosureCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;
  const panelId = useId();
  const styles = variantStyles[variant];

  function toggleOpen() {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <div
      id={id}
      className={cn(
        "overflow-hidden rounded-[10px] border bg-white transition-[border-color,background-color,box-shadow] duration-200",
        styles.root,
        isOpen && styles.rootOpen,
        scrollMarginClassName,
        className,
      )}
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={toggleOpen}
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-3 font-semibold text-brand-navy transition-colors",
          sizeStyles[size],
          styles.trigger,
        )}
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon ? <span className="shrink-0 text-current">{icon}</span> : null}
          <span className="truncate">{title}</span>
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-brand-navy/55 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            className={cn(
              "border-t px-3 pt-3 pb-3 sm:px-4 sm:pt-4 sm:pb-4",
              styles.separator,
              contentClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export type DisclosureCardGroupItem = {
  id: string;
  title: ReactNode;
  subtitle?: ReactNode;
  icon: ReactNode;
  content: ReactNode;
  anchorId?: string;
  scrollMarginClassName?: string;
};

type DisclosureCardGroupProps = {
  items: readonly DisclosureCardGroupItem[];
  /** Titre de section au-dessus du groupe (ex. « Atouts de la référence »). */
  heading?: ReactNode;
  defaultOpenId?: string | null;
  openId?: string | null;
  onOpenChange?: (id: string | null) => void;
  className?: string;
  listClassName?: string;
};

/** Liste de panneaux repliables — specs produit, pictos atouts… */
export function DisclosureCardGroup({
  items,
  heading,
  defaultOpenId = null,
  openId,
  onOpenChange,
  className,
  listClassName,
}: DisclosureCardGroupProps) {
  const [internalOpenId, setInternalOpenId] = useState<string | null>(defaultOpenId);
  const isControlled = openId !== undefined;
  const activeId = isControlled ? openId : internalOpenId;

  function setActiveId(next: string | null) {
    if (!isControlled) setInternalOpenId(next);
    onOpenChange?.(next);
  }

  if (items.length === 0) return null;

  return (
    <div className={className}>
      {heading ? (
        <p className="flex items-center gap-2 text-sm font-semibold text-brand-navy">{heading}</p>
      ) : null}

      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-white",
          heading ? "mt-4" : null,
          listClassName,
        )}
      >
        {items.map((item, index) => {
          const isOpen = activeId === item.id;
          const panelId = `disclosure-group-panel-${item.id}`;
          const triggerId = `disclosure-group-trigger-${item.id}`;

          return (
            <div
              key={item.id}
              id={item.anchorId}
              className={cn(
                item.scrollMarginClassName,
                index > 0 && "border-t border-border/70",
              )}
            >
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setActiveId(isOpen ? null : item.id)}
                className="flex w-full cursor-pointer items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-brand-beige/30 sm:gap-4 sm:px-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-brand-beige/35">
                  {item.icon}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-brand-navy sm:text-base">
                    {item.title}
                  </span>
                  {item.subtitle ? (
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground sm:text-sm">
                      {item.subtitle}
                    </span>
                  ) : null}
                </span>

                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full border border-border/80 bg-white text-brand-navy/45 transition-[border-color,background-color,transform] duration-200",
                    isOpen && "rotate-180 border-brand-teal/30 bg-brand-teal/10 text-brand-teal-dim",
                  )}
                  aria-hidden
                >
                  <ChevronDown className="size-4" strokeWidth={2.25} />
                </span>
              </button>

              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="border-t border-border/60 bg-brand-beige/15 px-4 pt-3 pb-4 sm:px-5 sm:pb-5"
                  >
                    {item.content}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
