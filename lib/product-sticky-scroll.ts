const DESKTOP_MQ = "(min-width: 1024px)";

/**
 * Sync scroll interne du panneau droit avec le scroll page — même principe que
 * The Green Store (.sticky-items + listener window scroll).
 * @see https://thegreenstore.fr/fleurs-cbd/1585-2556-power-jamaican-dream-fleurs-cbd-small-bud.html
 */
export function createProductStickyScrollSync(stickyItems: HTMLElement) {
  const desktop = window.matchMedia(DESKTOP_MQ);
  let prevScrollY = window.scrollY;

  const sync = () => {
    if (!desktop.matches) return;

    const scrollY = window.scrollY;
    const delta = scrollY - prevScrollY;
    if (delta === 0) return;

    const viewportH = window.innerHeight;
    const rect = stickyItems.getBoundingClientRect();
    const docTop = scrollY + rect.top;
    const docBottom = docTop + stickyItems.offsetHeight;

    const topInView = docTop >= scrollY && docTop <= scrollY + viewportH;
    const bottomInView = docBottom >= scrollY && docBottom <= scrollY + viewportH;

    const canScrollDown =
      stickyItems.scrollTop + stickyItems.clientHeight < stickyItems.scrollHeight - 1;

    if (delta > 0 && canScrollDown && bottomInView) {
      stickyItems.scrollTop += delta;
    }

    if (delta < 0 && stickyItems.scrollTop > 0 && topInView) {
      stickyItems.scrollTop += delta;
    }

    prevScrollY = scrollY;
  };

  const onScroll = () => sync();

  const onBreakpointChange = () => {
    if (!desktop.matches) stickyItems.scrollTop = 0;
    prevScrollY = window.scrollY;
  };

  prevScrollY = window.scrollY;
  desktop.addEventListener("change", onBreakpointChange);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onBreakpointChange);

  return () => {
    desktop.removeEventListener("change", onBreakpointChange);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onBreakpointChange);
  };
}
