"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type CategoryHeroIntroProps = {
  text: string;
  className?: string;
};

const VISIBLE_LINES = 3;

export function CategoryHeroIntro({ text, className }: CategoryHeroIntroProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Mesurer si le contenu dépasse 3 lignes
    const lineHeight = parseFloat(getComputedStyle(textRef.current).lineHeight);
    const maxHeight = lineHeight * VISIBLE_LINES;
    
    setNeedsTruncation(textRef.current.scrollHeight > maxHeight + 2);
  }, [text]);

  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        ref={textRef}
        className={cn(
          "text-sm leading-relaxed text-muted-foreground md:text-base",
          !expanded && needsTruncation && "line-clamp-3",
        )}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {needsTruncation && (
        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          className="mt-2 cursor-pointer text-sm font-semibold text-brand-teal underline-offset-2 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? "Réduire" : "Lire la suite"}
        </button>
      )}
    </div>
  );
}
