# Doodle Lab design system

The visual language for the portfolio: hand-drawn ink on dotted sketch paper, pastel accents, sketched buttons and edges, and soft, springy motion. Nothing on the page is glossy or glassy: every face, edge and indicator looks drawn by hand. Tokens live in `app/globals.css`; motion presets live in `lib/motion.ts`.

## Principles

1. **Sketchbook, not cartoon.** Ink lines are slightly wobbly and imperfect, but layouts stay on a clean grid so the content reads as professional.
2. **Pastels carry meaning.** Each accent is tied to a role (a section, a card, a state). Burgundy is the only strong colour and is reserved for primary actions and emphasis.
3. **Everything answers back.** Every interactive element shows hover, press, focus and result states.
4. **Motion is buttery, never blocking.** Content is readable before animations run. Users who ask their OS for reduced motion get a still page.

## Colour

Every colour is a CSS custom property. Light values sit on `:root`; dark values are redefined under `@media (prefers-color-scheme: dark)` (guarded by `:root:not([data-theme="light"])`) and again under `:root[data-theme="dark"]`, so the OS setting and the toggle both work. In dark mode the pastels get lighter and slightly more saturated so they glow on the dark paper, and burgundy shifts to a rosy wine that stays readable.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `#fbf7fc` | `#17121d` | Page background (lilac-tinted, never pure white or black) |
| `--paper-2` | `#f3ecf7` | `#211a2a` | Inset areas such as project illustrations |
| `--card` | `#ffffff` | `#221b2b` | Card faces |
| `--ink` | `#2b2233` | `#f1e9f5` | Text and all doodle strokes |
| `--ink-soft` | `#5d5068` | `#bdaecb` | Secondary text, captions, annotations |
| `--grid` | `rgba(110,80,140,.13)` | `rgba(200,170,230,.10)` | Dot-grid paper texture |
| `--lilac` | `#c8a2c8` | `#d9b6ec` | Card shade, Work nav pill |
| `--purple` | `#b9a4e6` | `#a88df0` | Underlines, logo, cursor trail |
| `--pink` | `#f5b8cb` | `#f59bba` | Highlights, active chips, timeline stops |
| `--blue` | `#a9cbef` | `#8eb9f4` | Secondary buttons, card shade |
| `--mint` | `#b8e3d0` | `#8fd7b9` | Skills group, Skills nav pill |
| `--butter` | `#f6e3a1` | `#f1d57e` | Hero blob, Path nav pill |
| `--burgundy` / `--accent` | `#8c2f4b` | `#e3809d` | Primary buttons, links, progress, emphasis |
| `--highlight` | pink at 75% | burgundy at 45% | Highlighter strokes behind key words |
| `--btn-fill` / `--btn-fill-on` | pink / butter | pink / butter | Every button face; butter marks a pressed or selected button |
| `--btn-ink` | `#2b2233` | `#2b2233` | Button text, dark in both themes so it reads on pastel |
| `--ok` / `--error` | `#2f9e6a` / `#c8394f` | `#5fd39a` / `#ff8fa3` | Form validation only |

**Section colours** (nav pill): About pink, Work lilac, Skills mint, Path butter, Contact blue.

## Typography

| Role | Face | Use |
|---|---|---|
| Display | **Shantell Sans** (`INFM` 100, `BNCE` 35) | Headings, logo, roles, buttons. Full informality and some bounce give the loose marker look. |
| Body | **Shantell Sans** (`INFM` 45, `BNCE` 0) | Paragraphs and labels. Same marker hand, steadier so long text stays easy to read. |
| Label | **Patrick Hand** | Eyebrows, metrics, dates, email, code-ish labels such as `model.fit()`. Hand-printed small caps feel. |
| Hand | **Caveat** | Margin notes and annotations ("forward pass", "your name here"). Use sparingly. |

Every face is hand-drawn; there is no clean sans or monospace on the page.

Fonts load through `next/font/google`, so they are self-hosted at build time with fallbacks.

Fluid scale (`--step--1` to `--step-4`): 0.84 → 0.92rem, 1 → 1.1rem, 1.25 → 1.5rem, 1.6 → 2.2rem, 2.1 → 3.3rem, 2.7 → 5.2rem. Headings use `text-wrap: balance`; body copy stays under about 65 characters wide.

## Shape and doodle vocabulary

- **Wobbly radii.** Three hand-drawn border-radius tokens: `--wobble-a`, `--wobble-b`, `--wobble-c`. Rotate them across sibling cards so no two look stamped from the same mould.
- **Rough filter** (`#rough`): a static, low-frequency SVG displacement (base frequency 0.009, scale 3) that bends straight CSS borders into long, gentle waves, like a steady hand drawing a line. It is applied to outlines only (cards, buttons, fields, chips, meters), never to fills, and is kept subtle on purpose: stronger or higher-frequency noise reads as a glitch.
- **Ink edge** (`.inked`): add this class to any element to give it a rough outline. Tune with `--edge` (colour), `--edge-w` (width) and `--edge-style` (solid or dashed).
- **Sketch card** (`.sketch`): card face with a rough 2.4px ink border, and a pastel shade layer offset 8px/9px behind it. On hover the card lifts 5px and tilts −0.5°, and the shade slides out to 13px/15px.
- **Squiggle underline**: drawn under each section heading with an animated stroke.
- **Highlighter** (`Mark`): a pastel stroke that swipes in behind one or two key words per heading.
- **Doodles**: stars, waves, rings, sparks and swirls in pastel strokes (2.6px, round caps) that drift at different speeds on scroll.
- **Boil filter** (`#boil`): gentle SVG turbulence with a seed that changes every 180ms, used only on the logo and cursor so they shimmer slightly like hand-drawn animation.
- **Strokes**: 2–3px, round caps and joins, always `--ink` or a pastel.
- **Scrapbook polaroids** (hero, `Polaroids`): up to five hobby cards from `hobbies` in `lib/content.ts`. Each card has an off-white frame (`--polaroid`, `#fffdf8` light / `#ece4f0` dark, with `--polaroid-ink` text), a rough ink edge, a pastel photo square with crayon hatching, a striped washi-tape strip at the top and a Caveat caption. The photo square shows a hand-drawn doodle (camera, music, plant, book, game, bike, coffee or brush) until you add a real photo with `image`. The cards sit in fixed tilted slots, drop in one by one with a spring, and lift and straighten on hover. With a mouse or trackpad you can drag them anywhere on the page, even over other sections, and they stay where you drop them. The card you grab moves to the top, and a "Tidy up photos" button appears that pins them all back in place. On touch screens a tap brings a card forward, so swiping still scrolls the page. The hero has `z-index: 5` so dragged photos float above later sections.

## Buttons

There is one button style (`.btn`, component `DoodleButton`), used for every button and button-like link: primary actions, social links, filters, the theme toggle and back-to-top.

- **Face**: `--btn-fill` (pink) with diagonal crayon hatching drawn over it.
- **Edge**: a 2.5px ink outline through the rough filter.
- **Shadow**: a hard ink shadow offset 4px. Hover lifts the button 2px, tilts it −1.2° and grows the shadow to 6px. Press pushes it down 3px and flattens the shadow to 1px.
- **Burst**: pressing sends six little pen strokes out from the touch point. Phones also get a short vibration.
- **Selected**: a pressed toggle (`aria-pressed="true"`) stays pushed down with a butter face. The active project filter also gets a burgundy pen loop drawn around it, which slides to the next chip.
- Text is always `--btn-ink`, so it stays dark and readable on the pastel face in both themes.

## Motion

Built with Framer Motion, with Lenis for smooth scrolling.

| Preset | Value | Use |
|---|---|---|
| `butter` | 0.9s, `cubic-bezier(.22,1,.36,1)` | Reveals, highlighter, stroke drawing |
| `spring` | stiffness 320, damping 24 | Springy UI responses |
| `softSpring` | stiffness 140, damping 20 | Larger, slower settles |
| Smooth scroll | Lenis, lerp 0.09 | Wheel and trackpad; in-page links glide to sections |

Patterns:

- **Reveal**: content rises 28px and un-tilts from −0.6° as it enters the viewport. It starts at 30% opacity, so it is never fully hidden.
- **Stroke drawing**: doodles, polaroid doodles and project illustrations draw themselves in with `pathLength` 0 → 1.
- **Shared layout**: the nav pill and the pen loop around the active filter slide between items with `layoutId`.
- **Filtering**: project cards animate out and reflow with `AnimatePresence` and `layout`.
- **Theme switch**: the new theme spreads outward from the toggle as a circle (View Transitions API), or cross-fades in browsers without it.
- **Reduced motion**: `MotionConfig reducedMotion="user"`, Lenis off, rotating text paused, CSS animations cut to near zero.

## Feedback and indicators

| Indicator | Where | Behaviour |
|---|---|---|
| Reading progress | Top of page | Rough burgundy squiggle fills as you scroll |
| Back-to-top ring | Bottom right | Appears after 60% of a screen. A round doodle button with a dotted track ring around it, centred on the button, that fills with burgundy as you scroll. The button scales on hover instead of tilting, so the ring stays aligned. |
| Active section | Nav | Rough-edged pastel pill slides to the current section, in that section's colour |
| Press | All buttons | Push down and flatten the shadow, pen-stroke burst, short vibration on phones |
| Hover | Buttons, cards, chips | Lift and tilt, card shade slides out |
| Focus | Everything focusable | 2.5px dashed burgundy outline with 4px offset |
| Filter state | Project chips | Butter face, pushed down, pen loop around it, `aria-pressed` |
| Form fields | Contact | Rough ink outline; turns green with a drawn tick when valid; thicker red outline, shake and a specific message when not |
| Sending | Submit button | Plane icon swaps to a spinner; button disabled |
| Result | Toast | Sketched paper note with a lilac shadow and a drawn tick, announced to screen readers |
| Timeline | Path | Rough line fills as you scroll; each wobbly stop turns pink when reached |
| Skill meters | Skills | Rough outline with a hatched fill that grows to the value |
| Status | Hero | Hand-drawn green dot that pulses |
| Links | Project cards | Squiggly underline that draws out on hover |

## Cursor

On mouse and trackpad devices the system cursor is replaced by a hand-drawn blob with a diagonal hatch fill (`--cursor-fill`) and an inked outline (`--cursor-ink`), boiling gently. It follows on a spring, grows and tilts over anything clickable, shrinks on press, and becomes a small dot over text fields. A fading pastel ink trail (`--trail`) follows the pointer. Touch devices keep native behaviour.

## Layout

- Container: max 1160px, side gutter `max(16px, safe-area)` on phones and 32px from 720px up.
- Sections: `clamp(72px, 10vw, 136px)` vertical padding.
- Grids: hero and about use two columns that stack below 880px; cards use `auto-fill` with a 330px minimum (300px for skills).
- Nav: sticky, links move to their own row below 760px.

## Accessibility

- Body text (`--ink`) and secondary text (`--ink-soft`) are well above WCAG AA contrast on the paper in both themes. Check new pastel and text pairings before shipping them.
- Decorative doodles are `aria-hidden`. Each polaroid is focusable and labelled with its hobby and note, and focusing one brings it to the front.
- Skill meters use `role="meter"` with values. Form errors are linked with `aria-describedby` and `aria-invalid`.
- Reduced motion is respected everywhere.
