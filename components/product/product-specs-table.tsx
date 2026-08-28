import type { ProductSpec } from "@/lib/products";

type ProductSpecsTableProps = {
  specs: readonly ProductSpec[];
  caption?: string;
};

/** Tableau specs — contenu visible, sémantique SEO (th scope="row"). */
export function ProductSpecsTable({
  specs,
  caption = "Caractéristiques techniques détaillées",
}: ProductSpecsTableProps) {
  if (specs.length === 0) return null;

  return (
    <div className="mt-8">
      <p className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
        <span className="size-2 shrink-0 rounded-full bg-brand-teal" aria-hidden />
        Caractéristiques détaillées
      </p>

      <div className="mt-4 overflow-hidden rounded-[10px] border border-border bg-white">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <tbody>
            {specs.map((spec, index) => (
              <tr
                key={spec.label}
                className={index > 0 ? "border-t border-border/70" : undefined}
              >
                <th
                  scope="row"
                  className="w-[42%] px-4 py-3.5 text-left font-medium text-muted-foreground sm:w-2/5 sm:px-5 sm:py-4"
                >
                  {spec.label}
                </th>
                <td className="px-4 py-3.5 font-semibold text-brand-navy sm:px-5 sm:py-4">
                  {spec.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
