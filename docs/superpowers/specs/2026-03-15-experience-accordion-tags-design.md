# Experience Section — Accordion + Tech Stack Tags Design

**Date:** 2026-03-15
**Status:** Approved

---

## Goal

Enhance the existing vertical timeline Experience section with two layered improvements: (1) accordion expand/collapse on each card so the section reads cleanly by default, and (2) tech stack tags on every card so the tech used at each role is immediately visible without opening the card.

The vertical timeline structure (animated line, dots, stagger entrance) is **unchanged**.

---

## Behaviour

### Expand / Collapse

- Each `ExperienceCard` manages its own open/closed state via `useState(defaultExpanded ?? false)`.
- `ExperienceCard` accepts a `defaultExpanded` prop (boolean, default `false`). When `true` the card mounts open.
- KreditBee passes `defaultExpanded={true}` — it starts open.
- Walrus and GlobalLogic omit `defaultExpanded` (defaults to `false`) — they start closed.
- Once mounted, any card can be toggled freely. There is no parent-controlled open state.
- The expand/collapse trigger is the entire card header row (`cursor: 'pointer'`, `onClick={toggleOpen}`).

### Body animation

Framer Motion v11 (installed version `^11.3.30`) fully supports animating `height` from `0` to `'auto'`. Use:

```jsx
const [isOpen, setIsOpen] = useState(defaultExpanded ?? false);

<motion.div
  initial={false}
  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
  style={{ overflow: 'hidden' }}
>
  {/* existing body content: children or description list */}
</motion.div>
```

`initial={false}` prevents the open animation from playing on mount when `defaultExpanded={true}` — the card renders immediately open. **Do not use `AnimatePresence`** — it is not needed here and would interact poorly with `initial={false}`.

The `motion.div` body wrapper replaces the existing plain `Box` body wrapper (`<Box sx={{ color: 'colors.textSecondary' }}>`). The existing `children` vs `description` conditional render logic inside is preserved exactly as-is — just wrapped by the `motion.div`.

### Expand button

A small pill in the right-hand column of the card header shows the expand state:
- **Collapsed:** `▼ {expandLabel}` — e.g. `▼ 4 projects`, `▼ 2 bullets`
- **Expanded:** `▲ hide` (always this fixed string — `expandLabel` is only used in the collapsed state)

The `expandLabel` prop (string, default `'details'`) is passed from `ExperienceSection`.

---

## Layout — Card Header Row

The header row structure changes to accommodate the CURRENT badge and expand button stacked vertically on the right. The **tenure string moves** from the far-right into the left meta column (below the company name), so the right column is free for the badge and button.

The header `alignItems` is `flex-start` unconditionally (not the responsive `{ xs: 'flex-start', md: 'center' }` value from the current implementation — the right-column stacking requires top-alignment at all breakpoints).

```
[header row: display flex, flexDirection row, alignItems flex-start, gap 16px, cursor pointer]
  ├── [logo box: 44px svg wrapper — unchanged]
  ├── [meta: flex 1]
  │     ├── [jobTitle — unchanged]
  │     ├── [company name] · [tenure]  ← both on same line, same Typography
  │     └── [tags row: display flex, flexWrap wrap, gap 5px]
  │               └── [tag chip × N]
  └── [right column: display flex, flexDirection column, alignItems flex-end, gap 8px]
        ├── [CURRENT badge]  ← only when isActive={true}
        └── [expand button pill]
```

**Tenure position change:** `jobTitle` and `tenure` are separate props. The tenure `Typography` moves from the far-right into the meta column, directly below the jobTitle line:

```jsx
{/* tenure below jobTitle in meta column */}
<Typography variant="heading_h6_medium" sx={{ color: isActive ? 'colors.accent' : '#888', fontSize: '12px', letterSpacing: '0.03em', marginBottom: '10px' }}>
  {tenure}  {/* e.g. "Jan 2026 – Present" */}
</Typography>
```

The company name is embedded in `jobTitle` (e.g. "Lead Frontend Engineer (UPI) at KreditBee") — this is unchanged. The meta column shows: `jobTitle` (h4), then `tenure` (h6 muted), then tags row.

---

## Visual Design

### Glowing top edge (active role only)

Rendered as the **first child** of the outer card `Box`. To span the full card width despite the card's `padding: '28px 32px'`, use **negative horizontal margin**:

```jsx
{isActive && (
  <Box sx={{
    height: '2px',
    margin: '-28px -32px 28px -32px',  // four-value: top right bottom left
    // top -28px + right -32px + bottom 28px (restores header spacing) + left -32px
    // Pulls the strip out of card padding on all three sides so it's flush with card edges
    background: 'linear-gradient(to right, transparent, #6366F1, transparent)',
  }} />
)}
```

This renders flush with the card's left and right edges. Using the four-value `margin` shorthand avoids property-order sensitivity between `margin` and `marginBottom`.

### Card border / outline changes

The existing card uses `outline: '1px solid'` + `outlineColor: 'colors.border'` (not CSS `border`) for its outer edge. All border-colour changes below use `outlineColor` to match — the `outline: '1px solid'` declaration stays unchanged.

| State | `outlineColor` value |
|-------|----------------------|
| Active (KreditBee, any state) | `rgba(99,102,241,0.45)` |
| Past + closed | `colors.border` (unchanged) |
| Past + open | `rgba(99,102,241,0.2)` |

The existing `'&:hover': { outlineColor: 'rgba(99,102,241,0.35)' }` rule is **removed**. It is replaced by the state-driven `outlineColor` above. Hover no longer changes the outline — the open/active state communicates interaction sufficiently.

**`borderLeft` is not touched** — `borderLeft: '3px solid'` + `borderLeftColor: 'colors.accent'` remain unchanged on all cards.

Implement with:
```jsx
outlineColor: isActive
  ? 'rgba(99,102,241,0.45)'
  : isOpen
    ? 'rgba(99,102,241,0.2)'
    : 'colors.border',
```

### CURRENT badge (`isActive={true}` only)

Rendered in the right column of the header, above the expand button.

```jsx
{isActive && (
  <Box sx={{
    display: 'flex', alignItems: 'center', gap: '6px',
    background: 'rgba(99,102,241,0.1)',
    border: '1px solid rgba(99,102,241,0.25)',
    borderRadius: '20px',
    padding: '4px 10px 4px 7px',
  }}>
    <Box sx={{
      width: '7px', height: '7px', borderRadius: '50%',
      backgroundColor: '#6366F1',
      boxShadow: '0 0 8px rgba(99,102,241,0.8)',
      // Static glow — no animation keyframe needed
    }} />
    <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#818cf8', letterSpacing: '0.06em' }}>
      CURRENT
    </Typography>
  </Box>
)}
```

The dot is a **static glow** (no animation keyframe) — the `boxShadow` alone gives the visual emphasis needed without requiring a new keyframe.

### Expand button

Positioned in the right column below the CURRENT badge.

```jsx
<Box sx={{
  fontSize: '10px',
  color: isOpen && isActive ? '#6366F1' : isOpen ? '#6366F1' : '#555',
  border: '1px solid',
  borderColor: isOpen ? 'rgba(99,102,241,0.3)' : '#2a2a2a',
  borderRadius: '4px',
  padding: '4px 8px',
  whiteSpace: 'nowrap',
  userSelect: 'none',
}}>
  {isOpen ? '▲ hide' : `▼ ${expandLabel}`}
</Box>
```

Simplified: expand button is indigo-tinted when open (regardless of `isActive`), grey when closed.

---

## Tech Stack Tags

### Tag data (`tags` prop — `string[]`)

| Entry | Tags |
|-------|------|
| KreditBee | `['React', 'TypeScript', 'Redux', 'UPI / Fintech', 'System Design']` |
| Walrus Tech | `['React', 'Electron', 'Redux', 'Flutter', 'Kotlin', 'Playwright']` |
| GlobalLogic | `['Android', 'Kotlin', 'MVVM']` |

### Tag placement

Tags sit below the tenure line inside the meta column of the header. Always visible regardless of open/closed state.

### Tag styles

**Active role (`isActive={true}`):**
```
fontSize: '10px', fontWeight: 600, color: '#a5b4fc',
background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.03em'
```

**Past role (`isActive={false}`):**
```
fontSize: '10px', fontWeight: 600, color: '#52525b',
background: 'rgba(255,255,255,0.03)', border: '1px solid #2a2a2a',
padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.03em'
```

Tags container: `display: 'flex'`, `flexWrap: 'wrap'`, `gap: '5px'`.

---

## ExperienceCard — Full Prop Interface

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `companyLogo` | `ReactNode` | — | Logo/badge shown in header |
| `jobTitle` | `string` | — | Role title (includes company name) |
| `tenure` | `string` | — | Date range shown below jobTitle |
| `description` | `string[]` | `[]` | Bullet list shown in body when no `children` |
| `children` | `ReactNode` | `undefined` | Rich body content (overrides `description`) |
| `tags` | `string[]` | `[]` | Tech stack badges in header |
| `isActive` | `boolean` | `false` | Active role styling |
| `defaultExpanded` | `boolean` | `false` | Whether card mounts open |
| `expandLabel` | `string` | `'details'` | Collapsed button label text |

---

## ExperienceSection — Prop changes only

```jsx
// KreditBee
<ExperienceCard
  isActive={true}
  defaultExpanded={true}
  expandLabel="4 bullets"
  tags={['React', 'TypeScript', 'Redux', 'UPI / Fintech', 'System Design']}
  companyLogo={...}
  jobTitle="Lead Frontend Engineer (UPI) at KreditBee"
  tenure="Jan 2026 – Present"
  description={[...4 bullets...]}
/>

// Walrus
<ExperienceCard
  isActive={false}
  defaultExpanded={false}
  expandLabel="4 projects"
  tags={['React', 'Electron', 'Redux', 'Flutter', 'Kotlin', 'Playwright']}
  companyLogo={<RenderNet />}
  jobTitle="Senior Frontend Engineer at Walrus Tech Inc. (YC S21)"
  tenure="Jun 2021 – Dec 2025"
  description={[]}
>
  {/* existing 4-sub-role JSX unchanged */}
</ExperienceCard>

// GlobalLogic
<ExperienceCard
  isActive={false}
  defaultExpanded={false}
  expandLabel="2 bullets"
  tags={['Android', 'Kotlin', 'MVVM']}
  companyLogo={<GlobalLogic />}
  jobTitle="Software Engineer at GlobalLogic (A Hitachi Group Company)"
  tenure="Jul 2019 – May 2021"
  description={workExperience.globalLogic}
/>
```

`ExperienceSection` does not import `motion` or `framer-motion` — all animation lives in `ExperienceCard`.

---

## Files Changed

| File | Change |
|------|--------|
| `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx` | Add accordion state, tags row, CURRENT badge, glowing top edge, border/outline logic, expand button, `motion.div` body wrapper |
| `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx` | Pass `tags`, `isActive`, `defaultExpanded`, `expandLabel` to each card — no structural changes |

No other files change. The vertical timeline layout, animations, `pulse-ring` keyframe, and `ExperienceSectionStyles.js` deletion are all untouched.

---

## Out of Scope

- No changes to the timeline line, dots, or stagger animations
- No changes to `src/index.css`
- No changes to any other section
- Duration bars, year watermarks, and stats strip deferred
