import { cn } from "@/lib/utils";

/**
 * The "%" mark: a ring holding a plus, a ring holding a minus and a scissor
 * blade running through both — the JNTUH GPA Calc identity.
 */
export function LogoMark({
  className,
  strokeWidth = 7,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      <g
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="21" cy="21" r="13" />
        <circle cx="51" cy="51" r="13" />
        <path d="M21 15.5v11M15.5 21h11" strokeWidth={strokeWidth - 2} />
        <path d="M45 51h12" strokeWidth={strokeWidth - 2} />
        <path d="M60.5 11.5 11.5 60.5" />
      </g>
      <circle cx="36" cy="36" r="4.5" fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className,
  markClassName,
  wordmarkClassName,
  stacked = false,
}: {
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
  stacked?: boolean;
}) {
  if (stacked) {
    return (
      <div className={cn("flex flex-col items-center", className)}>
        <LogoMark className={cn("h-16 w-16 md:h-20 md:w-20", markClassName)} />
        <div className="logo-word mt-3 text-center text-4xl md:text-6xl">
          Calculatea Your
          <br />
          CGPA
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className={cn("h-8 w-8 shrink-0", markClassName)} />
      <div className={cn("logo-word text-[1.05rem] leading-[0.95]", wordmarkClassName)}>
        Calculatea
        <br />
        Your CGPA
      </div>
    </div>
  );
}

/** Large, faint mark used as a background watermark on inner pages. */
export function LogoWatermark({ className }: { className?: string }) {
  return (
    <LogoMark
      strokeWidth={6}
      className={cn(
        "pointer-events-none absolute select-none text-[#f2f2f2]",
        className,
      )}
    />
  );
}
