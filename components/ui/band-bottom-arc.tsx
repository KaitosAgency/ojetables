type BandBottomArcProps = {
  className?: string;
};

export function BandBottomArc({ className = "text-background" }: BandBottomArcProps) {
  return (
    <>
      {/* Mobile : courbe plus douce */}
      <svg
        className={`pointer-events-none absolute -bottom-px left-0 block h-3 w-full md:hidden ${className}`}
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,28 C480,22 960,22 1440,28 V32 H0 Z" />
      </svg>

      {/* Desktop : courbe standard */}
      <svg
        className={`pointer-events-none absolute -bottom-px left-0 hidden h-6 w-full md:block ${className}`}
        viewBox="0 0 1440 32"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path fill="currentColor" d="M0,24 C480,0 960,0 1440,24 V32 H0 Z" />
      </svg>
    </>
  );
}
