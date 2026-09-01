"use client";

import { motion, useReducedMotion } from "motion/react";
import { InteractivePortrait } from "./InteractivePortrait";
import { SketchMoon } from "./sketch/SketchMoon";
import { SketchStar } from "./sketch/SketchStar";
import { HandwrittenLink } from "./ui/HandwrittenLink";
import {
  BilingualPair,
  HandwrittenHeading,
  SectionLabel,
} from "./ui/typography";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.9,
            delay,
            ease: [0.22, 0.61, 0.36, 1] as const,
          },
        };

  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-svh w-full max-w-[1180px] flex-col justify-center px-6 pb-20 pt-32 sm:px-10 sm:pt-36 lg:px-16 lg:pb-24 lg:pt-36"
    >
      {/* Decoration lives in the margins, and only where there is room for it. */}
      <SketchMoon className="pointer-events-none absolute right-[3%] top-[15%] hidden h-6 w-6 text-ink-faint lg:block" />

      <div className="grid items-center gap-14 sm:gap-16 md:grid-cols-12 md:gap-6">
        <div className="relative md:col-span-5 md:col-start-1 md:pt-8">
          <motion.div {...rise(0)}>
            <SectionLabel className="max-w-full min-w-0 flex-wrap">
              AI product maker · independent builder
            </SectionLabel>
          </motion.div>

          <motion.div {...rise(0.1)} className="relative">
            <SketchStar className="pointer-events-none absolute right-[6%] top-[0.4em] hidden h-4 w-4 -rotate-6 text-ink-faint sm:block lg:right-[-4%]" />
            {/* Broken by hand rather than by the container, so the name gets a
                line of its own and the phrase cascades the way it would in a
                notebook. */}
            <HandwrittenHeading as="h1" size="hero" className="mt-7 -ml-1">
              <span className="block">building with AI</span>
              <span className="block pl-[0.7em]">with care</span>
            </HandwrittenHeading>
          </motion.div>

          <motion.div {...rise(0.22)}>
            <BilingualPair
              className="mt-7"
              zh="我是冯一帆。我用 AI 做产品、游戏和交互体验，也记录人与模型一起工作的过程。"
              en="I’m Yifan. I build AI products, games, and interactive experiences, and write about what happens when people and models work together."
            />
          </motion.div>

          <motion.div {...rise(0.34)} className="mt-12">
            <HandwrittenLink
              href="#projects"
              zh="看看我做的项目"
              en="see what I’m building"
            />
          </motion.div>
        </div>

        <div className="relative md:col-span-6 md:col-start-7 lg:-mt-10">
          <InteractivePortrait />
        </div>
      </div>
    </section>
  );
}

export default Hero;
