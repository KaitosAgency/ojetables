import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CatalogNavCrawl } from "@/components/layout/catalog-nav-crawl";
import { DeferredClientWidgets } from "@/components/layout/deferred-client-widgets";
import { JsonLd, organizationJsonLd, siteNavigationJsonLd, websiteJsonLd } from "@/components/seo/json-ld";
import { MaquetteShopProvider } from "@/lib/maquette-shop-context";
import { createDefaultMetadata } from "@/lib/og-metadata";
import { site, getSiteUrl, favicon } from "@/lib/site";
import { cn } from "@/lib/utils";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const siteUrl = getSiteUrl();
const defaultMetadata = createDefaultMetadata(siteUrl);

export const metadata: Metadata = {
  ...defaultMetadata,
  description: site.description,
  icons: {
    icon: [{ url: favicon.path, type: "image/png" }],
    shortcut: favicon.path,
    apple: favicon.path,
  },
  openGraph: {
    ...defaultMetadata.openGraph,
    description: site.description,
  },
  twitter: {
    ...defaultMetadata.twitter,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={cn("h-full", geist.variable, "font-sans")}>
      <head>
        <link rel="describedby" href={`${siteUrl}/llms.txt`} type="text/markdown" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full bg-background text-foreground">
        <MaquetteShopProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy focus:shadow-lg"
        >
          Aller au contenu
        </a>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={siteNavigationJsonLd()} />
        <SiteHeader />
        <CatalogNavCrawl />
        <main id="main-content" className="flex-1">{children}</main>
        <SiteFooter />
        <DeferredClientWidgets />
        </MaquetteShopProvider>
      </body>
    </html>
  );
}
