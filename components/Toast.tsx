"use client";

import { AnimatePresence, motion } from "framer-motion";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { spring } from "@/lib/motion";

const ToastCtx = createContext<(msg: string) => void>(() => {});
export const useToast = () => useContext(ToastCtx);

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState<{ id: number; text: string } | null>(null);
  const timer = useRef<number>(0);
  const show = useCallback((text: string) => {
    setMsg({ id: Date.now(), text });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 3400);
  }, []);

  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div role="status" aria-live="polite">
        <AnimatePresence mode="wait">
          {msg && (
            <motion.div
              key={msg.id}
              className="toast inked"
              initial={{ y: 80, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={spring}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <motion.path d="M4 13 l5 5 L20 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15 }} />
              </svg>
              <span>{msg.text}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}
