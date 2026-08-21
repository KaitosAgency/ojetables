import Image from "next/image";
import Link from "next/link";
import { catalogFamilies, legalLinks, logos, nav, previewDisclaimer, site } from "@/lib/site";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-brand-navy-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <Link href="/" className="inline-flex">
            <Image
              src={logos.default}
              alt={logos.alt}
              width={logos.width}
              height={logos.height}
              className="h-9 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">{site.description}</p>
          <p className="mt-4 rounded-lg border border-brand-teal/20 bg-brand-teal/5 px-3 py-2 text-xs text-brand-teal">
            {previewDisclaimer}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-teal">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            {nav.main.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-teal">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>{site.address.full}</li>
            <li>
              <a href={site.phoneHref} className="transition-colors hover:text-white">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 md:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-teal">Catalogue — 12 familles</p>
        <ul className="mt-4 columns-2 gap-x-8 text-sm text-slate-400 sm:columns-3 lg:columns-4">
          {catalogFamilies.map((family) => {
            const isExternal = family.href.startsWith("http");
            return (
              <li key={family.id} className="mb-2 break-inside-avoid">
                <Link
                  href={family.href}
                  className="transition-colors hover:text-white"
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {family.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <Separator className="bg-white/10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 md:flex-row md:px-6">
        <p>
          © {new Date().getFullYear()} {site.legalName}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {legalLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 bg-brand-navy-ink py-3 text-center text-xs text-slate-600">
        Maquette réalisée par{" "}
        <a
          href="https://kaitos.agency"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-500 transition-colors hover:text-white"
        >
          Kaitos Agency
        </a>
      </div>
    </footer>
  );
}
