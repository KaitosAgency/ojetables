"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type HomeLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href?: "/";
};

/** Lien accueil : toujours en haut de page, jamais sur une ancre restaurée. */
export function HomeLink({ href = "/", onClick, ...props }: HomeLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      scroll
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        if (pathname === "/") {
          event.preventDefault();
          resetHomeScroll();
        }
      }}
      {...props}
    />
  );
}

import { applyPageScrollReset } from "@/lib/scroll-reset";

export function resetHomeScroll() {
  applyPageScrollReset({ preserveValidHash: false });
}
