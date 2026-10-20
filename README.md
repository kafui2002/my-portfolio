# Portfolio site

Next.js (App Router, static export) with Framer Motion and Lenis. The look is documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes a static site to out/ that any host can serve
```

## Make it yours

All text, projects, skills, timeline entries and links are in `lib/content.ts`. Everything there is placeholder content.

The contact form validates input but does not send anything yet. Hook it up to a form service or an API route in `components/Contact.tsx` (look for "Connect a form service").

## Where things are

- `app/globals.css`: colour, type, shape tokens and component styles
- `lib/motion.ts`: shared easing and spring presets
- `components/`: one file per piece (nav, cursor, glass button, hero, sections, contact, toast)
