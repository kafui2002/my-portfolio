"use client";

import { MotionConfig } from "framer-motion";

// reducedMotion="user" turns transform animations off for people who ask their OS for less motion.
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
