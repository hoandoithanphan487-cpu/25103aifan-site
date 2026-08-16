import { penProps, type SketchProps } from "./types";

/** A four-point sparkle with one arm slightly longer than the rest. */
export function SketchSparkle({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="-8 -8 16 16"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <path
        d="M0.1 -7.3 Q0.9 -1.5 6.8 -0.2 Q1.2 1.1 -0.2 7.2 Q-1.1 1.2 -6.9 0.1 Q-0.8 -1.3 0.1 -7.3 Z"
        {...penProps}
      />
    </svg>
  );
}

/** Three sparkles scattered at unequal sizes, used as visual punctuation. */
export function SketchSparkleTrio({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 64 34"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M9 3.4 Q10 8.4 14.4 9.6 Q10.2 10.7 9.1 15.8 Q8.1 10.8 3.6 9.7 Q8.1 8.5 9 3.4 Z" />
        <path d="M31.6 13.8 Q32.4 18 36.1 19 Q32.6 19.9 31.7 24.2 Q30.9 20 27.2 19.1 Q30.9 18.1 31.6 13.8 Z" />
        <path d="M52.4 5.6 Q53 8.6 55.7 9.3 Q53.1 9.9 52.5 13 Q51.9 10 49.2 9.4 Q51.9 8.7 52.4 5.6 Z" />
      </g>
    </svg>
  );
}
