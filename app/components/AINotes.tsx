import { FadeIn } from "./ui/FadeIn";
import { HandwrittenLink } from "./ui/HandwrittenLink";
import { JournalSection } from "./ui/JournalSection";
import {
  BilingualPair,
  HandwrittenHeading,
  SectionLabel,
} from "./ui/typography";

const WECHAT_NOTE_HREF = "https://mp.weixin.qq.com/s/TpvfeBbUiQUuIfV7k2sI_A";

export function AINotes() {
  return (
    <JournalSection id="notes">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-8 lg:col-start-2">
          <FadeIn>
            <SectionLabel>Notes on AI</SectionLabel>
            <HandwrittenHeading className="mt-6 -ml-1 [font-family:var(--font-hand),var(--font-editorial-cn)]">
              AI 星球的随笔
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BilingualPair
              className="mt-9"
              zh="我会把工作中一时想不明白的事写下来：Agent 到底怎样做事，AI 产品如何对待事实，模型能力到了哪里应该停。这里收着我对 AI 产品、人机关系和实际落地问题的观察。"
              en="I write through the questions that stay with me after the work is done: how agents actually act, how AI products should treat facts, and where a model ought to stop. These notes are about AI products, human judgment, and the untidy work of making ideas real."
            />
          </FadeIn>

          <FadeIn delay={0.16} className="mt-12">
            <HandwrittenLink
              href={WECHAT_NOTE_HREF}
              zh="读一篇随笔"
              en="read on WeChat"
              target="_blank"
              rel="noreferrer noopener"
            />
          </FadeIn>
        </div>
      </div>
    </JournalSection>
  );
}

export default AINotes;
