/**
 * Childhood portraits of Yifan, cropped so the platform watermark that sat in
 * the lower-right corner of the originals is outside the frame, then keyed to
 * genuine alpha transparency by `scripts/portrait-cutout.mjs`.
 */

export type GazeDirection = "center" | "left" | "right" | "up" | "down" | "corner";

export type Expression = {
  readonly direction: GazeDirection;
  readonly src: string;
  readonly alt: string;
};

export const PORTRAIT_WIDTH = 575;
export const PORTRAIT_HEIGHT = 680;

export const EXPRESSIONS: Readonly<Record<GazeDirection, Expression>> = {
  center: {
    direction: "center",
    src: "/images/expressions/default-smile.png",
    alt: "Yifan as a small child in a red knit hat and white fur scarf, smiling quietly",
  },
  left: {
    direction: "left",
    src: "/images/expressions/look-left.png",
    alt: "Yifan as a small child winking, with a mischievous grin",
  },
  right: {
    direction: "right",
    src: "/images/expressions/look-right.png",
    alt: "Yifan as a small child laughing with an open mouth",
  },
  up: {
    direction: "up",
    src: "/images/expressions/look-up.png",
    alt: "Yifan as a small child tilting her chin up, lips pursed in curiosity",
  },
  down: {
    direction: "down",
    src: "/images/expressions/look-down.png",
    alt: "Yifan as a small child with her lips pressed together, looking quietly downward",
  },
  corner: {
    direction: "corner",
    src: "/images/expressions/extra-expression-1.png",
    alt: "Yifan as a small child puffing out her cheeks in a pretend sulk",
  },
};

/** Order used by tap / keyboard cycling on touch devices. */
export const EXPRESSION_CYCLE: readonly GazeDirection[] = [
  "center",
  "right",
  "left",
  "up",
  "corner",
  "down",
];

export const EXPRESSION_LIST: readonly Expression[] = EXPRESSION_CYCLE.map(
  (direction) => EXPRESSIONS[direction],
);
