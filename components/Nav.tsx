"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, sections } from "@/lib/content";
import ThemeToggle from "./ThemeToggle";

// Sticky sketched nav. A wobbly pastel pill slides to whichever section you are
// reading, changing colour per section.
export default function Nav() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const update = () => {
      const mid = window.innerHeight * 0.4;
      let id: string | null = null;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top <= mid && r.bottom > mid) id = el.id;
      }
      setActive(id);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="#top" aria-label="Back to the top">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <path className="logo-blob" filter="url(#boil)" d="M20 3 C31 2 38 10 37 21 C36 32 28 38 19 37 C9 36 3 29 3 19 C4 9 10 4 20 3 Z" />
            <path className="logo-ink" d="M13 15 L9 20 L13 25 M27 15 L31 20 L27 25 M22 13 L18 27" />
          </svg>
          <span>{profile.handle}</span>
        </a>
        <nav aria-label="Sections" className="nav-scroll inked">
          <LayoutGroup id="nav">
            <ul className="nav-links">
              {sections.map((s) => (
                <li key={s.id}>
                  {active === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="nav-indicator"
                      aria-hidden="true"
                      style={{ backgroundColor: s.color }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <a href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined}>{s.label}</a>
                </li>
              ))}
            </ul>
          </LayoutGroup>
        </nav>
        <div className="nav-tools">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
