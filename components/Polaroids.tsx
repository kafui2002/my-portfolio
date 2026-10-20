"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { hobbies, type Hobby } from "@/lib/content";
import DoodleButton from "./DoodleButton";

// Where each photo lands on the page (percent of the scrapbook area) and how
// it is tilted. Five slots; fewer hobbies just use the first few.
const SLOTS = [
  { left: 1, top: 5, rot: -7 },
  { left: 31, top: 0, rot: 4 },
  { left: 61, top: 6, rot: -3 },
  { left: 15, top: 50, rot: 5 },
  { left: 47, top: 49, rot: -5 },
];
const TINTS = ["var(--pink)", "var(--blue)", "var(--mint)", "var(--butter)", "var(--lilac)"];

const DOODLES: Record<Hobby["doodle"], string[]> = {
  camera: [
    "M18 34 h64 a6 6 0 0 1 6 6 v34 a6 6 0 0 1 -6 6 h-64 a6 6 0 0 1 -6 -6 v-34 a6 6 0 0 1 6 -6 Z",
    "M36 34 l5 -9 h18 l5 9",
    "M50 44 a13 13 0 1 0 0.1 0",
    "M50 51 a6 6 0 1 0 0.1 0",
    "M71 42 h8",
  ],
  music: ["M38 70 V30 L72 22 V62", "M38 40 L72 32", "M31 64 a7 7 0 1 0 0.1 0", "M65 56 a7 7 0 1 0 0.1 0"],
  plant: [
    "M34 62 h32 l-5 24 h-22 Z",
    "M31 62 h38",
    "M50 62 V34",
    "M50 48 C 38 46 31 36 33 27 C 44 29 50 37 50 48",
    "M50 41 C 60 37 68 27 66 18 C 56 20 50 29 50 41",
  ],
  book: [
    "M50 32 C 40 26 26 26 16 30 V76 C 26 72 40 72 50 78 C 60 72 74 72 84 76 V30 C 74 26 60 26 50 32 Z",
    "M50 32 V78",
    "M24 42 h18 M24 50 h16 M24 58 h17 M58 42 h18 M58 50 h14 M58 58 h16",
  ],
  game: [
    "M30 40 h40 c12 0 18 10 18 22 c0 10 -8 14 -14 8 l-8 -8 h-32 l-8 8 c-6 6 -14 2 -14 -8 c0 -12 6 -22 18 -22 Z",
    "M32 47 v12 M26 53 h12",
    "M66 47 a3 3 0 1 0 0.1 0",
    "M73 54 a3 3 0 1 0 0.1 0",
  ],
  bike: ["M28 50 a14 14 0 1 0 0.1 0", "M72 50 a14 14 0 1 0 0.1 0", "M28 64 L44 40 H62 L72 64 M44 40 L54 64 L62 40", "M39 35 h11 M60 33 l4 7"],
  coffee: [
    "M28 44 h40 v20 a14 14 0 0 1 -14 14 h-12 a14 14 0 0 1 -14 -14 Z",
    "M68 50 c11 0 11 14 0 14",
    "M40 36 c-4 -6 4 -10 0 -16 M53 36 c-4 -6 4 -10 0 -16",
  ],
  brush: ["M34 66 L74 26 l6 6 L40 72", "M34 66 c-6 -2 -12 2 -13 8 c-1 4 -4 6 -6 7 c8 2 18 0 22 -5 c2 -3 2 -6 -3 -10 Z"],
};

function Doodle({ kind }: { kind: Hobby["doodle"] }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      {DOODLES[kind].map((d, i) => (
        <motion.path
          key={i}
          d={d}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, delay: 0.9 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  );
}

// A little scrapbook of hobby polaroids. They drop onto the page one by one
// and lift when you hover. With a mouse you can drag them anywhere on the page
// and they stay where you drop them; "tidy up" pins them back in place.
export default function Polaroids() {
  const reduce = useReducedMotion();
  const page = useRef<HTMLElement | null>(null);
  const items = hobbies.slice(0, 5);
  const [order, setOrder] = useState(items.map((_, i) => i));
  const toFront = (i: number) => setOrder((o) => [...o.filter((x) => x !== i), i]);
  const [moved, setMoved] = useState(false);
  const [pinKey, setPinKey] = useState(0);
  // Dragging is for mouse and trackpad. On touch screens a swipe over the
  // photos should still scroll the page, so a tap just brings one forward.
  const [canDrag, setCanDrag] = useState(false);
  useEffect(() => {
    page.current = document.querySelector("main");
    setCanDrag(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);
  const tidy = () => { setMoved(false); setPinKey((k) => k + 1); };

  return (
    <figure className="scrapbook" aria-label="My hobbies">
      <div className="scrapbook-area">
        <ul>
          {items.map((h, i) => {
            const slot = SLOTS[i];
            return (
              // Outer layer: dragging (x/y). Inner layer: drop-in and hover
              // lift, kept separate so letting go of hover never undoes a drag.
              <motion.li
                key={`${h.title}-${pinKey}`}
                className="polaroid-slot"
                tabIndex={0}
                aria-label={`${h.title}: ${h.note}`}
                style={{ left: `${slot.left}%`, top: `${slot.top}%`, zIndex: order.indexOf(i) + 1 }}
                drag={canDrag && !reduce}
                dragConstraints={page}
                dragElastic={0.08}
                dragTransition={{ power: 0.2, timeConstant: 200 }}
                onDragStart={() => setMoved(true)}
                onPointerDown={() => toFront(i)}
                onFocus={() => toFront(i)}
                whileDrag={{ scale: 1.08, cursor: "grabbing" }}
              >
                <motion.div
                  className="polaroid inked"
                  style={{ ["--tint" as string]: TINTS[i % TINTS.length] }}
                  initial={reduce ? false : { opacity: 0, scale: 1.25, y: -40, rotate: slot.rot + 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: slot.rot }}
                  transition={{ type: "spring", stiffness: 180, damping: 16, delay: reduce ? 0 : (pinKey ? 0.05 : 0.25) + i * 0.13 }}
                  whileHover={reduce ? undefined : { scale: 1.05, rotate: slot.rot * 0.3, y: -6 }}
                >
                  <span className="tape" aria-hidden="true" />
                  <span className="photo">
                    {h.image ? <img src={h.image} alt="" draggable={false} /> : <Doodle kind={h.doodle} />}
                  </span>
                  <span className="caption">
                    <strong>{h.title}</strong>
                    <span>{h.note}</span>
                  </span>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>
      <figcaption className="scrapbook-hint">
        {moved ? (
          <DoodleButton className="chip-btn" onClick={tidy}>Tidy up photos</DoodleButton>
        ) : (
          <span aria-hidden="true">
            <svg viewBox="0 0 60 30"><path d="M4 22 C 18 28 36 26 48 10 M40 10 l8 0 l-1 8" /></svg>
            {canDrag ? "drag the photos anywhere" : "tap a photo to bring it forward"}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
