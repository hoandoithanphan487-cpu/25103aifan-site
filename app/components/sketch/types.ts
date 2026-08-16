/**
 * Every illustration on the site is drawn with the same imaginary pen: a very
 * fine nib, round caps, no fill. `vector-effect: non-scaling-stroke` keeps the
 * line a true hairline no matter how large the drawing is placed.
 */
export type SketchProps = {
  className?: string;
  /** Screen pixels, because the stroke does not scale with the artwork. */
  strokeWidth?: number;
  /** Supply only when the drawing carries meaning; otherwise it stays decorative. */
  title?: string;
};

export const penProps = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;
