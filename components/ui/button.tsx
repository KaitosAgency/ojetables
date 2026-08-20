import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { ArrowRight } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { type ReactNode } from "react"

import { cn } from "@/lib/utils"

const buttonRadius = "rounded-[10px]"

const buttonVariants = cva(
  cn(
    "group/button inline-flex shrink-0 cursor-pointer items-center justify-center border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap shadow-none outline-none select-none transition-colors duration-150",
    buttonRadius,
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline:
          "border-border bg-background font-medium hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary font-medium text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "font-medium hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 font-medium text-destructive focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40",
        link: "font-medium text-primary underline-offset-4 hover:underline",
        brand: cn(
          "bg-brand-teal text-white",
        ),
        brandOutline: cn(
          "border-brand-navy/15 bg-white/60 text-brand-navy",
        ),
        brandOutlineLight: cn(
          "border-white/25 bg-white/[0.08] text-white",
        ),
        brandNavy: cn(
          "border-brand-navy/10 bg-brand-navy text-white",
        ),
        brandDestock: cn(
          "border border-brand-navy/15 bg-white text-brand-navy",
        ),
      },
      size: {
        default: "h-9 gap-1.5 px-3 font-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-7 gap-1 px-2.5 text-xs font-medium has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3.5 text-[0.8125rem] font-medium has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "gap-2 px-6 py-3 text-sm has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        cta: "gap-2 px-6 py-3 text-sm has-data-[icon=inline-end]:pr-5 has-data-[icon=inline-start]:pl-5",
        ctaSm: "gap-1.5 px-4 py-2 text-sm has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function shouldAnimateButton(
  variant: VariantProps<typeof buttonVariants>["variant"],
  size: VariantProps<typeof buttonVariants>["size"],
): boolean {
  if (variant === "link") return false
  if (size?.startsWith("icon")) return false
  return true
}

function isCompactButtonSize(size: VariantProps<typeof buttonVariants>["size"]): boolean {
  return size === "ctaSm" || size === "xs"
}

function ButtonAnimatedContent({
  children,
  compact = false,
}: {
  children: ReactNode
  compact?: boolean
}) {
  return (
    <>
      <span className="btn-icon-arrow" aria-hidden>
        <ArrowRight className={compact ? "size-3" : "size-4"} strokeWidth={2.25} />
      </span>
      <span className="btn-icon-text">{children}</span>
    </>
  )
}

function Button({
  className,
  variant = "default",
  size = "default",
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  const animated = shouldAnimateButton(variant, size)
  const compact = isCompactButtonSize(size)

  return (
    <ButtonPrimitive
      data-slot="button"
      data-icon-size={compact ? "compact" : undefined}
      className={cn(
        buttonVariants({ variant, size, className }),
        animated && "btn-icon",
        animated && (compact ? "!px-4" : "!px-6"),
      )}
      {...props}
    >
      {animated ? (
        <ButtonAnimatedContent compact={compact}>{children}</ButtonAnimatedContent>
      ) : (
        children
      )}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants, ButtonAnimatedContent, shouldAnimateButton, isCompactButtonSize }
