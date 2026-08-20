import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  titleClassName?: string;
};

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === "center" && "text-center")}>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-teal">{label}</p>
      <h2
        className={cn(
          "mt-3 font-bold tracking-tight text-brand-navy",
          align === "center" ? "text-3xl md:text-4xl" : "max-w-3xl text-3xl md:text-5xl",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
