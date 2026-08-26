const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
  euro: "€",
  copy: "©",
  reg: "®",
  trade: "™",
  agrave: "à",
  Agrave: "À",
  acirc: "â",
  Acirc: "Â",
  aelig: "æ",
  AElig: "Æ",
  aring: "å",
  Aring: "Å",
  ccirc: "ç",
  Ccedil: "Ç",
  eacute: "é",
  Eacute: "É",
  ecirc: "ê",
  Ecirc: "Ê",
  egrave: "è",
  Egrave: "È",
  eth: "ð",
  ETH: "Ð",
  iacute: "í",
  Iacute: "Í",
  icirc: "î",
  Icirc: "Î",
  igrave: "ì",
  Igrave: "Ì",
  iuml: "ï",
  Iuml: "Ï",
  ocirc: "ô",
  Ocirc: "Ô",
  ograve: "ò",
  Ograve: "Ò",
  oslash: "ø",
  Oslash: "Ø",
  uacute: "ú",
  Uacute: "Ú",
  ucirc: "û",
  Ucirc: "Û",
  ugrave: "ù",
  Ugrave: "Ù",
  uuml: "ü",
  Uuml: "Ü",
  yuml: "ÿ",
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
  hellip: "…",
  ndash: "–",
  mdash: "—",
  deg: "°",
  micro: "µ",
  times: "×",
  divide: "÷",
  frac12: "½",
  frac14: "¼",
  frac34: "¾",
};

/** Décode entités HTML (&eacute;, &Egrave;, &#039;, &#x20AC;…). */
export function decodeHtmlEntities(text: string): string {
  if (!text) return text;

  let decoded = text
    .replace(/&#(\d+);/g, (_, code) => {
      const num = Number.parseInt(code, 10);
      return Number.isFinite(num) ? String.fromCharCode(num) : `&#${code};`;
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      const num = Number.parseInt(hex, 16);
      return Number.isFinite(num) ? String.fromCharCode(num) : `&#x${hex};`;
    })
    .replace(/&([a-zA-Z]+);/g, (entity, name) => HTML_ENTITIES[name] ?? entity);

  // Second pass pour entités double-encodées (&amp;egrave;)
  if (decoded.includes("&")) {
    decoded = decoded
      .replace(/&#(\d+);/g, (_, code) => {
        const num = Number.parseInt(code, 10);
        return Number.isFinite(num) ? String.fromCharCode(num) : `&#${code};`;
      })
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
        const num = Number.parseInt(hex, 16);
        return Number.isFinite(num) ? String.fromCharCode(num) : `&#x${hex};`;
      })
      .replace(/&([a-zA-Z]+);/g, (entity, name) => HTML_ENTITIES[name] ?? entity);
  }

  return decoded;
}

/** Texte issu de HTML Magento (balises + entités). */
export function decodeHtmlText(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}
