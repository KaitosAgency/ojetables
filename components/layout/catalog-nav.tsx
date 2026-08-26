"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/ui/link-button";
import {
  catalogNavCategories,
  catalogNavHotCategoryIds,
  nav,
  partnerLogos,
  type CatalogNavCategory,
  type NavLink,
  type ProductNavGroup,
} from "@/lib/site";
import { cn } from "@/lib/utils";

function categoryHasPanel(category: CatalogNavCategory): boolean {
  return Boolean(category.groups?.length || category.items?.length);
}

function getCategoryGroups(category: CatalogNavCategory): ProductNavGroup[] {
  return category.groups ?? [{ title: category.label, items: category.items ?? [] }];
}

const hotCategoryIds = new Set<string>(catalogNavHotCategoryIds);

function CatalogNavHotBadge() {
  return (
    <span
      className="pointer-events-none absolute -left-3 -top-[2px] z-10 rotate-[-15deg] rounded-[2px] bg-[#ea580c] px-1 py-px text-[7px] font-bold uppercase leading-none tracking-wide text-white"
      aria-hidden
    >
      Hot
    </span>
  );
}

function groupHasNestedItems(items: NavLink[]): boolean {
  return items.some((item) => item.children?.length);
}

function countGroupLinks(items: NavLink[]): number {
  return items.reduce((total, item) => total + (item.children?.length ?? 1), 0);
}

function CatalogNavGroupItems({
  items,
  onClose,
  twoColumns,
}: {
  items: NavLink[];
  onClose: () => void;
  twoColumns: boolean;
}) {
  const flatLinkClass =
    "block cursor-pointer truncate rounded-md px-2 py-1.5 text-[13px] leading-snug font-normal text-muted-foreground transition-colors hover:text-brand-teal";

  const groupParentClass =
    "block cursor-pointer truncate rounded-md px-2 py-1.5 text-[13px] leading-snug font-normal text-muted-foreground transition-colors hover:text-brand-teal";

  const nestedChildClass =
    "block cursor-pointer truncate rounded-md py-1 pl-0.5 text-xs leading-snug font-normal text-muted-foreground/90 transition-colors hover:text-brand-teal";

  return (
    <ul className={cn("mt-3 space-y-0.5", twoColumns ? "columns-2 gap-x-10 [column-fill:balance]" : "")}>
      {items.map((item) => (
        <li key={item.label} className="break-inside-avoid">
          {item.children?.length ? (
            <div className="py-1">
              <Link
                href={item.href}
                title={item.label}
                onClick={onClose}
                className={groupParentClass}
              >
                {item.label}
              </Link>
              <ul className="ml-2.5 mt-1 space-y-0.5 border-l border-border/50 pl-3">
                {item.children.map((child) => (
                  <li key={child.label}>
                    <Link
                      href={child.href}
                      title={child.label}
                      onClick={onClose}
                      className={nestedChildClass}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Link
              href={item.href}
              title={item.label}
              onClick={onClose}
              className={flatLinkClass}
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export function CatalogNavTrigger({
  category,
  open,
  onOpenChange,
  showHotBadge = false,
}: {
  category: CatalogNavCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  showHotBadge?: boolean;
}) {
  const hasPanel = categoryHasPanel(category);
  const linkClass =
    "cursor-pointer whitespace-nowrap text-[13px] font-medium transition-colors hover:text-brand-teal xl:text-sm";

  if (!hasPanel) {
    return (
      <Link href={category.href} className={cn(linkClass, "text-muted-foreground hover:text-brand-navy")}>
        {category.label}
      </Link>
    );
  }

  return (
    <span className="inline-flex min-w-0 shrink items-center gap-0.5">
      <Link
        href={category.href}
        className={cn(linkClass, open ? "text-brand-teal" : "text-muted-foreground hover:text-brand-navy")}
      >
        <span className="relative inline-block">
          {showHotBadge ? <CatalogNavHotBadge /> : null}
          {category.label}
        </span>
      </Link>
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Afficher les sous-catégories ${category.label}`}
        className={cn(
          "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0.5",
          linkClass,
          open ? "text-brand-teal" : "text-muted-foreground hover:text-brand-navy",
        )}
      >
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
      </button>
    </span>
  );
}

function CatalogNavPanelBody({
  category,
  groups,
  onClose,
}: {
  category: CatalogNavCategory;
  groups: ProductNavGroup[];
  onClose: () => void;
}) {
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const activeGroup = groups[activeGroupIndex] ?? groups[0];
  const showSidebar = groups.length > 1;

  useEffect(() => {
    setActiveGroupIndex(0);
  }, [category.id]);

  return (
    <>
      <div className={cn("flex", showSidebar ? "min-h-[11rem]" : "")}>
        {showSidebar ? (
          <aside
            className="w-[13.5rem] shrink-0 border-r border-border/80 py-2 pr-1"
            aria-label="Sous-catégories"
          >
            <ul className="max-h-72 space-y-0.5 overflow-y-auto [scrollbar-width:thin]">
              {groups.map((group, index) => {
                const isActive = index === activeGroupIndex;

                return (
                  <li key={group.title}>
                    <button
                      type="button"
                      onMouseEnter={() => setActiveGroupIndex(index)}
                      onFocus={() => setActiveGroupIndex(index)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex w-full min-w-0 cursor-pointer items-center gap-2 border-l-2 py-2 pl-3 pr-2 text-left text-sm transition-colors",
                        isActive
                          ? "border-brand-teal font-semibold text-brand-navy"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-brand-navy",
                      )}
                    >
                      <span className="min-w-0 flex-1 truncate" title={group.title}>
                        {group.title}
                      </span>
                      {isActive ? (
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-brand-teal/80" aria-hidden />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>
        ) : null}

        <div className={cn("min-w-0 flex-1 py-3", showSidebar ? "pl-7 pr-1" : "")}>
          <p
            className="truncate text-sm font-semibold tracking-tight text-brand-navy"
            title={activeGroup.title}
          >
            {activeGroup.title}
          </p>
          <CatalogNavGroupItems
            items={activeGroup.items}
            onClose={onClose}
            twoColumns={!groupHasNestedItems(activeGroup.items) && countGroupLinks(activeGroup.items) > 6}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border/80 pt-3.5">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
          <span>+3 000 références</span>
          <span className="text-muted-foreground/35" aria-hidden>
            ·
          </span>
          <span className="inline-flex items-center gap-1.5">
            <img
              src={partnerLogos.garciaDePou.src}
              alt={partnerLogos.garciaDePou.alt}
              width={partnerLogos.garciaDePou.width}
              height={partnerLogos.garciaDePou.height}
              className="h-4 w-auto shrink-0"
              loading="lazy"
            />
            <span>& autres marques en catalogue</span>
          </span>
        </p>
        <div className="flex flex-wrap gap-2">
          <LinkButton href={category.href} variant="brandOutline" size="ctaSm" onClick={onClose}>
            Toute la catégorie
          </LinkButton>
          <LinkButton href={nav.productsHref} variant="brand" size="ctaSm" onClick={onClose}>
            Voir le catalogue
          </LinkButton>
        </div>
      </div>
    </>
  );
}

export function CatalogNavPanel({
  category,
  open,
  onClose,
}: {
  category: CatalogNavCategory | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!open || !category || !categoryHasPanel(category)) return null;

  const groups = getCategoryGroups(category);

  return (
    <div className="absolute inset-x-0 top-full z-50 bg-white shadow-lg shadow-black/[0.04]">
      <div className="mx-auto max-w-6xl px-4 py-3.5 md:px-6">
        <CatalogNavPanelBody key={category.id} category={category} groups={groups} onClose={onClose} />
      </div>
    </div>
  );
}

export function CatalogNavRow({
  activeCategoryId,
  onActiveCategoryChange,
}: {
  activeCategoryId: string | null;
  onActiveCategoryChange: (id: string | null) => void;
}) {
  const activeCategory =
    catalogNavCategories.find((category) => category.id === activeCategoryId) ?? null;

  return (
    <>
      <nav className="flex w-full items-center justify-between" aria-label="Catalogue produits">
        <ul className="flex w-full list-none items-center justify-between gap-1 p-0">
        {catalogNavCategories.map((category) => {
          const hasPanel = categoryHasPanel(category);
          const isOpen = activeCategoryId === category.id;
          const showHotBadge = hotCategoryIds.has(category.id);

          return (
            <li
              key={category.id}
              className="inline-flex min-w-0 shrink"
              onMouseEnter={() => {
                if (hasPanel) onActiveCategoryChange(category.id);
              }}
              onFocus={() => {
                if (hasPanel) onActiveCategoryChange(category.id);
              }}
            >
              <CatalogNavTrigger
                category={category}
                open={isOpen}
                showHotBadge={showHotBadge}
                onOpenChange={(next) => onActiveCategoryChange(next ? category.id : null)}
              />
            </li>
          );
        })}
        </ul>
      </nav>
      <CatalogNavPanel
        category={activeCategory}
        open={activeCategoryId !== null}
        onClose={() => onActiveCategoryChange(null)}
      />
    </>
  );
}
