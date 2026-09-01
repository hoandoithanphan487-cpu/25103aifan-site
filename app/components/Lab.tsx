import { SketchSailboat } from "./sketch/SketchSailboat";
import { SketchSparkle } from "./sketch/SketchSparkle";
import { FadeIn } from "./ui/FadeIn";
import { JournalSection } from "./ui/JournalSection";
import {
  BilingualPair,
  HandwrittenHeading,
  SectionLabel,
} from "./ui/typography";

type Experiment = {
  zhTitle: string;
  enTitle: string;
  zh: string;
  en: string;
};

const EXPERIMENTS: readonly Experiment[] = [
  {
    zhTitle: "Prompt 与模型评测",
    enTitle: "Prompt design & evaluation",
    zh: "把“感觉不错”的回答，拆成可以反复检查的标准。",
    en: "Turning “this feels good” into criteria that can be tested again.",
  },
  {
    zhTitle: "AI 交互与生成式叙事",
    enTitle: "Interactive AI & generative narrative",
    zh: "试验模型怎样进入选择、角色和游戏机制。",
    en: "Testing how models can take part in choices, characters, and game systems.",
  },
  {
    zhTitle: "小型产品原型",
    enTitle: "Small product prototypes",
    zh: "先做一个能跑的小东西，再决定要不要继续。",
    en: "Making the smallest working thing before committing to the larger one.",
  },
];

export function Lab() {
  return (
    <JournalSection id="lab">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="relative order-2 lg:order-1 lg:col-span-4 lg:col-start-1 lg:pt-6">
          <FadeIn delay={0.12}>
            <SketchSailboat className="h-auto w-36 text-ink sm:w-44" />
          </FadeIn>
        </div>

        <div className="min-w-0 order-1 lg:order-2 lg:col-span-6 lg:col-start-6">
          <FadeIn>
            <SectionLabel>Lab</SectionLabel>
            <HandwrittenHeading className="mt-6 -ml-1">
              unfinished on purpose
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BilingualPair
              className="mt-9"
              zh="这里留给还没有长成正式项目的东西。有些只是一个能跑的小原型，有些用来验证一个 Prompt、一次交互，或者一个判断标准。做完再决定它值不值得继续。"
              en="This is where unfinished ideas are allowed to stay unfinished. A small prototype may test one prompt, one interaction, or one way of judging an answer. I build it first, then decide whether it deserves to grow."
            />
          </FadeIn>

          <ul className="mt-14 space-y-11">
            {EXPERIMENTS.map((experiment, index) => (
              <li key={experiment.enTitle}>
                <FadeIn delay={0.12 + index * 0.08} className="flex gap-5">
                  <SketchSparkle className="mt-[0.7em] h-2.5 w-2.5 shrink-0 text-ink-faint" />
                  <div className="min-w-0">
                    <p className="font-editorial-cn text-[1.125rem] font-light leading-snug text-ink">
                      {experiment.zhTitle}
                    </p>
                    <p className="mt-1 font-editorial text-[0.92rem] font-light leading-snug break-words text-ink-faint">
                      {experiment.enTitle}
                    </p>
                    <BilingualPair
                      className="mt-4"
                      zh={experiment.zh}
                      en={experiment.en}
                    />
                  </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </JournalSection>
  );
}

export default Lab;
