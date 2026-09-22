"use client";

import { motion, useReducedMotion } from "motion/react";
import { InteractivePortrait } from "./InteractivePortrait";
import { HandDrawnUnderline } from "./sketch/HandDrawnUnderline";
import { SketchMoon } from "./sketch/SketchMoon";
import { SketchStar } from "./sketch/SketchStar";

const CAREER = [
  {
    year: "2026",
    title: "AI 产品落地",
    description:
      "参与考古三维复原与陶片智能拼合系统建设，推动两款本地 AI 产品完成交付。",
  },
  {
    year: "2026",
    title: "独立产品实践",
    description:
      "独立完成 AIGC 产品的需求定义、原型开发、用户测试与迭代验证。",
  },
  {
    year: "2024",
    title: "AIGC 模型评测",
    description:
      "参与文生图模型美学评测体系建设，完成 30+ 项标签设计与约 2,000 条样本标注。",
  },
  {
    year: "2020—2021",
    title: "智能设计探索",
    description:
      "参与视觉生成规则整理与效果评审，将设计经验转化为生成规则和评价标准。",
  },
] as const;

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.72,
            delay,
            ease: [0.22, 0.61, 0.36, 1] as const,
          },
        };

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-svh w-full max-w-[1180px] items-center px-6 pb-20 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pb-24 lg:pt-36"
    >
      <SketchMoon className="pointer-events-none absolute right-[3%] top-[15%] hidden h-6 w-6 text-ink-faint lg:block" />

      <div className="grid w-full min-w-0 items-start gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-11">
        <div className="min-w-0 lg:col-span-6 lg:col-start-1 lg:pt-2 xl:pt-0">
          <motion.div {...rise(0)}>
            <p className="flex max-w-full items-center gap-2.5 font-editorial text-[0.72rem] font-medium uppercase leading-relaxed tracking-[0.24em] text-hero-muted sm:text-[0.78rem] sm:tracking-[0.26em]">
              <SketchStar className="h-2.5 w-2.5 shrink-0" />
              <span>AI Product Manager · AIGC Builder</span>
            </p>
          </motion.div>

          <motion.div {...rise(0.09)} className="relative mt-8">
            <SketchStar className="pointer-events-none absolute right-[7%] top-[0.15em] hidden h-4 w-4 -rotate-6 text-ink-faint sm:block lg:right-[1%]" />
            <h1 className="font-hero-display text-[clamp(3.5rem,5vw,5.125rem)] font-light leading-[0.98] tracking-[-0.025em] text-ink max-lg:text-[clamp(2.625rem,13vw,4rem)]">
              <span className="block">Building AI</span>
              <span className="relative block w-fit">
                into real products
                <motion.span
                  aria-hidden="true"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : 0.8,
                    delay: prefersReducedMotion ? 0 : 0.58,
                    ease: [0.22, 0.61, 0.36, 1],
                  }}
                  className="absolute -bottom-[0.08em] left-[8%] h-[0.11em] w-[46%] origin-left text-coral"
                >
                  <HandDrawnUnderline className="h-full w-full" strokeWidth={1.1} />
                </motion.span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            {...rise(0.2)}
            className="mt-9 max-w-[38rem] font-editorial-cn text-[1.0625rem] font-light leading-[1.85] text-ink-soft sm:text-[1.16rem]"
          >
            我关注的不只是模型能做什么，
            <br className="hidden sm:block" />
            更在意如何把它变成清晰、可靠、真正有人使用的产品。
          </motion.p>
        </div>

        <div className="relative min-w-0 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:-mt-10 lg:self-center">
          <InteractivePortrait />
        </div>

        <div className="min-w-0 lg:col-span-6 lg:col-start-1">
          <ol aria-label="职业经历" className="mt-1">
            {CAREER.map((item, index) => (
              <motion.li
                key={`${item.year}-${item.title}`}
                {...rise(0.3 + index * 0.07)}
                className="grid grid-cols-[5.6rem_1rem_minmax(0,1fr)] gap-x-3 sm:grid-cols-[6.4rem_1.1rem_minmax(0,1fr)] sm:gap-x-4"
              >
                <time
                  className={[
                    "pt-[0.08rem] font-editorial text-[0.9rem] font-medium leading-[1.55] tabular-nums sm:text-[0.96rem]",
                    index === 0 ? "text-coral" : "text-ink-soft",
                  ].join(" ")}
                >
                  {item.year}
                </time>

                <span className="relative flex justify-center" aria-hidden="true">
                  {index < CAREER.length - 1 ? (
                    <span className="absolute bottom-0 top-[0.78rem] w-px bg-rule" />
                  ) : null}
                  <span
                    className={[
                      "relative mt-[0.42rem] h-2 w-2 rounded-full",
                      index === 0 ? "bg-coral" : "bg-rule-strong",
                    ].join(" ")}
                  />
                </span>

                <div className={index < CAREER.length - 1 ? "pb-6" : "pb-0"}>
                  <h2 className="font-editorial-cn text-[1rem] font-normal leading-[1.5] text-ink sm:text-[1.08rem]">
                    {item.title}
                  </h2>
                  <p className="mt-1 font-editorial-cn text-[0.87rem] font-light leading-[1.72] text-hero-muted sm:text-[0.94rem]">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <motion.div {...rise(0.64)} className="mt-10">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 pb-1 font-editorial-cn text-[0.96rem] font-normal text-ink-soft transition-colors duration-200 hover:text-coral focus-visible:text-coral focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-coral sm:text-[1rem]"
            >
              <span>继续探索我的 AIGC 实践</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none"
              >
                →
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left bg-ink-faint/55 transition-colors duration-200 group-hover:bg-coral group-focus-visible:bg-coral" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
