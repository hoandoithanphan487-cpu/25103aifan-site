import { penProps, type SketchProps } from "./types";

/**
 * The recurring character. A five-point star with deliberately uneven arms and
 * a slightly wobbling contour, so it reads as drawn rather than generated.
 */
export const STAR_OUTLINE =
  "M0.6 -20.4 Q2.4 -14.2 4.4 -6.9 Q12.2 -6.9 19.4 -6.6 Q13.4 -2.4 7.9 2.2 " +
  "Q9.8 9.6 11.2 16.6 Q5.4 12.1 0.3 8.3 Q-5.6 12.4 -12.2 15.8 Q-9.6 9.2 -7.4 2.8 " +
  "Q-13.4 -1.4 -18.6 -5.9 Q-11.6 -6.4 -5.1 -6.2 Q-2.4 -13.4 0.6 -20.4 Z";

type StarProps = SketchProps & {
  /** Two dot eyes and a small mouth. Left off for purely decorative stars. */
  face?: boolean;
};

export function StarGlyph({ face = false }: { face?: boolean }) {
  return (
    <>
      <path d={STAR_OUTLINE} {...penProps} />
      {face ? (
        <>
          <circle cx={-3.4} cy={-3.6} r={0.95} fill="currentColor" stroke="none" />
          <circle cx={3.6} cy={-3.4} r={0.95} fill="currentColor" stroke="none" />
          <path d="M-2.8 -0.2 Q0.2 2.3 3.2 -0.5" {...penProps} />
        </>
      ) : null}
    </>
  );
}

export function SketchStar({
  className,
  strokeWidth = 1,
  face = false,
  title,
}: StarProps) {
  return (
    <svg
      viewBox="-24 -24 48 48"
      strokeWidth={strokeWidth}
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <StarGlyph face={face} />
    </svg>
  );
}
