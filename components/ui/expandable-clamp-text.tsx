"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

const LINE_CLAMP_CLASS: Record<number, string> = {
  1: "line-clamp-1",
  2: "line-clamp-2",
  3: "line-clamp-3",
  4: "line-clamp-4",
  5: "line-clamp-5",
  6: "line-clamp-6",
};

type ExpandableClampTextProps = {
  children?: ReactNode;
  /** Contenu HTML (ex. description catégorie). Mutuellement exclusif avec `children`. */
  html?: string;
  lines?: number;
  expandLabel?: string;
  collapseLabel?: string;
  className?: string;
  wrapperClassName?: string;
};

function getClampClass(lines: number): string {
  return LINE_CLAMP_CLASS[lines] ?? LINE_CLAMP_CLASS[3];
}

/**
 * Texte tronqué avec « Lire la suite » — line-clamp dès le 1er rendu pour éviter
 * le flash de contenu complet avant mesure (useLayoutEffect + ResizeObserver).
 */
export function ExpandableClampText({
  children,
  html,
  lines = 3,
  expandLabel = "Lire la suite",
  collapseLabel = "Réduire",
  className,
  wrapperClassName,
}: ExpandableClampTextProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const clampClass = getClampClass(lines);

  useLayoutEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const measure = () => {
      if (expanded) return;
      setNeedsTruncation(el.scrollHeight > el.clientHeight + 1);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [children, html, lines, expanded]);

  return (
    <div className={wrapperClassName}>
      <p
        ref={textRef}
        className={cn(className, !expanded && clampClass)}
        {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})}
      >
        {html ? undefined : children}
      </p>
      {needsTruncation ? (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-2 cursor-pointer text-sm font-semibold text-brand-teal underline-offset-2 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? collapseLabel : expandLabel}
        </button>
      ) : null}
    </div>
  );
}
