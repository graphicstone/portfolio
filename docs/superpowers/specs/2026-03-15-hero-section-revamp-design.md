# Hero Section Revamp — Galaxy + Text Animations Design

**Date:** 2026-03-15
**Status:** Approved

---

## Goal

Elevate the hero section from a plain text layout to an atmospheric, animated experience using three React Bits components: a Galaxy WebGL starfield background, DecryptedText on the hero name, and BlurText on all section headings across the site.

---

## Scope

| File | Change |
|------|--------|
| `src/components/Galaxy/Galaxy.jsx` | New — copied from React Bits |
| `src/components/Galaxy/Galaxy.css` | New — copied from React Bits |
| `src/components/DecryptedText/DecryptedText.jsx` | New — copied from React Bits |
| `src/components/BlurText/BlurText.jsx` | New — copied from React Bits |
| `src/layouts/landing-page/components/hero-section/HeroSection.jsx` | Add Galaxy background + DecryptedText on name |
| `src/layouts/components/section-heading/SectionHeading.jsx` | Replace heading Typography with BlurText |
| `package.json` | Add `ogl` dependency (required by Galaxy) |

No other files change.

---

## Dependencies

One new npm package:

```bash
npm install ogl
```

`ogl` is a minimal WebGL library (~30KB gzipped) used by Galaxy for GPU rendering. It has no sub-dependencies. React Bits copies the component source directly — `ogl` is the only external package required.

`framer-motion` is already installed (`^11.3.30`). The React Bits components originally import from `motion/react` — we adapt all imports to `framer-motion` to stay consistent with the rest of the project.

---

## Component 1: Galaxy

### Source

Copied verbatim from `https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Backgrounds/Galaxy/Galaxy.jsx` with one change: the import `import './Galaxy.css'` is kept and the CSS is placed in `src/components/Galaxy/Galaxy.css`.

### CSS (`Galaxy.css`)

```css
.galaxy-container {
  width: 100%;
  height: 100%;
  position: relative;
}
```

The Galaxy component's canvas is appended as a child of `.galaxy-container` via `useEffect`. It must fill 100% of its parent.

### Props used in HeroSection

```jsx
<Galaxy
  transparent={true}
  hueShift={240}
  density={1.2}
  glowIntensity={0.25}
  saturation={1.5}
  speed={0.6}
  rotationSpeed={0.02}
  twinkleIntensity={0.4}
  mouseInteraction={true}
  mouseRepulsion={false}
  style={{ position: 'absolute', inset: 0, zIndex: 0 }}
/>
```

- `hueShift={240}` — shifts stars toward indigo/purple to match the site's accent palette
- `transparent={true}` — canvas renders with alpha so the `#0d0d0d` body background shows through
- `density={1.2}` — slightly more stars than default; still reads as atmospheric not busy
- `glowIntensity={0.25}` — subtle star halos; enough depth without blinding brightness
- `saturation={1.5}` — more colour in stars for visual interest
- `speed={0.6}` — slow drift so the background doesn't distract from reading
- `rotationSpeed={0.02}` — barely perceptible slow spin
- `mouseRepulsion={false}` — stars follow mouse offset (default parallax feel) rather than actively repelling

### HeroSection layout changes

1. Remove both existing gradient orb `<Box>` elements — Galaxy replaces them.
2. Add Galaxy as the first child of the outer `<Box id="hero-section">`, absolutely positioned to fill the section:

```jsx
<Box
  id="hero-section"
  sx={{
    width: '100%',
    minHeight: '100vh',
    padding: { xs: '100px 16px 80px', md: '0 80px' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Galaxy background */}
  <Galaxy
    transparent={true}
    hueShift={240}
    density={1.2}
    glowIntensity={0.25}
    saturation={1.5}
    speed={0.6}
    rotationSpeed={0.02}
    twinkleIntensity={0.4}
    mouseInteraction={true}
    mouseRepulsion={false}
    style={{ position: 'absolute', inset: 0, zIndex: 0 }}
  />

  {/* Left-side text protection fade */}
  <Box
    sx={{
      position: 'absolute',
      top: 0, left: 0, bottom: 0,
      width: { xs: '100%', md: '55%' },
      background: {
        xs: 'rgba(13,13,13,0.75)',
        md: 'linear-gradient(to right, rgba(13,13,13,0.92) 50%, transparent 100%)',
      },
      zIndex: 1,
      pointerEvents: 'none',
    }}
  />

  {/* Content — zIndex 2 above Galaxy and fade */}
  <motion.div variants={container} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 2 }}>
    {/* ... existing content unchanged ... */}
  </motion.div>
</Box>
```

**Text protection fade:** on desktop, a gradient fades from near-solid on the left (where text lives) to transparent on the right (where stars are visible). On mobile, a semi-transparent full-width overlay ensures text stays readable since the layout stacks vertically.

---

## Component 2: DecryptedText

### Source

Copied verbatim from React Bits with one import change:

```diff
- import { motion } from 'motion/react';
+ import { motion } from 'framer-motion';
```

No other changes to the component.

### Usage in HeroSection

Replace the hero name `<Typography>` block with two `DecryptedText` instances:

```jsx
{/* Name */}
<motion.div variants={item}>
  <Box
    sx={{
      fontSize: { xs: 'clamp(52px, 14vw, 80px)', md: 'clamp(64px, 8vw, 96px)' },
      fontWeight: 900,
      lineHeight: 0.92,
      letterSpacing: '-0.03em',
      color: 'colors.textPrimary',
    }}
  >
    <DecryptedText
      text="Harishiv"
      animateOn="view"
      sequential={true}
      revealDirection="start"
      speed={45}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    />
    <br />
    <DecryptedText
      text="Singh."
      animateOn="view"
      sequential={true}
      revealDirection="start"
      speed={45}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    />
  </Box>
</motion.div>
```

- `animateOn="view"` — triggers when the element enters the viewport (uses IntersectionObserver internally)
- `sequential=true` — characters reveal one by one left to right, not all scrambling at once
- `revealDirection="start"` — left to right reveal
- `speed={45}` — 45ms per character step; "Harishiv" (8 chars) takes ~360ms, "Singh." (6 chars) ~270ms
- Both lines are separate instances so they independently track viewport entry; "Singh." naturally starts just after "Harishiv" since it's lower in the DOM and the Framer Motion stagger (`item` variant, `staggerChildren: 0.1`) delays the second line anyway

The wrapping `<Box>` carries all the font styling (size, weight, letterSpacing) so `DecryptedText` inherits those styles via `currentColor` / `inherit`. No className-based font overrides needed.

---

## Component 3: BlurText

### Source

Copied verbatim from React Bits with one import change:

```diff
- import { motion } from 'motion/react';
+ import { motion } from 'framer-motion';
```

Note: BlurText renders a `<p>` tag. In `SectionHeading` we override this with `component` if needed, or accept the semantic `<p>` wrapper since it's inside a `<div>`.

### Usage in SectionHeading

The current `SectionHeading` renders:
```jsx
<Typography variant="displayText_extra_bold" sx={{ color: 'colors.textPrimary' }}>
  <span style={{ fontWeight: 400 }}>{title}</span>
  {accent ? ` ${accent}` : ''}
</Typography>
```

Replace with two side-by-side `BlurText` instances wrapped in a flex `Box`, preserving the two-tone weight treatment:

```jsx
<Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '0.28em' }}>
  {/* Light-weight word(s): "My", "Open" etc */}
  <BlurText
    text={title}
    animateBy="words"
    direction="top"
    stepDuration={0.38}
    delay={80}
    className="blur-text-title"
  />
  {/* Bold accent word: "Experience", "Projects" etc */}
  {accent && (
    <BlurText
      text={accent}
      animateBy="words"
      direction="top"
      stepDuration={0.38}
      delay={80}
    />
  )}
</Box>
```

Font styling is applied via a global CSS class for `blur-text-title` (light weight) and directly on the parent for the accent (inherits bold from `displayText_extra_bold` theme variant). Since BlurText renders `<motion.span>` elements, the parent's font weight cascades down.

**Exact CSS approach:** add two utility classes to `src/index.css`:

```css
/* BlurText typography overrides */
.blur-text-title span {
  font-weight: 400;
}
/* .blur-text-accent spans inherit bold from the displayText_extra_bold Typography wrapper */
```

The existing `motion.div` wrapper (`whileInView`, `initial={{ opacity: 0, y: 24 }}`) on `SectionHeading` is **removed** — BlurText has its own IntersectionObserver scroll trigger, and stacking two animation systems on the same element creates jank.

---

## Performance Notes

- Galaxy: one WebGL context, GPU-rendered, ~0% CPU when idle. No other WebGL or Canvas elements elsewhere on the page. Cleans up properly on unmount via `cancelAnimationFrame` + `WEBGL_lose_context`.
- DecryptedText: pure JS `setInterval` during animation only (~400ms on mount), then idle. No ongoing cost.
- BlurText: Framer Motion CSS transforms, GPU-composited. IntersectionObserver triggers once per section heading, then disconnects.
- Total ongoing animation cost at runtime: Galaxy WebGL only. Everything else is static after initial reveal.

---

## Out of Scope

- No changes to Projects, Experience, or any other section backgrounds
- No additional React Bits components beyond these three
- No changes to the mobile layout breakpoints
- No changes to the nav, footer, or any other section
