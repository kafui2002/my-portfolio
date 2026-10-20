# Portfolio site

Next.js (App Router, static export) with Framer Motion and Lenis. The look is documented in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes a static site to out/ that any host can serve
```

## Publishing

Every push to `main` builds the site and publishes it to GitHub Pages at [kafuiquao.cc](https://kafuiquao.cc) (see `.github/workflows/deploy.yml`). The domain is set in `public/CNAME`.

## Make it yours

All text, projects, skills, timeline entries, hobbies and links are in `lib/content.ts`. To put a real photo on a hobby polaroid, drop it in `public/hobbies/` and set `image` on that hobby.

The contact form validates input but does not send anything yet. Hook it up to a form service or an API route in `components/Contact.tsx` (look for "Connect a form service").

## Where things are

- `app/globals.css`: colour, type, shape tokens and component styles
- `lib/motion.ts`: shared easing and spring presets
- `components/`: one file per piece (nav, cursor, doodle button, hero, polaroids, sections, contact, toast)
