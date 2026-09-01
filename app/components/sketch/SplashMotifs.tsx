import { penProps, type SketchProps } from "./types";

/** A small tarot card, standing in for Moonshadow Tarot. */
export function SketchTarot({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 36 52"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M5.2 3.6 q0.3 -1.3 1.9 -1.5 h21.8 q1.7 0.2 2 1.7 v43.8 q-0.2 1.6 -2.1 1.8 h-21.6 q-1.9 -0.2 -2.2 -1.9 Z" />
        <path d="M18.1 17.2 q4.4 0.2 5.6 4.6 a6.4 6.2 0 1 1 -5.6 -4.6 Z" />
        <path d="M12.4 8.8 q0.8 -0.1 1.4 0.6" />
        <path d="M22.2 42.6 q0.8 -0.1 1.5 0.6" />
      </g>
    </svg>
  );
}

/** A brush, for the design and drawing that still sits under the AI work. */
export function SketchBrush({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 18 58"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M8.6 2.2 q0.6 16 0.4 33.6" />
        <path d="M6.2 35.2 h5.4" />
        <path d="M5.4 35.4 q-1.6 6.4 -3.8 14.8 q4.2 -2.2 7.6 -0.4 q3.2 -2.6 7.2 0.2 q-2.2 -8.4 -3.8 -14.6" />
        <path d="M7.4 37.8 q1.2 5.6 1.4 10.2" />
      </g>
    </svg>
  );
}

/**
 * Stars joined by hairlines. The site does not draw circuits; this is how a
 * model is allowed to appear — as a constellation rather than a diagram.
 */
export function SketchConstellation({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 72 48"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M14.2 30.4 L 28.6 14.2 L 48.4 22.6 L 61.2 11.4" />
        <path d="M28.6 14.2 L 34.8 36.6" />
        <path d="M14.2 27.4 l0.3 2.4 2.4 0.4 -2.4 0.6 -0.3 2.4 -0.6 -2.4 -2.4 -0.5 2.4 -0.5 Z" />
        <path d="M28.6 11.2 l0.35 2.6 2.5 0.4 -2.5 0.6 -0.35 2.5 -0.65 -2.5 -2.5 -0.5 2.5 -0.5 Z" />
        <path d="M48.4 19.8 l0.3 2.3 2.3 0.35 -2.3 0.55 -0.3 2.3 -0.55 -2.3 -2.3 -0.45 2.3 -0.5 Z" />
        <path d="M61.2 8.6 l0.3 2.3 2.3 0.35 -2.3 0.55 -0.3 2.3 -0.55 -2.3 -2.3 -0.45 2.3 -0.5 Z" />
        <path d="M34.8 34.2 l0.28 2.1 2.1 0.32 -2.1 0.5 -0.28 2.1 -0.5 -2.1 -2.1 -0.4 2.1 -0.45 Z" />
      </g>
    </svg>
  );
}

/** Two leaves on a thin stem — 溪谷新芽, before it has a name on the page. */
export function SketchSprout({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 36 48"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M18.2 46.4 q-0.4 -14.2 0.2 -28.6" />
        <path d="M18.4 24.6 q-8.4 -2.8 -12.6 -9.2 q4.8 0.6 12.2 4.8" />
        <path d="M18.6 20.8 q7.6 -4.2 11.8 -11.4 q-0.4 6.8 -11.2 10.2" />
        <path d="M4 42.8 q8.4 -3.6 16.6 -0.4 q8.2 3.2 15.4 -0.6" />
      </g>
    </svg>
  );
}

/** Overlapping rings, the way a palette looks when it is only a few pen strokes. */
export function SketchPalette({ className, strokeWidth = 1 }: SketchProps) {
  return (
    <svg
      viewBox="0 0 52 38"
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden
    >
      <g {...penProps}>
        <path d="M16.4 8.2 a11.2 10.6 0 1 1 -0.4 0.2" />
        <path d="M28.6 7.4 a10.8 10.2 0 1 1 -0.3 0.2" />
        <path d="M22.8 18.6 a11 10.4 0 1 1 -0.3 0.2" />
      </g>
    </svg>
  );
}
