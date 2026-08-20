import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  variant = "surface",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm";
  variant?: "surface" | "plain" | "outline" | "outlineTeal";
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      className={cn(
        "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm text-card-foreground [--card-spacing:--spacing(4)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
        variant === "surface" && "card-surface",
        variant === "plain" && "ring-1 ring-foreground/10",
        variant === "outline" && "card-outline",
        variant === "outlineTeal" && "card-outline-teal",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "section";
}) {
  return (
    <div
      data-slot="card-header"
      data-variant={variant}
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 rounded-t-xl px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        variant === "section" && "gap-2 border-b border-slate-100/90 pb-5",
        className
      )}
      {...props}
    />
  )
}

function CardEyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-eyebrow"
      className={cn(
        "font-mono text-xs font-bold uppercase tracking-[0.15em] text-brand-teal sm:text-sm",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "section" | "feature" | "success";
}) {
  return (
    <div
      data-slot="card-title"
      data-variant={variant}
      className={cn(
        "font-heading leading-snug",
        variant === "default" &&
          "text-base font-medium group-data-[size=sm]/card:text-sm",
        variant === "section" &&
          "text-xl font-bold tracking-tight text-brand-navy md:text-2xl",
        variant === "feature" && "text-lg font-bold text-brand-navy",
        variant === "success" && "text-xl font-bold text-brand-teal md:text-2xl",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground group-data-[variant=section]/card-header:mt-0.5", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-(--card-spacing) group-has-data-[variant=section]/card-header:pt-5",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-xl border-t bg-muted/50 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardEyebrow,
  CardAction,
  CardDescription,
  CardContent,
}
