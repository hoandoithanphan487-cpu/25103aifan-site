"use client";

/* eslint-disable @next/next/no-img-element -- stacked shots need raw img
   layers; next/image would wrap each one and break the shared pile. */

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { HandDrawnUnderline } from "./sketch/HandDrawnUnderline";

const EASE = [0.22, 0.61, 0.36, 1] as const;

/** Places in the pile, front to back — one large page, two peeking out. */
const PLACES = [
  { x: "0%", y: "0%", rotate: -0.7 },
  { x: "-6.8%", y: "-8.5%", rotate: -8 },
  { x: "8.2%", y: "6%", rotate: 6.5 },
] as const;

const PLACES_MIRROR = [
  { x: "0%", y: "0%", rotate: 0.7 },
  { x: "6.8%", y: "-8.5%", rotate: 8 },
  { x: "-8.2%", y: "6%", rotate: -6.5 },
] as const;

export type Shot = {
  src: string;
  alt: string;
  label: string;
  width: number;
  height: number;
};

type StackedShotsProps = {
  shots: readonly Shot[];
  /** Reverse the paper pile for projects placed on the opposite side. */
  mirror?: boolean;
  /** Match archival plates without cropping their evidence bands. */
  aspect?: "standard" | "three-two";
};

export function StackedShots({
  shots,
  mirror = false,
  aspect = "standard",
}: StackedShotsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [front, setFront] = useState(0);
  const places = mirror ? PLACES_MIRROR : PLACES;
  const n = shots.length;
  const current = shots[front];

  const cycle = useCallback(() => {
    setFront((value) => (value + 1) % n);
  }, [n]);

  return (
    <div className="relative">
      <div className="relative px-[9%] pb-[11%] pt-[12%]">
        <div
          className={[
            "relative w-full",
            aspect === "three-two" ? "aspect-[3/2]" : "aspect-[16/10]",
          ].join(" ")}
        >
          {shots.map((shot, index) => {
            const depth = (index - front + n) % n;
            const place = places[Math.min(depth, places.length - 1)];
            const isFront = depth === 0;

            return (
              <motion.div
                key={shot.src}
                initial={false}
                animate={{
                  x: place.x,
                  y: place.y,
                  rotate: place.rotate,
                }}
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : { duration: 0.7, ease: EASE }
                }
                className="absolute inset-0 overflow-hidden border border-ink/10 bg-paper-deep"
                style={{
                  zIndex: n - depth,
                  boxShadow: "none",
                }}
                aria-hidden={!isFront}
              >
                {isFront ? (
                  <span
                    aria-hidden="true"
                    className={[
                      "pointer-events-none absolute left-1/2 top-0 z-10 h-5 w-16 -translate-x-1/2 -translate-y-1/2 border-y border-ink/5 bg-paper-deep/90",
                      mirror ? "-rotate-2" : "rotate-2",
                    ].join(" ")}
                  />
                ) : null}
                <img
                  src={shot.src}
                  alt={isFront ? shot.alt : ""}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="block h-full w-full object-cover object-top"
                />
              </motion.div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={cycle}
          aria-label={`查看下一张：${shots[(front + 1) % n]?.label ?? ""}`}
          className="absolute inset-0 z-20 block w-full cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        />
      </div>

      <p
        aria-live="polite"
        className="px-[9%] font-editorial text-[0.6rem] uppercase tracking-[0.2em] text-ink-soft"
      >
        {current.label}
      </p>

      <p className="group/hint relative mt-4 inline-flex flex-col px-[9%] text-ink-soft">
        <span className="font-editorial-cn text-[0.88rem] font-light leading-none tracking-[0.12em]">
          点一下最上面的画面
        </span>
        <span className="mt-1.5 font-editorial text-[0.58rem] font-normal uppercase leading-none tracking-[0.22em]">
          click the top page
        </span>
        <HandDrawnUnderline
          drawOnHover
          className="absolute -bottom-2 left-[9%] h-[5px] w-[min(12rem,70%)] text-ink group-hover/hint:scale-x-100"
        />
      </p>
    </div>
  );
}

export default StackedShots;
