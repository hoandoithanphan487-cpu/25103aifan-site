import type { ReactNode } from "react";
import { SketchStar } from "../sketch/SketchStar";

function join(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

const HAND_SIZES = {
  hero: "text-[clamp(2.75rem,7vw,6rem)]",
  section: "text-[clamp(2.5rem,6vw,4.25rem)]",
  aside: "text-[clamp(1.75rem,3.6vw,2.5rem)]",
  note: "text-[clamp(1.35rem,2.4vw,1.75rem)]",
} as const;

type HandwrittenHeadingProps = {
  children: ReactNode;
  className?: string;
  size?: keyof typeof HAND_SIZES;
  as?: "h1" | "h2" | "h3" | "p";
};

/** The emotional voice. Used sparingly, never for long or functional copy. */
export function HandwrittenHeading({
  children,
  className,
  size = "section",
  as: Tag = "h2",
}: HandwrittenHeadingProps) {
  return (
    <Tag className={join("font-hand text-ink", HAND_SIZES[size], className)}>
      {children}
    </Tag>
  );
}

type EditorialTextProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "soft" | "faint";
  as?: "p" | "div" | "span";
};

const TONES = {
  default: "text-ink",
  soft: "text-ink-soft",
  faint: "text-ink-faint",
} as const;

/** The quiet voice: everything that actually has to be read. */
export function EditorialText({
  children,
  className,
  tone = "soft",
  as: Tag = "p",
}: EditorialTextProps) {
  return (
    <Tag
      className={join(
        "font-editorial text-[1.0625rem] font-light leading-[1.85] sm:text-[1.125rem]",
        TONES[tone],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

type BilingualPairProps = {
  zh: string;
  en: string;
  className?: string;
  as?: "p" | "div" | "span" | "li";
};

/**
 * One thought, two languages. Chinese sits in the denser ink and a thin
 * Songti; English sits a line below in a paler Newsreader. The grayscale
 * split is the only distinction — no boxes, no labels.
 */
export function BilingualPair({
  zh,
  en,
  className,
  as: Tag = "p",
}: BilingualPairProps) {
  return (
    <Tag className={join("block max-w-[38rem]", className)}>
      <span className="block font-editorial-cn text-[1.0625rem] font-light leading-[1.95] text-ink-soft sm:text-[1.125rem]">
        {zh}
      </span>
      <span className="mt-1.5 block font-editorial text-[0.92rem] font-light leading-[1.75] text-ink-faint sm:text-[0.98rem]">
        {en}
      </span>
    </Tag>
  );
}

/**
 * A tiny spaced-out label with the star sitting in front of it, the way a
 * margin note is marked in a notebook.
 */
export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={join(
        "flex items-center gap-2.5 font-editorial text-[0.68rem] font-normal uppercase tracking-[0.32em] text-ink-faint",
        className,
      )}
    >
      <SketchStar className="h-2.5 w-2.5 shrink-0" />
      {children}
    </p>
  );
}
