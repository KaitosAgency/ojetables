import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SurfaceGridProps = {
  columns?: 2 | 3;
  className?: string;
  children: ReactNode;
};

export function getSurfaceGridCellClass(
  index: number,
  total: number,
  columns: 2 | 3 = 3,
) {
  const lastRowStart = total - (total % columns || columns);

  return cn(
    "p-8",
    index < lastRowStart && "border-b border-slate-100",
    index % columns !== columns - 1 && "md:border-r md:border-slate-100",
  );
}

export function SurfaceGrid({ columns = 3, className, children }: SurfaceGridProps) {
  return (
    <div className={cn("card-surface overflow-hidden rounded-2xl", className)}>
      <div className={cn("grid", columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3")}>
        {children}
      </div>
    </div>
  );
}
