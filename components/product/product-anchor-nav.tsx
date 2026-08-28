"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ProductAnchor = {
  id: string;
  label: string;
};

type ProductAnchorNavProps = {
  anchors: readonly ProductAnchor[];
};

type DragState = {
  active: boolean;
  startX: number;
  scrollLeft: number;
  moved: boolean;
};

/** Navigation interne de la fiche : scroll fluide + surlignage de la section visible. */
export function ProductAnchorNav({ anchors }: ProductAnchorNavProps) {
  const [activeId, setActiveId] = useState(anchors[0]?.id ?? "");
  const [isDragging, setIsDragging] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const tabScrollInitializedRef = useRef(false);
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    scrollLeft: 0,
    moved: false,
  });

  useEffect(() => {
    const sections = anchors
      .map((anchor) => document.getElementById(anchor.id))
      .filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [anchors]);

  useEffect(() => {
    const list = listRef.current;
    if (!list || dragRef.current.active) return;

    const activeLink = list.querySelector<HTMLElement>(`[data-anchor-id="${activeId}"]`);
    if (!activeLink) return;

    const linkCenter = activeLink.offsetLeft + activeLink.offsetWidth / 2;
    const targetLeft = linkCenter - list.clientWidth / 2;
    const behavior = tabScrollInitializedRef.current ? "smooth" : "instant";

    list.scrollTo({ left: Math.max(0, targetLeft), behavior });
    tabScrollInitializedRef.current = true;
  }, [activeId]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onWheel = (event: WheelEvent) => {
      if (list.scrollWidth <= list.clientWidth) return;

      event.preventDefault();
      list.scrollLeft += event.deltaY !== 0 ? event.deltaY : event.deltaX;
    };

    list.addEventListener("wheel", onWheel, { passive: false });
    return () => list.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const endDrag = () => {
      dragRef.current.active = false;
      setIsDragging(false);
    };

    const onMouseMove = (event: MouseEvent) => {
      const list = listRef.current;
      const drag = dragRef.current;
      if (!list || !drag.active) return;

      const delta = event.pageX - drag.startX;
      if (Math.abs(delta) > 4) drag.moved = true;
      list.scrollLeft = drag.scrollLeft - delta;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", endDrag);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", endDrag);
    };
  }, []);

  const onMouseDown = (event: React.MouseEvent<HTMLUListElement>) => {
    if (event.button !== 0) return;

    const list = listRef.current;
    if (!list) return;

    dragRef.current = {
      active: true,
      startX: event.pageX,
      scrollLeft: list.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  };

  const onAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (dragRef.current.moved) {
      event.preventDefault();
      dragRef.current.moved = false;
      return;
    }

    event.preventDefault();
    setActiveId(sectionId);

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", `#${sectionId}`);
  };

  return (
    <nav
      aria-label="Sections de la fiche produit"
      className="product-anchor-nav sticky top-[calc(var(--site-header-height)+var(--site-header-gap))] z-30 mb-5 w-full min-w-0"
    >
      <div className="w-full overflow-hidden rounded-md border border-border bg-white">
        <ul
          ref={listRef}
          onMouseDown={onMouseDown}
          className={cn(
            "flex h-11 w-full touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            isDragging ? "cursor-grabbing select-none" : "cursor-grab sm:cursor-default",
          )}
        >
          {anchors.map((anchor, index) => {
            const isActive = activeId === anchor.id;
            const isFirst = index === 0;
            const isLast = index === anchors.length - 1;

            return (
              <li key={anchor.id} className="flex shrink-0 snap-center sm:min-w-0 sm:flex-1">
                <a
                  href={`#${anchor.id}`}
                  data-anchor-id={anchor.id}
                  aria-current={isActive ? "true" : undefined}
                  onClick={(event) => onAnchorClick(event, anchor.id)}
                  draggable={false}
                  className={cn(
                    "relative flex h-11 min-w-max items-center justify-center whitespace-nowrap px-5 text-center text-sm font-semibold transition-colors sm:min-w-0 sm:w-full sm:px-3 md:px-4",
                    isActive
                      ? "bg-brand-teal/15 font-semibold text-brand-teal-dim hover:bg-brand-teal hover:text-white"
                      : "text-brand-navy/70 hover:bg-brand-teal hover:text-white",
                    isActive && isFirst && "rounded-tl-[5px]",
                    isActive && isLast && "rounded-tr-[5px]",
                  )}
                >
                  {anchor.label}
                  {isActive ? (
                    <span
                      className="product-anchor-nav__caret pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2"
                      aria-hidden
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
