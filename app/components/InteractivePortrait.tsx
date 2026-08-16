"use client";

/* eslint-disable @next/next/no-img-element -- the crossfade needs a stack of
   raw <img> layers whose opacity and depth are driven directly; next/image
   would wrap each one and break the shared coordinate space. */

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  EXPRESSION_CYCLE,
  EXPRESSION_LIST,
  EXPRESSIONS,
  PORTRAIT_HEIGHT,
  PORTRAIT_WIDTH,
  type GazeDirection,
} from "./expressions";
import { SketchWave } from "./sketch/SketchWave";

/** Half-width of the dead zone around the viewport centre. */
const ENTER_THRESHOLD = 0.18;
/** Lower bound for leaving a direction, so a trembling cursor cannot flicker. */
const EXIT_THRESHOLD = 0.12;
/** Beyond this on both axes the cursor sits in a far corner: easter-egg face. */
const CORNER_THRESHOLD = 0.68;

const MAX_SHIFT_X = 12;
const MAX_SHIFT_Y = 8;
const MAX_ROTATE = 1.5;

const CROSSFADE_MS = 220;
/** Milliseconds of inactivity after which a tapped face returns to the smile. */
const TOUCH_RESET_DELAY = 4000;

const SPRING = { stiffness: 110, damping: 20, mass: 0.6 } as const;

function resolveDirection(
  x: number,
  y: number,
  previous: GazeDirection,
): GazeDirection {
  const absX = Math.abs(x);
  const absY = Math.abs(y);

  // The dead zone is wider once a direction is active, which is what keeps a
  // trembling cursor from oscillating across the boundary.
  const threshold = previous === "center" ? ENTER_THRESHOLD : EXIT_THRESHOLD;
  if (absX < threshold && absY < threshold) return "center";

  if (absX > CORNER_THRESHOLD && absY > CORNER_THRESHOLD) return "corner";

  if (absX >= absY) return x < 0 ? "left" : "right";
  return y < 0 ? "up" : "down";
}

function createZIndexMap(): Record<GazeDirection, number> {
  return { center: 1, left: 0, right: 0, up: 0, down: 0, corner: 0 };
}

export function InteractivePortrait() {
  const prefersReducedMotion = useReducedMotion();

  const [direction, setDirection] = useState<GazeDirection>("center");
  /**
   * The last portrait that finished fading in. It stays fully opaque
   * underneath the incoming one so the stack is never partly transparent —
   * that is what removes the wash-out flash during a crossfade.
   */
  const [anchor, setAnchor] = useState<GazeDirection>("center");
  const [pointerIsFine, setPointerIsFine] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);

  const [zIndexMap, setZIndexMap] =
    useState<Record<GazeDirection, number>>(createZIndexMap);

  const directionRef = useRef<GazeDirection>("center");
  const anchorRef = useRef<GazeDirection>("center");
  const anchorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pointerRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const cycleIndexRef = useRef(0);
  const touchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const tilt = useMotionValue(0);
  const springX = useSpring(parallaxX, SPRING);
  const springY = useSpring(parallaxY, SPRING);
  const springTilt = useSpring(tilt, SPRING);

  const applyDirection = useCallback((next: GazeDirection) => {
    if (directionRef.current === next) return;
    directionRef.current = next;

    // Returning to the anchor means simply fading the layers above it away, so
    // it must keep its existing depth instead of jumping to the top.
    if (next !== anchorRef.current) {
      setZIndexMap((previous) => ({
        ...previous,
        [next]: Math.max(...Object.values(previous)) + 1,
      }));
    }
    setDirection(next);

    if (anchorTimerRef.current !== null) clearTimeout(anchorTimerRef.current);
    anchorTimerRef.current = setTimeout(() => {
      if (directionRef.current !== next) return;
      anchorRef.current = next;
      setAnchor(next);
    }, CROSSFADE_MS + 40);
  }, []);

  const resetToCenter = useCallback(() => {
    applyDirection("center");
    cycleIndexRef.current = 0;
    parallaxX.set(0);
    parallaxY.set(0);
    tilt.set(0);
  }, [applyDirection, parallaxX, parallaxY, tilt]);

  // Fetch and decode every portrait up front so a switch never waits on I/O.
  useEffect(() => {
    EXPRESSION_LIST.forEach((expression) => {
      const image = new Image();
      image.decoding = "async";
      image.src = expression.src;
      void image.decode?.().catch(() => {});
    });
  }, []);

  // Only a device with a real hovering pointer gets the mousemove behaviour.
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setPointerIsFine(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!pointerIsFine) return;

    const flush = () => {
      frameRef.current = null;
      const { x, y } = pointerRef.current;
      applyDirection(resolveDirection(x, y, directionRef.current));

      if (!prefersReducedMotion) {
        parallaxX.set(x * MAX_SHIFT_X);
        parallaxY.set(y * MAX_SHIFT_Y);
        tilt.set(x * MAX_ROTATE);
      }
    };

    const handleMove = (event: MouseEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      if (halfWidth === 0 || halfHeight === 0) return;

      pointerRef.current = {
        x: (event.clientX - halfWidth) / halfWidth,
        y: (event.clientY - halfHeight) / halfHeight,
      };
      setHintVisible(false);

      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(flush);
      }
    };

    const handleMouseOut = (event: MouseEvent) => {
      // relatedTarget is null only when the cursor truly leaves the window.
      if (event.relatedTarget !== null) return;
      pointerRef.current = { x: 0, y: 0 };
      resetToCenter();
    };

    const handleBlur = () => {
      pointerRef.current = { x: 0, y: 0 };
      resetToCenter();
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("blur", handleBlur);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [
    applyDirection,
    parallaxX,
    parallaxY,
    pointerIsFine,
    prefersReducedMotion,
    resetToCenter,
    tilt,
  ]);

  useEffect(() => {
    return () => {
      if (touchTimerRef.current !== null) clearTimeout(touchTimerRef.current);
      if (anchorTimerRef.current !== null) clearTimeout(anchorTimerRef.current);
    };
  }, []);

  /** One step through the expression cycle, used by taps and Enter/Space. */
  const cycleExpression = useCallback(() => {
    cycleIndexRef.current = (cycleIndexRef.current + 1) % EXPRESSION_CYCLE.length;
    applyDirection(EXPRESSION_CYCLE[cycleIndexRef.current]);
    setHintVisible(false);

    if (touchTimerRef.current !== null) clearTimeout(touchTimerRef.current);
    touchTimerRef.current = setTimeout(() => {
      cycleIndexRef.current = 0;
      applyDirection("center");
    }, TOUCH_RESET_DELAY);
  }, [applyDirection]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") {
        return;
      }
      event.preventDefault();
      cycleExpression();
    },
    [cycleExpression],
  );

  const activeExpression = EXPRESSIONS[direction];

  return (
    <div className="flex w-full flex-col items-center">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0 : 0.7,
          delay: prefersReducedMotion ? 0 : 0.25,
          ease: "easeOut",
        }}
        className="w-full"
      >
        <motion.div
          style={
            prefersReducedMotion
              ? undefined
              : { x: springX, y: springY, rotate: springTilt }
          }
          className="mx-auto w-full max-w-[290px] sm:max-w-[400px] lg:max-w-[min(560px,62vh)]"
        >
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -4, 0] }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative"
          >
            <div
              role="button"
              tabIndex={0}
              aria-label={`Childhood portrait of Yifan. Current expression: ${activeExpression.alt}. Press Enter or Space to change it.`}
              onClick={pointerIsFine ? undefined : cycleExpression}
              onKeyDown={handleKeyDown}
              className="relative mx-auto aspect-[575/680] w-full touch-manipulation select-none outline-none focus-visible:ring-1 focus-visible:ring-ink/30 focus-visible:ring-offset-8 focus-visible:ring-offset-paper"
            >
              {EXPRESSION_LIST.map((expression) => {
                const isActive = expression.direction === direction;
                const isVisible = isActive || expression.direction === anchor;
                return (
                  <img
                    key={expression.direction}
                    src={expression.src}
                    alt={isActive ? expression.alt : ""}
                    aria-hidden={isActive ? undefined : "true"}
                    width={PORTRAIT_WIDTH}
                    height={PORTRAIT_HEIGHT}
                    draggable={false}
                    decoding="async"
                    fetchPriority={
                      expression.direction === "center" ? "high" : "low"
                    }
                    className="pointer-events-none absolute inset-0 h-full w-full select-none object-contain transition-opacity ease-out"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      zIndex: zIndexMap[expression.direction],
                      transitionDuration: `${CROSSFADE_MS}ms`,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* The cutout floats: instead of a panel or a drop shadow it is given a
          few pen strokes of water to sit on. The photographs carry ~8% empty
          space below the subject, so the water is pulled up into it. */}
      <SketchWave className="-mt-[7%] h-5 w-[64%] text-rule sm:h-6" />

      <motion.p
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: hintVisible ? 1 : 0 }}
        transition={{ duration: 0.8, delay: hintVisible ? 1.4 : 0 }}
        className="mt-6 text-center font-hand text-xl text-ink-faint"
      >
        {pointerIsFine
          ? "move your mouse — say hello to the little me"
          : "tap the photograph — say hello to the little me"}
      </motion.p>
    </div>
  );
}

export default InteractivePortrait;
