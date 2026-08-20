"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail, Menu, Phone, ShoppingCart, Truck, UserRound } from "lucide-react";
import { CatalogNavRow } from "@/components/layout/catalog-nav";
import { HeaderSearch } from "@/components/layout/header-search";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import { headerActions, logos, nav, site, topBar, type NavHighlight } from "@/lib/site";
import { cn } from "@/lib/utils";

function HeaderTopBar() {
  return (
    <div className="bg-brand-navy-deep text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-1.5 text-center text-[11px] leading-tight md:px-6 md:text-xs lg:justify-between lg:text-left">
        <p className="inline-flex items-center justify-center gap-1 font-medium lg:justify-start">
          <Truck className="h-3 w-3 shrink-0 opacity-90" aria-hidden />
          {topBar.delivery}
        </p>
        <div className="hidden flex-wrap items-center gap-x-3 gap-y-0.5 lg:flex">
          <a
            href={site.phoneHref}
            className="inline-flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-90"
          >
            <Phone className="h-3 w-3 shrink-0 opacity-90" aria-hidden />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex cursor-pointer items-center gap-1 transition-opacity hover:opacity-90"
          >
            <Mail className="h-3 w-3 shrink-0 opacity-90" aria-hidden />
            {site.email}
          </a>
          <Link
            href={topBar.contactHref}
            className="cursor-pointer font-semibold underline-offset-2 hover:underline"
          >
            {topBar.contactLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

function NavHighlightLink({ item }: { item: NavHighlight }) {
  const isBrand = item.accent === "brand";

  return (
    <LinkButton
      href={item.href}
      variant={isBrand ? "brandNavy" : "brandDestock"}
      size="ctaSm"
      className="relative h-8 shrink-0 text-xs lg:text-sm"
    >
      {item.label}
    </LinkButton>
  );
}

function HeaderIconLink({
  href,
  label,
  children,
  badge,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  badge?: number;
}) {
  return (
    <Link
      href={href}
      className="relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-brand-navy transition-colors hover:bg-brand-beige/70"
      aria-label={label}
    >
      {children}
      {badge !== undefined && badge > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-teal px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}

export function SiteHeader() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [topBarHidden, setTopBarHidden] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;
    let ticking = false;

    function handleScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollYRef.current;
        lastScrollYRef.current = currentY;

        setTopBarHidden((hidden) => {
          if (currentY <= 24) return false;
          if (delta > 4 && currentY > 72) return true;
          if (delta < -4 && currentY < 160) return false;
          return hidden;
        });

        ticking = false;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!activeCategoryId) return;

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (headerRef.current?.contains(event.target as Node)) return;
      setActiveCategoryId(null);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveCategoryId(null);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [activeCategoryId]);

  return (
    <header
      ref={headerRef}
      className="site-header-cardboard sticky top-0 z-50 overflow-visible bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90"
      onMouseLeave={() => setActiveCategoryId(null)}
    >
      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out",
          topBarHidden ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100",
        )}
        aria-hidden={topBarHidden}
      >
        <div className="min-h-0 overflow-hidden">
          <HeaderTopBar />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex items-center gap-2 py-3 md:gap-3 lg:gap-4 lg:py-3.5">
          <Link href="/" className="flex shrink-0 cursor-pointer items-center">
            <Image
              src={logos.default}
              alt={logos.alt}
              width={logos.width}
              height={logos.height}
              className="h-12 w-auto md:h-[3.35rem]"
              priority
            />
          </Link>

          <div className="hidden min-w-0 flex-1 items-center gap-2 lg:flex xl:gap-3">
            <HeaderSearch className="min-w-0 w-full max-w-[17rem] shrink-0 lg:max-w-xs xl:max-w-sm" />
            <div className="flex shrink-0 items-center gap-2">
              {nav.highlights.map((item) => (
                <NavHighlightLink key={item.href} item={item} />
              ))}
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <HeaderIconLink href="#compte-pro" label="Mon compte">
              <UserRound className="h-5 w-5" strokeWidth={1.75} />
            </HeaderIconLink>
            <HeaderIconLink href="#" label="Panier" badge={headerActions.cartCount}>
              <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
            </HeaderIconLink>
            <MobileNav
              trigger={
                <Button variant="outline" size="icon" className="size-8 lg:hidden" aria-label="Ouvrir le menu">
                  <Menu className="h-5 w-5" />
                </Button>
              }
            />
          </div>
        </div>
      </div>

      <div className="header-catalog-divider relative bg-white lg:hidden">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="pt-3 pb-1">
            <HeaderSearch compact />
          </div>
        </div>
        <div className="header-cardboard-edge" aria-hidden />
      </div>

      {/* Ligne catalogue — catégories visibles + megamenu au survol */}
      <div className="header-catalog-divider relative hidden bg-white lg:block">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="pt-2.5 pb-1">
            <CatalogNavRow
              activeCategoryId={activeCategoryId}
              onActiveCategoryChange={setActiveCategoryId}
            />
          </div>
        </div>
        <div className="header-cardboard-edge" aria-hidden />
      </div>
    </header>
  );
}
