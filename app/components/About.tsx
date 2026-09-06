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
    zh: "我关心模型能做什么，也会认真划定它不该替人决定的地方。",
    en: "I care about what a model can do, and about the decisions it should leave to people.",
  },
  {
    zh: "我喜欢把模糊想法拆成可以运行、测试和复盘的版本。",
    en: "I like turning vague ideas into versions that can run, be tested, and be reconsidered.",
  },
  {
    zh: "网页、游戏、Prompt 或评测表，对我来说都是把想法落地的方法。",
    en: "A website, a game, a prompt, or an evaluation sheet can all be ways of making an idea concrete.",
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
              the me behind the work
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BilingualPair
              className="mt-9"
              zh="我从考古研究和视觉设计走到 AI 产品。研究训练让我习惯追问依据，设计经验让我在意信息最后怎样被人理解。现在我把这两种习惯带进产品：先拆清问题，再让技术进入合适的位置。"
              en="I came to AI products through archaeology and visual design. Research taught me to ask for evidence; design taught me to care about how information is finally understood. I bring both habits into product work: clarify the problem, then decide where technology belongs."
            />
            <a
              href="#relic-3d"
              className="mt-6 inline-flex items-baseline gap-2 border-b border-ink/25 pb-1 font-editorial-cn text-[0.82rem] font-light tracking-[0.08em] text-ink-soft transition-colors duration-300 hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            >
              <span>
                从考古走向交互：RELIC 3D
                <span className="mt-1 block font-editorial text-[0.66rem] uppercase tracking-[0.14em] text-ink-soft">
                  From archaeology to interaction
                </span>
              </span>
              <span aria-hidden="true">↑</span>
            </a>
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
              ask for evidence, leave room for wonder
            </HandwrittenHeading>
          </FadeIn>
        </div>
      </div>
    </JournalSection>
  );
}

export default About;
