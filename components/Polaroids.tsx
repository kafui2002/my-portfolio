"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { hobbies, type Hobby } from "@/lib/content";
import DoodleButton from "./DoodleButton";

// Where each photo lands on the page (percent of the scrapbook area) and how
// it is tilted. Six slots in two loose rows; fewer hobbies use the first few.
const SLOTS = [
  { left: 0, top: 4, rot: -7 },
  { left: 33, top: 0, rot: 4 },
  { left: 65, top: 6, rot: -3 },
  { left: 2, top: 53, rot: 5 },
  { left: 34, top: 50, rot: -4 },
  { left: 65, top: 55, rot: 6 },
];
const TINTS = ["var(--pink)", "var(--blue)", "var(--mint)", "var(--butter)", "var(--lilac)", "var(--purple)"];

const DOODLES: Record<Hobby["doodle"], string[]> = {
  game: [
    "M30 40 h40 c12 0 18 10 18 22 c0 10 -8 14 -14 8 l-8 -8 h-32 l-8 8 c-6 6 -14 2 -14 -8 c0 -12 6 -22 18 -22 Z",
    "M32 47 v12 M26 53 h12",
    "M66 47 a3 3 0 1 0 0.1 0",
    "M73 54 a3 3 0 1 0 0.1 0",
  ],
  pencil: [
    "M26 74 L66 34 l10 10 L36 84 Z",
    "M26 74 l-4 14 l14 -4",
    "M60 40 l10 10",
    "M18 30 c8 -8 16 4 24 -4 s 14 2 18 -2",
  ],
  yarn: [
    "M48 26 a24 24 0 1 0 0.1 0",
    "M30 36 c10 6 26 6 36 -2 M26 52 c14 8 32 8 46 0 M32 68 c10 4 24 4 34 -2",
    "M40 28 c-6 14 -6 30 2 44",
    "M70 66 c8 6 14 10 20 8",
    "M78 18 L58 46 c-2 3 -6 1 -4 -2",
  ],
  needle: [
    "M24 78 L74 22",
    "M70 26 a3 5 42 1 0 0.1 0",
    "M72 24 c10 4 10 18 -2 24 c-14 6 -10 24 6 28 c10 2 14 -4 12 -10",
    "M24 78 l-4 6",
  ],
  swim: [
    "M14 62 c8 -6 14 -6 22 0 s 14 6 22 0 s 14 -6 22 0 s 10 4 12 2",
    "M14 76 c8 -6 14 -6 22 0 s 14 6 22 0 s 14 -6 22 0 s 10 4 12 2",
    "M64 38 a7 7 0 1 0 0.1 0",
    "M28 54 c8 -10 18 -14 30 -12 l10 6",
    "M40 50 l-12 -12",
  ],
  bike: ["M28 50 a14 14 0 1 0 0.1 0", "M72 50 a14 14 0 1 0 0.1 0", "M28 64 L44 40 H62 L72 64 M44 40 L54 64 L62 40", "M39 35 h11 M60 33 l4 7"],
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
  const items = hobbies.slice(0, 6);
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
