import { StarGlyph } from "./SketchStar";
import { penProps, type SketchProps } from "./types";

/** The star watching a small sun come up over open water. */
export function SketchSunrise({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 140 94"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M4 66 q30 -3.4 64 -1.4 q34 2 68 -0.5" />
        <path d="M35 65.2 a17 16.4 0 0 1 34 -0.4" />
        <path d="M52.2 40.4 l-0.7 -9.2" />
        <path d="M36.4 46.2 l-6.3 -6.8" />
        <path d="M68 45.4 l6.6 -6.2" />
        <path d="M27.6 60 l-9.4 -1.7" />
        <path d="M76.8 59.4 l9.2 -1.9" />
        <path d="M13 76.5 q11.5 -4.6 22.5 -0.4 q11 4.2 23 -0.6" />
        <path d="M62 84 q10.5 -4.1 20.5 -0.3 q10 3.6 21 -0.7" />
        <path d="M95 19.5 q4.6 -4.6 9.2 -1" />
        <path d="M106.5 16 q4.4 -4.4 8.8 -0.9" />
      </g>
      <g transform="translate(105 47) scale(0.6) rotate(-6)">
        <StarGlyph face />
      </g>
    </svg>
  );
}
