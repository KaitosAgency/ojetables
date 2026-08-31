export type PageScrollResetOptions = {
  /** Conserve le scroll vers un fragment si l’élément cible existe (navigation volontaire). */
  preserveValidHash?: boolean;
};

function scrollWindowToTop(): void {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}

/** Désactive la restauration automatique du navigateur (à appeler le plus tôt possible). */
export function disableBrowserScrollRestoration(): void {
  if (typeof history !== "undefined" && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
}

/** Remonte en haut de page et nettoie le hash sauf ancre valide volontaire. */
export function applyPageScrollReset(options: PageScrollResetOptions = {}): void {
  const { preserveValidHash = false } = options;

  disableBrowserScrollRestoration();

  if (preserveValidHash) {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      return;
    }
  }

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  scrollWindowToTop();
}

/**
 * Fiche produit : force le haut de page à l’arrivée (évite la restauration vers le bandeau marques).
 * Ne conserve un hash que si l’élément cible est déjà présent dans le DOM.
 */
export function applyProductPageScrollReset(): void {
  disableBrowserScrollRestoration();

  const hash = window.location.hash.slice(1);
  const target = hash ? document.getElementById(hash) : null;

  if (target) {
    return;
  }

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  scrollWindowToTop();

  // Le navigateur peut restaurer le scroll après le premier paint — on réapplique.
  requestAnimationFrame(() => {
    scrollWindowToTop();
    requestAnimationFrame(scrollWindowToTop);
  });
}
