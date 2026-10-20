"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/lib/content";
import Doodles from "./Doodles";
import DoodleButton from "./DoodleButton";
import Polaroids from "./Polaroids";

const intro: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % profile.roles.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <section className="hero">
      <Doodles
        items={[
          { shape: "star", color: "var(--purple)", speed: -0.25, style: { left: "4%", top: "12%" } },
          { shape: "wave", color: "var(--pink)", speed: 0.18, style: { left: "46%", top: "6%" } },
          { shape: "ring", color: "var(--blue)", speed: -0.35, style: { right: "5%", bottom: "10%" } },
          { shape: "spark", color: "var(--lilac)", speed: 0.3, style: { left: "38%", bottom: "4%" } },
        ]}
      />
      <div className="wrap hero-grid">
        <motion.div variants={intro} initial={reduce ? false : "hidden"} animate="show">
          <motion.span className="hello" variants={item}>hi there, I&apos;m</motion.span>
          <motion.h1 variants={item}>
            {profile.name}
          </motion.h1>
          <motion.p className="roles" variants={item}>
            <span>I&apos;m a</span>
            <span className="role-swap" aria-live="polite">
              {/* Invisible copies of every role reserve the largest box, so nothing below jumps. */}
              {profile.roles.map((r) => <span key={r} aria-hidden="true" style={{ visibility: "hidden" }}>{r}</span>)}
              <AnimatePresence initial={false}>
                <motion.span
                  key={profile.roles[i]}
                  initial={{ opacity: 0, y: "0.6em", rotate: 3 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: "-0.6em", rotate: -3 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {profile.roles[i]}
                </motion.span>
              </AnimatePresence>
              <svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true">
                <motion.path
                  key={i}
                  d="M2 8 Q 30 2 60 7 T 120 6 T 198 5"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                />
              </svg>
            </span>
          </motion.p>
          <motion.p className="hero-lede" variants={item}>{profile.lede}</motion.p>
          <motion.div className="hero-cta" variants={item}>
            <DoodleButton href="#work">
              See my work
              <svg viewBox="0 0 24 24" aria-hidden="true"><path className="ink" d="M5 12h13M13 6l6 6-6 6" /></svg>
            </DoodleButton>
            <DoodleButton href="#contact">Say hello</DoodleButton>
          </motion.div>
          <motion.div className="status-pill" variants={item}>
            <span className="status-dot" aria-hidden="true" /> {profile.status} · based in {profile.city}
          </motion.div>
        </motion.div>
        <Polaroids />
      </div>
    </section>
  );
}
