# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server
npm run build    # production build
npm run lint     # ESLint
```

## Architecture

Single-page artist website for classical cellist Lizi Ramishvili. No routing — one page, one component.

**Entry point**: `app/page.tsx` → renders `app/components/HomePage.tsx`

**`HomePage.tsx`** is the entire site. It contains:
- All section data as `const` arrays at the top of the file (repertoire, schedule, competitions, honours, scholarships, bioChapters, BIO_IMAGES)
- All GSAP scroll animations in a single `useEffect` with a GSAP context (`ctx`) — registered once, cleaned up with `ctx.revert()`
- All section JSX in one large return

**Styles**: Everything lives in `app/globals.css` — one flat file organised by section with `/* ── SECTION ── */` comments. No CSS modules, no Tailwind.

**Design system** (CSS variables in `:root`):
- Fonts: `--font-serif` (Playfair Display) and `--font-sans` (Raleway), loaded via `next/font/google` in `layout.tsx`
- Palette: `--bg-cream/warm/stone/dark/deep`, `--text-primary/secondary/muted/ghost/inverse`, `--accent` (crimson `#b52a3a`)
- Layout: `--section-pad`, `--gutter`, `--max-w: 1400px`

**Sections** (in DOM order):
1. Hero — full-viewport dark, GSAP letter-by-letter name reveal + scroll parallax
2. Marquee — infinite CSS scroll strip
3. About — two-column biography with GSAP slideshow
4. Recognition — competitions, honours, scholarships
5. Horizontal glide text — scroll-scrubbed oversized outlined type
6. Stages — **commented out**, extracted to `app/components/sections/StagesSection.tsx`
7. Repertoire — dark section, outlined index numbers, Playfair italic piece names
8. Press & Media — 12-column masonry grid, each cell is an `<a>` with a real image + overlay linking to press coverage
9. Schedule — dark rows grid: date | separator | venue info | tickets link
10. Contact — form + footer

**Extracting sections**: When moving a section out of `HomePage.tsx`, follow the `StagesSection.tsx` pattern — move data constants, GSAP animations (with their own `useEffect` + `registerPlugin`), and JSX into a self-contained `"use client"` component under `app/components/sections/`.

**Mobile nav**: Hamburger button is a `position: fixed; z-index: 300` element rendered **outside** `<nav>` to avoid stacking context issues from `mix-blend-mode: difference` on the nav. State is `mobileNavOpen` in `HomePage`.

**Custom cursor**: Hidden via CSS at `≤1024px` (`display: none` on `.cursor` and `.cursor-ring`).

**Images**: All in `public/images/` — `hero-img.png`, `lizi-press.jpg`, `lizi-cover.jpg`, `biography/bio1-4.jpg`, `stages/carnegie-hall.jpg`, `kloster-eberbach.jpg`, `tbilisi-conservatoire.jpg`.
