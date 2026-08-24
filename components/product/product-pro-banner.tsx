export function ProductProBanner() {
  const items = [
    "Un seul compte client",
    "Tarifs dégressifs",
    "Devis volume",
    "Personnalisation logo",
    "Livraison 24/72h",
  ];

  return (
    <div className="sticky top-0 z-40 border-b border-brand-kraft/25 bg-brand-beige/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 text-xs text-brand-navy md:px-6 md:text-sm">
        {items.map((item) => (
          <span key={item} className="inline-flex items-center gap-1.5">
            <span className="text-brand-teal" aria-hidden>
              ✓
            </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
