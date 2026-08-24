/** Parse un prix affiché type « 4,90 € » ou « Devis » → nombre ou null. */
export function parseFrenchPrice(value: string): number | null {
  if (value.toLowerCase().includes("devis")) {
    return null;
  }
  const amount = Number.parseFloat(value.replace(/\s/g, "").replace("€", "").replace(",", "."));
  return Number.isFinite(amount) ? amount : null;
}

export function productCardAbsoluteUrl(href: string, siteUrl: string): string {
  if (href.startsWith("http")) {
    return href;
  }
  return `${siteUrl}${href.startsWith("/") ? href : `/${href}`}`;
}
