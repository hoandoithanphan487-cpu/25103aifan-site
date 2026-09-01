import { SketchSparkleTrio } from "./sketch/SketchSparkle";
import { SketchStar } from "./sketch/SketchStar";
import { FadeIn } from "./ui/FadeIn";
import { HandwrittenLink } from "./ui/HandwrittenLink";
import { JournalSection } from "./ui/JournalSection";
import {
  BilingualPair,
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
            <SectionLabel>Contact</SectionLabel>
            <HandwrittenHeading className="mt-6 -ml-1">
              let’s make something useful
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BilingualPair
              className="mt-9"
              zh="如果你正在做 AI 产品、互动体验、游戏或内容项目，欢迎来聊。合作、工作机会，或者只是交换一个还没想清楚的念头，都可以。"
              en="If you are working on an AI product, an interactive experience, a game, or a piece of writing, I would be glad to hear about it. Collaboration, work, or an unfinished thought are all good reasons to say hello."
            />
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
