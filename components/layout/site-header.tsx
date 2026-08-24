"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Mail, Menu, Phone, ShoppingCart, Truck, UserRound } from "lucide-react";
import { CatalogNavRow } from "@/components/layout/catalog-nav";
import { HeaderSearch } from "@/components/layout/header-search";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavHighlightLink } from "@/components/layout/nav-highlight-link";
import { Button } from "@/components/ui/button";
import { headerActions, logos, nav, routes, site, topBar } from "@/lib/site";

function HeaderTopBar() {
  return (
    <div className="bg-brand-navy-deep text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-4 py-1.5 text-center text-[11px] leading-tight md:px-6 md:text-xs lg:justify-between lg:text-left">
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 lg:justify-start">
          <p className="inline-flex items-center gap-1 font-medium">
            <Truck className="h-3 w-3 shrink-0 opacity-90" aria-hidden />
            {topBar.delivery}
          </p>
          <span className="hidden opacity-50 lg:inline" aria-hidden>|</span>
          <p className="inline-flex items-center gap-1 font-bold text-brand-teal-light">
            Nouveaux clients : -5% avec le code BIENVENUE
          </p>
        </div>
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

function HeaderIconLink({
  href,
  label,
  children,
  badge,
  onClick,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  badge?: number;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
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
  const headerRef = useRef<HTMLElement>(null);

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
    <>
      <HeaderTopBar />

      <header ref={headerRef} className="site-header-cardboard w-full">
        <div className="bg-white">
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
              <HeaderIconLink href={routes.account} label="Mon compte">
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
        </div>

        <div className="header-catalog-divider relative bg-white lg:hidden">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="pt-3 pb-1">
              <HeaderSearch compact />
            </div>
          </div>
          <div className="header-cardboard-edge-clip" aria-hidden>
            <div className="header-cardboard-edge">
              <div className="header-cardboard-edge-shape" />
            </div>
          </div>
        </div>

        <div
          className="header-catalog-divider relative hidden bg-white lg:block"
          onMouseLeave={() => setActiveCategoryId(null)}
        >
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="pt-2.5 pb-1">
              <CatalogNavRow
                activeCategoryId={activeCategoryId}
                onActiveCategoryChange={setActiveCategoryId}
              />
            </div>
          </div>
          <div className="header-cardboard-edge-clip" aria-hidden>
            <div className="header-cardboard-edge">
              <div className="header-cardboard-edge-shape" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
