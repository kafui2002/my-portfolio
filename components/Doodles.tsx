"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Shape = "star" | "wave" | "ring" | "spark" | "diamond" | "swirl";
export type DoodleSpec = { shape: Shape; color: string; speed: number; style: React.CSSProperties; size?: number };

const PATHS: Record<Shape, { vb: string; d: string[] }> = {
  star: { vb: "0 0 54 54", d: ["M27 4 L32 21 L50 23 L35 33 L40 50 L27 40 L13 50 L18 33 L4 23 L22 21 Z"] },
  wave: { vb: "0 0 90 30", d: ["M3 15 Q 13 3 23 15 T 43 15 T 63 15 T 87 15"] },
  ring: { vb: "0 0 46 46", d: ["M23 5 a18 18 0 1 0 0.1 0", "M23 15 a8 8 0 1 0 0.1 0"] },
  spark: { vb: "0 0 40 40", d: ["M20 4 V36 M4 20 H36 M9 9 L31 31 M31 9 L9 31"] },
  diamond: { vb: "0 0 60 60", d: ["M30 6 C40 18 52 20 54 30 C52 40 40 42 30 54 C20 42 8 40 6 30 C8 20 20 18 30 6 Z"] },
  swirl: { vb: "0 0 70 40", d: ["M4 30 C 14 4 24 4 30 20 S 50 38 66 8"] },
};

function Doodle({ spec }: { spec: DoodleSpec }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => (reduce ? 0 : v * spec.speed));
  const rotate = useTransform(scrollY, (v) => (reduce ? 0 : v * spec.speed * 0.2));
  const p = PATHS[spec.shape];
  const [, , w, h] = p.vb.split(" ").map(Number);
  const s = spec.size ?? 1;
  return (
    <motion.svg className="dd" style={{ ...spec.style, y, rotate }} width={w * s} height={h * s} viewBox={p.vb}>
      {p.d.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          style={{ stroke: spec.color }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, delay: 0.6 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </motion.svg>
  );
}

// Floating doodles that drift at different speeds as the page scrolls.
export default function Doodles({ items }: { items: DoodleSpec[] }) {
  return (
    <div className="doodles" aria-hidden="true">
      {items.map((d, i) => <Doodle key={i} spec={d} />)}
    </div>
  );
}
