# Experience Section Timeline Design

**Date:** 2026-03-15
**Status:** Approved

---

## Goal

Replace the current stacked card layout in the Experience section with a left-aligned vertical timeline that visually communicates career progression, with a sequential scroll-triggered animation sequence.

---

## Content

Three timeline entries, ordered newest → oldest:

| Entry | Company | Role | Tenure | State |
|-------|---------|------|--------|-------|
| 1 | KreditBee | Lead Frontend Engineer (UPI) | Jan 2026 – Present | Active (pulsing dot) |
| 2 | Walrus Tech Inc. (YC S21) | Senior Frontend Engineer | Jun 2021 – Dec 2025 | Past |
| 3 | GlobalLogic (A Hitachi Group Company) | Software Engineer | Jul 2019 – May 2021 | Past |

### Entry 1 — KreditBee (new)

Logo: No SVG exists. Render an initials badge:
- `Box` `32×32px`, `borderRadius: '6px'`, `backgroundColor: 'colors.accentMuted'`, `border: '1px solid'`, `borderColor: 'colors.accent'`, display flex, center-aligned.
- Inner `Typography` `heading_h6_bold`, `color: 'colors.accent'`, text `"KB"`.

Bullet points (exact copy):
```
- Architecting and owning the frontend systems for a high-scale fintech UPI payment platform.
- Driving technical decisions, code standards, and delivery across the frontend org.
- Collaborating with product, design, and platform teams on system design.
- Building performant, accessible interfaces for millions of users.
```

### Entry 2 — Walrus Tech Inc.

Logo: import `RenderNet` from `../../../../assets/svg/experience/rendernet.svg?react` (unchanged — same import as current code).

Tenure update: `"Jun 2021 - Present"` → `"Jun 2021 - Dec 2025"`.

Body: Keep the **entire existing JSX children block** exactly as-is — the four sub-role sections (Affogato AI, RoverX, Defy, Walrus) with all their bullet arrays. No content changes.

### Entry 3 — GlobalLogic

Logo: import `GlobalLogic` from `../../../../assets/svg/experience/globallogic.svg?react` (unchanged).
Tenure and bullets: unchanged.

---

## Layout

### Positioning context

The **entry row wrapper** (`Box` containing one dot + one card) is `position: 'relative'`. The dot and connector tick are positioned absolutely relative to this entry row wrapper — not relative to the card or the section.

The **entries container** (the `Box` holding all three entry row wrappers and the vertical line) is also `position: 'relative'` — this is the positioning context for the vertical line only.

### Measurements

- Section left padding: `{ xs: '36px', md: '48px' }` — this clears space for the line and dot.
- **Vertical line:** child of the entries container.
  - `position: 'absolute'`, `left: '7px'`, `top: 0`, `bottom: 0`, `width: '2px'`
  - `background: 'linear-gradient(to bottom, #6366F1 0%, rgba(99,102,241,0.3) 60%, transparent 100%)'`
  - `transformOrigin: 'top'` (for `scaleY` animation)
  - `zIndex: 0`
  - Fills full height automatically via `top: 0` / `bottom: 0` on the `position: relative` entries container. No explicit `height` needed.
- **Dot:** child of each entry row wrapper.
  - `position: 'absolute'`, `left: { xs: '-29px', md: '-41px' }` (section padding − 7px half-dot), `top: { xs: '22px', md: '30px' }`
  - `width: '14px'`, `height: '14px'`, `borderRadius: '50%'`, `backgroundColor: 'colors.accent'`
  - `position: 'relative'` is also required on this `Box` so `::after` ring is positioned inside it.
  - `zIndex: 2`
- **Connector tick:** child of each entry row wrapper.
  - `position: 'absolute'`, `left: { xs: '-15px', md: '-27px' }`, `top: { xs: '28px', md: '36px' }`
  - `width: '14px'`, `height: '2px'`, `backgroundColor: 'colors.accent'`
  - `zIndex: 1`
- **Card:** unchanged visually. No position changes needed.
- **Entry row gap:** `{ xs: '40px', md: '64px' }` via `flexDirection: 'column'` + `gap` on the entries container.

### z-index layering (entries container stacking context)
- Line: `zIndex: 0`
- Connector tick: `zIndex: 1`
- Dot: `zIndex: 2`
- Card: default (above all timeline chrome)

---

## Animation

### Orchestration

Use Framer Motion's `useInView` hook on the **entries container** ref. When `inView` becomes `true`, all child `motion.div` elements switch from `'hidden'` to `'visible'` variant. Each element defines its own `variants` + `transition` (including `delay`).

```js
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ref = useRef(null);
const inView = useInView(ref, { once: true, amount: 0.1 });
// ref goes on the entries container Box
// each motion.div: animate={inView ? 'visible' : 'hidden'}
```

### Variants pattern per element

```js
// Line
variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1 } }}
transition={{ duration: 1.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}

// Dot
variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
transition={{ duration: 0.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}

// Card
variants={{ hidden: { x: 28, opacity: 0 }, visible: { x: 0, opacity: 1 } }}
transition={{ duration: 0.65, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
```

### Full timing table

| Step | Element | `hidden` | `visible` | Delay | Duration | Easing |
|------|---------|----------|-----------|-------|----------|--------|
| 1 | Vertical line | `scaleY:0` | `scaleY:1` | 0s | 1.8s | `[0.16, 1, 0.3, 1]` |
| 2 | Dot 1 (KreditBee) | `scale:0, opacity:0` | `scale:1, opacity:1` | 0.3s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 3 | Card 1 | `x:28, opacity:0` | `x:0, opacity:1` | 0.45s | 0.65s | `[0.22, 1, 0.36, 1]` |
| 4 | Dot 2 (Walrus) | `scale:0, opacity:0` | `scale:1, opacity:1` | 0.6s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 5 | Card 2 | `x:28, opacity:0` | `x:0, opacity:1` | 0.75s | 0.65s | `[0.22, 1, 0.36, 1]` |
| 6 | Dot 3 (GlobalLogic) | `scale:0, opacity:0` | `scale:1, opacity:1` | 0.9s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 7 | Card 3 | `x:28, opacity:0` | `x:0, opacity:1` | 1.05s | 0.65s | `[0.22, 1, 0.36, 1]` |

---

## Active Indicator (KreditBee dot only)

Applied via MUI `sx` `'&::after'` on the KreditBee dot `Box`. The dot `Box` must have `position: 'relative'` (already specified in Layout above).

```js
'&::after': {
  content: '""',           // required — without this the pseudo-element does not render
  position: 'absolute',    // required — positions ring relative to the dot
  inset: '-5px',
  borderRadius: '50%',     // required — makes the ring circular
  border: '2px solid #6366F1',
  animation: 'pulse-ring 2s ease-out infinite',
}
```

`@keyframes pulse-ring` added to `src/index.css`:

```css
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.6; }
  70%  { transform: scale(2.5); opacity: 0;   }
  100% { transform: scale(2.5); opacity: 0;   }
}
```

---

## ExperienceCard changes

Remove the `motion.div` wrapper from `ExperienceCard`. The component's **root element becomes the existing inner `Box`** (the one with `backgroundColor: 'colors.surface'`, `borderRadius`, `borderLeft`, etc.) — no wrapper `div` needed. `ExperienceSection` wraps each card in its own `motion.div` for animation.

No other visual or structural changes to `ExperienceCard`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/index.css` | Add `@keyframes pulse-ring` |
| `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx` | Full rewrite — `useInView`, timeline layout, 3 entries, KreditBee content, updated Walrus tenure |
| `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx` | Remove `motion.div` wrapper; root becomes inner `Box` |
| `src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js` | **Cleared** — styles inlined into `ExperienceSection.jsx`. File kept with empty export to avoid broken imports. |

---

## Out of Scope

- No new SVG assets — KreditBee uses an initials badge
- No changes to ExperienceCard visual styling
- No horizontal or alternating timeline variants
- No changes to any other section
