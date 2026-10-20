"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import DoodleButton from "./DoodleButton";

const KEY = "doodle-theme";

function currentlyDark() {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Sun/moon doodle. Switching paints the new theme outward from the button as
// a circle (View Transitions), or cross-fades where that isn't supported.
export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setDark(currentlyDark());
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => setDark(currentlyDark());
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const next = currentlyDark() ? "light" : "dark";
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
      try { localStorage.setItem(KEY, next); } catch {}
      setDark(next === "dark");
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    if (doc.startViewTransition && !reduce) {
      const r = wrap.current!.getBoundingClientRect();
      const x = r.left + r.width / 2, y = r.top + r.height / 2;
      const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      doc.startViewTransition(apply).ready.then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 750, easing: "cubic-bezier(.22,1,.36,1)", pseudoElement: "::view-transition-new(root)" },
        );
      }).catch(() => {});
    } else {
      root.classList.add("theme-anim");
      apply();
      window.setTimeout(() => root.classList.remove("theme-anim"), 600);
    }
  };

  return (
    <span ref={wrap} style={{ display: "inline-flex" }}>
      <DoodleButton className="btn-icon" onClick={toggle} aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}>
        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ overflow: "visible" }}>
          <motion.g
            initial={false}
            animate={{ opacity: dark ? 0 : 1, rotate: dark ? 90 : 0, scale: dark ? 0.4 : 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            style={{ transformOrigin: "12px 12px" }}
          >
            <circle className="ink" cx="12" cy="12" r="4.2" />
            <path className="ink" d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M5.2 18.8l1.6-1.6M17.2 6.8l1.6-1.6" />
          </motion.g>
          <motion.path
            className="ink"
            d="M19.5 14.8A8 8 0 0 1 9.2 4.5a8 8 0 1 0 10.3 10.3Z"
            initial={false}
            animate={{ opacity: dark ? 1 : 0, rotate: dark ? 0 : -90, scale: dark ? 1 : 0.4 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            style={{ transformOrigin: "12px 12px" }}
          />
        </svg>
      </DoodleButton>
    </span>
  );
}
