import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { HomeLink } from "@/components/layout/home-link";
import {
  avisGarantis,
  footerNav,
  footerSeoLinks,
  legalLinks,
  logos,
  site,
} from "@/lib/site";
import { Separator } from "@/components/ui/separator";
import { StarRating } from "@/components/ui/star-rating";

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
};

function ExternalLink({ href, children, className, title }: ExternalLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} title={title}>
      {children}
    </a>
  );
}

function FooterSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-teal">{children}</p>
  );
}

type FooterNavColumnProps = {
  title: string;
  ariaLabel: string;
  links: readonly { label: string; href: string }[];
};

function FooterNavColumn({ title, ariaLabel, links }: FooterNavColumnProps) {
  return (
    <nav aria-label={ariaLabel} className="min-w-0">
      <FooterSectionTitle>{title}</FooterSectionTitle>
      <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
        {links.map((link) => (
          <li key={link.href}>
            <ExternalLink href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </ExternalLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterContactColumn() {
  return (
    <div className="min-w-0 lg:text-right">
      <FooterSectionTitle>Contact</FooterSectionTitle>

      <address className="mt-4 not-italic text-sm leading-relaxed text-slate-400">
        <span className="block">{site.address.full}</span>
        <span className="mt-2 block">
          <a href={site.phoneHref} className="transition-colors hover:text-white">
            {site.phone}
          </a>
        </span>
        <span className="mt-1 block">
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
            {site.email}
          </a>
        </span>
      </address>

      <div className="mt-6 border-t border-white/10 pt-6">
        <a
          href={avisGarantis.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-col gap-2 lg:items-end"
          aria-label={`${site.aggregateRating.display} sur ${site.aggregateRating.count.toLocaleString("fr-FR")} avis certifiés ${site.aggregateRating.label}`}
        >
          <span className="flex items-center gap-3">
            <span className="text-left lg:text-right">
              <span className="block text-base font-semibold text-white">{site.aggregateRating.display}</span>
              <StarRating
                size="sm"
                tone="inverse"
                value={(site.aggregateRating.score / 10) * 5}
                className="mt-1.5 lg:ml-auto"
              />
            </span>
            <Image
              src={avisGarantis.assets.cocarde}
              alt=""
              width={26}
              height={48}
              className="h-10 w-auto shrink-0"
              aria-hidden
            />
          </span>
          <span className="text-xs text-slate-400">
            sur {site.aggregateRating.count.toLocaleString("fr-FR")} avis · {site.aggregateRating.label}
          </span>
          <span className="text-xs text-slate-400 underline-offset-2 transition-colors group-hover:text-white group-hover:underline">
            {avisGarantis.certificateLabel}
          </span>
        </a>
      </div>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="contact" className="border-t border-white/10 bg-brand-navy-deep text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-10">
          <div className="sm:col-span-2 lg:col-span-3">
            <HomeLink className="inline-flex">
              <Image
                src={logos.light}
                alt={logos.alt}
                width={logos.width}
                height={logos.height}
                className="h-11 w-auto md:h-12"
              />
            </HomeLink>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{site.description}</p>
          </div>

          <div className="lg:col-span-2">
            <FooterNavColumn title="Informations" ariaLabel="Informations légales" links={footerNav.informations} />
          </div>

          <div className="lg:col-span-2">
            <FooterNavColumn title="Service client" ariaLabel="Service client" links={footerNav.service} />
          </div>

          <div className="lg:col-span-3">
            <FooterNavColumn title="Par métier" ariaLabel="Vaisselle jetable par métier" links={footerNav.metiers} />
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <FooterContactColumn />
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-slate-500 md:flex-row md:px-6">
        <p>
          © {new Date().getFullYear()} {site.legalName} - vaisselle jetable éco-responsable · livraison 24/72h
        </p>
        <nav aria-label="Liens légaux et SEO" className="flex flex-wrap items-center justify-center gap-4">
          {footerSeoLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
          {legalLinks.map((link) => (
            <ExternalLink key={link.href} href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </ExternalLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/5 bg-brand-navy-ink py-2.5 text-center text-xs text-slate-500">
        <span className="inline-flex items-center justify-center gap-1.5">
          Fait avec
          <Heart className="h-3 w-3 fill-brand-teal/70 text-brand-teal/70" aria-hidden />
          par{" "}
          <ExternalLink
            href="https://kaitos.agency"
            className="font-medium text-slate-400 transition-colors hover:text-white"
          >
            Kaitos Agency
          </ExternalLink>
        </span>
      </div>
    </footer>
  );
}
