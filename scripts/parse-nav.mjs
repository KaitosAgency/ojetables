import fs from "fs";

const html = fs.readFileSync("tmp-home.html", "utf8");
const match = html.match(/<ol class="nav-primary">([\s\S]*?)<\/ol>/);
if (!match) process.exit(1);

function decode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&eacute;/g, "é")
    .replace(/&Eacute;/g, "É")
    .replace(/&egrave;/g, "è")
    .replace(/&ecirc;/g, "ê")
    .replace(/&agrave;/g, "à")
    .replace(/&ocirc;/g, "ô")
    .replace(/&iuml;/g, "ï")
    .replace(/&nbsp;/g, " ")
    .replace(/&rsquo;/g, "'")
    .replace(/&ldquo;/g, '"')
    .replace(/&rdquo;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractUlInner(html, ulClass) {
  const open = `<ul class="${ulClass}">`;
  const start = html.indexOf(open);
  if (start === -1) return null;

  let depth = 0;
  for (let i = start; i < html.length; i++) {
    if (html.startsWith("<ul", i)) depth++;
    if (html.startsWith("</ul>", i)) {
      depth--;
      if (depth === 0) {
        return html.slice(start + open.length, i);
      }
    }
  }
  return null;
}

function extractLink(part, level) {
  const patterns = [
    new RegExp(
      `<a href="([^"]+)"[^>]*class="level${level}[^"]*"[^>]*>([\\s\\S]*?)<\\/a>`,
    ),
    new RegExp(
      `<a class="level${level}[^"]*"[^>]*href="([^"]+)"[^>]*>([\\s\\S]*?)<\\/a>`,
    ),
  ];

  for (const pattern of patterns) {
    const linkMatch = part.match(pattern);
    if (linkMatch) {
      return { href: linkMatch[1], label: decode(linkMatch[2]) };
    }
  }
  return null;
}

function isViewAllItem(part) {
  return /^\s*view-all/.test(part);
}

function parseLinks(html, level) {
  const items = [];
  const parts = html.split(new RegExp(`<li\\s+class="level${level}`)).slice(1);

  for (const part of parts) {
    if (isViewAllItem(part)) continue;

    const link = extractLink(part, level);
    if (!link) continue;

    const childUl = extractUlInner(part, `level${level}`);
    const children = childUl ? parseLinks(childUl, level + 1) : [];

    items.push({ label: link.label, href: link.href, children });
  }

  return items;
}

function mapNavItems(nodes) {
  return nodes.map((node) => ({
    label: node.label,
    href: toMaquettePath(node.href),
    ...(node.children.length ? { children: mapNavItems(node.children) } : {}),
  }));
}

function toMaquettePath(url) {
  try {
    const u = new URL(url);
    return u.pathname.replace(/\/$/, "") || "/";
  } catch {
    return "#";
  }
}

function slugify(label) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const navHtml = match[1];
const level0Parts = navHtml.split(/<li\s+class="level0/).slice(1);
const catalog = [];

for (const part of level0Parts) {
  const link = extractLink(part, 0);
  if (!link) continue;

  const { href, label } = link;
  const childUl = extractUlInner(part, "level0");
  const level1 = childUl ? parseLinks(childUl, 1) : [];

  const groups = level1.map((l1) => {
    if (l1.children.length === 0) {
      return {
        title: l1.label,
        items: [{ label: l1.label, href: toMaquettePath(l1.href) }],
      };
    }
    return {
      title: l1.label,
      items: mapNavItems(l1.children),
    };
  });

  catalog.push({
    id: slugify(label),
    label,
    href: toMaquettePath(href),
    groups: groups.length ? groups : undefined,
    items:
      groups.length === 0
        ? level1.map((l1) => ({ label: l1.label, href: toMaquettePath(l1.href) }))
        : undefined,
  });
}

const excluded = new Set(["destockage", "garcia-de-pou"]);
const filtered = catalog.filter((c) => !excluded.has(c.id));

fs.writeFileSync("lib/catalog-nav-data.json", JSON.stringify(filtered, null, 2), "utf8");
console.log(`${filtered.length} categories (excl. destockage, garcia de pou)`);
for (const c of filtered) {
  const itemCount = c.groups?.reduce((n, g) => n + g.items.length, 0) ?? c.items?.length ?? 0;
  console.log(`${c.label}: ${c.groups?.length ?? 0} groups, ${itemCount} links`);
}
