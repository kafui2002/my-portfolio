import type { Transition } from "framer-motion";

// Shared motion vocabulary. "butter" is the default ease for anything that
// glides; "spring" is for things that respond to a touch or a click.
export const butter: Transition = { duration: 0.9, ease: [0.22, 1, 0.36, 1] };
export const spring: Transition = { type: "spring", stiffness: 320, damping: 24, mass: 0.8 };
export const softSpring: Transition = { type: "spring", stiffness: 140, damping: 20 };

export const viewOnce = { once: true, margin: "0px 0px -8% 0px" } as const;
