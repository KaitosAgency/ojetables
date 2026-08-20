import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import {
  ButtonAnimatedContent,
  buttonVariants,
  isCompactButtonSize,
  shouldAnimateButton,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LinkButtonProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants>;

export function LinkButton({
  className,
  variant,
  size,
  children,
  ...props
}: LinkButtonProps) {
  const animated = shouldAnimateButton(variant, size);
  const compact = isCompactButtonSize(size);

  return (
    <Link
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
    </Link>
  );
}
