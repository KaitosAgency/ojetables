/**
 * Vignettes catalogue Magento (small_image/210x) : carré 210 px, recadrage agressif.
 * L’original catalogue conserve le ratio source — meilleur cadrage en grille.
 */
export function getProductCardImageSrc(url: string): string {
  if (!url.includes("ojetables.fr/media/catalog/product/cache/")) return url;

  const match = url.match(
    /\/media\/catalog\/product\/cache\/\d+\/small_image\/210x\/[a-f0-9]+\/(.+)$/i,
  );
  if (!match) return url;

  return `https://www.ojetables.fr/media/catalog/product/${match[1]}`;
}
