"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, Phone, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { NavHighlightLink } from "@/components/layout/nav-highlight-link";
import {
  catalogNavCategories,
  headerActions,
  logos,
  nav,
  routes,
  site,
  topBar,
  type CatalogNavCategory,
  type NavLink,
  type ProductNavGroup,
} from "@/lib/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  trigger: React.ReactElement;
};

function categoryHasPanel(category: CatalogNavCategory): boolean {
  return Boolean(category.groups?.length || category.items?.length);
}

function getCategoryGroups(category: CatalogNavCategory): ProductNavGroup[] {
  return category.groups ?? [{ title: category.label, items: category.items ?? [] }];
}

function MobileNavItem({ item }: { item: NavLink }) {
  if (item.children?.length) {
    return (
      <li>
        <Link
          href={item.href}
          title={item.label}
          className="block cursor-pointer truncate rounded-md px-2 py-1 text-[13px] font-normal text-muted-foreground transition-colors hover:text-brand-teal"
        >
          {item.label}
        </Link>
        <ul className="ml-2 space-y-0.5 border-l border-border/50 py-0.5 pl-2">
          {item.children.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                title={child.label}
                className="block cursor-pointer truncate rounded-md py-1 pl-0.5 text-xs text-muted-foreground transition-colors hover:text-brand-teal"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={item.href}
        title={item.label}
        className="block cursor-pointer truncate rounded-md px-2 py-1 text-[13px] text-muted-foreground transition-colors hover:text-brand-teal"
      >
        {item.label}
      </Link>
    </li>
  );
}

function MobileCatalogCategory({
  category,
  isOpen,
  onToggle,
}: {
  category: CatalogNavCategory;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const hasPanel = categoryHasPanel(category);

  if (!hasPanel) {
    return (
      <Link
        href={category.href}
        title={category.label}
        className="flex min-w-0 cursor-pointer items-center rounded-md px-1.5 py-1.5 text-[13px] font-medium text-brand-navy transition-colors hover:bg-muted hover:text-brand-teal"
      >
        <span className="truncate">{category.label}</span>
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full min-w-0 cursor-pointer items-center gap-1 rounded-md px-1.5 py-1.5 text-left text-[13px] font-medium text-brand-navy transition-colors hover:bg-muted"
      >
        <span className="min-w-0 flex-1 truncate" title={category.label}>
          {category.label}
        </span>
        <ChevronRight
          className={cn("h-4 w-4 shrink-0 text-muted-foreground transition-transform", isOpen && "rotate-90")}
          aria-hidden
        />
      </button>

      {isOpen ? (
        <div className="mb-1 ml-2 space-y-2 border-l border-border/60 py-1 pl-2">
          {getCategoryGroups(category).map((group) => (
            <div key={group.title}>
              <p
                className="truncate px-2 text-[10px] font-bold uppercase tracking-wide text-brand-teal"
                title={group.title}
              >
                {group.title}
              </p>
              <ul className="mt-0.5 space-y-0.5">
                {group.items.map((item) => (
                  <MobileNavItem key={item.label} item={item} />
                ))}
              </ul>
            </div>
          ))}
          <Link
            href={category.href}
            className="inline-flex px-2 text-xs font-medium text-brand-teal underline-offset-2 hover:underline"
          >
            Tout {category.label}
          </Link>
        </div>
      ) : null}
    </div>
  );
}

export function MobileNav({ trigger }: MobileNavProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  function handleSheetOpenChange(open: boolean) {
    setSheetOpen(open);
    if (!open) setOpenCategoryId(null);
  }

  return (
    <Sheet open={sheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger render={trigger} />
      <SheetContent
        side="left"
        showCloseButton={false}
        className="flex h-full w-[min(100vw-1.5rem,20rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-xs"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border/60 px-4 py-3">
          <Link
            href="/"
            onClick={() => handleSheetOpenChange(false)}
            className="flex shrink-0 cursor-pointer items-center"
          >
            <Image
              src={logos.default}
              alt={logos.alt}
              width={logos.width}
              height={logos.height}
              className="h-11 w-auto"
            />
          </Link>
          <SheetTitle className="sr-only">Menu Ojetables</SheetTitle>
          <SheetClose
            render={
              <Button variant="ghost" size="icon-sm" className="shrink-0" aria-label="Fermer le menu" />
            }
          >
            <X className="h-4 w-4" />
          </SheetClose>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-4 pt-3">
          <div className="mb-3 shrink-0 space-y-2">
            <LinkButton
              href={routes.proAccount}
              variant="brandNavy"
              size="ctaSm"
              className="h-8 w-full text-xs"
            >
              Mon compte
            </LinkButton>
            <LinkButton
              href="#"
              variant="brandOutline"
              size="ctaSm"
              className="h-8 w-full text-xs"
            >
              Mon panier
              {headerActions.cartCount > 0 ? ` (${headerActions.cartCount})` : null}
            </LinkButton>
          </div>
          <nav className="flex min-h-0 flex-1 flex-col overflow-hidden" aria-label="Catalogue mobile">
            <p className="mb-1 shrink-0 text-[11px] font-bold uppercase tracking-wide text-brand-teal">
              Catalogue
            </p>
            <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto overscroll-contain pb-1">
              {catalogNavCategories.map((category) => (
                <li key={category.id}>
                  <MobileCatalogCategory
                    category={category}
                    isOpen={openCategoryId === category.id}
                    onToggle={() =>
                      setOpenCategoryId((current) => (current === category.id ? null : category.id))
                    }
                  />
                </li>
              ))}
              <li className="pt-2">
                <LinkButton
                  href={nav.productsHref}
                  variant="brandOutline"
                  size="ctaSm"
                  className="h-8 w-full text-xs"
                >
                  Voir tout le catalogue
                </LinkButton>
              </li>
            </ul>
          </nav>

          <div className="shrink-0 space-y-2 pb-4">
            <div className="grid grid-cols-2 gap-2">
              {nav.highlights.map((item) => (
                <NavHighlightLink
                  key={item.href}
                  item={item}
                  className="h-8 w-full justify-center px-2 text-xs"
                />
              ))}
            </div>
            <div className="space-y-2 border-t border-border/60 pt-3">
              <div className="flex flex-col items-center gap-0.5">
                <a
                  href={site.phoneHref}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-1.5 py-1.5 text-xs font-medium text-brand-navy transition-colors hover:bg-muted"
                >
                  <Phone className="h-3.5 w-3.5 shrink-0 text-brand-teal" aria-hidden />
                  {site.phone}
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-1.5 py-1.5 text-xs font-medium text-brand-navy transition-colors hover:bg-muted"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0 text-brand-teal" aria-hidden />
                  {site.email}
                </a>
              </div>
              <LinkButton
                href={topBar.contactHref}
                variant="brand"
                size="ctaSm"
                className="h-9 w-full"
              >
                {topBar.contactLabel}
              </LinkButton>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
