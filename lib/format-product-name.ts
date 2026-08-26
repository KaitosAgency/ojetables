/** Abréviations tailles — conservées en majuscules dans les titres produits. */
const PRESERVE_UPPERCASE = new Set([
  "XXL",
  "XXXL",
  "XL",
  "XS",
  "XXS",
  "L",
  "M",
  "S",
]);

/** Petits mots français — minuscules hors début de titre. */
const LOWERCASE_FR = new Set([
  "a",
  "à",
  "au",
  "aux",
  "de",
  "des",
  "du",
  "d",
  "en",
  "et",
  "l",
  "ou",
  "par",
  "pour",
  "sans",
  "sur",
  "avec",
]);

function isAllCapsWord(word: string): boolean {
  const letters = word.match(/\p{L}/gu);
  if (!letters || letters.length < 2) return false;
  return letters.every((char) => char === char.toLocaleUpperCase("fr-FR"));
}

function isMostlyUppercase(value: string): boolean {
  const letters = value.match(/\p{L}/gu);
  if (!letters || letters.length < 4) return false;

  const upperCount = letters.filter((char) => char === char.toLocaleUpperCase("fr-FR")).length;
  return upperCount / letters.length >= 0.75;
}

function capitalizeFr(value: string): string {
  if (!value) return value;
  return value.charAt(0).toLocaleUpperCase("fr-FR") + value.slice(1);
}

function formatQuotedContent(content: string): string {
  return content
    .split(/\s+/)
    .map((word, index) =>
      isAllCapsWord(word) || isMostlyUppercase(word)
        ? formatWordToken(word, index === 0)
        : word,
    )
    .join(" ");
}

function shouldFormatWord(token: string, formatWholeName: boolean): boolean {
  return formatWholeName || isAllCapsWord(token);
}

function formatWordToken(token: string, isFirst: boolean): string {
  const upper = token.toLocaleUpperCase("fr-FR");

  if (PRESERVE_UPPERCASE.has(upper)) {
    return upper;
  }

  // Acronymes courts (SF, etc.) — conservés en majuscules.
  if (upper.length <= 3 && isAllCapsWord(token)) {
    return upper;
  }

  if (upper === "Ø") {
    return "Ø";
  }

  const numUnit = token.match(/^(\d+(?:[.,]\d+)?)(ML|CL|CM|MM|KG|G)$/i);
  if (numUnit) {
    return `${numUnit[1]}${numUnit[2].toLowerCase()}`;
  }

  const slashUnit = token.match(/^(\d+\/\d+)(ML|CL|CM|MM|KG|G)$/i);
  if (slashUnit) {
    return `${slashUnit[1]}${slashUnit[2].toLowerCase()}`;
  }

  const dimUnit = token.match(/^(\d+x\d+)(CM|MM)?$/i);
  if (dimUnit) {
    return dimUnit[2] ? `${dimUnit[1]}${dimUnit[2].toLowerCase()}` : dimUnit[1];
  }

  const lower = token.toLocaleLowerCase("fr-FR");
  if (!isFirst && LOWERCASE_FR.has(lower)) {
    return lower;
  }

  return capitalizeFr(lower);
}

/**
 * Normalise les titres Magento (MAJUSCULES) pour l'affichage carte produit.
 * Les titres déjà mixtes sont conservés. XXL, XL, L, M, S restent en majuscules.
 */
export function formatProductDisplayName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return trimmed;

  const formatWholeName = isMostlyUppercase(trimmed);

  const parts: string[] = [];
  const pattern = /"([^"]+)"|(\S+)/g;
  let match: RegExpExecArray | null;
  let isSegmentStart = true;

  while ((match = pattern.exec(trimmed)) !== null) {
    if (match[1] !== undefined) {
      parts.push(`"${formatQuotedContent(match[1])}"`);
      isSegmentStart = false;
      continue;
    }

    const token = match[2];
    const formatted = shouldFormatWord(token, formatWholeName)
      ? formatWordToken(token, isSegmentStart)
      : token;
    parts.push(formatted);
    isSegmentStart = false;
  }

  return parts.join(" ");
}
