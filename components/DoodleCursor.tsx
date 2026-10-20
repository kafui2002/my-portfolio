"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Mode = "idle" | "hover" | "text";

// A hand-drawn, hatch-filled blob that trails the pointer on a spring, with a
// fading ink line behind it. Mouse and trackpad only; touch keeps native input.
export default function DoodleCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("idle");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 32, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 420, damping: 32, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(fine.matches);
    const onChange = () => setEnabled(fine.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const size = () => { canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    size();
    let color = getComputedStyle(root).getPropertyValue("--trail").trim();
    const recolor = () => { color = getComputedStyle(root).getPropertyValue("--trail").trim(); };
    const mo = new MutationObserver(recolor);
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    dark.addEventListener("change", recolor);

    const trail: { x: number; y: number; life: number }[] = [];
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of trail) p.life -= 0.045;
      while (trail.length && trail[0].life <= 0) trail.shift();
      ctx.lineCap = "round";
      ctx.strokeStyle = color;
      for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1], b = trail[i];
        ctx.globalAlpha = b.life * 0.7;
        ctx.lineWidth = 1 + b.life * 4;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = trail.length ? requestAnimationFrame(draw) : 0;
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX); y.set(e.clientY);
      setVisible(true);
      if (!reduce) {
        trail.push({ x: e.clientX, y: e.clientY, life: 1 });
        if (trail.length > 28) trail.shift();
        if (!raf) raf = requestAnimationFrame(draw);
      }
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      setMode(t.closest("input, textarea") ? "text" : t.closest("a, button, label, [role='button'], .skill-list li, .polaroid") ? "hover" : "idle");
    };
    const leave = () => setVisible(false);
    const pd = () => setDown(true);
    const pu = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over);
    document.documentElement.addEventListener("pointerleave", leave);
    window.addEventListener("pointerdown", pd);
    window.addEventListener("pointerup", pu);
    window.addEventListener("resize", size);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("pointerdown", pd);
      window.removeEventListener("pointerup", pu);
      window.removeEventListener("resize", size);
      dark.removeEventListener("change", recolor);
      mo.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;
  const scale = mode === "text" ? 0.45 : mode === "hover" ? (down ? 1.4 : 1.75) : down ? 0.75 : 1;
  const rotate = mode === "hover" ? -12 : down ? 8 : 0;

  return (
    <>
      <canvas ref={canvasRef} className="ink-trail" aria-hidden="true" />
      <motion.div className="cursor" aria-hidden="true" style={{ x: sx, y: sy }} animate={{ opacity: visible ? 1 : 0 }}>
        <motion.svg viewBox="0 0 50 50" animate={{ scale, rotate }} transition={{ type: "spring", stiffness: 380, damping: 18 }}>
          <g filter="url(#boil)">
            <path className="c-fill" d="M25 4 C37 3 46 13 46 25 C46 37 37 46 25 46 C13 46 4 37 4 25 C4 13 13 5 25 4 Z" />
            <path className="c-line" d="M25 4 C37 3 46 13 46 25 C46 37 37 46 25 46 C13 46 4 37 4 25 C4 14 12 6 23 5" />
          </g>
        </motion.svg>
      </motion.div>
      <motion.div className="cursor-dot" aria-hidden="true" style={{ x, y }} animate={{ opacity: visible ? 1 : 0 }} />
    </>
  );
}
