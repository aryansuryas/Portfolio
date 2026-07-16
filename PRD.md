# PRD — Aryan Surya S · Premium 3D Portfolio (v2.0)

**Owner:** Aryan Surya S
**Date:** 2026-07-15
**Status:** Approved — in build
**Stack:** React 19 · Vite 8 · GSAP 3 (ScrollTrigger) · Lenis · Three.js (raw, no wrapper)

---

## 1. Purpose

Rebuild the existing portfolio into a **cinematic, editorial, print-magazine-inspired** single-page
site with a signature WebGL particle centerpiece, flawless scroll choreography, and a secured
contact pipeline. Target audience: recruiters, internship panels, and collaborators who spend
< 60 seconds on a portfolio — the first screen must land instantly and every scroll must feel
intentional.

## 2. What was wrong (v1 audit)

| # | Defect | Root cause |
|---|--------|-----------|
| 1 | Janky, "fighting" scroll | `html { scroll-behavior: smooth }` conflicts with Lenis (explicitly forbidden by Lenis docs) |
| 2 | Anchor jumps teleport/stutter | `<a href="#id">` bypasses Lenis; `window.scrollBy` used alongside it |
| 3 | Scroll reveals fire at wrong positions (the "alignment" bug) | `#main-wrap` carried `clip-path` + `translateY(50px)` while ScrollTrigger measured the page; no `ScrollTrigger.refresh()` after the portal reveal |
| 4 | Inconsistent animation feel | Four competing engines: GSAP, framer-motion (`motion`), raw CSS transitions, react-bits components |
| 5 | Fragile intro | Portal choreographed with hardcoded `setTimeout(750/1150/2050)`; `scale(58)` circle hack breaks on ultrawide |
| 6 | Noise overlay `z-index: 1000` | Rendered above nav/menu/interactive UI |
| 7 | Dead zone on mobile | Three.js scene desktop-only with `fallback={null}` |
| 8 | "Free template" icons + render-blocking CSS | Font Awesome CDN |
| 9 | Wrong scroll bounds after intro | Lenis initialized while `body.locked { height: 100vh }` |
| 10 | Scroll jank | Two fixed 140px-blur orbs repainting on composite |
| 11 | **Site did not boot** | `index.html` loads `/src/main.jsx`; the file lives at `/main.jsx` |
| 12 | Unused weight | `ogl` + `motion` in dependencies while GSAP does the work |

## 3. Product decisions (locked with owner)

| Decision | Choice |
|----------|--------|
| Visual direction | **Keep & refine the paper/wine editorial identity** — cream `#FBF7EC`, wine `#7A1220`, brass `#A6813F`, Fraunces serif headlines |
| Opening | **Auto preloader** (~1.8 s counter + name reveal + curtain wipe). No click gate — recruiters never bounce on a button |
| 3D centerpiece | **Morphing particle field** — one fixed WebGL layer behind the whole page; particles morph sphere → helix → torus-knot → wave grid as the user scrolls through section zones; mouse repulsion |
| Contact | **Web3Forms** (static-host friendly) + honeypot + time-trap + validation + runtime-assembled email (scraper-safe) |

## 4. Architecture

```
index.html                 fonts (Fraunces/Space Grotesk/Manrope/IBM Plex Mono), meta/OG, correct entry
main.jsx                   React root
App.jsx                    composition + preloader phase state
lib/scroll.js              Lenis singleton — init/destroy, scrollTo, stop/start; GSAP ticker sync
lib/splitText.js           dependency-free word/char splitter for reveal animations
hooks/useMediaQuery.js     SSR-safe media query hook
components/
  Preloader.jsx            GSAP timeline: counter → name mask reveal → curtain → ScrollTrigger.refresh()
  Nav.jsx                  fixed header, scrollspy (IntersectionObserver), Lenis-driven anchors, mobile overlay menu
  Hero.jsx                 masked headline, rotating role ticker (GSAP), stats, scroll cue
  Marquee.jsx              infinite name marquee, scroll-velocity reactive skew/speed
  Statement.jsx            big serif line, word-by-word opacity scrub
  HowIBuild.jsx            FIG. A/B/C editorial cards
  Skills.jsx               6-card grid, inline SVG icon set, stagger reveal
  Journey.jsx              two-column timeline, scroll-drawn spine line
  Projects.jsx             alternating rows, parallax poster art, clip-path reveals
  ProjectArt.jsx           bespoke inline-SVG poster per project (no stock imagery)
  Achievements.jsx         cards + animated counters
  Contact.jsx              secured Web3Forms form + obfuscated email + copy button
  Footer.jsx               oversized name, back-to-top via Lenis
  CustomCursor.jsx         dot + lagged ring (GSAP quickTo), hover states, touch-disabled
  ProgressBar.jsx          top scroll progress, scrubbed
  Reveal.jsx               single GSAP reveal primitive (variants: up/left/right/scale/fade, stagger)
  SectionHeading.jsx       char-level scrubbed heading (replaces react-bits ScrollFloat)
  Icons.jsx                inline SVG icon set (replaces Font Awesome)
three/
  ParticleField.jsx        the signature scene (spec §6)
styles/global.css          full design system (spec §5)
data/content.js            all copy/data (single source of truth)
constants/theme.js         shared color tokens (CSS ↔ JS ↔ WebGL)
vercel.json                security headers (spec §7)
```

**One animation engine.** GSAP + ScrollTrigger drives everything; Lenis drives scroll; CSS only
for idle loops (marquee base drift, cursor blink). `motion`, `ogl`, react-bits — removed.

**Z-index scale (strict):** backdrop `0` → WebGL `1` → content `2` → nav `50` → menu `60` →
cursor `80` → progress `90` → preloader `100`. Noise overlay sits at `3` (above canvas, below UI).

## 5. Design system

- **Type:** Fraunces 600 (display serif, headlines) · Space Grotesk (hero name, numerics) ·
  Manrope (body) · IBM Plex Mono (labels, tags, counters)
- **Scale:** fluid `clamp()` for all display sizes; container `1360px`; section padding
  `clamp(6rem, 11vw, 10.5rem)`
- **Texture:** 64px grid backdrop (masked radial), SVG noise at 3.5% opacity, hairline rules
- **Motion grammar:** masked slide-ups for type (`clip-path` word masks), `power3.out` for
  entrances, `expo.inOut` for the preloader curtain, scrub `0.5–1` for parallax; nothing bounces
- **Reduced motion:** `prefers-reduced-motion` collapses every animation to opacity-only or none;
  particle field renders one static frame

## 6. Particle field spec

- Single `<canvas>`, `position: fixed`, full viewport, `z-index: 1`, `pointer-events: none`
- ~9,000 particles desktop / ~3,000 mobile, round sprites via fragment discard, wine→brass→ink
  palette mixed per-particle
- 4 morph targets baked into buffer attributes: **sphere** (hero) → **helix** (skills zone) →
  **torus knot** (projects zone) → **wave grid** (contact zone)
- Vertex shader lerps between targets from a single `uMorph` uniform driven by document scroll
  progress (ScrollTrigger scrub) — no per-frame CPU work
- Mouse repulsion in the vertex shader (`uMouse`, smoothed with lerp)
- Perf guards: DPR clamped to 1.75, `visibilitychange` pause, full dispose on unmount,
  context-loss listener, static single render under reduced motion

## 7. Security & safeguarding

- **Form:** Web3Forms endpoint; hidden `botcheck` honeypot; time-trap (submissions < 3 s from
  mount rejected client-side); `maxLength` caps; required-field + email-pattern validation;
  status announced via `aria-live`
- **Email scraping:** address never appears in the HTML — assembled at runtime from parts,
  rendered on interaction, one-click copy
- **External links:** all `target="_blank"` carry `rel="noopener noreferrer"`
- **Headers (`vercel.json`):** CSP (self + fonts.googleapis/gstatic + api.web3forms.com),
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy:
  strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geolocation off)
- **No `dangerouslySetInnerHTML`, no inline event handlers, no third-party scripts** except fonts

## 8. Performance budget

- JS ≤ 250 KB gzip total; Three.js chunk lazy-loaded after first paint
- Preloader ≤ 2 s, never blocks longer than real asset readiness
- 60 fps scroll on a mid-range laptop: no fixed-position blur repaints, transforms/opacity only,
  `will-change` on the 3 actively animated layers only
- Lighthouse targets: Performance ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO ≥ 95

## 9. Acceptance criteria

1. `npm run dev` boots; `npm run build` passes with no warnings that matter
2. Preloader plays once, dissolves automatically, scroll position/triggers are correct immediately after (the v1 alignment bug is dead)
3. Every nav link glides via Lenis to the right offset; scrollspy tracks correctly
4. Particle field visibly morphs across the four scroll zones and reacts to the mouse
5. Form blocks bots (honeypot + time-trap) and submits successfully with a real Web3Forms key
6. Site is fully usable with JavaScript animations disabled (reduced motion) and on a 375px phone
7. No Font Awesome, no `ogl`, no `motion`, no react-bits, no dead files

## 10. Owner TODO after build

- [ ] Get a free access key at https://web3forms.com and paste it into `data/content.js` → `CONTACT.web3formsKey`
- [ ] Replace `#` placeholder link on the CodeSense project with the live URL
- [ ] Deploy to Vercel (`vercel.json` headers activate automatically)
