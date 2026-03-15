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

Logo: No SVG asset exists. Render an initials badge:
```jsx
<Box sx={{
  width: '36px', height: '36px', borderRadius: '6px',
  backgroundColor: 'colors.accentMuted', border: '1px solid',
  borderColor: 'colors.accent', display: 'flex',
  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
}}>
  <Typography variant="heading_h6_bold" sx={{ color: 'colors.accent' }}>KB</Typography>
</Box>
```

Bullet points (exact):
```
- Architecting and owning the frontend systems for a high-scale fintech UPI payment platform.
- Driving technical decisions, code standards, and delivery across the frontend org.
- Collaborating with product, design, and platform teams on system design.
- Building performant, accessible interfaces for millions of users.
```

### Entry 2 — Walrus Tech Inc.

Logo: `import RenderNet from '../../../../assets/svg/experience/rendernet.svg?react'` (unchanged).
Tenure: update `"Jun 2021 - Present"` → `"Jun 2021 - Dec 2025"`.
Body: keep the **entire existing JSX children block** (4 sub-roles: Affogato AI, RoverX, Defy, Walrus) exactly as-is.

### Entry 3 — GlobalLogic

Logo: `import GlobalLogic from '../../../../assets/svg/experience/globallogic.svg?react'` (unchanged).
Tenure and bullets: unchanged.

---

## Layout

The timeline uses a **flexbox row** per entry — a fixed-width left column for the dot, and the card filling the rest. The vertical line is absolutely positioned on the entries container spanning its full height.

### Entry row structure

```
[entries-container: position relative]
  │
  ├── [vertical-line: position absolute, left: 11px, top:0, bottom:0, width:2px]
  │
  ├── [entry-row: display flex, flexDirection row, gap 24px, mb 64px]
  │     ├── [dot-column: width 24px, flexShrink 0, display flex, flexDirection column, alignItems center, pt '30px']
  │     │     └── [dot: 14×14px circle]
  │     └── [card: flex 1]
  │
  ├── [entry-row] ...
  └── [entry-row] ...
```

**Why flexbox instead of absolute positioning:** The dot-column is a fixed `24px` wide flex child. The vertical line is at `left: 11px` on the entries container (the center of 24px = 12px, minus 1px for the 2px line center = 11px). The dot is centred inside its `24px` column via `alignItems: center` — no offset math needed, alignment is guaranteed.

### Measurements

- Entries container: **`position: 'relative'`** — required so the absolute-positioned vertical line is contained within it and does not escape to a parent ancestor.
- Entries container must NOT have `overflow: 'hidden'` — the line would be clipped.
- Vertical line: `position: 'absolute'`, `left: '11px'`, `top: 0`, `bottom: 0`, `width: '2px'`, `background: 'linear-gradient(to bottom, #6366F1 0%, rgba(99,102,241,0.3) 60%, transparent 100%)'`, `zIndex: 0`. Set `transformOrigin: 'top'` in the element's `style` prop (not inside the Framer Motion variant) to avoid CSS specificity conflicts with Framer Motion's own style injection.
- Dot column: `width: '24px'`, `flexShrink: 0`, `display: 'flex'`, `flexDirection: 'column'`, `alignItems: 'center'`, `paddingTop: { xs: '24px', md: '30px' }` (aligns dot with card header row)
- Dot box: `width: '14px'`, `height: '14px'`, `borderRadius: '50%'`, `backgroundColor: 'colors.accent'`, `zIndex: 2`, `position: 'relative'` (required for `::after` ring — `position: relative` is the correct value here, not `absolute`, since the dot is a normal flow child of the dot column and must stay in flow while still serving as the `::after` positioning context)
- Card: `flex: 1`
- Entry row gap: `{ xs: '40px', md: '64px' }` as `marginBottom` on each non-last entry row

---

## Animation

### Hook — import from `framer-motion`

```js
import { motion, useInView } from 'framer-motion';
// NOT from 'react-intersection-observer'
```

```js
const ref = useRef(null);
const inView = useInView(ref, { once: true, amount: 0.1 });
// ref goes on the entries container Box
```

### Each animated element is its own `motion.div`

- The **vertical line** `Box` is wrapped in a `motion.div`
- Each **dot** `Box` is wrapped in its own `motion.div`
- Each **card** (`ExperienceCard`) is wrapped in its own `motion.div`
- All use `animate={inView ? 'visible' : 'hidden'}` driven by the single `inView` boolean

### Variants + timing

Both `hidden` and `visible` keys are fully defined in every variant — no inference required:

```js
// Line — hidden has scaleY:0 only (opacity stays 1 throughout)
const lineVariants = {
  hidden:  { scaleY: 0 },
  visible: { scaleY: 1, transition: { duration: 1.8, delay: 0, ease: [0.16, 1, 0.3, 1] } }
};

// Dot (i = 0, 1, 2) — hidden collapses and fades; visible restores both
const dotVariants = (i) => ({
  hidden:  { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.3 + i * 0.3, ease: [0.22, 1, 0.36, 1] } }
});

// Card (i = 0, 1, 2) — hidden is offset right and invisible
const cardVariants = (i) => ({
  hidden:  { x: 28, opacity: 0 },
  visible: { x: 0,  opacity: 1, transition: { duration: 0.65, delay: 0.45 + i * 0.3, ease: [0.22, 1, 0.36, 1] } }
});
```

Delay formula `0.3 + i * 0.3` and `0.45 + i * 0.3` is defined for `i = 0, 1, 2` (3 entries). If entries change, update `i` accordingly.

---

## Active Indicator (KreditBee dot only)

Applied via MUI `sx` `'&::after'` on the KreditBee dot `Box`. This works because the dot has `position: 'relative'`, making it the positioning context for `::after`.

```js
// On KreditBee dot Box sx prop:
// Note: 'inset' is not a MUI sx shorthand — use explicit top/right/bottom/left
'&::after': {
  content: '""',
  position: 'absolute',
  top: '-5px', right: '-5px', bottom: '-5px', left: '-5px',
  borderRadius: '50%',
  border: '2px solid #6366F1',
  animation: 'pulse-ring 2s ease-out infinite',
}
```

`@keyframes pulse-ring` added to `src/index.css` (plain CSS, not CSS-in-JS):

```css
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.6; }
  70%  { transform: scale(2.5); opacity: 0;   }
  100% { transform: scale(2.5); opacity: 0;   }
}
```

---

## ExperienceCard changes

Remove the `motion.div` wrapper from `ExperienceCard`. The component's root element becomes the existing inner `Box` (the one with `backgroundColor: 'colors.surface'`, `borderRadius`, `borderLeft`, etc.). `ExperienceCard` does not receive or use any Framer Motion props — animation is fully owned by the `motion.div` wrapper in `ExperienceSection`. No other visual changes.

---

## Files Changed

| File | Change |
|------|--------|
| `src/index.css` | Add `@keyframes pulse-ring` |
| `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx` | Full rewrite — `useInView`, flexbox timeline layout, 3 entries, KreditBee content, updated Walrus tenure |
| `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx` | Remove `motion.div` wrapper; root becomes inner `Box` |
| `src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js` | File is **deleted**. The import line `import { experienceSectionStyles } from './ExperienceSectionStyles.js'` in `ExperienceSection.jsx` is also removed. No other file imports this module. |

---

## Out of Scope

- No new SVG assets — KreditBee uses an initials badge
- No changes to ExperienceCard visual styling
- No horizontal or alternating timeline variants
- No changes to any other section
