"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { about, filters, path, projects, skills, type Kind, type Project } from "@/lib/content";
import { viewOnce } from "@/lib/motion";
import Doodles from "./Doodles";
import DoodleButton from "./DoodleButton";
import { Reveal, SectionHead } from "./Reveal";

/* Hover lifts a sketch card; CSS slides its pastel shadow further out. */
const lift = { y: -5, rotate: -0.5 };
const cardSpring = { type: "spring", stiffness: 300, damping: 20 } as const;

function Shade() {
  return <span className="sketch-shade" aria-hidden="true" />;
}

/* ---------------- About ---------------- */
export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <SectionHead eyebrow="about me" before={about.headline.before} mark={about.headline.mark} />
        <div className="about-grid">
          <Reveal className="about-copy">
            <p>{about.lead}</p>
            {about.more.map((t) => <p key={t}>{t}</p>)}
          </Reveal>
          <Reveal delay={0.1}>
            <motion.aside className="facts sketch" aria-label="Quick facts" whileHover={lift} transition={cardSpring}>
              <Shade />
              <h3>Quick facts</h3>
              <dl>
                {about.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </motion.aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Work ---------------- */
function Art({ kind }: { kind: Project["art"] }) {
  const draw = {
    initial: { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: viewOnce,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
  };
  const P = (p: React.SVGProps<SVGPathElement> & { cls?: string }) => {
    const { cls = "", ...rest } = p;
    return <motion.path className={`ink ${cls}`} {...draw} {...(rest as object)} />;
  };
  return (
    <div className="project-art" aria-hidden="true">
      <svg viewBox="0 0 300 128">
        {kind === "curve" && (<>
          <P d="M30 100 L30 24 M30 100 L270 100" />
          <P cls="a" d="M36 92 C 80 88 100 40 150 38 S 230 30 262 28" />
          <P cls="b" d="M36 96 C 90 94 120 70 160 66 S 230 60 262 58" strokeDasharray="6 7" />
          <text x="226" y="22">error ↓</text>
        </>)}
        {kind === "boxes" && (<>
          <P d="M54 24 h62 a14 14 0 0 1 14 14 v52 a14 14 0 0 1 -14 14 h-62 a14 14 0 0 1 -14 -14 v-52 a14 14 0 0 1 14 -14 Z" />
          <P cls="a" d="M62 44 h40 v34 h-40 Z" />
          <P d="M184 24 h62 a14 14 0 0 1 14 14 v52 a14 14 0 0 1 -14 14 h-62 a14 14 0 0 1 -14 -14 v-52 a14 14 0 0 1 14 -14 Z" />
          <P cls="a" d="M186 40 h30 v26 h-30 Z" />
          <P cls="b" d="M214 62 h32 v28 h-32 Z" />
        </>)}
        {kind === "services" && (<>
          <P d="M40 30 H120 V60 H40 Z M180 30 H260 V60 H180 Z M110 84 H190 V112 H110 Z" />
          <P cls="a" d="M120 45 H180 M80 60 C 80 80 110 90 110 98 M220 60 C 220 80 190 90 190 98" />
        </>)}
        {kind === "chat" && (<>
          <P d="M50 30 h120 a14 14 0 0 1 14 14 v20 a14 14 0 0 1 -14 14 h-80 l-22 18 v-18 h-18 a14 14 0 0 1 -14 -14 v-20 a14 14 0 0 1 14 -14 Z" />
          <P cls="a" d="M70 50 h80 M70 62 h52" />
          <P cls="b" d="M206 56 l14 14 l32 -34" />
        </>)}
        {kind === "bars" && (<>
          <P d="M40 100 V40 M40 100 H260" />
          <P cls="a" d="M60 100 V70 M90 100 V52 M120 100 V80 M150 100 V44 M180 100 V60 M210 100 V36 M240 100 V56" />
        </>)}
        {kind === "wave" && (<>
          <P d="M30 70 C 60 20 90 110 120 64 S 180 20 210 70 S 260 100 274 54" />
          <P cls="a" d="M30 80 C 60 34 90 118 120 74 S 180 34 210 80 S 260 108 274 64" />
          <P cls="b" d="M210 61 a9 9 0 1 0 0.1 0" />
        </>)}
        {kind === "board" && (<>
          <P d="M44 30 h212 a20 20 0 0 1 20 20 v28 a20 20 0 0 1 -20 20 h-212 a20 20 0 0 1 -20 -20 v-28 a20 20 0 0 1 20 -20 Z" />
          <P cls="a" d="M60 42 a9 9 0 1 0 0.1 0 M96 42 a9 9 0 1 0 0.1 0 M132 42 a9 9 0 1 0 0.1 0 M168 42 a9 9 0 1 0 0.1 0 M204 42 a9 9 0 1 0 0.1 0 M240 42 a9 9 0 1 0 0.1 0" />
          <P cls="b" d="M60 68 a9 9 0 1 0 0.1 0 M96 68 a9 9 0 1 0 0.1 0 M132 68 a9 9 0 1 0 0.1 0 M168 68 a9 9 0 1 0 0.1 0 M204 68 a9 9 0 1 0 0.1 0 M240 68 a9 9 0 1 0 0.1 0" />
        </>)}
        {kind === "phone" && (<>
          <P d="M124 14 h52 a10 10 0 0 1 10 10 v84 a10 10 0 0 1 -10 10 h-52 a10 10 0 0 1 -10 -10 v-84 a10 10 0 0 1 10 -10 Z" />
          <P cls="a" d="M128 34 h44 M128 48 h30 M128 62 h40 M128 76 h24" />
          <P cls="b" d="M144 104 h12 M60 60 a12 12 0 1 0 0.1 0 M46 92 c4 -12 24 -12 28 0 M240 60 a12 12 0 1 0 0.1 0 M226 92 c4 -12 24 -12 28 0" />
        </>)}
      </svg>
    </div>
  );
}

export function Work() {
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const shown = projects.filter((p) => filter === "all" || p.kinds.includes(filter));
  const reduce = useReducedMotion();

  return (
    <section id="work">
      <Doodles
        items={[
          { shape: "diamond", color: "var(--butter)", speed: 0.22, style: { right: "6%", top: "8%" } },
          { shape: "swirl", color: "var(--mint)", speed: -0.2, style: { left: "2%", bottom: "14%" } },
        ]}
      />
      <div className="wrap">
        <SectionHead eyebrow="selected work" before="Things I've" mark="built and trained">
          <p>A mix of models, websites and apps, from school projects to things I built just because I wanted them to exist.</p>
        </SectionHead>

        <LayoutGroup id="filters">
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <DoodleButton key={f.id} className="chip-btn" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                {filter === f.id && (
                  // A pen loop drawn around the active filter, sliding between chips.
                  <motion.span layoutId="chip-loop" className="chip-loop" aria-hidden="true" transition={{ type: "spring", stiffness: 400, damping: 30 }}>
                    <svg viewBox="0 0 120 60" preserveAspectRatio="none">
                    <motion.path
                      d="M64 6 C 100 4 117 16 116 30 C 115 47 88 56 58 55 C 26 54 4 46 4 30 C 4 14 28 5 58 6 C 75 6 92 9 104 15"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                    </svg>
                  </motion.span>
                )}
                {f.label}
              </DoodleButton>
            ))}
          </div>
        </LayoutGroup>

        <motion.div className="projects" layout={!reduce}>
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((p) => {
              const s = (projects.indexOf(p) % 3) + 1;
              return (
                <motion.article
                  key={p.title}
                  layout={!reduce}
                  className={`project sketch s${s}`}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={viewOnce}
                  exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25 } }}
                  transition={{ type: "spring", stiffness: 200, damping: 24 }}
                  whileHover={lift}
                >
                  <Shade />
                  <Art kind={p.art} />
                  <h3>{p.title}</h3>
                  <p>{p.blurb}</p>
                  <ul className="metrics">
                    {p.metrics.map(([k, v]) => <li className="inked" key={k}>{k} <b>{v}</b></li>)}
                  </ul>
                  <div className="tags">{p.tags.map((t) => <span className="tag inked" key={t}>{t}</span>)}</div>
                  {p.links.length > 0 && (
                    <div className="project-links">
                      {p.links.map((l) => <a key={l.label} href={l.href} aria-label={`${l.label} for ${p.title}`}>{l.label}</a>)}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
export function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <SectionHead eyebrow="toolbox" before="What I" mark="reach for" />
        <div className="skill-groups">
          {skills.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.08}>
              <motion.div className="skill-group sketch" style={{ ["--shade" as string]: g.shade }} whileHover={lift} transition={cardSpring}>
                <Shade />
                <h3>{g.title} <code>{g.code}</code></h3>
                <ul className="skill-list">
                  {g.items.map((s, i) => (
                    <motion.li
                      key={s}
                      className="inked"
                      initial={{ opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={viewOnce}
                      whileHover={{ rotate: -4, scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.15 + i * 0.04 }}
                    >
                      {s}
                    </motion.li>
                  ))}
                </ul>
                <div className="meter">
                  {g.meters.map(([label, v]) => (
                    <div className="meter-row" key={label}>
                      <span>{label}</span>
                      <div className="meter-track inked" role="meter" aria-label={label} aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
                        <div className="meter-clip">
                          <motion.div
                            className="meter-fill"
                            initial={{ scaleX: 0.05 }}
                            whileInView={{ scaleX: v / 100 }}
                            viewport={viewOnce}
                            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Path ---------------- */
const LINE = "M12 0 C 4 20 20 40 12 50 S 4 80 12 100";

function Stop({ item, index }: { item: (typeof path)[number]; index: number }) {
  const [seen, setSeen] = useState(false);
  return (
    <Reveal as="li" delay={index * 0.05}>
      <motion.span
        className="tl-dot"
        aria-hidden="true"
        style={{ backgroundColor: seen ? "var(--pink)" : "var(--paper)", transition: "background-color .5s" }}
        animate={seen ? { scale: 1.15, rotate: 12 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      />
      <motion.span onViewportEnter={() => setSeen(true)} viewport={{ once: true, margin: "0px 0px -30% 0px" }} className="when">{item.when}</motion.span>
      <h3>{item.role} <span>@ {item.org}</span></h3>
      <p>{item.text}</p>
    </Reveal>
  );
}

export function Path() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const len = useSpring(scrollYProgress, { stiffness: 100, damping: 26 });
  return (
    <section id="path">
      <div className="wrap">
        <SectionHead eyebrow="the path so far" before="Where I've" mark="learned things" />
        <ol className="timeline" ref={ref}>
          <svg className="timeline-line" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 24 100">
            <path d={LINE} vectorEffect="non-scaling-stroke" />
            <motion.path className="tl-progress" d={LINE} vectorEffect="non-scaling-stroke" style={{ pathLength: len }} />
          </svg>
          {path.map((p, i) => <Stop key={p.when} item={p} index={i} />)}
        </ol>
      </div>
    </section>
  );
}
