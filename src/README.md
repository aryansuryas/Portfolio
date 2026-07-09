# Aryan Surya S — Portfolio (React + Vite)

A full React rebuild of the original single-file HTML portfolio — same wine
paper-and-brass editorial design system, now componentized, with a real
Three.js hero scene and all seven React Bits components wired in on purpose
(not just dropped in — each one replaces or upgrades a specific piece of the
original page).

## Stack

- **React 19 + Vite** — component architecture, fast dev server, production build
- **Three.js** — custom low-poly icosahedron hero scene (`src/three/HeroIcosahedron.jsx`)
- **GSAP + ScrollTrigger** — scroll-scrubbed heading reveals (via ScrollFloat)
- **motion** (the Framer Motion successor) — CircularText, ShinyText, GradientText, TrueFocus, RotatingText
- **ogl** — SideRays WebGL background
- **lenis** — smooth scrolling, synced to GSAP's ticker

No Tailwind, no component library — the original hand-built CSS design
system (CSS variables for paper/wine/brass, Fraunces/Space Grotesk/Manrope/
IBM Plex Mono) is preserved and extended in `src/styles/global.css`.

## Getting started

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

This was built and production-build-verified inside the sandbox before
packaging, so `npm install && npm run build` should work out of the box.

## Where each React Bits component landed

| Component | Where | Why |
|---|---|---|
| **SideRays** | Hero background (`Hero.jsx`) | Subtle warm wine/brass light wash behind the name, tuned low-opacity so it doesn't fight the paper background |
| **RotatingText** | Hero role line | Cycles "Full-Stack Developer / AI Builder / Frontend Engineer / DSA Practitioner" instead of one static line |
| **CircularText** | Hero corner badge | Spinning "SCROLL TO EXPLORE" stamp, doubles as a click-to-scroll cue |
| **TrueFocus** | New **Statement** section (`Statement.jsx`), between the marquee and "How I build" | "Design · Engineer · Ship · Repeat" as a manifesto line |
| **ScrollFloat** | Every section heading, via `SectionHeading.jsx` | The plain-text half of each heading scrubs in character-by-character as you scroll to it |
| **GradientText** | Every section heading's emphasized word, via `SectionHeading.jsx` | Replaces the old static italic wine `<em>` with an animated wine→brass shimmer |
| **ScrollFloat + GradientText together** | "How I build", "Technology stack", "Projects", "Achievements", "Let's work together" | See `SectionHeading.jsx` — composes the two so the heading and its emphasis word sit on one line without invalid HTML nesting |
| **ShinyText** | Project era/category labels (×3) and the Contact "Open to internships..." line | Small, tasteful shimmer accents rather than one big effect |

Three.js's faceted icosahedron sits behind the hero text on desktop
(≥1024px, matching the old CSS cube's breakpoint) and tilts toward the
cursor. It's lazy-loaded (`React.lazy`) so mobile visitors never download
the Three.js bundle at all.

I also put two currently-unused-but-already-designed original CSS classes
to work: `.section-eyebrow` now labels every section (PHILOSOPHY, APPROACH,
CAPABILITIES, SELECTED WORK, RECOGNITION).

## Structure

```
src/
  components/       Every section + shared UI (Nav, Portal, CustomCursor, Reveal...)
  reactbits/         The 7 vendored React Bits components, each in its own folder
  three/             HeroIcosahedron.jsx (Three.js scene)
  hooks/             useLenis, useScrollSpy, useMediaQuery
  data/content.js     All copy/content as plain data (edit here, not in JSX)
  constants/theme.js  Color tokens shared between CSS and JS (Three.js, React Bits props)
  styles/global.css   Design tokens + full design system
```

## Customizing

- **Text/content/links** — edit `src/data/content.js`, not the components.
- **Colors** — edit the `:root` variables in `global.css` *and* the matching
  values in `src/constants/theme.js` (kept in sync manually, not auto-generated).
- **React Bits props** (speed, colors, blur amounts, etc.) — each usage site
  passes props inline; tweak them directly where the component is called.
- **Contact form** currently simulates sending (matches the original — no
  backend). Wire `handleSubmit` in `Contact.jsx` to a real endpoint or a
  service like Formspree/EmailJS when you're ready.

## Notes on the vendored components

All 7 React Bits components are used essentially as provided. Two small,
deliberate adjustments:

- **ScrollFloat**: added a `gsap.context()` + cleanup on unmount. The
  original snippet had no cleanup, which is fine for a single instance but
  leaks ScrollTrigger instances when the component is used more than once on
  a page (it's used 5 times here, once per section heading).
- **useLenis hook**: wires Lenis's `scroll` event and `gsap.ticker` together
  explicitly, which is the standard recommended pattern for keeping GSAP
  ScrollTrigger perfectly in sync with Lenis's smooth scrolling (needed for
  ScrollFloat's scrub effect to feel right).

Everything else — SideRays, CircularText, ShinyText, GradientText,
TrueFocus, RotatingText — is untouched from the source you provided; only
props were tuned per usage site.

## Deploying

It's a static Vite build, so it deploys anywhere: `npm run build` then
upload `dist/` to Vercel, Netlify, GitHub Pages, or any static host.
