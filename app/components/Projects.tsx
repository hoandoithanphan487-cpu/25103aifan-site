/* eslint-disable @next/next/no-img-element -- This component is also rendered by the static Vite/GitHub Pages entry, where next/image is unavailable. */
import { assetPath } from "../asset";
import { HandDrawnArrow } from "./sketch/HandDrawnArrow";
import { SketchSparkle } from "./sketch/SketchSparkle";
import { SketchMoon } from "./sketch/SketchMoon";
import { SketchSunrise } from "./sketch/SketchSunrise";
import { HandDrawnDivider } from "./sketch/HandDrawnDivider";
import { FadeIn } from "./ui/FadeIn";
import { JournalSection } from "./ui/JournalSection";
import { StackedShots, type Shot } from "./StackedShots";
import {
  BilingualPair,
  HandwrittenHeading,
  SectionLabel,
} from "./ui/typography";

type Project = {
  id: string;
  name: string;
  subtitle: string;
  nameScript: "latin" | "cjk";
  annotation: string;
  role: { zh: string; en: string };
  status: { zh: string; en: string };
  intro: { zh: string; en: string };
  notesLabel: string;
  notes: readonly string[];
  poster: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  showcase: {
    label: string;
    note: string;
    title: string;
    description: string;
    principles: readonly string[];
    shots: readonly Shot[];
    notesHeading: string;
  };
};

const PROJECTS: readonly Project[] = [
  {
    id: "moonshadow-tarot",
    name: "Moonshadow Tarot",
    subtitle: "月影 · AI 塔罗交互体验",
    nameScript: "latin",
    annotation: "a question becomes visible",
    role: {
      zh: "独立开发者 / AI 应用产品经理",
      en: "Independent developer / AI product builder",
    },
    status: {
      zh: "本地可运行 MVP，正式上线准备中",
      en: "Local working MVP, preparing for a future public release",
    },
    intro: {
      zh: "这是一个让用户完成提问、选择牌阵、抽牌和查看 AI 解读的交互产品。我把用户问题、牌阵、牌面、正逆位和牌位整理成结构化输入，再用明确的角色边界、生成顺序和输出格式约束模型。",
      en: "Moonshadow Tarot guides a user from a question to a spread, a draw, and an AI reading. The model receives structured context about the question, cards, orientation, and position instead of an open-ended prompt.",
    },
    notesLabel: "能力说明",
    notes: [
      "产品定义、用户流程与 MVP 规划",
      "Prompt 结构、上下文约束与结构化输出",
      "相关性、牌义一致性、稳定性与安全性评测",
      "超时、异常格式、敏感问题和本地降级处理",
      "单牌与三牌流程，覆盖完整 78 张塔罗牌",
    ],
    poster: {
      src: assetPath("images/projects/moonshadow-tarot-poster.jpg"),
      alt: "Moonshadow Tarot 项目海报：黑色星空笔触、三张塔罗牌与猫的复古纸张插画",
      width: 1003,
      height: 1568,
    },
    showcase: {
      label: "Interface journey",
      note: "从封面到翻牌，让体验一步一步显影",
      title: "让流程清楚，也保留一点仪式感",
      notesHeading: "UI design notes",
      description:
        "我没有把 AI 直接塞进一个聊天框，而是把体验拆成提问、牌阵、抽牌、显影与回望。纸张、墨迹和低干扰动效负责营造氛围；稳定的步骤编号、操作提示与返回路径负责让用户始终知道自己在哪里。",
      principles: [
        "五步任务路径，减少开放式交互的不确定感",
        "品牌插画与交互状态使用同一套视觉语言",
        "重要操作保持明确，并为重抽、保存和异常状态留出出口",
      ],
      shots: [
        {
          src: assetPath("images/projects/gallery/moonshadow-home.jpg"),
          alt: "Moonshadow Tarot 首页：左侧开始占卜，右侧是戴巫师帽的黑猫与夜空",
          label: "01 · Begin / 首页",
          width: 1600,
          height: 900,
        },
        {
          src: assetPath("images/projects/gallery/moonshadow-draw.jpg"),
          alt: "Moonshadow Tarot 抽牌页：中央为待翻开的牌背，右侧是戴巫师帽的黑猫",
          label: "02 · Draw / 抽牌",
          width: 1600,
          height: 900,
        },
      ],
    },
  },
  {
    id: "valley-sprout",
    name: "溪谷新芽",
    subtitle: "AI-assisted 2D cozy farm game",
    nameScript: "cjk",
    annotation: "still growing · 仍在生长",
    role: {
      zh: "产品负责人 / Product Owner",
      en: "Product owner",
    },
    status: {
      zh: "内测版本已完成，玩法仍在迭代",
      en: "Internal build completed, core gameplay still evolving",
    },
    intro: {
      zh: "《溪谷新芽》是一款短篇、低压力的 2D 农场经营游戏。我负责 MVP 范围、玩法规则、功能优先级和验收标准，并协调程序、美术、策划、音频与测试工作。生成式 AI 用于剧情草案、NPC 对话候选和美术概念参考，最终内容保留人工审核。",
      en: "Valley Sprout is a short, low-pressure 2D farming game. I define its MVP, rules, priorities, and acceptance criteria, while coordinating implementation, art, narrative, audio, and testing. Generative AI helps draft narrative, NPC dialogue options, and visual references; final choices remain human-reviewed.",
    },
    notesLabel: "已验证产出",
    notes: [
      "约 10–15 分钟核心试玩",
      "约 45–60 分钟内部 Demo 路径",
      "农场经营、任务、探索、NPC 与存档等基础模块",
      "正在重做资源循环、经济系统和多路线经营策略",
    ],
    poster: {
      src: assetPath("images/projects/valley-sprout-poster.jpg"),
      alt: "溪谷新芽项目海报：山谷农场中村民共同种植作物的复古绘本插画",
      width: 1024,
      height: 1536,
    },
    showcase: {
      label: "World art",
      note: "人物、建筑和山谷，先画清楚再放进游戏",
      title: "先把世界画出来，界面才知道该让开",
      notesHeading: "Art notes",
      description:
        "溪谷新芽的人物、农舍、水车和集市是一套完整的美术设定。游戏里的提示只在需要时出现，真正被看见的仍是这些角色和建筑。",
      principles: [
        "人物、建筑与环境共用同一套暖色与比例",
        "高清设定用于确定气质，像素场景再负责玩法",
        "界面只在需要时出现，不压过世界本身",
      ],
      shots: [
        {
          src: assetPath("images/projects/gallery/valley-characters.jpg"),
          alt: "溪谷新芽人物设定：八位村民与旅人站在溪岸和田埂前",
          label: "01 · Characters / 人物设定",
          width: 1600,
          height: 1066,
        },
        {
          src: assetPath("images/projects/gallery/valley-buildings.jpg"),
          alt: "溪谷新芽建筑设定：农舍、水车、摊位、码头与厨房",
          label: "02 · Buildings / 建筑设定",
          width: 1600,
          height: 1066,
        },
        {
          src: assetPath("images/projects/gallery/valley-environment.jpg"),
          alt: "溪谷新芽环境设定：山谷农场、河道、水车与田地",
          label: "03 · Environment / 环境设定",
          width: 1600,
          height: 1066,
        },
      ],
    },
  },
];

function ProjectName({ project }: { project: Project }) {
  if (project.nameScript === "latin") {
    return (
      <>
        <h3 className="font-hand text-[1.7rem] leading-snug break-words text-ink">
          {project.name}
        </h3>
        <p className="mt-1 font-editorial-cn text-[1rem] font-light leading-snug text-ink-soft">
          {project.subtitle}
        </p>
      </>
    );
  }

  return (
    <>
      <h3 className="font-editorial-cn text-[1.7rem] font-light leading-snug break-words text-ink">
        {project.name}
      </h3>
      <p className="mt-1 font-editorial text-[0.92rem] font-light leading-snug break-words text-ink-faint">
        {project.subtitle}
      </p>
    </>
  );
}

function ProjectPoster({ project, index }: { project: Project; index: number }) {
  const isMoonshadow = index === 0;

  return (
    <figure
      className={[
        "group relative isolate mx-auto w-[min(88%,390px)] lg:w-full lg:max-w-none",
        isMoonshadow ? "lg:ml-5" : "lg:mr-5",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -z-20 -top-14 font-hand text-[6.8rem] leading-none sm:text-[8.5rem] lg:-top-20 lg:text-[10.5rem]",
          isMoonshadow
            ? "-left-5 -rotate-6 text-sea/20 lg:-left-16"
            : "-right-4 rotate-6 text-sand/30 lg:-right-12",
        ].join(" ")}
      >
        0{index + 1}
      </span>

      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -z-10 overflow-hidden border border-ink/10 opacity-[0.14] saturate-50",
          isMoonshadow
            ? "inset-y-[7%] -right-[9%] left-[12%] rotate-3"
            : "inset-y-[7%] right-[12%] -left-[9%] -rotate-3",
        ].join(" ")}
      >
        <img
          src={project.poster.src}
          alt=""
          width={project.poster.width}
          height={project.poster.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-[1.18] object-cover"
        />
      </div>

      <div
        className={[
          "relative border border-ink/10 transition-transform duration-700 ease-out motion-reduce:transition-none",
          "group-hover:-translate-y-1.5 group-hover:rotate-0",
          isMoonshadow ? "-rotate-[1.6deg]" : "rotate-[1.6deg]",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute left-1/2 top-0 z-10 h-7 w-24 -translate-x-1/2 -translate-y-1/2 border-y border-ink/5 bg-paper-deep/90",
            isMoonshadow ? "rotate-3" : "-rotate-3",
          ].join(" ")}
        />
        <img
          src={project.poster.src}
          alt={project.poster.alt}
          width={project.poster.width}
          height={project.poster.height}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 38vw, (min-width: 640px) 60vw, 88vw"
          className="block h-auto w-full"
        />
      </div>

      {isMoonshadow ? (
        <>
          <SketchMoon className="pointer-events-none absolute -right-12 bottom-[23%] hidden h-8 w-8 rotate-12 text-sea/80 sm:block" />
          <HandDrawnArrow className="pointer-events-none absolute -right-16 bottom-[17%] hidden h-8 w-20 -rotate-[68deg] text-sea/70 sm:block" />
        </>
      ) : (
        <SketchSunrise className="pointer-events-none absolute -left-20 bottom-[8%] hidden h-16 w-28 -rotate-6 text-sand sm:block" />
      )}
    </figure>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const isMoonshadow = index === 0;

  return (
    <section className="mt-24 grid min-w-0 items-end gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-10">
      <div
        className={[
          "min-w-0",
          isMoonshadow
            ? "lg:col-span-7 lg:col-start-1"
            : "lg:order-2 lg:col-span-7 lg:col-start-6",
        ].join(" ")}
      >
        <FadeIn delay={0.08}>
          <div className="flex items-end justify-between gap-4 border-b border-rule pb-3">
            <p className="font-editorial text-[0.64rem] uppercase tracking-[0.24em] text-ink-faint">
              {project.showcase.label}
            </p>
            <SketchSparkle
              className={[
                "h-3 w-3 shrink-0",
                isMoonshadow ? "text-sea" : "text-sand",
              ].join(" ")}
            />
          </div>
          <p
            className={[
              "mt-4 font-hand text-[0.95rem] leading-relaxed",
              isMoonshadow ? "text-sea" : "text-ink-faint",
            ].join(" ")}
          >
            {project.showcase.note}
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-7">
            <StackedShots shots={project.showcase.shots} mirror={!isMoonshadow} />
          </div>
        </FadeIn>
      </div>

      <FadeIn
        delay={0.15}
        className={[
          "min-w-0",
          isMoonshadow
            ? "lg:col-span-4 lg:col-start-9"
            : "lg:order-1 lg:col-span-4 lg:col-start-1",
        ].join(" ")}
      >
        <div className="border-t border-rule pt-6 lg:pb-1">
          <p className="font-editorial text-[0.62rem] uppercase tracking-[0.24em] text-ink-faint">
            {project.showcase.notesHeading}
          </p>
          <h4 className="mt-5 font-editorial-cn text-[1.3rem] font-light leading-[1.55] text-ink">
            {project.showcase.title}
          </h4>
          <p className="mt-5 font-editorial-cn text-[0.96rem] font-light leading-[1.9] text-ink-soft">
            {project.showcase.description}
          </p>
          <ul className="mt-7 space-y-3">
            {project.showcase.principles.map((principle) => (
              <li key={principle} className="flex gap-3">
                <SketchSparkle className="mt-[0.55em] h-2 w-2 shrink-0 text-ink-faint" />
                <span className="font-editorial-cn text-[0.88rem] font-light leading-[1.75] text-ink-soft">
                  {principle}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </section>
  );
}

function ProjectDetails({ project, index }: { project: Project; index: number }) {
  const isMoonshadow = index === 0;

  return (
    <div className="relative min-w-0">
      <FadeIn delay={0.02}>
        <p
          className={[
            "mb-9 w-max max-w-full font-hand text-[0.96rem] text-sea sm:mb-11",
            isMoonshadow ? "ml-auto rotate-2" : "-rotate-2 text-ink-faint",
          ].join(" ")}
        >
          {project.annotation}
          <span className="mx-auto mt-0.5 block h-3 w-[72%] rounded-[50%] border-b border-current opacity-60" />
        </p>
      </FadeIn>

      <FadeIn delay={0.04}>
        <ProjectName project={project} />
      </FadeIn>

      <FadeIn delay={0.08}>
        <dl className="mt-8 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 gap-y-4 border-y border-rule py-5">
          <dt className="font-editorial text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
            Role
          </dt>
          <dd className="min-w-0 font-editorial-cn text-[0.93rem] font-light leading-relaxed text-ink-soft">
            {project.role.zh}
            <span className="mt-1 block font-editorial text-[0.78rem] text-ink-faint">
              {project.role.en}
            </span>
          </dd>
          <dt className="font-editorial text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
            Status
          </dt>
          <dd className="min-w-0 font-editorial-cn text-[0.93rem] font-light leading-relaxed text-ink-soft">
            {project.status.zh}
            <span className="mt-1 block font-editorial text-[0.78rem] text-ink-faint">
              {project.status.en}
            </span>
          </dd>
        </dl>
      </FadeIn>

      <FadeIn delay={0.12}>
        <BilingualPair
          className="mt-8"
          zh={project.intro.zh}
          en={project.intro.en}
        />
      </FadeIn>

      <FadeIn delay={0.16}>
        <p className="mt-10 font-editorial-cn text-[0.75rem] font-light tracking-[0.2em] text-ink-faint">
          {project.notesLabel}
        </p>
        <ul className="mt-5 grid gap-x-7 gap-y-3.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {project.notes.map((note) => (
            <li key={note} className="flex min-w-0 gap-3">
              <SketchSparkle className="mt-[0.55em] h-2 w-2 shrink-0 text-ink-faint" />
              <span className="min-w-0 font-editorial-cn text-[0.94rem] font-light leading-[1.75] text-ink-soft">
                {note}
              </span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </div>
  );
}

export function Projects() {
  return (
    <JournalSection id="projects">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-8 lg:col-start-2">
          <FadeIn>
            <SectionLabel>Selected projects</SectionLabel>
            <HandwrittenHeading className="mt-6 -ml-1">
              things I am building
            </HandwrittenHeading>
          </FadeIn>

          <FadeIn delay={0.08}>
            <BilingualPair
              className="mt-9"
              zh="我更愿意用做出来的东西说明自己会什么。这两个项目还在生长，但已经可以运行，也留下了完整的思考和迭代过程。"
              en="I would rather explain what I can do through the things I make. These two projects are still growing, but both already run and have a real trail of decisions behind them."
            />
          </FadeIn>
        </div>

        <div className="mt-28 min-w-0 space-y-32 lg:col-span-12 lg:mt-36 lg:space-y-44">
          {PROJECTS.map((project, index) => (
            <article key={project.id} className="min-w-0">
              {index > 0 ? (
                <HandDrawnDivider className="mb-28 ml-auto mr-auto h-4 w-[min(280px,72%)] -rotate-1 text-rule lg:mb-36" />
              ) : null}

              <div className="grid min-w-0 items-start gap-16 lg:grid-cols-12 lg:gap-10">
                <div
                  className={[
                    "order-1 min-w-0",
                    index === 0
                      ? "lg:order-1 lg:col-span-5 lg:col-start-1 lg:-mt-8"
                      : "lg:order-2 lg:col-span-5 lg:col-start-8 lg:-mt-10",
                  ].join(" ")}
                >
                  <FadeIn delay={0.04}>
                    <ProjectPoster project={project} index={index} />
                  </FadeIn>
                </div>

                <div
                  className={[
                    "order-2 min-w-0",
                    index === 0
                      ? "lg:order-2 lg:col-span-6 lg:col-start-7 lg:pt-24"
                      : "lg:order-1 lg:col-span-6 lg:col-start-1 lg:pt-12",
                  ].join(" ")}
                >
                  <ProjectDetails project={project} index={index} />
                </div>
              </div>
              <ProjectShowcase project={project} index={index} />
            </article>
          ))}
        </div>
      </div>
    </JournalSection>
  );
}

export default Projects;
