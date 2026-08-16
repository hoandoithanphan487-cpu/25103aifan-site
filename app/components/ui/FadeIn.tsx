"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Everything on the page arrives the same way: slowly, from just below, once.
 * Nothing bounces and nothing scales.
 */
export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.95, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
