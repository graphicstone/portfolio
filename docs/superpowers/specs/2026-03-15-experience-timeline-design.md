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

### KreditBee bullet points
- Architecting and owning the frontend systems for a high-scale fintech UPI platform.
- Driving technical decisions, code standards, and delivery across the frontend org.
- Collaborating with product, design, and platform teams on system design.
- Building performant, accessible interfaces for millions of users.

---

## Layout

- Section left padding: `48px` on desktop, `32px` on mobile — this is the space the line + dot occupy
- **Vertical line:** `2px` wide, positioned at `left: 7px` (center of the 14px dot), full height of the entries container, gradient `#6366F1 → rgba(99,102,241,0.3) → transparent`
- **Dot:** `14px × 14px` circle, `background: #6366F1`, centered on the line at `top: 30px` of each card (aligns with card header)
- **Horizontal connector tick:** `8px` wide, `2px` tall, `background: #6366F1`, bridges dot to card left edge
- **Card:** unchanged — dark `#111111` surface, `3px` indigo left border, tenure in accent color
- **Entry spacing:** `64px` gap between entries on desktop, `40px` on mobile

---

## Animation Sequence

All animations are scroll-triggered (`whileInView`, `once: true`) on the entries container entering the viewport.

| Step | Element | Animation | Delay | Duration | Easing |
|------|---------|-----------|-------|----------|--------|
| 1 | Vertical line | `scaleY: 0 → 1`, `transformOrigin: top` | 0s | 1.8s | `[0.16, 1, 0.3, 1]` |
| 2 | Dot 1 (KreditBee) | `scale: 0 → 1`, `opacity: 0 → 1` | 0.3s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 3 | Card 1 | `x: 28 → 0`, `opacity: 0 → 1` | 0.45s | 0.65s | `[0.22, 1, 0.36, 1]` |
| 4 | Dot 2 (Walrus) | `scale: 0 → 1`, `opacity: 0 → 1` | 0.6s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 5 | Card 2 | `x: 28 → 0`, `opacity: 0 → 1` | 0.75s | 0.65s | `[0.22, 1, 0.36, 1]` |
| 6 | Dot 3 (GlobalLogic) | `scale: 0 → 1`, `opacity: 0 → 1` | 0.9s | 0.4s | `[0.22, 1, 0.36, 1]` |
| 7 | Card 3 | `x: 28 → 0`, `opacity: 0 → 1` | 1.05s | 0.65s | `[0.22, 1, 0.36, 1]` |

---

## Active Indicator (KreditBee dot)

CSS `@keyframes pulse-ring` added to `index.css`:

```css
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: 0.6; }
  70%  { transform: scale(2.5); opacity: 0;   }
  100% { transform: scale(2.5); opacity: 0;   }
}
```

Applied via a `::after` pseudo-element on the KreditBee dot:
- `position: absolute`, `inset: -4px`, `border-radius: 50%`
- `border: 2px solid #6366F1`
- `animation: pulse-ring 2s ease-out infinite`

---

## Files Changed

| File | Change |
|------|--------|
| `src/index.css` | Add `@keyframes pulse-ring` |
| `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx` | Full rewrite — timeline wrapper, animated line, dots, updated content with KreditBee |
| `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx` | Remove Framer Motion wrapper (animation now owned by ExperienceSection) |
| `src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js` | No change needed |

---

## Out of Scope

- No changes to ExperienceCard's visual design (dark surface, left border stays)
- No horizontal/alternating timeline variants
- No changes to any other section
