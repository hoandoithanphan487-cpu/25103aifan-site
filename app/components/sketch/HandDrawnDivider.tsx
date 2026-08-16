import { StarGlyph } from "./SketchStar";
import { penProps, type SketchProps } from "./types";

/**
 * Sections are separated by a drawing rather than a rule: two uneven pen
 * strokes that do not quite meet, with the star resting in the gap.
 */
export function HandDrawnDivider({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 340 24"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M2 12.6 q34 -5 68 -2.2 q34 2.8 66 -0.7" />
        <path d="M204 11.2 q32 -4.4 66 -1.3 q34 3 68 0.4" />
      </g>
      <g transform="translate(170 11) scale(0.33) rotate(4)">
        <StarGlyph />
      </g>
    </svg>
  );
}
