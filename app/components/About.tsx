import { SketchSparkle } from "./sketch/SketchSparkle";
import { SketchSunrise } from "./sketch/SketchSunrise";
import { FadeIn } from "./ui/FadeIn";
import { JournalSection } from "./ui/JournalSection";
import {
  BilingualPair,
  HandwrittenHeading,
  SectionLabel,
} from "./ui/typography";

/** Things I keep coming back to, in place of a list of things I have done. */
const NOTES = [
  {
    zh: "我会留意光，留意天气，也留意人们告别的方式。",
    en: "I notice light, and weather, and the way people say goodbye.",
  },
  {
    zh: "我宁愿开始得笨拙，也不愿一直没有开始。",
    en: "I would rather begin badly than not begin at all.",
  },
  {
    zh: "我还在决定自己是谁，并且已经决定，这是被允许的。",
    en: "I am still deciding who I am, and I have decided that is allowed.",
  },
] as const;

export function About() {
  return (
    <JournalSection id="about">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 lg:col-start-1">
          <FadeIn>
            <SectionLabel>About</SectionLabel>
            <HandwrittenHeading className="mt-6 -ml-1">
              the me of today
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BilingualPair
              className="mt-9"
              zh="我从未把自己说清楚过——过一年再读，那些句子就不再像我。所以与其列一份做过的事，不如写下一直回来的念头。"
              en="I have never managed to describe myself in a way that survives being read back a year later. So instead of a list of things I have done, here is what keeps coming back."
            />
          </FadeIn>

          <ul className="mt-12 space-y-10">
            {NOTES.map((note, index) => (
              <li key={note.en}>
                <FadeIn delay={0.12 + index * 0.08} className="flex gap-5">
                  <SketchSparkle className="mt-[0.7em] h-2.5 w-2.5 shrink-0 text-ink-faint" />
                  <BilingualPair zh={note.zh} en={note.en} />
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <FadeIn delay={0.16}>
            <SketchSunrise className="h-auto w-40 text-ink sm:w-48 lg:ml-auto lg:w-52" />
          </FadeIn>

          <FadeIn delay={0.24}>
            <HandwrittenHeading
              as="p"
              size="aside"
              className="mt-14 text-ink-soft lg:mt-24 lg:text-right"
            >
              let the quiet parts count
            </HandwrittenHeading>
          </FadeIn>
        </div>
      </div>
    </JournalSection>
  );
}

export default About;
