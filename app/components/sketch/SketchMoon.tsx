import { penProps, type SketchProps } from "./types";

/** A thin crescent, drawn slightly off-round on purpose. */
export function SketchMoon({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="-10 -10 20 20"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <path
        d="M3.4 -7.9 a8.3 8.1 0 1 0 3.3 14.3 a6.7 6.5 0 1 1 -3.3 -14.3 Z"
        {...penProps}
      />
    </svg>
  );
}
