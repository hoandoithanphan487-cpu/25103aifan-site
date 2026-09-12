/* eslint-disable @next/next/no-img-element -- This component is also rendered by the static Vite/GitHub Pages entry, where next/image is unavailable. */
import { Fragment } from "react";
import { PROJECT_CATEGORIES } from "./project-categories";
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
  nameScript: "latin" | "cjk" | "caps";
  annotation: string;
  role: { zh: string; en: string };
  status: { zh: string; en: string };
  intro: { zh: string; en: string };
  notesLabel: string;
  notes: readonly string[];
  live?: {
    href: string;
    zh: string;
    en: string;
  };
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
    aspect?: "standard" | "three-two";
  };
};

const PROJECTS: readonly Project[] = [
  {
    id: "rejoin",
    name: "REJOIN",
    subtitle: "陶片智能拼合与专家确认系统",
    nameScript: "caps",
    annotation: "fragments become evidence",
    role: {
      zh: "产品策划 / AI 工作流 / 交互设计",
      en: "Product strategy / AI workflow / Interaction design",
    },
    status: {
      zh: "公开交互原型，可在线体验",
      en: "Public interactive prototype, available online",
    },
    intro: {
      zh: "REJOIN 面向考古整理与文物修复前期，把陶片边缘、器形、厚度与纹理转化为可比较的多模态特征。系统先从大量碎片中筛出候选，再把轮廓、截面与纹理证据并列呈现，让专家完成最后确认。",
      en: "REJOIN supports early-stage archaeological cataloguing and conservation by comparing edge geometry, vessel form, thickness, and surface texture. It narrows a large fragment collection into explainable candidates, then leaves the final decision to a specialist.",
    },
    notesLabel: "核心设计",
    notes: [
      "统一陶片入库、编号、尺度与影像采集流程",
      "以轮廓、截面、纹理和器形进行分阶段候选筛选",
      "将匹配分数拆解为可核对的视觉证据",
      "保留确认、暂存与排除路径，让专家掌握最终判断",
      "以研究原型验证完整的人机协同工作流",
    ],
    live: {
      href: "https://www.25103aifan.com/rejoin/",
      zh: "体验智能拼合",
      en: "Explore the matching prototype",
    },
    poster: {
      src: assetPath("images/projects/rejoin-poster-v1.png"),
      alt: "REJOIN 项目海报：两块陶片在档案纸与分析图层上接近拼合",
      width: 1024,
      height: 1536,
    },
    showcase: {
      label: "Matching journey",
      note: "从入库到比对，再把最后决定交还给专家",
      title: "让算法缩小范围，让证据支持判断",
      notesHeading: "Human-in-the-loop",
      description:
        "这组图版把系统拆成三个连续动作：先建立可追溯的陶片档案，再从候选中解释为什么相似，最后把拼合关系、截面与纹理证据放回专家工作台。模型负责减少检索成本，专业判断仍由人完成。",
      principles: [
        "采集信息与原始陶片始终保持可追溯关系",
        "候选排序同时呈现轮廓、厚度与纹理依据",
        "确认、暂存与排除共同构成可复核的决策记录",
      ],
      aspect: "three-two",
      shots: [
        {
          src: assetPath("images/projects/gallery/rejoin-intake-v1.png"),
          alt: "陶片入库图版：不同形态的陶片、比例尺与轮廓扫描被整理在档案纸上",
          label: "01 · Intake / 陶片入库",
          width: 1536,
          height: 1024,
        },
        {
          src: assetPath("images/projects/gallery/rejoin-compare-v1.png"),
          alt: "候选比对图版：目标陶片与三个候选陶片通过轮廓、截面和纹理证据进行比较",
          label: "02 · Compare / 候选比对",
          width: 1536,
          height: 1024,
        },
        {
          src: assetPath("images/projects/gallery/rejoin-review-v1.png"),
          alt: "专家确认图版：两块接近拼合的陶片与量具、轮廓图和确认状态共同呈现",
          label: "03 · Review / 专家确认",
          width: 1536,
          height: 1024,
        },
      ],
    },
  },
  {
    id: "relic-3d",
    name: "RELIC 3D",
    subtitle: "地下墓室数字重建与证据可视化",
    nameScript: "caps",
    annotation: "evidence becomes spatial",
    role: {
      zh: "项目策划 / 信息架构 / 交互设计",
      en: "Product concept / Information architecture / Interaction design",
    },
    status: {
      zh: "公开交互原型，可在线体验",
      en: "Public interactive prototype, available online",
    },
    intro: {
      zh: "这是一个面向数字文化遗产的交互项目。我把墓室结构、壁画图像与推定过程组织成可切换的空间信息层，让遗存状态、结构推定和复原方案分别呈现，也能互相对照。",
      en: "RELIC 3D is an interactive digital-heritage project that organizes tomb architecture, mural imagery, and interpretive reasoning into switchable spatial layers. Existing-condition views, structural inference, and restoration proposals remain distinct while easy to compare.",
    },
    notesLabel: "核心设计",
    notes: [
      "把遗存、结构推定与复原方案组织为分层叙事",
      "将墓道、墓室、壁画与图像材料组织在统一空间框架中",
      "设计剖切视图、热点标注与三维漫游路径",
      "以分层状态和说明文字标示记录与推定边界",
    ],
    live: {
      href: assetPath("relic-3d/"),
      zh: "体验三维重建",
      en: "Explore the interactive reconstruction",
    },
    poster: {
      src: assetPath("images/projects/relic-3d-poster.jpg"),
      alt: "RELIC 3D 项目海报：地下土层剖面中，一条斜坡墓道通向彩绘墓室",
      width: 1024,
      height: 1536,
    },
    showcase: {
      label: "Restoration plates",
      note: "以遗存、结构与复原三个视角整理地下墓室",
      title: "把记录、推定与复原分开讲清楚",
      notesHeading: "Visual method",
      description:
        "下方三张图版分别呈现壁画遗存、墓室结构推定和复原方案，用统一的纸张、线稿与赭石色调建立连续阅读。交互网站则进一步把三类信息放回地下空间，让观众理解墓道、墓室与壁画之间的关系。",
      principles: [
        "遗存图版保留残损、色卡与材质线索",
        "结构图以剖切和线框说明地下空间关系",
        "复原图保持与现状材料一致的色彩语气",
      ],
      aspect: "three-two",
      shots: [
        {
          src: assetPath("images/projects/gallery/relic-3d-evidence.jpg"),
          alt: "壁画遗存图版：残损壁画、线描覆片、色卡与表面样本被整理在同一张档案图版中",
          label: "01 · Evidence / 遗存记录",
          width: 1536,
          height: 1024,
        },
        {
          src: assetPath("images/projects/gallery/relic-3d-structure.jpg"),
          alt: "地下墓室结构推定视图：墓道与多间墓室以半透明剖切方式呈现",
          label: "02 · Structure / 结构推定",
          width: 1536,
          height: 1024,
        },
        {
          src: assetPath("images/projects/gallery/relic-3d-restoration.jpg"),
          alt: "地下墓室复原图版：彩绘壁画、墓室空间与侧向通道在纸张图版中呈现",
          label: "03 · Restoration / 复原方案",
          width: 1536,
          height: 1024,
        },
      ],
    },
  },
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
      zh: "已上线，产品仍在持续迭代",
      en: "Live, with continued product iteration",
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
    live: {
      href: "https://moonshadow-tarot.vercel.app",
      zh: "体验月影塔罗",
      en: "Visit Moonshadow Tarot",
    },
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
      zh: "网页版可在线试玩，仍在持续完善",
      en: "Available to play in your browser, with ongoing improvements",
    },
    intro: {
      zh: "《溪谷新芽》是一款短篇、低压力的 2D 农场经营游戏。我负责 MVP 范围、玩法规则、功能优先级和验收标准，并协调程序、美术、策划、音频与测试工作。生成式 AI 用于剧情草案、NPC 对话候选和美术概念参考，最终内容保留人工审核。",
      en: "Valley Sprout is a short, low-pressure 2D farming game. I define its MVP, rules, priorities, and acceptance criteria, while coordinating implementation, art, narrative, audio, and testing. Generative AI helps draft narrative, NPC dialogue options, and visual references; final choices remain human-reviewed.",
    },
    notesLabel: "已验证产出",
    notes: [
      "约 10–15 分钟核心试玩",
      "约 45–60 分钟内部体验路径",
      "农场经营、任务、探索、NPC 与存档等基础模块",
      "正在重做资源循环、经济系统和多路线经营策略",
    ],
    live: {
      href: "https://creek-sprout.vercel.app",
      zh: "在线试玩《溪谷新芽》",
      en: "Play Valley Sprout",
    },
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

  if (project.nameScript === "caps") {
    return (
      <>
        <h3 className="font-editorial text-[1.55rem] font-normal uppercase leading-snug tracking-[0.14em] text-ink sm:text-[1.7rem]">
          {project.name}
        </h3>
        <p className="mt-2 font-editorial-cn text-[1rem] font-light leading-snug text-ink-soft">
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
  const isLeft = index % 2 === 0;
  const isMoonshadow = project.id === "moonshadow-tarot";
  const isValley = project.id === "valley-sprout";

  return (
    <figure
      className={[
        "group relative isolate mx-auto w-[min(88%,390px)] lg:w-full lg:max-w-none",
        isLeft ? "lg:ml-5" : "lg:mr-5",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "pointer-events-none absolute -z-20 -top-14 font-hand text-[6.8rem] leading-none sm:text-[8.5rem] lg:-top-20 lg:text-[10.5rem]",
          isLeft
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
          isLeft
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
          isLeft ? "-rotate-[1.6deg]" : "rotate-[1.6deg]",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "pointer-events-none absolute left-1/2 top-0 z-10 h-7 w-24 -translate-x-1/2 -translate-y-1/2 border-y border-ink/5 bg-paper-deep/90",
            isLeft ? "rotate-3" : "-rotate-3",
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
      ) : isValley ? (
        <SketchSunrise
          className={[
            "pointer-events-none absolute bottom-[8%] hidden h-16 w-28 text-sand sm:block",
            isLeft ? "-right-20 rotate-6" : "-left-20 -rotate-6",
          ].join(" ")}
        />
      ) : null}
    </figure>
  );
}

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const isLeft = index % 2 === 0;
  const isMoonshadow = project.id === "moonshadow-tarot";

  return (
    <section className="mt-24 grid min-w-0 items-end gap-12 lg:mt-32 lg:grid-cols-12 lg:gap-10">
      <div
        className={[
          "min-w-0",
          isLeft
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
            <StackedShots
              shots={project.showcase.shots}
              mirror={!isLeft}
              aspect={project.showcase.aspect}
            />
          </div>
        </FadeIn>
      </div>

      <FadeIn
        delay={0.15}
        className={[
          "min-w-0",
          isLeft
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
  const isLeft = index % 2 === 0;

  return (
    <div className="relative min-w-0">
      <FadeIn delay={0.02}>
        <p
          className={[
            "mb-9 w-max max-w-full font-hand text-[0.96rem] text-sea sm:mb-11",
            isLeft ? "ml-auto rotate-2" : "-rotate-2 text-ink-faint",
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

      {project.live ? (
        <FadeIn delay={0.2}>
          <a
            href={project.live.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.live.zh} / ${project.live.en}（在新标签页打开）`}
            className="group mt-10 inline-flex max-w-full flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-ink/35 pb-1.5 text-ink transition-colors duration-300 hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <span className="font-editorial-cn text-[0.95rem] font-light tracking-[0.08em]">
              {project.live.zh}
            </span>
            <span className="font-editorial text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft">
              {project.live.en}
            </span>
            <span
              aria-hidden="true"
              className="text-[0.9rem] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
            >
              ↗
            </span>
          </a>
        </FadeIn>
      ) : null}
    </div>
  );
}

/**
 * 《白玫瑰来信》入口。
 *
 * 使用已选定的玫瑰与来信海报，沿用站点的纸张、胶带与文字排版。
 * 游戏本身是 /white-roses/ 下的独立静态页面，打开即玩，不需要登录。
 */
function RoseLetterEntry() {
  return (
    <section className="min-w-0 pt-24 lg:pt-32">
      <HandDrawnDivider className="mb-16 ml-auto mr-auto h-4 w-[min(280px,72%)] rotate-1 text-rule lg:mb-24" />

      <FadeIn delay={0.04}>
        <div className="relative mx-auto min-w-0 max-w-[64rem] border border-rule bg-paper-deep/50 px-7 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-9 left-2 font-hand text-[3.4rem] leading-none text-sea/25 sm:text-[4.4rem]"
          >
            ✾
          </span>

          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <figure className="relative mx-auto w-[min(88%,390px)] min-w-0 lg:col-span-5 lg:w-full">
              <div className="relative -rotate-[1.6deg] border border-ink/10">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-0 z-10 h-7 w-24 -translate-x-1/2 -translate-y-1/2 rotate-3 border-y border-ink/5 bg-paper-deep/90"
                />
                <img
                  src={assetPath("images/projects/white-roses-poster.png")}
                  alt="《白玫瑰来信》海报：米白纸面上的白玫瑰、信封与蓝夜拱窗"
                  width={1024}
                  height={1536}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
              </div>
            </figure>

            <div className="min-w-0 lg:col-span-7">
              <div className="min-w-0">
                <SectionLabel>New interactive work</SectionLabel>

                <p className="mt-7 w-max max-w-full -rotate-1 font-hand text-[0.96rem] text-sea">
                  a letter finally read
                  <span className="mx-auto mt-0.5 block h-3 w-[72%] rounded-[50%] border-b border-current opacity-60" />
                </p>

                <h3 className="mt-5 font-editorial-cn text-[1.75rem] font-light leading-snug text-ink sm:text-[2.1rem]">
                  白玫瑰来信
                </h3>
                <p className="mt-1.5 font-editorial text-[0.92rem] font-light leading-snug text-ink-faint">
                  Letter of an Unknown Woman
                </p>

                <p className="mt-7 max-w-[38rem] font-editorial-cn text-[1.0625rem] font-light leading-[1.95] text-ink-soft sm:text-[1.125rem]">
                  以女主人公视角展开的六章互动叙事，探索旧物、作出选择，读完一封迟来的信。
                </p>
                <p className="mt-1.5 max-w-[38rem] font-editorial text-[0.92rem] font-light leading-[1.75] text-ink-faint sm:text-[0.98rem]">
                  A six-chapter interactive narrative told in her own voice: explore
                  the objects she kept, make her choices, and finish a letter that
                  arrived too late.
                </p>
              </div>

              <div className="mt-8 min-w-0">
                <dl className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 gap-y-3 border-y border-rule py-5">
                  <dt className="font-editorial text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                    Format
                  </dt>
                  <dd className="min-w-0 font-editorial-cn text-[0.93rem] font-light leading-relaxed text-ink-soft">
                    六章 · 十八件旧物 · 三种结局
                    <span className="mt-1 block font-editorial text-[0.78rem] text-ink-faint">
                      Six chapters, eighteen objects, three endings
                    </span>
                  </dd>
                  <dt className="font-editorial text-[0.62rem] uppercase tracking-[0.22em] text-ink-faint">
                    Play
                  </dt>
                  <dd className="min-w-0 font-editorial-cn text-[0.93rem] font-light leading-relaxed text-ink-soft">
                    浏览器中直接打开，无需登录
                    <span className="mt-1 block font-editorial text-[0.78rem] text-ink-faint">
                      Opens in the browser; progress is saved locally
                    </span>
                  </dd>
                </dl>

                <a
                  href={assetPath("white-roses/")}
                  className="group mt-9 inline-flex min-h-[3rem] max-w-full flex-wrap items-center gap-x-4 gap-y-1 border border-ink/35 px-7 py-3.5 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
                >
                  <span className="font-editorial-cn text-[1rem] font-light tracking-[0.14em]">
                    进入游戏
                  </span>
                  <span className="font-editorial text-[0.68rem] uppercase tracking-[0.18em] text-ink-soft transition-colors duration-300 group-hover:text-paper/75">
                    Enter the story
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-[0.9rem] transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  >
                    →
                  </span>
                </a>

                <p className="mt-4 font-editorial text-[0.72rem] leading-relaxed text-ink-faint">
                  https://www.25103aifan.com/white-roses/
                </p>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
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
              zh="我更愿意用做出来的东西说明自己会什么。这些项目处在不同阶段，但都已经可以运行，也留下了完整的思考和迭代过程。"
              en="I would rather explain what I can do through the things I make. These projects are at different stages, but each one already works and carries a real trail of decisions behind it."
            />
          </FadeIn>
        </div>

        <div className="mt-28 min-w-0 space-y-32 lg:col-span-12 lg:mt-36 lg:space-y-44">
          {PROJECTS.map((project, index) => {
            const category = PROJECT_CATEGORIES.find((item) => item.projectIds[0] === project.id);
            return (
            <Fragment key={project.id}>
              {index > 0 ? (
                <HandDrawnDivider className="mb-28 ml-auto mr-auto h-4 w-[min(280px,72%)] -rotate-1 text-rule lg:mb-36" />
              ) : null}

              <article id={project.id} tabIndex={-1} className="min-w-0">
                {category ? (
                  <div id={category.id} tabIndex={-1} className="mb-24 scroll-mt-8 border-b border-rule pb-5 focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-ink-faint lg:mb-32">
                    <h2 className="font-editorial-cn text-[1.25rem] font-light tracking-[0.08em] text-ink-soft">{category.zh}</h2>
                    <p className="mt-2 font-editorial text-[0.75rem] uppercase tracking-[0.18em] text-ink-faint">{category.en}</p>
                  </div>
                ) : null}
                <div className="grid min-w-0 items-start gap-16 lg:grid-cols-12 lg:gap-10">
                  <div
                    className={[
                      "order-1 min-w-0",
                      index % 2 === 0
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
                      index % 2 === 0
                        ? "lg:order-2 lg:col-span-6 lg:col-start-7 lg:pt-24"
                        : "lg:order-1 lg:col-span-6 lg:col-start-1 lg:pt-12",
                    ].join(" ")}
                  >
                    <ProjectDetails project={project} index={index} />
                  </div>
                </div>
                <ProjectShowcase project={project} index={index} />
              </article>
            </Fragment>
            );
          })}

          <RoseLetterEntry />
        </div>
      </div>
    </JournalSection>
  );
}

export default Projects;
