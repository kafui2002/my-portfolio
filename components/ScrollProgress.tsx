"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { useScrollTo } from "./SmoothScroll";
import DoodleButton from "./DoodleButton";

const SQUIGGLE = "M0 5 " + Array.from({ length: 20 }, (_, i) => (i === 0 ? "Q 25 0 50 5" : `T ${50 * (i + 1)} 5`)).join(" ");

// A hand-drawn squiggle across the top that fills as you read, and a
// back-to-top button whose ring shows the same progress.
export default function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  const [show, setShow] = useState(false);
  const scrollTo = useScrollTo();
  useMotionValueEvent(scrollY, "change", (v) => setShow(v > window.innerHeight * 0.6));

  return (
    <>
      <div className="progress" aria-hidden="true">
        <svg viewBox="0 0 1000 10" preserveAspectRatio="none">
          <motion.path d={SQUIGGLE} style={{ pathLength: progress }} />
        </svg>
      </div>
      <AnimatePresence>
        {show && (
          <motion.div
            className="to-top-wrap"
            initial={{ opacity: 0, y: 24, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            {/* The ring sits beside the button (not inside it) so it stays centred on the button face. */}
            <svg className="ring" viewBox="0 0 72 72" aria-hidden="true">
              <circle className="ring-track" cx="36" cy="36" r="33" />
              <motion.circle cx="36" cy="36" r="33" style={{ pathLength: progress }} />
            </svg>
            <DoodleButton className="to-top" aria-label="Back to top" onClick={() => scrollTo("#top")}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path className="ink" d="M12 19V5M6 11l6-6 6 6" /></svg>
            </DoodleButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
