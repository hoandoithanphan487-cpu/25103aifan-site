"use client";

/* eslint-disable @next/next/no-img-element -- the intro is a timed stack of
   portraits and drawings; next/image would wrap them and break the fade. */

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { assetPath } from "../asset";
import { EXPRESSIONS, PORTRAIT_HEIGHT, PORTRAIT_WIDTH } from "./expressions";
import { SketchMoon } from "./sketch/SketchMoon";
import { SketchSparkle } from "./sketch/SketchSparkle";
import { SketchStar } from "./sketch/SketchStar";
import { SketchWave } from "./sketch/SketchWave";
import {
  SketchBrush,
  SketchConstellation,
  SketchSprout,
  SketchTarot,
} from "./sketch/SplashMotifs";
import { HandDrawnUnderline } from "./sketch/HandDrawnUnderline";

/**
 * Three quiet seconds on paper: the portrait arrives, a few drawings take
 * their places, she laughs, and the page is allowed to begin.
 */
const STORAGE_KEY = "yifan-splash-seen";
const VIDEO_SRC = assetPath("videos/intro.mp4");
const EASE = [0.22, 0.61, 0.36, 1] as const;

const STAR_AT = 80;
const GIRL_AT = 180;
const MOTIFS_AT = 700;
const LAUGH_AT = 1450;
const LINE_AT = 1900;
const EXIT_AT = 4000;
const EXIT_MS = 600;

type Motif = {
  id: string;
  left: string;
  top: string;
  rotate: number;
  delay: number;
  className: string;
  Motif: (props: { className?: string }) => ReactNode;
};

const MOTIFS: readonly Motif[] = [
  {
    id: "sparkle",
    left: "11%",
    top: "13%",
    rotate: 0,
    delay: 0,
    className: "h-3 w-3 text-ink-faint",
    Motif: SketchSparkle,
  },
  {
    id: "tarot",
    left: "6.5%",
    top: "26%",
    rotate: -8,
    delay: 0.12,
    className: "h-14 w-10 text-ink",
    Motif: SketchTarot,
  },
  {
    id: "constellation",
    left: "76%",
    top: "22%",
    rotate: 4,
    delay: 0.2,
    className: "h-11 w-[4.5rem] text-ink-soft",
    Motif: SketchConstellation,
  },
  {
    id: "moon",
    left: "9%",
    top: "71%",
    rotate: -10,
    delay: 0.3,
    className: "h-6 w-6 text-ink-faint",
    Motif: SketchMoon,
  },
  {
    id: "brush",
    left: "89%",
    top: "34%",
    rotate: 14,
    delay: 0.18,
    className: "h-16 w-6 text-ink",
    Motif: SketchBrush,
  },
  {
    id: "sprout",
    left: "86%",
    top: "66%",
    rotate: 6,
    delay: 0.38,
    className: "h-12 w-9 text-ink",
    Motif: SketchSprout,
  },
];

function isRecordMode(): boolean {
  return new URLSearchParams(window.location.search).get("record") === "1";
}

function shouldForceIntro(): boolean {
  return window.location.hash === "#intro" || isRecordMode();
}

export function SplashIntro() {
  const prefersReducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"pending" | "play" | "done">("pending");
  const [useLive, setUseLive] = useState(false);
  const [hideSkip, setHideSkip] = useState(false);
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setExiting(true);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const record = isRecordMode();
      setHideSkip(record);
      setUseLive(record);

      if (prefersReducedMotion && !record) {
        setPhase("done");
        return;
      }

      try {
        if (!shouldForceIntro() && sessionStorage.getItem(STORAGE_KEY) === "1") {
          setPhase("done");
          return;
        }
      } catch {
        // Play anyway if storage is blocked.
      }

      setPhase("play");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "play") return;
    const html = document.documentElement;
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = previous;
    };
  }, [phase]);

  const handleExitComplete = () => {
    if (!exiting) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore.
    }
    setPhase("done");
  };

  if (phase === "done") return null;

  if (phase === "pending") {
    return <div className="fixed inset-0 z-[80] bg-paper" aria-hidden />;
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="开场 Opening"
      data-splash={useLive ? "live" : "video"}
      initial={false}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: EASE }}
      onAnimationComplete={handleExitComplete}
      className="fixed inset-0 z-[80] overflow-hidden bg-paper"
    >
      {hideSkip ? null : (
        <button
          type="button"
          onClick={finish}
          className="group absolute right-6 top-8 z-20 inline-flex flex-col items-end gap-[0.2em] text-ink-faint transition-colors duration-500 hover:text-ink focus-visible:outline-none sm:right-10 lg:right-16 lg:top-10"
        >
          <span className="relative">
            <span className="block font-editorial-cn text-[0.92rem] font-light leading-none tracking-[0.18em]">
              跳过
            </span>
            <span className="mt-1.5 block font-editorial text-[0.6rem] font-normal uppercase leading-none tracking-[0.28em]">
              skip
            </span>
            <HandDrawnUnderline
              drawOnHover
              className="absolute -bottom-2 left-0 h-[5px] w-full text-ink"
            />
          </span>
        </button>
      )}

      {useLive ? (
        <LiveSequence onDone={finish} />
      ) : (
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={finish}
          onError={finish}
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </motion.div>
  );
}

function LiveSequence({ onDone }: { onDone: () => void }) {
  const [starIn, setStarIn] = useState(false);
  const [girlIn, setGirlIn] = useState(false);
  const [motifsIn, setMotifsIn] = useState(false);
  const [laughing, setLaughing] = useState(false);
  const [lineIn, setLineIn] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];

    const quiet = new Image();
    const laugh = new Image();
    quiet.src = EXPRESSIONS.center.src;
    laugh.src = EXPRESSIONS.right.src;

    const start = () => {
      if (cancelled) return;
      timers.push(
        window.setTimeout(() => setStarIn(true), STAR_AT),
        window.setTimeout(() => setGirlIn(true), GIRL_AT),
        window.setTimeout(() => setMotifsIn(true), MOTIFS_AT),
        window.setTimeout(() => setLaughing(true), LAUGH_AT),
        window.setTimeout(() => setLineIn(true), LINE_AT),
        window.setTimeout(onDone, EXIT_AT),
      );
    };

    void Promise.all([
      document.fonts.ready,
      quiet.decode().catch(() => undefined),
      laugh.decode().catch(() => undefined),
    ]).then(start);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-paper">
      <motion.div
        initial={false}
        animate={starIn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="pointer-events-none absolute right-[8%] top-[11%] z-[2]"
      >
        <SketchStar className="h-5 w-5 text-ink-faint" />
      </motion.div>

      {MOTIFS.map((item) => (
        <motion.div
          key={item.id}
          initial={false}
          animate={motifsIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            duration: 0.45,
            delay: item.delay,
            ease: EASE,
          }}
          className="pointer-events-none absolute z-[2]"
          style={{
            left: item.left,
            top: item.top,
            rotate: `${item.rotate}deg`,
          }}
        >
          <item.Motif className={item.className} />
        </motion.div>
      ))}

      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          initial={false}
          animate={girlIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative w-[min(400px,32vw)]"
        >
          <motion.div
            animate={girlIn ? { y: [0, -5, 0] } : { y: 0 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative aspect-[575/680] w-full"
          >
            <img
              src={EXPRESSIONS.center.src}
              alt=""
              width={PORTRAIT_WIDTH}
              height={PORTRAIT_HEIGHT}
              draggable={false}
              decoding="async"
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
              style={{ opacity: laughing ? 0 : 1 }}
            />
            <img
              src={EXPRESSIONS.right.src}
              alt=""
              width={PORTRAIT_WIDTH}
              height={PORTRAIT_HEIGHT}
              draggable={false}
              decoding="async"
              className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300"
              style={{ opacity: laughing ? 1 : 0 }}
            />
          </motion.div>
          <SketchWave className="-mt-[5%] mx-auto h-4 w-[58%] text-rule" />
        </motion.div>
      </div>

      <motion.p
        aria-hidden
        initial={false}
        animate={lineIn ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="pointer-events-none absolute bottom-[8.5%] left-0 right-0 text-center font-hand text-[clamp(1.7rem,3.4vw,2.5rem)] text-ink"
      >
        with care
      </motion.p>
    </div>
  );
}

export default SplashIntro;
