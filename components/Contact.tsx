"use client";

import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/content";
import DoodleButton from "./DoodleButton";
import { Mark, Reveal } from "./Reveal";
import { useToast } from "./Toast";

type Name = "name" | "email" | "message";
const FIELDS: { id: Name; label: string; type: string; min: number; hint: string; placeholder: string; auto: string }[] = [
  { id: "name", label: "Your name", type: "text", min: 2, hint: "Who should I reply to?", placeholder: "Grace Hopper", auto: "name" },
  { id: "email", label: "Email", type: "email", min: 3, hint: "I'll only use it to reply.", placeholder: "you@example.com", auto: "email" },
  { id: "message", label: "Message", type: "textarea", min: 10, hint: "A few lines is plenty.", placeholder: "Tell me about the problem you're working on", auto: "off" },
];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function problem(f: (typeof FIELDS)[number], v: string): string | null {
  const t = v.trim();
  if (!t) return "This one is needed.";
  if (f.type === "email" && !EMAIL.test(t)) return "That email looks incomplete, check for an @ and a domain.";
  if (t.length < f.min) return `A little longer, please (${f.min}+ characters).`;
  return null;
}

function Field({ f, value, touched, onChange, onBlur, shakeKey }: {
  f: (typeof FIELDS)[number]; value: string; touched: boolean; shakeKey: number;
  onChange: (v: string) => void; onBlur: () => void;
}) {
  const err = problem(f, value);
  const valid = !err;
  const invalid = touched && !!err;
  const controls = useAnimationControls();
  const invalidRef = useRef(invalid);
  invalidRef.current = invalid;
  useEffect(() => {
    if (shakeKey && invalidRef.current) controls.start({ x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.45 } });
  }, [shakeKey, controls]);
  const props = {
    id: `f-${f.id}`, name: f.id, value, placeholder: f.placeholder, autoComplete: f.auto,
    "aria-invalid": invalid || undefined, "aria-describedby": `h-${f.id}`,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    onBlur,
  };
  return (
    <motion.div className={`field ${valid && value ? "is-valid" : ""} ${invalid ? "is-invalid" : ""}`} animate={controls}>
      <label htmlFor={`f-${f.id}`}>{f.label}</label>
      <span className={`input-wrap inked ${f.type === "textarea" ? "tall" : ""}`}>
        {f.type === "textarea" ? <textarea {...props} /> : <input type={f.type} {...props} />}
      </span>
      {f.type !== "textarea" && (
        <svg className="tick" viewBox="0 0 24 24" aria-hidden="true">
          <motion.path d="M4 13 l5 5 L20 6" initial={false} animate={{ pathLength: valid && value ? 1 : 0, opacity: valid && value ? 1 : 0 }} transition={{ duration: 0.45 }} />
        </svg>
      )}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={invalid ? err : "hint"}
          id={`h-${f.id}`}
          className="hint"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.2 }}
        >
          {invalid ? err : f.hint}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

export default function Contact() {
  const toast = useToast();
  const [values, setValues] = useState<Record<Name, string>>({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Record<Name, boolean>>({ name: false, email: false, message: false });
  const [sending, setSending] = useState(false);
  const [shake, setShake] = useState(0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast("Email copied to your clipboard");
    } catch {
      const el = document.getElementById("email");
      if (el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); }
      toast("Email selected. Press Ctrl+C or Cmd+C to copy.");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const bad = FIELDS.find((f) => problem(f, values[f.id]));
    if (bad) { setShake((n) => n + 1); document.getElementById(`f-${bad.id}`)?.focus(); return; }
    setSending(true);
    // Connect a form service (Formspree, a serverless route, etc.) here.
    window.setTimeout(() => {
      setSending(false);
      setValues({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      toast("Thanks! This form is a demo until a form service is connected.");
    }, 1300);
  };

  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="contact-card sketch">
          <span className="sketch-shade" aria-hidden="true" />
          <div className="contact-copy">
            <span className="eyebrow">contact</span>
            <h2>Let&apos;s build something <Mark>clever</Mark></h2>
            <p>Hiring, collaborating, or just want to talk about a paper? Send a note or copy my email.</p>
            <div className="email-row">
              <span className="email inked" id="email">{profile.email}</span>
              <DoodleButton className="chip-btn" onClick={copy}>Copy email</DoodleButton>
            </div>
            <div className="socials">
              {profile.socials.map((s) => (
                <DoodleButton key={s.label} className="chip-btn" href={s.href} external>{s.label}</DoodleButton>
              ))}
            </div>
          </div>
          <form className="contact-form" onSubmit={submit} noValidate>
            {FIELDS.map((f) => (
              <Field
                key={f.id}
                f={f}
                value={values[f.id]}
                touched={touched[f.id]}
                shakeKey={shake}
                onChange={(v) => setValues((s) => ({ ...s, [f.id]: v }))}
                onBlur={() => values[f.id] && setTouched((s) => ({ ...s, [f.id]: true }))}
              />
            ))}
            <div>
              <DoodleButton type="submit" disabled={sending} aria-label={sending ? "Sending message" : undefined}>
                {sending ? "Sending" : "Send message"}
                <AnimatePresence mode="wait" initial={false}>
                  {sending ? (
                    <motion.svg key="spin" className="spinner" viewBox="0 0 24 24" aria-hidden="true" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}>
                      <circle cx="12" cy="12" r="9" />
                    </motion.svg>
                  ) : (
                    <motion.svg key="plane" viewBox="0 0 24 24" aria-hidden="true" initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 16, y: -10, opacity: 0 }}>
                      <path className="ink" d="M4 12 L20 4 L14 20 L11 13 Z" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </DoodleButton>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
