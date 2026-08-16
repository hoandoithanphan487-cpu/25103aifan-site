import { penProps, type SketchProps } from "./types";

type UnderlineProps = SketchProps & {
  /**
   * When true the stroke is wiped in from the left by a parent `group` on
   * hover or keyboard focus, as though it were being drawn.
   */
  drawOnHover?: boolean;
};

/**
 * The site's only underline: an uneven pen stroke that misses the baseline in
 * a couple of places, used instead of borders and button chrome.
 */
export function HandDrawnUnderline({
  className,
  strokeWidth = 1,
  drawOnHover = false,
}: UnderlineProps) {
  return (
    <svg
      viewBox="0 0 100 6"
      strokeWidth={strokeWidth}
      preserveAspectRatio="none"
      aria-hidden
      className={[
        drawOnHover &&
          "origin-left scale-x-0 transition-transform duration-[550ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <path
        d="M1.5 4.1 q12.5 -2.9 25.5 -1.3 q13 1.6 26 -0.7 q13.5 -2.4 45.5 1.7"
        {...penProps}
      />
    </svg>
  );
}
