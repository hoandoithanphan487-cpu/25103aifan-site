import { penProps, type SketchProps } from "./types";

/**
 * Three loose ripple lines of unequal length. Used under the portrait so the
 * cutout has something to float on instead of a panel or a shadow.
 */
export function SketchWave({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 200 34"
      strokeWidth={strokeWidth}
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <g {...penProps}>
        <path d="M4 9 q13 -6.5 26.5 -0.8 q13.5 5.7 27 -0.4 q13.5 -6.1 27.5 0.2 q14 6.3 28 -0.6 q14 -6.9 27.5 -0.2 q13.5 6.7 26 0.9 q12.5 -5.6 30.5 0.6" />
        <path d="M38 20.5 q12 -5.4 24 -0.4 q12 5 24.5 -0.6 q12.5 -5.6 25 0.4 q12.5 6 24.5 0.2" />
        <path d="M74 29.8 q10.5 -4.2 21 -0.2 q10.5 4 21.5 -0.5" />
      </g>
    </svg>
  );
}

/** A single ripple, for tight spaces and mobile layouts. */
export function SketchRipple({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 120 12"
      strokeWidth={strokeWidth}
      className={className}
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M3 7 q12 -5.5 24 -0.6 q12 4.9 24.5 -0.5 q12.5 -5.4 25 0.4 q12.5 5.8 40 -1.2"
        {...penProps}
      />
    </svg>
  );
}
