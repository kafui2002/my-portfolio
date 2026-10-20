"use client";

import { motion, useReducedMotion } from "framer-motion";
import { butter, viewOnce } from "@/lib/motion";

// Content rises and settles into place as it scrolls into view. It starts
// partly visible, so nothing is ever hidden waiting for a scroll.
export function Reveal({ children, className, delay = 0, as = "div", style }: {
  children: React.ReactNode; className?: string; delay?: number; as?: "div" | "aside" | "li" | "article"; style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0.3, y: 28, rotate: -0.6 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={viewOnce}
      transition={{ ...butter, delay }}
    >
      {children}
    </M>
  );
}

// Highlighter stroke that swipes in behind a word (wraps cleanly across lines).
export function Mark({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      className="mark"
      initial={{ backgroundSize: "0% 62%" }}
      whileInView={{ backgroundSize: "100% 62%" }}
      viewport={viewOnce}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
    >
      {children}
    </motion.span>
  );
}

export function Squiggle() {
  return (
    <svg className="squiggle" viewBox="0 0 150 16" aria-hidden="true">
      <motion.path
        d="M3 10 Q 20 2 37 9 T 72 9 T 108 8 T 147 7"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewOnce}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />
    </svg>
  );
}

export function SectionHead({ eyebrow, before, mark, after, children }: {
  eyebrow: string; before: string; mark: string; after?: string; children?: React.ReactNode;
}) {
  return (
    <Reveal className="sec-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{before} <Mark>{mark}</Mark>{after}</h2>
      <Squiggle />
      {children}
    </Reveal>
  );
}
