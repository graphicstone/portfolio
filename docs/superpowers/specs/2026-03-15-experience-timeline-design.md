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

### KreditBee bullet points (new entry)
- Architecting and owning the frontend systems for a high-scale fintech UPI payment platform.
- Driving technical decisions, code standards, and delivery across the frontend org.
- Collaborating with product, design, and platform teams on system design.
- Building performant, accessible interfaces for millions of users.

### Walrus Tech content (updated tenure, bullets unchanged)
- Tenure changes from `Jun 2021 - Present` → `Jun 2021 - Dec 2025`.
- All existing sub-project bullets (Affogato AI, RoverX, Defy, Walrus) are kept exactly as-is.

### GlobalLogic content
- Unchanged.

### KreditBee logo
No SVG asset exists for KreditBee. Render a styled initials badge in its place:
- A `32×32px` `Box` with `borderRadius: '6px'`, `backgroundColor: 'colors.accentMuted'`, `border: '1px solid colors.accent'`
- Centred text `"KB"` in `heading_h6_bold`, `color: 'colors.accent'`

---

## Layout

- The entries container has `position: 'relative'` — this is the positioning context for the vertical line.
- Section left padding: `48px` on desktop, `36px` on mobile — this is the space the line and dot occupy.
- **Vertical line:** `position: absolute`, `left: '7px'` (centres on the 14px dot), `top: 0`, `bottom: 0`, `width: '2px'`, gradient `linear-gradient(to bottom, #6366F1 0%, rgba(99,102,241,0.3) 60%, transparent 100%)`. Because the line is `position: absolute` with `top: 0` and `bottom: 0` on the `position: relative` entries container, it automatically fills the full height of the entries without needing an explicit `height` value.
- **Dot:** `14×14px` circle, `background: #6366F1`, `position: absolute`, `left: '-41px'` (48px padding − 7px half-dot), `top: { xs: '22px', md: '30px' }` — responsive to account for varying card header height on mobile.
- **Horizontal connector tick:** `position: absolute`, `left: '-27px'` (dot right edge to card), `top: { xs: '28px', md: '36px' }`, `width: '20px'`, `height: '2px'`, `background: #6366F1`.
- **Card:** unchanged visually — dark `#111111` surface, `3px` indigo left border, tenure in accent color.
- **Entry spacing:** `64px` gap between entries on desktop, `40px` on mobile, using `flexDirection: column` with `gap`.

---

## Animation

**Orchestration pattern:** A single `useInView` hook (from Framer Motion) on the entries container fires once when the container enters the viewport. Each child (`motion.div` wrapping the line, each dot, each card) declares its own `initial` and `animate` driven by a shared `inView` boolean from the hook — `animate={inView ? 'visible' : 'hidden'}`. This keeps the trigger centralised while giving each child its own delay. No `whileInView` is used on individual children — they all respond to the single `useInView` ref.

```js
const ref = useRef(null);
const inView = useInView(ref, { once: true, amount: 0.1 });
// Pass ref to entries container Box
// Each motion.div: animate={inView ? 'visible' : 'hidden'}
```

**Animation table:**

| Step | Element | `initial` | `visible` | Delay | Duration | Easing |
|------|---------|-----------|-----------|-------|----------|--------|
| 1 | Vertical line | `scaleY: 0` | `scaleY: 1` | 0s | 1.8s | `[0.16, 1, 0.3, 1]` |
| 2 | Dot 1 (KreditBee) | `scale: 0, opacity: 0` | `scale: 1, opacity: 1` | 0.3s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 3 | Card 1 | `x: 28, opacity: 0` | `x: 0, opacity: 1` | 0.45s | 0.65s | `[0.22, 1, 0.36, 1]` |
| 4 | Dot 2 (Walrus) | `scale: 0, opacity: 0` | `scale: 1, opacity: 1` | 0.6s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 5 | Card 2 | `x: 28, opacity: 0` | `x: 0, opacity: 1` | 0.75s | 0.65s | `[0.22, 1, 0.36, 1]` |
| 6 | Dot 3 (GlobalLogic) | `scale: 0, opacity: 0` | `scale: 1, opacity: 1` | 0.9s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 7 | Card 3 | `x: 28, opacity: 0` | `x: 0, opacity: 1` | 1.05s | 0.65s | `[0.22, 1, 0.36, 1]` |

Line uses `transformOrigin: 'top'` for the `scaleY` to draw downward.

---

## Active Indicator (KreditBee dot only)

Applied via MUI `sx` prop `'&::after'` directly on the dot `Box` — **not** a global CSS class:

```js
'&::after': {
  content: '""',
  position: 'absolute',
  inset: '-5px',
  borderRadius: '50%',
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

The dot `Box` needs `position: 'relative'` so the `::after` ring is positioned correctly.

---

## ExperienceCard changes

Remove the `motion.div` wrapper from `ExperienceCard`. The component's root element becomes the inner `Box` directly (no wrapper needed — `ExperienceSection` will wrap each card in its own `motion.div` for animation). No other visual changes to `ExperienceCard`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/index.css` | Add `@keyframes pulse-ring` |
| `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx` | Full rewrite — `useInView` hook, timeline layout, animated line + dots, KreditBee entry, updated Walrus tenure |
| `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx` | Remove `motion.div` wrapper; root becomes inner `Box` |
| `src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js` | No change |

---

## Out of Scope

- No new SVG assets — KreditBee uses an initials badge
- No changes to ExperienceCard visual styling
- No horizontal or alternating timeline variants
- No changes to any other section
