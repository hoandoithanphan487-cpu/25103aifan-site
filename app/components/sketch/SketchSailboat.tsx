import { StarGlyph } from "./SketchStar";
import { penProps, type SketchProps } from "./types";

/** The star out in a small boat, somewhere between two places. */
export function SketchSailboat({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 132 112"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M23 72 q32 4.6 64 -0.7 q-6.4 13.6 -31.8 14.3 q-25.6 -0.8 -32.2 -13.6 Z" />
        <path d="M55.4 69.5 l1.9 -46.2" />
        <path d="M57.3 23.8 q22.4 21.2 18.6 44.6 q-11.2 1.7 -19 0.3 Z" />
        <path d="M57.3 23.8 q6.2 1.3 9.2 4 q-4.5 2.1 -9 2.3" />
        <path d="M12 92 q12 -4.8 23.5 -0.4 q11.5 4.4 24 -0.6 q12.5 -5 24.5 0.2 q12 5.2 24 -0.4" />
        <path d="M40 102 q11 -4.2 21.5 -0.3 q10.5 3.9 21.5 -0.6" />
        <path d="M104 26 q3.6 -8.2 -3.4 -12.4 a7.6 7.6 0 1 1 3.4 12.4 Z" />
        <path d="M18 30.5 q0.7 3.8 3.9 4.7 q-3.1 0.9 -4 4.6 q-0.8 -3.7 -3.9 -4.6 q3.2 -1 4 -4.7 Z" />
        <path d="M113 52 q0.5 2.9 2.9 3.6 q-2.3 0.7 -3 3.5 q-0.6 -2.8 -2.9 -3.5 q2.4 -0.7 3 -3.6 Z" />
      </g>
      <g transform="translate(41 57) scale(0.48) rotate(-4)">
        <StarGlyph face />
      </g>
    </svg>
  );
}
