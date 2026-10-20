"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Burst = { id: number; x: number; y: number };

type Props = {
  children: React.ReactNode;
  href?: string;
  external?: boolean;
  className?: string;
  style?: React.CSSProperties;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-pressed"?: boolean;
};

// Little pen strokes that fly out from where you press.
const RAYS = [0, 60, 120, 180, 240, 300].map((deg) => {
  const r = (deg * Math.PI) / 180;
  const p = (d: number) => `${(22 + Math.cos(r) * d).toFixed(1)} ${(22 + Math.sin(r) * d).toFixed(1)}`;
  return `M${p(9)} L${p(17)}`;
});

// The one button style on the site. Shape, shadow and hover/press feedback
// live in CSS (.btn); this adds the press burst and haptic tick.
export default function DoodleButton({ children, href, external, className = "", style, type = "button", disabled, onClick, ...aria }: Props) {
  const reduce = useReducedMotion();
  const [bursts, setBursts] = useState<Burst[]>([]);

  const onDown = (e: React.PointerEvent<HTMLElement>) => {
    if (navigator.vibrate && e.pointerType === "touch") try { navigator.vibrate(8); } catch {}
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    window.setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 600);
  };

  const inner = (
    <>
      {children}
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.svg
            key={b.id}
            className="burst"
            viewBox="0 0 44 44"
            aria-hidden="true"
            style={{ left: b.x, top: b.y }}
            initial={{ scale: 0.4, opacity: 1, rotate: -10 }}
            animate={{ scale: 1.25, opacity: 0, rotate: 8 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {RAYS.map((d) => <path key={d} d={d} />)}
          </motion.svg>
        ))}
      </AnimatePresence>
    </>
  );

  const cls = `btn ${className}`;
  if (href) {
    return (
      <a className={cls} style={style} href={href} onPointerDown={onDown} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...aria}>
        {inner}
      </a>
    );
  }
  return (
    <button className={cls} style={style} type={type} disabled={disabled} onClick={onClick} onPointerDown={onDown} {...aria}>
      {inner}
    </button>
  );
}
