import { penProps, type SketchProps } from "./types";

/** A short pen arrow whose head does not quite close. */
export function HandDrawnArrow({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 26 10"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M1.2 5.3 q11 -1.5 22.8 -0.7" />
        <path d="M19.3 1.5 q3.1 2.3 4.8 3.1 q-2.1 1.3 -4.4 3.5" />
      </g>
    </svg>
  );
}
