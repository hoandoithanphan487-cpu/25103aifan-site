import type { ReactNode } from "react";

type JournalSectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

/**
 * A page of the notebook. Sections are separated by air rather than by any
 * change of colour, so the whole site reads as one continuous sheet.
 */
export function JournalSection({ id, children, className }: JournalSectionProps) {
  return (
    <section
      id={id}
      className={[
        "relative mx-auto w-full max-w-[1180px] px-6 sm:px-10 lg:px-16",
        "py-24 sm:py-32 lg:py-40",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </section>
  );
}
