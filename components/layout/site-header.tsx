"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Menu, ShoppingCart, UserRound } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { CatalogNavRow } from "@/components/layout/catalog-nav";
import { HeaderSearch } from "@/components/layout/header-search";
import { HeaderTopBar } from "@/components/layout/header-top-bar";
import { HomeLink } from "@/components/layout/home-link";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavHighlightLink } from "@/components/layout/nav-highlight-link";
import { Button } from "@/components/ui/button";
import { useCatalogNavDismiss } from "@/hooks/use-catalog-nav-dismiss";
import { useSiteHeaderHeight } from "@/hooks/use-site-header-height";
import { useMaquetteShop } from "@/lib/maquette-shop-context";
import { logos, nav, routes } from "@/lib/site";

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

function HeaderCartLink() {
  const { cartCount } = useMaquetteShop();

  return (
    <HeaderIconLink href={routes.cart} label="Panier" badge={cartCount}>
      <ShoppingCart className="h-5 w-5" strokeWidth={1.75} />
    </HeaderIconLink>
  );
}

export function SiteHeader() {
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const headerShellRef = useRef<HTMLDivElement>(null);

  const dismissMegamenu = useCallback(() => setActiveCategoryId(null), []);

  useSiteHeaderHeight(headerShellRef);
  useCatalogNavDismiss(headerShellRef, activeCategoryId, dismissMegamenu);

  return (
    <div ref={headerShellRef} className="site-header-shell">
      <HeaderTopBar />

      <header className="site-header-cardboard w-full">
        <div className="bg-white">
          <PageContainer>
            <div className="flex items-center gap-2 py-3 md:gap-3 lg:gap-4 lg:py-3.5">
              <HomeLink className="flex shrink-0 cursor-pointer items-center">
                <Image
                  src={logos.default}
                  alt={logos.alt}
                  width={logos.width}
                  height={logos.height}
                  className="h-12 w-auto md:h-[3.35rem]"
                  priority
                />
              </HomeLink>

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
                <HeaderCartLink />
                <MobileNav
                  trigger={
                    <Button
                      variant="outline"
                      size="icon"
                      className="size-8 lg:hidden"
                      aria-label="Ouvrir le menu"
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  }
                />
              </div>
            </div>
          </PageContainer>
        </div>

        <div className="header-catalog-divider relative bg-white lg:hidden">
          <PageContainer>
            <div className="pt-3 pb-1">
              <HeaderSearch compact />
            </div>
          </PageContainer>
          <div className="header-cardboard-edge-clip" aria-hidden>
            <div className="header-cardboard-edge">
              <div className="header-cardboard-edge-shape" />
            </div>
          </div>
        </div>

        <div
          className="header-catalog-divider relative hidden bg-white lg:block"
          onMouseLeave={(event) => {
            const next = event.relatedTarget;
            if (next instanceof Node && event.currentTarget.contains(next)) return;
            setActiveCategoryId(null);
          }}
        >
          <PageContainer>
            <div className="pt-2.5 pb-1">
              <CatalogNavRow
                activeCategoryId={activeCategoryId}
                onActiveCategoryChange={setActiveCategoryId}
              />
            </div>
          </PageContainer>
          <div className="header-cardboard-edge-clip" aria-hidden>
            <div className="header-cardboard-edge">
              <div className="header-cardboard-edge-shape" />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
