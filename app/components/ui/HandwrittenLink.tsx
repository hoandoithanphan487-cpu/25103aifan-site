import { HandDrawnArrow } from "../sketch/HandDrawnArrow";
import { HandDrawnUnderline } from "../sketch/HandDrawnUnderline";

type HandwrittenLinkProps = {
  href: string;
  /** Chinese line — the denser, primary voice. */
  zh: string;
  /** English line — the paler, secondary voice. */
  en: string;
  className?: string;
  /** Set false for navigation, where an arrow would be noise. */
  arrow?: boolean;
};

/**
 * The site has no buttons. Every action is a line of type with a pen stroke
 * that draws itself underneath on hover. Chinese sits in the denser ink;
 * English sits a shade paler beneath it.
 */
export function HandwrittenLink({
  href,
  zh,
  en,
  className,
  arrow = true,
}: HandwrittenLinkProps) {
  return (
    <a
      href={href}
      className={[
        "group inline-flex items-baseline gap-3",
        "transition-colors duration-500 focus-visible:outline-none",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="relative">
        <span className="block font-editorial-cn text-[1rem] font-light leading-snug text-ink-soft transition-colors duration-500 group-hover:text-ink group-focus-visible:text-ink">
          {zh}
        </span>
        <span className="mt-1 block font-editorial text-[0.78rem] font-light leading-snug text-ink-faint">
          {en}
        </span>
        <HandDrawnUnderline
          drawOnHover
          className="absolute -bottom-[0.35em] left-0 h-[0.32em] w-full text-ink"
        />
      </span>
      {arrow ? (
        <HandDrawnArrow className="h-[0.55em] w-[1.5em] shrink-0 translate-y-[-0.7em] text-ink-soft transition-transform duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:translate-x-1 motion-reduce:transition-none" />
      ) : null}
    </a>
  );
}
