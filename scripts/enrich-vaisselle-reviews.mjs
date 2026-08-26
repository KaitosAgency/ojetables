/**
 * Enrichit les avis produits depuis les fiches Ojetables (Avis Garantis).
 * Usage: node scripts/enrich-vaisselle-reviews.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const DATA_PATH = path.join(ROOT, "lib", "data", "vaisselle-jetable.json");
const CONCURRENCY = 10;

const HTML_ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  euro: "€",
  agrave: "à",
  Agrave: "À",
  acirc: "â",
  Acirc: "Â",
  aelig: "æ",
  AElig: "Æ",
  ccirc: "ç",
  Ccedil: "Ç",
  eacute: "é",
  Eacute: "É",
  ecirc: "ê",
  Ecirc: "Ê",
  egrave: "è",
  Egrave: "È",
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
  rsquo: "'",
  lsquo: "'",
  rdquo: '"',
  ldquo: '"',
};

function decodeHtmlEntities(text) {
  if (!text) return text;
  return text
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

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "text/html",
      "Accept-Language": "fr-FR,fr;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parseProductReviews(html) {
  const sagBlock = html.match(/id="sag_review_container"([\s\S]*?)id="sag_loader"/);
  const scope = sagBlock ? sagBlock[1] : html;

  const ratingMatch = scope.match(/itemprop="ratingValue" content="([^"]+)"/);
  const countMatch = scope.match(/itemprop="reviewCount" content="([^"]+)"/);

  const reviewCount = countMatch ? Number.parseInt(countMatch[1], 10) : 0;
  const rating = ratingMatch ? Number.parseFloat(ratingMatch[1]) : 0;

  if (!Number.isFinite(reviewCount) || reviewCount <= 0) {
    return { rating: 0, reviewCount: 0 };
  }

  return {
    rating: Number.isFinite(rating) ? rating : 0,
    reviewCount,
  };
}

async function mapPool(items, concurrency, fn) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

async function main() {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
  const products = data.products;
  console.log(`Enrichissement avis pour ${products.length} produits…`);

  let withReviews = 0;

  await mapPool(products, CONCURRENCY, async (product, i) => {
    try {
      const html = await fetchHtml(product.href);
      const { rating, reviewCount } = parseProductReviews(html);
      product.rating = rating;
      product.reviewCount = reviewCount;
      product.name = decodeHtmlEntities(product.name);

      if (reviewCount > 0) {
        withReviews++;
        console.log(`  ✓ ${product.id}: ${rating}/5 (${reviewCount} avis)`);
      }
    } catch (err) {
      console.warn(`  ⚠ ${product.id}: ${err.message}`);
    }

    if ((i + 1) % 50 === 0) {
      console.log(`  … ${i + 1}/${products.length}`);
    }
  });

  data.products = products;
  data.reviewsEnrichedAt = new Date().toISOString();

  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
  console.log(`✓ ${withReviews} produits avec avis · ${DATA_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
