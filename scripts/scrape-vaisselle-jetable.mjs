/**
 * Scrape produits + filtres « Vaisselle jetable » depuis ojetables.fr
 * Usage: node scripts/scrape-vaisselle-jetable.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "lib", "data");
const BASE_URL = "https://www.ojetables.fr/vaisselle-jetable-petit-prix";

function decodeHtml(text) {
  if (!text) return text;
  const entities = {
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

  let decoded = text
    .replace(/&#(\d+);/g, (_, code) => {
      const num = Number.parseInt(code, 10);
      return Number.isFinite(num) ? String.fromCharCode(num) : `&#${code};`;
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      const num = Number.parseInt(hex, 16);
      return Number.isFinite(num) ? String.fromCharCode(num) : `&#x${hex};`;
    })
    .replace(/&([a-zA-Z]+);/g, (entity, name) => entities[name] ?? entity);

  return decoded.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function decodeNavUrl(dataT) {
  try {
    return Buffer.from(dataT, "base64").toString("utf8");
  } catch {
    return null;
  }
}

function extractQueryParam(url, key) {
  const match = url.match(new RegExp(`[?&]${key}=([^&]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "fr-FR,fr;q=0.9",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function extractProductsGridHtml(html) {
  const gridStart = html.indexOf("<ul class=\"products-grid");
  if (gridStart === -1) return null;

  let depth = 0;
  for (let i = gridStart; i < html.length; i++) {
    if (html.startsWith("<ul", i)) depth++;
    if (html.startsWith("</ul>", i)) {
      depth--;
      if (depth === 0) {
        return html.slice(gridStart, i + "</ul>".length);
      }
    }
  }
  return null;
}

function parseFilters(html) {
  const groups = [];
  const listMatch = html.match(/<dl id="narrow-by-list">([\s\S]*?)<\/dl>/);
  if (!listMatch) return groups;

  const block = listMatch[1];
  const dtRegex = /<dt>([^<]+)<\/dt>\s*<dd>([\s\S]*?)<\/dd>/g;
  let dtMatch;

  while ((dtMatch = dtRegex.exec(block)) !== null) {
    const label = decodeHtml(dtMatch[1]);
    const dd = dtMatch[2];

    // Skip price range (not useful as checkbox filter in maquette)
    if (label === "Prix") continue;

    const groupId = slugify(label);
    const options = [];
    const itemRegex =
      /data-t="([^"]+)"[^>]*title="([^"]*)"[^>]*>([\s\S]*?)<span class="count">\((\d+)\)<\/span>/g;
    let itemMatch;

    while ((itemMatch = itemRegex.exec(dd)) !== null) {
      const [, dataT, titleAttr, innerHtml, countStr] = itemMatch;
      const navUrl = decodeNavUrl(dataT);
      const labelText = decodeHtml(titleAttr || innerHtml);
      const paramKeys = navUrl
        ? ["cat", "contenance", "micro_ondable", "forme", "couleur_logo", "couleur", "conditionnement"]
            .map((k) => extractQueryParam(navUrl, k))
            .filter(Boolean)
        : [];

      const optionId =
        paramKeys.length > 0
          ? `${groupId}-${paramKeys.join("-")}`
          : `${groupId}-${slugify(labelText)}`;

      options.push({
        id: optionId,
        label: labelText,
        count: Number.parseInt(countStr, 10),
        navUrl,
        filterKey: navUrl ? extractFilterKey(navUrl) : null,
      });
    }

    if (options.length > 0) {
      groups.push({ id: groupId, label, options });
    }
  }

  return groups;
}

function extractFilterKey(url) {
  for (const key of [
    "cat",
    "contenance",
    "micro_ondable",
    "forme",
    "couleur_logo",
    "couleur",
    "conditionnement",
  ]) {
    const val = extractQueryParam(url, key);
    if (val) return `${key}:${val}`;
  }
  return null;
}

function parseProducts(html) {
  const products = [];
  const gridHtml = extractProductsGridHtml(html);
  if (!gridHtml) return products;

  const itemRegex = /<li class="item[^"]*">([\s\S]*?)<\/li>/g;
  let itemMatch;

  while ((itemMatch = itemRegex.exec(gridHtml)) !== null) {
    const block = itemMatch[1];

    const imgMatch =
      block.match(/<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/) ||
      block.match(/<img[^>]+src="([^"]+)"[^>]*alt='([^']*)'/);
    const nameLinkMatch = block.match(
      /<h2 class="product-name">\s*<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/,
    );
    if (!imgMatch || !nameLinkMatch) continue;

    const href = nameLinkMatch[1];
    const slug = href.replace(/\.html$/, "").split("/").pop() ?? slugify(name);

    const nameBlock = nameLinkMatch[2];
    const packMatch = nameBlock.match(/<p>\s*\(([^)]+)\)\s*<\/p>/);
    const packLabel = packMatch ? decodeHtml(packMatch[1]) : undefined;
    const name = decodeHtml(nameBlock.replace(/<p>[\s\S]*?<\/p>/g, ""));

    let priceFrom = "";
    let priceWas = undefined;

    const specialMatch = block.match(
      /<p class="special-price">\s*<span class="price">([^<]+)<\/span>/,
    );
    const oldMatch = block.match(
      /<p class="old-price">\s*<span class="price">([^<]+)<\/span>/,
    );
    const regularMatch = block.match(
      /<span class="regular-price"[^>]*>\s*<span class="price">([^<]+)<\/span>/,
    );
    const minimalMatch = block.match(
      /<span class="price" id="product-minimal-price-\d+">\s*([^<]+)\s*<\/span>/,
    );

    if (specialMatch) {
      priceFrom = decodeHtml(specialMatch[1]);
      if (oldMatch) priceWas = decodeHtml(oldMatch[1]);
    } else if (minimalMatch && regularMatch) {
      priceWas = decodeHtml(regularMatch[1]);
      priceFrom = decodeHtml(minimalMatch[1]);
    } else if (minimalMatch) {
      priceFrom = decodeHtml(minimalMatch[1]);
    } else if (regularMatch) {
      priceFrom = decodeHtml(regularMatch[1]);
    } else {
      const metaPrice = block.match(/<meta itemprop="price" content="([^"]+)"/);
      if (metaPrice) {
        const amount = Number.parseFloat(metaPrice[1]);
        if (Number.isFinite(amount)) {
          priceFrom = `${amount.toFixed(2).replace(".", ",")} €`;
        }
      }
    }

    const idMatch = block.match(
      /product-(?:minimal-price|price|collection-image)-(\d+)/,
    );
    const magentoId = idMatch ? Number.parseInt(idMatch[1], 10) : null;

    const personalizable =
      /personnalis/i.test(name) ||
      /personnalis/i.test(href) ||
      /PERSONNALIS/i.test(name);

    const categoryLabel = inferCategoryFromName(name);

    products.push({
      id: slug,
      magentoId,
      name,
      slug,
      href,
      image: imgMatch[1],
      category: categoryLabel,
      priceFrom,
      priceWas,
      packLabel,
      personalizable,
      rating: 0,
      reviewCount: 0,
      filterKeys: [],
    });
  }

  return products;
}

function inferCategoryFromName(name) {
  const n = name.toLowerCase();
  if (/assiette/.test(n)) return "Assiettes";
  if (/couver|cuill|fourchet|couteau|pique/.test(n)) return "Couverts";
  if (/bol|saladier/.test(n)) return "Bols & saladiers";
  if (/barquette|plateau/.test(n)) return "Barquettes";
  if (/gobelet|verre/.test(n)) return "Gobelets & verres";
  if (/nappe|serviette/.test(n)) return "Nappes & serviettes";
  if (/pot|coupe|verrine/.test(n)) return "Pots dessert";
  return "Vaisselle jetable";
}

async function fetchFilterProductSlugs(navUrl) {
  const url = navUrl.includes("limit=") ? navUrl : `${navUrl}${navUrl.includes("?") ? "&" : "?"}limit=500`;
  const html = await fetchHtml(url);
  const products = parseProducts(html);
  return products.map((p) => p.id);
}

async function enrichWithFilterKeys(products, filterGroups) {
  const productMap = new Map(products.map((p) => [p.id, p]));

  // Synthetic personalizable filter
  const personalizableGroup = {
    id: "personnalisation",
    label: "Personnalisation",
    options: [
      {
        id: "personnalisable",
        label: "Personnalisable (logo)",
        count: products.filter((p) => p.personalizable).length,
        filterKey: "personalizable:true",
      },
    ],
  };

  const allGroups = [...filterGroups, personalizableGroup];

  for (const group of allGroups) {
    for (const option of group.options) {
      if (option.filterKey === "personalizable:true") {
        for (const p of products) {
          if (p.personalizable) p.filterKeys.push(option.filterKey);
        }
        continue;
      }

      if (!option.navUrl) continue;

      console.log(`  Filtre: ${group.label} → ${option.label} (${option.count})`);
      try {
        const slugs = await fetchFilterProductSlugs(option.navUrl);
        for (const slug of slugs) {
          const p = productMap.get(slug);
          if (p && option.filterKey) {
            p.filterKeys.push(option.filterKey);
          }
        }
      } catch (err) {
        console.warn(`  ⚠ Échec filtre ${option.label}: ${err.message}`);
      }
    }
  }

  return { products, filterGroups: allGroups };
}

async function mergePaginatedProducts(initialHtml, products, fetchPage) {
  const existing = new Set(products.map((p) => p.id));
  let page = 2;

  while (page <= 10) {
    const pageHtml = await fetchPage(page);
    const pageProducts = parseProducts(pageHtml);
    if (pageProducts.length === 0) break;

    let added = 0;
    for (const p of pageProducts) {
      if (!existing.has(p.id)) {
        products.push(p);
        existing.add(p.id);
        added++;
      }
    }

    console.log(`  Page ${page}: ${pageProducts.length} sur page, +${added} nouveaux`);
    if (added === 0) break;
    page++;
  }

  return products;
}

function mergeLocalHtmlPages(products, pageFiles) {
  const existing = new Set(products.map((p) => p.id));

  for (const [index, filePath] of pageFiles.entries()) {
    if (!fs.existsSync(filePath)) continue;
    const pageProducts = parseProducts(fs.readFileSync(filePath, "utf8"));
    let added = 0;
    for (const p of pageProducts) {
      if (!existing.has(p.id)) {
        products.push(p);
        existing.add(p.id);
        added++;
      }
    }
    console.log(`  Fichier page ${index + 2}: +${added} nouveaux`);
  }

  return products;
}

async function main() {
  const fromFile = process.argv.includes("--from-file");
  const fileArg = process.argv.find((a) => a.startsWith("--file="));
  const filePath = fileArg ? fileArg.slice("--file=".length) : null;

  console.log(fromFile ? `Parse ${filePath ?? "tmp-fetch-test.html"}…` : "Fetch catalogue…");
  const listUrl = `${BASE_URL}?limit=500`;
  let html;

  if (fromFile) {
    const inputPath = filePath
      ? path.resolve(ROOT, filePath)
      : path.join(__dirname, "tmp-fetch-test.html");
    html = fs.readFileSync(inputPath, "utf8");
  } else {
    html = await fetchHtml(listUrl);
  }

  let products = parseProducts(html);
  console.log(`${products.length} produits parsés (page 1)`);

  if (fromFile) {
    const localPages = [
      path.join(__dirname, "tmp-fetch-test-p2.html"),
      path.join(__dirname, "tmp-fetch-test-p3.html"),
    ];
    products = mergeLocalHtmlPages(products, localPages);
    console.log(`${products.length} produits après fichiers locaux`);
  } else {
    products = await mergePaginatedProducts(html, products, async (page) => {
      console.log(`Fetch page ${page}…`);
      return fetchHtml(`${BASE_URL}?p=${page}&limit=500`);
    });
    console.log(`${products.length} produits après pagination`);
  }

  const rawFilters = parseFilters(html);
  console.log(`${rawFilters.length} groupes de filtres`);

  // Enrich only groups used for interactive filtering in the maquette
  const keyGroupIds = new Set(["categorie", "micro-ondable"]);
  const filtersToEnrich = rawFilters.filter((g) => keyGroupIds.has(g.id));

  console.log("Association produits ↔ filtres…");
  const { products: enriched, filterGroups } = await enrichWithFilterKeys(
    products,
    filtersToEnrich,
  );

  const prixGroup = rawFilters.find((g) => g.id === "prix");
  const catalogProductCount = prixGroup
    ? Math.max(...prixGroup.options.map((o) => o.count), enriched.length)
    : enriched.length;

  const output = {
    scrapedAt: new Date().toISOString(),
    sourceUrl: listUrl,
    catalogProductCount,
    productCount: enriched.length,
    products: enriched,
    filterGroups: filterGroups.map((g) => ({
      id: g.id,
      label: g.label,
      options: g.options.map((o) => ({
        id: o.id,
        label: o.label,
        count: o.count,
        filterKey: o.filterKey,
      })),
    })),
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, "vaisselle-jetable.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2), "utf8");
  console.log(`✓ ${outPath}`);
  console.log(`  ${enriched.length} produits, ${filterGroups.length} groupes filtres, total catalogue ${catalogProductCount}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
