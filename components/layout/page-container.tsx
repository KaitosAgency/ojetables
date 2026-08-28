import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type PageContainerProps = ComponentProps<"div">;

/** Conteneur horizontal standard des sections (max-w-6xl + padding). */
export function PageContainer({ className, ...props }: PageContainerProps) {
  return <div className={cn("mx-auto max-w-6xl px-4 md:px-6", className)} {...props} />;
}
