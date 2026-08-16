import { SketchSparkleTrio } from "./sketch/SketchSparkle";
import { SketchStar } from "./sketch/SketchStar";
import { FadeIn } from "./ui/FadeIn";
import { HandwrittenLink } from "./ui/HandwrittenLink";
import { JournalSection } from "./ui/JournalSection";
import {
  EditorialText,
  HandwrittenHeading,
  SectionLabel,
} from "./ui/typography";

/**
 * Left empty on purpose: no address is invented here. Add real entries and
 * they will appear beneath the invitation, in the order given.
 */
export const CONTACT_LINKS: readonly {
  zh: string;
  en: string;
  href: string;
}[] = [];

export function SayHello() {
  return (
    <JournalSection id="contact" className="pb-16 sm:pb-20 lg:pb-24">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:col-start-2">
          <FadeIn>
            <SectionLabel>Say hello</SectionLabel>
            <HandwrittenHeading className="mt-6 -ml-1">
              come say hello
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <EditorialText className="mt-9 max-w-[44ch]">
              If any of this felt familiar, I would like to hear from you. There
              is not very much here yet, which is rather the point — it is a
              notebook, not a monument.
            </EditorialText>
          </FadeIn>

          {CONTACT_LINKS.length > 0 ? (
            <FadeIn delay={0.16}>
              <ul className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
                {CONTACT_LINKS.map((link) => (
                  <li key={link.href}>
                    <HandwrittenLink
                      href={link.href}
                      zh={link.zh}
                      en={link.en}
                    />
                  </li>
                ))}
              </ul>
            </FadeIn>
          ) : null}

          <FadeIn delay={0.24}>
            <HandwrittenHeading
              as="p"
              size="note"
              className="mt-16 text-ink-soft"
            >
              — Yifan
            </HandwrittenHeading>
          </FadeIn>
        </div>

        <div className="relative lg:col-span-4 lg:col-start-9 lg:pt-16">
          <FadeIn delay={0.18}>
            <div className="relative h-24 w-40 sm:h-28 sm:w-48">
              <SketchStar
                face
                className="absolute bottom-0 left-0 h-16 w-16 -rotate-[8deg] text-ink sm:h-20 sm:w-20"
              />
              <SketchSparkleTrio className="absolute right-0 top-0 h-8 w-16 text-ink-faint" />
            </div>
          </FadeIn>
        </div>
      </div>
    </JournalSection>
  );
}

export default SayHello;
