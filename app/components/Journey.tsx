import { SketchSailboat } from "./sketch/SketchSailboat";
import { FadeIn } from "./ui/FadeIn";
import { JournalSection } from "./ui/JournalSection";
import {
  EditorialText,
  HandwrittenHeading,
  SectionLabel,
} from "./ui/typography";

/**
 * Deliberately undated. Nothing here claims a place, a title or a year that
 * has not actually been written down yet.
 */
const CHAPTERS = [
  {
    title: "the beginning",
    body: "A red knit hat, a great deal of wind, and no opinion about any of it.",
  },
  {
    title: "the middle",
    body: "Still happening. Ask me again in a few years.",
  },
  {
    title: "where I am now",
    body: "Learning in public, and changing my mind on purpose.",
  },
] as const;

export function Journey() {
  return (
    <JournalSection id="journey">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative order-2 lg:order-1 lg:col-span-4 lg:col-start-1 lg:pt-6">
          <FadeIn delay={0.12}>
            <SketchSailboat className="h-auto w-36 text-ink sm:w-44" />
          </FadeIn>

          <FadeIn delay={0.2}>
            <HandwrittenHeading
              as="p"
              size="aside"
              className="mt-12 text-ink-soft"
            >
              no map, still going
            </HandwrittenHeading>
          </FadeIn>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-6">
          <FadeIn>
            <SectionLabel>Journey</SectionLabel>
            <HandwrittenHeading className="mt-6 -ml-1">
              how I got here
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <EditorialText className="mt-9 max-w-[44ch]">
              The honest version is that most of it has not been written down
              yet.
            </EditorialText>
          </FadeIn>

          <dl className="mt-14 space-y-11">
            {CHAPTERS.map((chapter, index) => (
              <FadeIn key={chapter.title} delay={0.12 + index * 0.08}>
                <dt className="font-hand text-[1.7rem] text-ink">
                  {chapter.title}
                </dt>
                <dd className="mt-3">
                  <EditorialText className="max-w-[44ch]">
                    {chapter.body}
                  </EditorialText>
                </dd>
              </FadeIn>
            ))}
          </dl>
        </div>
      </div>
    </JournalSection>
  );
}

export default Journey;
