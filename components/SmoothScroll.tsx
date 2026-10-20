"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useRef } from "react";

type ScrollTo = (target: string | number) => void;
const ScrollCtx = createContext<ScrollTo>(() => {});
export const useScrollTo = () => useContext(ScrollCtx);

// Eases wheel and trackpad scrolling with Lenis, and makes every in-page
// "#section" link glide instead of jumping. Reduced-motion users get native scrolling.
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); lenisRef.current = null; };
  }, []);

  const scrollTo = useCallback<ScrollTo>((target) => {
    const nav = document.querySelector<HTMLElement>(".nav");
    const offset = -((nav?.offsetHeight ?? 72) + 8);
    if (target === "#top" || target === 0) {
      lenisRef.current ? lenisRef.current.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0 });
      return;
    }
    if (typeof target === "number") {
      lenisRef.current ? lenisRef.current.scrollTo(target) : window.scrollTo({ top: target });
      return;
    }
    const el = document.querySelector<HTMLElement>(target);
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset, duration: 1.3 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute("href")!;
      e.preventDefault();
      if (href === "#") return;
      scrollTo(href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [scrollTo]);

  return <ScrollCtx.Provider value={scrollTo}>{children}</ScrollCtx.Provider>;
}
