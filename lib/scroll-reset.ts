export type PageScrollResetOptions = {
  /** Conserve le scroll vers un fragment si l’élément cible existe (fiche produit). */
  preserveValidHash?: boolean;
};

/** Remonte en haut de page et nettoie le hash sauf ancre valide. */
export function applyPageScrollReset(options: PageScrollResetOptions = {}): void {
  const { preserveValidHash = false } = options;

  if (typeof history !== "undefined") {
    history.scrollRestoration = "manual";
  }

  if (preserveValidHash) {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
      return;
    }
  }

  if (window.location.hash) {
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}
