# Hero Section Revamp Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the hero section with a Galaxy WebGL starfield background, DecryptedText scramble animation on the hero name, and BlurText word-reveal animations on all section headings.

**Architecture:** Three React Bits components (Galaxy, DecryptedText, BlurText) are copy-pasted into `src/components/` with a single import change (`motion/react` → `framer-motion`). Galaxy replaces the gradient orbs in HeroSection; DecryptedText replaces the name Typography; BlurText replaces the heading Typography inside SectionHeading.

**Tech Stack:** React 18, Framer Motion v11, MUI v5, ogl (new WebGL library for Galaxy), Vite

---

## Chunk 1: Dependencies + Component Files

### Task 1: Install `ogl` and create the Galaxy component

**Files:**
- Create: `src/components/Galaxy/Galaxy.css`
- Create: `src/components/Galaxy/Galaxy.jsx`

- [ ] **Step 1: Install ogl**

```bash
npm install ogl
```

Expected output: `added 1 package` (ogl has no sub-dependencies).

- [ ] **Step 2: Create Galaxy.css**

Create `src/components/Galaxy/Galaxy.css` with this exact content:

```css
.galaxy-container {
  width: 100%;
  height: 100%;
  position: relative;
}
```

- [ ] **Step 3: Fetch Galaxy.jsx source from React Bits**

Fetch the component source from:
`https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Backgrounds/Galaxy/Galaxy.jsx`

Save it to `src/components/Galaxy/Galaxy.jsx` **with one change only**: replace
```js
import { motion } from 'motion/react';
```
with
```js
import { motion } from 'framer-motion';
```

If that import line is not present in the fetched source, make no import changes. Keep `import './Galaxy.css';` as-is.

- [ ] **Step 4: Verify the file was created correctly**

Confirm `src/components/Galaxy/Galaxy.jsx` exists and contains `import { motion } from 'framer-motion'` (not `motion/react`). Confirm `import './Galaxy.css'` is present.

- [ ] **Step 5: Commit**

```bash
git add src/components/Galaxy/Galaxy.css src/components/Galaxy/Galaxy.jsx package.json package-lock.json
git commit -m "feat: add Galaxy WebGL starfield component and ogl dependency"
```

---

### Task 2: Create DecryptedText component

**Files:**
- Create: `src/components/DecryptedText/DecryptedText.jsx`

- [ ] **Step 1: Fetch DecryptedText.jsx source from React Bits**

Fetch the component source from:
`https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/TextAnimations/DecryptedText/DecryptedText.jsx`

Save it to `src/components/DecryptedText/DecryptedText.jsx` **with one change only**: replace
```js
import { motion } from 'motion/react';
```
with
```js
import { motion } from 'framer-motion';
```

- [ ] **Step 2: Verify the file was created correctly**

Confirm `src/components/DecryptedText/DecryptedText.jsx` exists and contains `import { motion } from 'framer-motion'` (not `motion/react`).

- [ ] **Step 3: Commit**

```bash
git add src/components/DecryptedText/DecryptedText.jsx
git commit -m "feat: add DecryptedText character scramble animation component"
```

---

### Task 3: Create BlurText component

**Files:**
- Create: `src/components/BlurText/BlurText.jsx`

- [ ] **Step 1: Fetch BlurText.jsx source from React Bits**

Fetch the component source from:
`https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/TextAnimations/BlurText/BlurText.jsx`

Save it to `src/components/BlurText/BlurText.jsx` **with one change only**: replace
```js
import { motion } from 'motion/react';
```
with
```js
import { motion } from 'framer-motion';
```

- [ ] **Step 2: Verify the file was created correctly**

Confirm `src/components/BlurText/BlurText.jsx` exists and contains `import { motion } from 'framer-motion'` (not `motion/react`).

- [ ] **Step 3: Commit**

```bash
git add src/components/BlurText/BlurText.jsx
git commit -m "feat: add BlurText word-reveal animation component"
```

---

## Chunk 2: HeroSection + SectionHeading Integration

### Task 4: Update HeroSection.jsx

**Files:**
- Modify: `src/layouts/landing-page/components/hero-section/HeroSection.jsx`

The current file has two gradient orb `<Box>` elements and a `<Typography>` block for the name. We will:
1. Remove both gradient orb `<Box>` elements
2. Add `Galaxy` as the first child of the outer `<Box id="hero-section">`, absolutely positioned
3. Add a gradient fade overlay `<Box>` for text readability
4. Add `style={{ position: 'relative', zIndex: 2 }}` to the existing `<motion.div>` content wrapper
5. Replace the name `<Typography>` with two `<DecryptedText>` instances inside a styled `<Box>`

- [ ] **Step 1: Read the current file**

Read `src/layouts/landing-page/components/hero-section/HeroSection.jsx` to confirm current structure matches the expected state before editing.

- [ ] **Step 2: Write the updated HeroSection.jsx**

Replace the entire file with:

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import Medium from '../../../../assets/svg/social/medium.svg?react';
import GitHub from '../../../../assets/svg/social/github.svg?react';
import LinkedIn from '../../../../assets/svg/social/linkedIn.svg?react';
import Stackoverflow from '../../../../assets/svg/social/stackoverflow.svg?react';
import SocialButton from '../../../components/social-button/SocialButton.jsx';
import Download from '../../../../assets/svg/ic_download.svg?react';
import Galaxy from '../../../../components/Galaxy/Galaxy.jsx';
import DecryptedText from '../../../../components/DecryptedText/DecryptedText.jsx';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
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
            xs: 'rgba(10,10,10,0.75)',
            md: 'linear-gradient(to right, rgba(10,10,10,0.92) 50%, transparent 100%)',
          },
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content — zIndex 2 above Galaxy and fade */}
      <motion.div variants={container} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '28px', md: '36px' },
            maxWidth: '860px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Overline */}
          <motion.div variants={item}>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'colors.accent',
              }}
            >
              Senior Frontend Engineer · 7 Years
            </Typography>
          </motion.div>

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

          {/* Tagline */}
          <motion.div variants={item}>
            <Typography
              variant="paragraph_p2_regular"
              sx={{
                color: 'colors.textSecondary',
                maxWidth: '500px',
                lineHeight: 1.75,
                fontSize: '17px',
              }}
            >
              I build scalable, performant products across web, desktop and mobile — React,
              TypeScript, Electron and Flutter. Turning complex problems into polished experiences.
            </Typography>
          </motion.div>

          {/* CTA + Socials */}
          <motion.div variants={item}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: '24px',
              }}
            >
              <Button
                variant="contained"
                endIcon={<Download />}
                onClick={() => window.open('/resume.pdf', '_blank')}
                sx={{
                  textTransform: 'none',
                  backgroundColor: 'colors.accent',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px 28px',
                  fontWeight: 600,
                  fontSize: '15px',
                  transition: 'all 0.25s ease',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#4F46E5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(99,102,241,0.35)',
                  },
                }}
              >
                Download Resume
              </Button>

              <Box sx={{ display: 'flex', gap: '12px' }}>
                <SocialButton icon={<GitHub />} link="https://github.com/graphicstone/" />
                <SocialButton icon={<LinkedIn />} link="https://www.linkedin.com/in/harishiv-singh" />
                <SocialButton icon={<Medium />} link="https://medium.com/@graphicstone" />
                <SocialButton
                  icon={<Stackoverflow />}
                  link="https://stackoverflow.com/users/7810174/graphicstone"
                />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}
```

- [ ] **Step 3: Verify the file looks correct**

Read the saved file and confirm:
- Both gradient orb `<Box>` elements are gone
- `<Galaxy ...>` is present with `style={{ position: 'absolute', inset: 0, zIndex: 0 }}`
- Fade overlay `<Box>` is present with `zIndex: 1`
- `<motion.div>` content wrapper has `style={{ position: 'relative', zIndex: 2 }}`
- Name section uses `<DecryptedText>` (not `<Typography>`) for both "Harishiv" and "Singh."

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/hero-section/HeroSection.jsx
git commit -m "feat: add Galaxy background and DecryptedText name animation to HeroSection"
```

---

### Task 5: Update SectionHeading.jsx and src/index.css

**Files:**
- Modify: `src/layouts/components/section-heading/SectionHeading.jsx`
- Modify: `src/index.css`

The current `SectionHeading` uses a `motion.div` as root with a `whileInView` scroll trigger. We replace it with a plain `<Box>` root and use two `BlurText` instances (one for `title`, one for `accent`) wrapped in a `<Typography variant="displayText_extra_bold" component="div">` container that provides shared typographic styles via CSS inheritance.

- [ ] **Step 1: Read the current files**

Read `src/layouts/components/section-heading/SectionHeading.jsx` and `src/index.css` to confirm current state before editing.

- [ ] **Step 2: Write the updated SectionHeading.jsx**

Replace the entire file with:

```jsx
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BlurText from '../../../components/BlurText/BlurText.jsx';

/**
 * Animated section heading used by every section.
 * Props:
 *   label  — small uppercase overline text in accent color (optional)
 *   title  — regular-weight first word(s)
 *   accent — bold last word (shown in textPrimary, extra bold)
 */
export default function SectionHeading({ label, title, accent }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'colors.accent',
          }}
        >
          {label}
        </Typography>
      )}
      <Typography
        variant="displayText_extra_bold"
        component="div"
        sx={{ color: 'colors.textPrimary' }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '0.28em' }}>
          <BlurText
            text={title}
            animateBy="words"
            direction="top"
            stepDuration={0.38}
            delay={80}
            className="blur-text-title"
          />
          {accent && (
            <BlurText
              text={accent}
              animateBy="words"
              direction="top"
              stepDuration={0.38}
              delay={80}
              className="blur-text-accent"
            />
          )}
        </Box>
      </Typography>
    </Box>
  );
}
```

- [ ] **Step 3: Add BlurText CSS classes to src/index.css**

Append the following to the end of `src/index.css`:

```css
/* BlurText font-weight overrides for SectionHeading */
.blur-text-title {
  font-weight: 400;
}
.blur-text-accent {
  font-weight: 900;
}
```

- [ ] **Step 4: Verify both files**

Read `src/layouts/components/section-heading/SectionHeading.jsx` and confirm:
- No `motion.div` or `motion` import is present
- BlurText is imported from `'../../../components/BlurText/BlurText.jsx'`
- `title` uses `className="blur-text-title"`, `accent` uses `className="blur-text-accent"`
- Typography wrapper uses `component="div"` (not the default `<p>`)

Read `src/index.css` and confirm `.blur-text-title` and `.blur-text-accent` classes are present at the bottom.

- [ ] **Step 5: Commit**

```bash
git add src/layouts/components/section-heading/SectionHeading.jsx src/index.css
git commit -m "feat: replace SectionHeading animation with BlurText word-reveal"
```

---

## Verification

After all tasks are complete:

- [ ] Run `npm run dev` and open the site in a browser
- [ ] Hero section: confirm Galaxy starfield fills the background, stars are visible on the right half, text is readable on the left
- [ ] Hero section: confirm "Harishiv" and "Singh." each animate with character scramble on page load (view trigger fires immediately since they are in-viewport)
- [ ] Any section heading (My Experience, My Projects, etc.): scroll to it and confirm words blur-in from top one by one
- [ ] Mobile viewport (375px): confirm the semi-transparent overlay keeps the hero text readable; confirm no layout breaks in any section heading
- [ ] Run `npm run build` — confirm zero errors
