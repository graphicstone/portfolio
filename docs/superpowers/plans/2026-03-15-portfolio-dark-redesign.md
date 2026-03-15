# Portfolio Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the portfolio from a white/zinc theme to a premium dark-mode experience inspired by landonorris.com, tailored for a Senior Frontend Engineer.

**Architecture:** Pure visual redesign — all content data, Firebase contact logic, and section structure remain unchanged. Changes are limited to color tokens, styles, layout treatments, and animation wrappers. One new dependency (`lenis`) for smooth scrolling. Two new shared components (`SectionHeading`, `MarqueeStrip`) and one hook (`useScrolled`) are introduced for reuse across sections.

**Tech Stack:** React 18, Vite, MUI v5, Framer Motion (already installed), Lenis (new), Firebase, react-icons, Sora font (unchanged)

---

## File Map

### New files
| Path | Responsibility |
|------|---------------|
| `src/layouts/hooks/useScrolled.js` | Returns boolean: whether page has scrolled past a threshold — used by Toolbar |
| `src/layouts/components/section-heading/SectionHeading.jsx` | Animated section heading with label + title + accent word; used by every section |
| `src/layouts/components/marquee/MarqueeStrip.jsx` | Infinite horizontal scroll strip with pause-on-hover; used by SkillsSection |

### Modified files
| Path | Change |
|------|--------|
| `package.json` | Add `lenis` dependency |
| `src/layouts/ColorPalette.js` | Replace zinc/neutral tokens with dark design system tokens |
| `src/layouts/AppTheme.js` | Dark background/text defaults; fluid hero typography via `clamp()` |
| `src/index.css` | Dark body bg, custom scrollbar, CSS marquee keyframes, subtle grain overlay |
| `src/main.jsx` | Init Lenis smooth scroll before ReactDOM render |
| `src/layouts/landing-page/components/toolbar/Toolbar.jsx` | Glass morphism, scroll-aware bg, updated nav link styles, dark Drawer |
| `src/layouts/landing-page/components/toolbar/ToolbarStyles.js` | Remove (styles inlined in Toolbar.jsx via sx) |
| `src/layouts/landing-page/components/hero-section/HeroSection.jsx` | Remove SVG illustration; full-viewport, large typography, gradient orbs, stagger entrance |
| `src/layouts/landing-page/components/hero-section/HeroSectionStyles.js` | Remove (styles inlined in HeroSection.jsx) |
| `src/layouts/landing-page/components/skills-section/SkillsSection.jsx` | Replace accordion/grid with two-row infinite marquee |
| `src/layouts/landing-page/components/skills-section/SkillsBadge.jsx` | Compact horizontal pill style for marquee use |
| `src/layouts/landing-page/components/skills-section/SkillsSectionStyles.js` | Remove (styles inlined) |
| `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx` | Left glowing accent border, scroll-triggered reveal via Framer Motion |
| `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx` | Use SectionHeading; add timeline connector line |
| `src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js` | Update padding/bg to dark tokens |
| `src/layouts/landing-page/components/projects-section/ProjectsCard.jsx` | Dark card with accent-colored hover overlay revealing description |
| `src/layouts/landing-page/components/projects-section/ProjectsSection.jsx` | Use SectionHeading; stagger grid |
| `src/layouts/landing-page/components/projects-section/ProjectsSectionStyles.js` | Update bg/padding |
| `src/layouts/landing-page/components/about-me-section/AboutMeSection.jsx` | Remove SVG; two-column: stats (7yr, 3 platforms, 10+ products) + bio text |
| `src/layouts/landing-page/components/about-me-section/AboutMeSectionStyles.js` | Dark, two-column layout |
| `src/layouts/landing-page/components/contact-me-section/ContactMeSection.jsx` | Minimal: big heading, copy-to-clipboard email, dark-styled form |
| `src/layouts/landing-page/components/contact-me-section/ContactMeSectionStyle.js` | Dark form field overrides |

---

## Chunk 1: Foundation

### Task 1: Install Lenis

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
npm install lenis
```

Expected: `lenis` appears in `package.json` dependencies. No errors.

- [ ] **Step 2: Verify install**

```bash
node -e "import('lenis').then(m => console.log('ok', Object.keys(m)))"
```

Expected: prints `ok` with exported keys.

---

### Task 2: Color Palette

**Files:**
- Modify: `src/layouts/ColorPalette.js`

- [ ] **Step 1: Replace the entire file**

```js
export const colorPalette = {
  // Dark base
  background: '#0A0A0A',
  surface: '#111111',
  surfaceElevated: '#161616',
  border: '#1E1E1E',

  // Accent — indigo/violet (distinctive in dev space, premium feel)
  accent: '#6366F1',
  accentMuted: 'rgba(99, 102, 241, 0.12)',
  accentGlow: 'rgba(99, 102, 241, 0.25)',

  // Text
  textPrimary: '#F5F5F5',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',

  // Legacy aliases — kept so existing components that reference these don't break
  zinc100: '#F4F4F5',
  zinc200: '#E4E4E7',
  zinc300: '#D4D4D8',
  zinc500: '#71717A',
  zinc800: '#1E1E1E',
  neutral: '#6366F1',   // repurposed: was grey, now accent
  black: '#0A0A0A',     // now = dark background
  white: '#F5F5F5'      // now = primary text
};
```

- [ ] **Step 2: Start dev server and confirm page background is dark**

```bash
npm run dev
```

Expected: page background is `#0A0A0A` (near-black). Text may look broken until AppTheme is updated in the next task — that's OK.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/ColorPalette.js
git commit -m "feat: replace color palette with dark design tokens"
```

---

### Task 3: App Theme — Dark Defaults & Fluid Typography

**Files:**
- Modify: `src/layouts/AppTheme.js`

- [ ] **Step 1: Update palette defaults and typography scale**

In `createTheme` (the first call, `appThemeWithoutCustomStyles`), change:

```js
palette: {
  background: {
    default: colorPalette.background   // was: colorPalette.white
  },
  text: {
    primary: colorPalette.textPrimary  // was: colorPalette.black
  },
  primary: {
    main: colorPalette.accent          // was: colorPalette.neutral
  },
  colors: {
    ...colorPalette
  }
},
```

- [ ] **Step 2: Update `displayText_*` variants to use fluid sizing**

In the second `createTheme` call, replace all four `displayText_*` definitions with:

```js
displayText_regular: {
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
  fontFamily: FontsEnum.SORA,
  fontWeight: 400,
},
displayText_medium: {
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
  fontFamily: FontsEnum.SORA,
  fontWeight: 500,
},
displayText_bold: {
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
  fontFamily: FontsEnum.SORA,
  fontWeight: 700,
},
displayText_extra_bold: {
  fontSize: 'clamp(40px, 6vw, 80px)',
  lineHeight: 1.0,
  letterSpacing: '-0.02em',
  fontFamily: FontsEnum.SORA,
  fontWeight: 900,
},
```

The `[breakpoints.down('md')]` overrides on these are no longer needed since `clamp()` handles fluid scaling — remove them from the four `displayText_*` entries.

- [ ] **Step 3: Visual check**

```bash
npm run dev
```

Expected: text colors are now light on dark background. Section headings scale fluidly as you resize the window.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/AppTheme.js
git commit -m "feat: dark theme defaults and fluid display typography"
```

---

### Task 4: Global CSS

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Replace the entire file**

```css
html {
  overscroll-behavior-x: none;
}

body {
  margin: 0;
  font-synthesis: none;
  font-family: -apple-system, 'Sora', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0A0A0A;
  color: #F5F5F5;
  overscroll-behavior-x: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #0A0A0A; }
::-webkit-scrollbar-thumb { background: #1E1E1E; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #6366F1; }

/* Infinite marquee keyframes (used by MarqueeStrip component) */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes marqueeReverse {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

/* Subtle grain/noise texture overlay for premium feel */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.028;
  pointer-events: none;
  z-index: 9999;
}
```

- [ ] **Step 2: Visual check**

Reload in browser. You should see a very subtle film-grain texture over the dark background. It should be almost imperceptible — just adds depth.

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: dark global styles, scrollbar, grain texture, marquee keyframes"
```

---

### Task 5: Lenis Smooth Scroll Init

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Add Lenis init before ReactDOM render**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from '@mui/material';
import appTheme from './layouts/AppTheme.js';
import Lenis from 'lenis';

// Smooth scroll — runs independently of React lifecycle
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={appTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

- [ ] **Step 2: Visual check**

Scroll the page. Scrolling should feel buttery and have slight momentum. If it feels the same, check the browser console for import errors.

- [ ] **Step 3: Commit**

```bash
git add src/main.jsx
git commit -m "feat: add Lenis smooth scroll"
```

---

### Task 6: `useScrolled` Hook

**Files:**
- Create: `src/layouts/hooks/useScrolled.js`

- [ ] **Step 1: Create the hook**

```js
import { useState, useEffect } from 'react';

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used by Toolbar to activate glass-morphism background.
 */
export function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return scrolled;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/hooks/useScrolled.js
git commit -m "feat: add useScrolled hook for scroll-aware navbar"
```

---

### Task 7: `SectionHeading` Shared Component

**Files:**
- Create: `src/layouts/components/section-heading/SectionHeading.jsx`

- [ ] **Step 1: Create the component**

```jsx
import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * Animated section heading used by every section.
 * Props:
 *   label  — small uppercase overline text in accent color (optional)
 *   title  — regular-weight first word(s)
 *   accent — bold last word (shown in white, extra bold)
 */
export default function SectionHeading({ label, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
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
        <Typography variant="displayText_extra_bold" sx={{ color: 'colors.textPrimary' }}>
          <span style={{ fontWeight: 400 }}>{title}</span>
          {accent ? ` ${accent}` : ''}
        </Typography>
      </Box>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/components/section-heading/SectionHeading.jsx
git commit -m "feat: add SectionHeading shared animated component"
```

---

### Task 8: `MarqueeStrip` Shared Component

**Files:**
- Create: `src/layouts/components/marquee/MarqueeStrip.jsx`

- [ ] **Step 1: Create the component**

```jsx
import Box from '@mui/material/Box';

/**
 * Infinite horizontal scroll strip.
 * Duplicates `items` array so the loop appears seamless.
 * Pauses on hover.
 * Fades edges with a mask gradient.
 *
 * Props:
 *   items   — array of React nodes (e.g. <SkillsBadge /> elements)
 *   reverse — if true, scroll direction is right-to-left
 *   speed   — animation duration in seconds (higher = slower)
 */
export default function MarqueeStrip({ items, reverse = false, speed = 30 }) {
  const doubled = [...items, ...items];

  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        // Fade left/right edges
        maskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          gap: '12px',
          animation: `${reverse ? 'marqueeReverse' : 'marquee'} ${speed}s linear infinite`,
          '&:hover': { animationPlayState: 'paused' },
        }}
      >
        {doubled.map((item, i) => (
          <Box key={i} sx={{ flexShrink: 0 }}>
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/components/marquee/MarqueeStrip.jsx
git commit -m "feat: add MarqueeStrip infinite scroll component"
```

---

## Chunk 2: Navbar + Hero

### Task 9: Navbar — Glass Morphism + Scroll Awareness

**Files:**
- Modify: `src/layouts/landing-page/components/toolbar/Toolbar.jsx`
- Modify: `src/layouts/landing-page/components/toolbar/ToolbarStyles.js`

- [ ] **Step 1: Replace Toolbar.jsx entirely**

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Drawer, List, ListItem, ListItemButton } from '@mui/material';
import Menu from '../../../../assets/svg/ic_menu.svg?react';
import Download from '../../../../assets/svg/ic_download.svg?react';
import { useScrolled } from '../../../hooks/useScrolled.js';

export default function Toolbar() {
  const toolbarItems = ['About Me', 'Skills', 'Projects', 'Contact Me'];
  const [drawerState, setDrawerState] = React.useState(false);
  const scrolled = useScrolled(20);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerState(open);
  };

  const scrollTo = (label) => {
    const id = label.toLowerCase().replace(' ', '-');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const drawerList = () => (
    <Box
      sx={{ width: 260, backgroundColor: 'colors.surface', height: '100%', p: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {toolbarItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => scrollTo(item)} sx={{ borderRadius: '8px' }}>
              <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textPrimary' }}>
                {item}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      id="toolbar"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '0 16px', md: '0 80px' },
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: '1px solid',
        borderBottomColor: scrolled ? 'rgba(30, 30, 30, 0.8)' : 'transparent',
      }}
    >
      {/* Logo / initials */}
      <Typography
        variant="heading_h5_bold"
        onClick={() => document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' })}
        sx={{
          cursor: 'pointer',
          color: 'colors.textPrimary',
          letterSpacing: '-0.01em',
          userSelect: 'none',
        }}
      >
        HS.
      </Typography>

      {/* Desktop nav links */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '36px' }}>
        {toolbarItems.map((item) => (
          <Typography
            key={item}
            variant="heading_h6_medium"
            onClick={() => scrollTo(item)}
            sx={{
              cursor: 'pointer',
              color: 'colors.textSecondary',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'colors.textPrimary' },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Resume CTA */}
      <Button
        variant="outlined"
        endIcon={<Download />}
        sx={{
          display: { xs: 'none', md: 'flex' },
          textTransform: 'none',
          color: 'colors.textPrimary',
          borderColor: 'colors.border',
          borderRadius: '8px',
          padding: '8px 20px',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'colors.accent',
            color: 'colors.accent',
            backgroundColor: 'colors.accentMuted',
          },
        }}
        onClick={() => window.open('/resume.pdf', '_blank')}
      >
        Resume
      </Button>

      {/* Mobile menu icon */}
      <Box
        sx={{ display: { xs: 'flex', md: 'none' }, cursor: 'pointer' }}
        onClick={toggleDrawer(true)}
      >
        <Menu style={{ color: '#F5F5F5' }} />
      </Box>

      <Drawer
        anchor="right"
        open={drawerState}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: 'colors.surface' } }}
      >
        {drawerList()}
      </Drawer>
    </Box>
  );
}
```

- [ ] **Step 2: Clear ToolbarStyles.js** (styles now live in the component)

Replace `src/layouts/landing-page/components/toolbar/ToolbarStyles.js` with an empty export (keeps the file so no import errors if something else references it, but it's no longer needed):

```js
// Styles migrated inline to Toolbar.jsx
export const toolbarStyles = {};
```

- [ ] **Step 3: Visual check**

- Navbar should be transparent at top of page
- After scrolling past 20px it should become frosted glass (blurred, semi-transparent dark)
- "HS." logo on the left, nav links in centre, Resume button right
- Mobile: hamburger opens a dark Drawer from the right

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/toolbar/Toolbar.jsx
git add src/layouts/landing-page/components/toolbar/ToolbarStyles.js
git commit -m "feat: glass morphism navbar with scroll-aware background"
```

---

### Task 10: Hero Section — Full Rewrite

**Files:**
- Modify: `src/layouts/landing-page/components/hero-section/HeroSection.jsx`
- Modify: `src/layouts/landing-page/components/hero-section/HeroSectionStyles.js`

> Note: The SVG hero illustration (`hero_image.svg`) is intentionally removed. The section becomes text-forward with gradient orb backgrounds.

- [ ] **Step 1: Replace HeroSection.jsx entirely**

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
      {/* Gradient orb — top right */}
      <Box
        sx={{
          position: 'absolute',
          top: '-15%',
          right: '-8%',
          width: { xs: '280px', md: '560px' },
          height: { xs: '280px', md: '560px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Gradient orb — bottom left */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          left: '-5%',
          width: { xs: '200px', md: '380px' },
          height: { xs: '200px', md: '380px' },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <motion.div variants={container} initial="hidden" animate="visible">
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
          {/* Overline label */}
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

          {/* Name — large display */}
          <motion.div variants={item}>
            <Typography
              sx={{
                fontSize: { xs: 'clamp(52px, 14vw, 96px)', md: 'clamp(64px, 8vw, 96px)' },
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: 'colors.textPrimary',
              }}
            >
              Harishiv
              <br />
              Singh.
            </Typography>
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

- [ ] **Step 2: Clear HeroSectionStyles.js** (styles now live in the component)

```js
// Styles migrated inline to HeroSection.jsx
export const heroSectionStyles = {};
```

- [ ] **Step 3: Visual check**

- Full-viewport dark hero
- Name "Harishiv / Singh." in very large text (80–96px on desktop, fluid on mobile)
- Subtle indigo gradient orbs visible in the background
- Staggered entrance animation plays on load (name, subtitle, CTA appear in sequence)
- CTA button is indigo, glows on hover

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/hero-section/HeroSection.jsx
git add src/layouts/landing-page/components/hero-section/HeroSectionStyles.js
git commit -m "feat: hero section — full viewport, large typography, gradient orbs, stagger entrance"
```

---

## Chunk 3: Skills + Experience

### Task 11: SkillsBadge — Compact Pill

**Files:**
- Modify: `src/layouts/landing-page/components/skills-section/SkillsBadge.jsx`

The badge needs to be a compact horizontal pill suitable for the marquee (not the old tall card).

- [ ] **Step 1: Replace SkillsBadge.jsx**

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SkillsBadge({ icon, name, brandColor }) {
  return (
    <Box
      role="img"
      aria-label={`Skill: ${name}`}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px',
        border: '1px solid',
        borderColor: 'colors.border',
        borderRadius: '100px',
        backgroundColor: 'colors.surface',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
        '& svg': {
          height: '18px',
          width: 'auto',
          color: brandColor || 'colors.textSecondary',
          flexShrink: 0,
        },
        '&:hover': {
          borderColor: brandColor || 'colors.accent',
          backgroundColor: 'colors.surfaceElevated',
        },
      }}
    >
      {icon}
      <Typography
        variant="heading_h6_medium"
        sx={{ color: 'colors.textPrimary', lineHeight: 1 }}
      >
        {name}
      </Typography>
    </Box>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/landing-page/components/skills-section/SkillsBadge.jsx
git commit -m "feat: SkillsBadge — compact pill for marquee layout"
```

---

### Task 12: Skills Section — Two-Row Infinite Marquee

**Files:**
- Modify: `src/layouts/landing-page/components/skills-section/SkillsSection.jsx`
- Modify: `src/layouts/landing-page/components/skills-section/SkillsSectionStyles.js`

- [ ] **Step 1: Replace SkillsSection.jsx**

```jsx
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import {
  SiAndroid, SiCss3, SiDatadog, SiElectron, SiFirebase, SiFlutter,
  SiGit, SiHtml5, SiJavascript, SiJest, SiKotlin, SiMui,
  SiReact, SiRedux, SiTypescript, SiWebpack,
} from 'react-icons/si';
import {
  FiCloud, FiCpu, FiGitBranch, FiLayers, FiMousePointer,
  FiPlay, FiServer, FiSettings, FiShield, FiTool,
} from 'react-icons/fi';
import SkillsBadge from './SkillsBadge.jsx';
import MarqueeStrip from '../../../components/marquee/MarqueeStrip.jsx';
import SectionHeading from '../../../components/section-heading/SectionHeading.jsx';

const webSkills = [
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
  { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'HTML', icon: <SiHtml5 />, color: '#E34F26' },
  { name: 'CSS', icon: <SiCss3 />, color: '#1572B6' },
  { name: 'Jest', icon: <SiJest />, color: '#C21325' },
  { name: 'Playwright', icon: <FiPlay /> },
  { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9' },
  { name: 'Electron', icon: <SiElectron />, color: '#47848F' },
  { name: 'MSW', icon: <FiShield /> },
];

const mobileAndToolsSkills = [
  { name: 'Android', icon: <SiAndroid />, color: '#3DDC84' },
  { name: 'Flutter', icon: <SiFlutter />, color: '#02569B' },
  { name: 'Kotlin', icon: <SiKotlin />, color: '#7F52FF' },
  { name: 'Coroutines', icon: <FiCpu /> },
  { name: 'Dagger (DI)', icon: <FiTool /> },
  { name: 'Jetpack', icon: <FiCloud /> },
  { name: 'MVVM', icon: <FiLayers /> },
  { name: 'Bloc', icon: <FiGitBranch /> },
  { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
  { name: 'Git', icon: <SiGit />, color: '#F05032' },
  { name: 'RESTful APIs', icon: <FiServer /> },
  { name: 'CI/CD', icon: <FiSettings /> },
  { name: 'Material UI', icon: <SiMui />, color: '#007FFF' },
  { name: 'Datadog', icon: <SiDatadog />, color: '#632CA6' },
  { name: 'App Engine', icon: <FiCloud /> },
  { name: 'Cursor', icon: <FiMousePointer /> },
];

export default function SkillsSection() {
  const renderBadge = (s, i) => (
    <SkillsBadge key={`${s.name}-${i}`} name={s.name} icon={s.icon} brandColor={s.color} />
  );

  return (
    <Box
      id="skills"
      sx={{
        width: '100%',
        padding: { xs: '80px 0', md: '120px 0' },
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        overflow: 'hidden',
        scrollMarginTop: '64px',
      }}
    >
      <Box sx={{ px: { xs: '16px', md: '80px' } }}>
        <SectionHeading label="Expertise" title="My" accent="Skills" />
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <MarqueeStrip items={webSkills.map(renderBadge)} speed={40} />
          <MarqueeStrip items={mobileAndToolsSkills.map(renderBadge)} speed={32} reverse />
        </Box>
      </motion.div>
    </Box>
  );
}
```

- [ ] **Step 2: Clear SkillsSectionStyles.js**

```js
// Styles migrated inline to SkillsSection.jsx
export const skillsSectionStyles = {};
```

- [ ] **Step 3: Visual check**

- Two horizontal rows of pill badges scroll infinitely in opposite directions
- Rows fade out at left/right edges
- Scrolling pauses when hovering over a row
- Row 1: web tech (React, Redux, TS, etc.)
- Row 2: mobile + tools (Android, Flutter, Firebase, etc.)

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/skills-section/SkillsSection.jsx
git add src/layouts/landing-page/components/skills-section/SkillsSectionStyles.js
git commit -m "feat: skills section — two-row infinite marquee"
```

---

### Task 13: ExperienceCard — Accent Border + Scroll Reveal

**Files:**
- Modify: `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx`

- [ ] **Step 1: Replace ExperienceCard.jsx**

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

export default function ExperienceCard({
  companyLogo,
  jobTitle,
  tenure,
  description,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          backgroundColor: 'colors.surface',
          borderRadius: '12px',
          borderLeft: '3px solid',
          borderLeftColor: 'colors.accent',
          outline: '1px solid',
          outlineColor: 'colors.border',
          transition: 'outline-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            outlineColor: 'rgba(99,102,241,0.35)',
            boxShadow: '0 0 32px rgba(99,102,241,0.10)',
          },
        }}
      >
        {/* Header row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
            <Box
              sx={{
                '& svg': { width: '44px', height: 'auto', borderRadius: '6px' },
              }}
            >
              {companyLogo}
            </Box>
            <Typography variant="heading_h4_semi_bold" sx={{ color: 'colors.textPrimary' }}>
              {jobTitle}
            </Typography>
          </Box>
          <Typography
            variant="heading_h6_medium"
            sx={{
              color: 'colors.accent',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              letterSpacing: '0.03em',
            }}
          >
            {tenure}
          </Typography>
        </Box>

        {/* Body */}
        <Box sx={{ color: 'colors.textSecondary' }}>
          {children ? (
            children
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {description.map((item, index) => (
                <li key={index} style={{ marginBottom: '6px' }}>
                  <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textSecondary' }}>
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/landing-page/components/experience-section/ExperienceCard.jsx
git commit -m "feat: ExperienceCard — accent border, dark surface, scroll reveal"
```

---

### Task 14: Experience Section — SectionHeading + Timeline

**Files:**
- Modify: `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx`
- Modify: `src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js`

- [ ] **Step 1: Update ExperienceSection.jsx** — replace only the header and wrapper, keeping all work experience data unchanged

Replace the outer JSX in `ExperienceSection`:

```jsx
// Replace the return statement (keep workExperience data object as-is above it):

return (
  <Box id="experience" sx={experienceSectionStyles.experienceSection}>
    <SectionHeading label="Career" title="My" accent="Experience" />

    {/* Timeline connector line — visible on desktop */}
    <Box
      sx={{
        width: '100%',
        padding: { xs: 0, md: '40px 0' },
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: '20px', md: '0px' },
        position: 'relative',
      }}
    >
      {/* Vertical line */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          position: 'absolute',
          left: '-1px',
          top: '40px',
          bottom: '40px',
          width: '1px',
          backgroundColor: 'colors.border',
        }}
      />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <ExperienceCard
          companyLogo={<RenderNet />}
          jobTitle="Senior Frontend Engineer at Walrus Tech Inc. (YC S21)"
          tenure="Jun 2021 - Present"
          description={[]}
          backgroundColor={colorPalette.surface}
        >
          {/* ... same children content as before, unchanged ... */}
        </ExperienceCard>

        <ExperienceCard
          companyLogo={<GlobalLogic />}
          jobTitle="Software Engineer at GlobalLogic (A Hitachi Group Company)"
          tenure="Jul 2019 - May 2021"
          description={workExperience.globalLogic}
        />
      </Box>
    </Box>
  </Box>
);
```

Also add `SectionHeading` import at the top:
```js
import SectionHeading from '../../../components/section-heading/SectionHeading.jsx';
```

And remove the unused `colorPalette` prop `backgroundColor={colorPalette.zinc800}` since ExperienceCard no longer uses a `backgroundColor` prop.

- [ ] **Step 2: Update ExperienceSectionStyles.js**

```js
export const experienceSectionStyles = {
  experienceSection: {
    width: '100%',
    padding: { xs: '80px 16px', md: '120px 80px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    scrollMarginTop: '64px',
  },
};
```

- [ ] **Step 3: Visual check**

- Dark section, no black background contrast change from rest of page
- Each card slides in from the left on scroll
- Left accent border visible on each card
- Tenure shown in indigo accent color
- Cards glow on hover

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/experience-section/ExperienceSection.jsx
git add src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js
git commit -m "feat: experience section — SectionHeading, timeline layout, scroll reveal"
```

---

## Chunk 4: Projects + About Me + Contact

### Task 15: ProjectsCard — Hover Overlay

**Files:**
- Modify: `src/layouts/landing-page/components/projects-section/ProjectsCard.jsx`

The current card has no image displayed. We keep the number index as a large background watermark and use a solid accent overlay on hover that reveals the description.

- [ ] **Step 1: Replace ProjectsCard.jsx**

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

export default function ProjectsCard({ index, name, description, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        onClick={() => window.open(link, '_blank')}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'colors.border',
          backgroundColor: 'colors.surface',
          minHeight: { xs: '180px', md: '220px' },
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
          '&:hover': { borderColor: 'colors.accent' },
          '&:hover .card-overlay': { opacity: 1, transform: 'translateY(0)' },
          '&:hover .card-index': { opacity: 0.02 },
        }}
      >
        {/* Background index number */}
        <Typography
          className="card-index"
          sx={{
            position: 'absolute',
            top: '16px',
            left: '20px',
            fontSize: '96px',
            fontWeight: 900,
            color: 'colors.textPrimary',
            lineHeight: 1,
            opacity: 0.05,
            transition: 'opacity 0.3s ease',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {index}
        </Typography>

        {/* Default state — just the name */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '24px',
            right: '24px',
            zIndex: 1,
          }}
        >
          <Typography
            variant="heading_h3_bold"
            sx={{ color: 'colors.textPrimary', lineHeight: 1.2 }}
          >
            {name}
          </Typography>
        </Box>

        {/* Hover overlay */}
        <Box
          className="card-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            backgroundColor: 'colors.accent',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '28px',
            gap: '12px',
          }}
        >
          <Typography variant="heading_h4_bold" sx={{ color: '#fff' }}>
            {name}
          </Typography>
          <Typography
            variant="paragraph_p2_regular"
            sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              mt: '4px',
            }}
          >
            View on GitHub →
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/layouts/landing-page/components/projects-section/ProjectsCard.jsx
git commit -m "feat: ProjectsCard — dark card with accent hover overlay"
```

---

### Task 16: Projects Section — SectionHeading + Stagger Grid

**Files:**
- Modify: `src/layouts/landing-page/components/projects-section/ProjectsSection.jsx`
- Modify: `src/layouts/landing-page/components/projects-section/ProjectsSectionStyles.js`

- [ ] **Step 1: Update ProjectsSection.jsx**

Replace the return statement (keep all ProjectsCard data as-is):

```jsx
// Add this import at the top:
import SectionHeading from '../../../components/section-heading/SectionHeading.jsx';

// Replace return statement:
return (
  <Box id="projects" sx={projectsSectionStyles.projectsSection}>
    <SectionHeading label="Work" title="My" accent="Projects" />
    <Box
      sx={{
        width: '100%',
        padding: { xs: '24px 0 0', md: '40px 0 0' },
      }}
    >
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <ProjectsCard index="01" name="Leaf AI" description="Universal LLM interface with Next.js + FastAPI, supporting OpenAI, Anthropic & Gemini, with real-time chat" link="https://github.com/graphicstone/project-leaf" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectsCard index="02" name="Transformer Playground" description="Browser-based ML playground using Transformer.js for client-side AI, no server needed" link="https://github.com/graphicstone/transformer-js-playground" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectsCard index="03" name="Video Editor SDK" description="React and TypeScript-based video editor SDK with real-time preview, timeline editing, and audio synchronisation" link="https://github.com/graphicstone/video-editor" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectsCard index="04" name="Project OneSide" description="Unique mathematical puzzle game in Kotlin where you swap rows and columns to match a 3×3 grid." link="https://github.com/graphicstone/OneSide" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectsCard index="05" name="Covid 19 Support" description="Android app showing real-time statistical and graphical data for the Covid-19 pandemic." link="https://github.com/graphicstone/Covid-19-Support" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectsCard index="06" name="UserInfoView" description="Android library to create a UserViewCard with title, subtitle, tag and image, customisable via XML attributes." link="https://github.com/graphicstone/UserInfoView" />
        </Grid>
      </Grid>
    </Box>
  </Box>
);
```

Also remove the `image` prop from all `ProjectsCard` usages (the new card doesn't use images).

- [ ] **Step 2: Update ProjectsSectionStyles.js**

```js
export const projectsSectionStyles = {
  projectsSection: {
    width: '100%',
    padding: { xs: '80px 16px', md: '120px 80px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    scrollMarginTop: '64px',
  },
};
```

- [ ] **Step 3: Visual check**

- Dark 2-column grid of project cards
- Each card shows large faint index number + project name by default
- On hover: indigo overlay slides up revealing description + "View on GitHub →"
- Cards stagger-reveal on scroll

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/projects-section/ProjectsSection.jsx
git add src/layouts/landing-page/components/projects-section/ProjectsSectionStyles.js
git commit -m "feat: projects section — SectionHeading, stagger grid, dark cards"
```

---

### Task 17: About Me — Stats + Bio (no SVG)

**Files:**
- Modify: `src/layouts/landing-page/components/about-me-section/AboutMeSection.jsx`
- Modify: `src/layouts/landing-page/components/about-me-section/AboutMeSectionStyles.js`

- [ ] **Step 1: Replace AboutMeSection.jsx**

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import SectionHeading from '../../../components/section-heading/SectionHeading.jsx';

const stats = [
  { value: '7+', label: 'Years of Experience' },
  { value: '3', label: 'Platforms\nWeb · Mobile · Desktop' },
  { value: '10+', label: 'Products Shipped' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const statVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutMeSection() {
  return (
    <Box
      id="about-me"
      sx={{
        width: '100%',
        padding: { xs: '80px 16px', md: '120px 80px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '56px',
        scrollMarginTop: '64px',
      }}
    >
      <SectionHeading label="Background" title="About" accent="Me" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '48px', md: '80px' },
          alignItems: { xs: 'flex-start', md: 'flex-start' },
        }}
      >
        {/* Stats column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ flexShrink: 0 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {stats.map((s) => (
              <motion.div key={s.value} variants={statVariant}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '52px', md: '64px' },
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: 'colors.accent',
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    variant="paragraph_p2_regular"
                    sx={{
                      color: 'colors.textMuted',
                      whiteSpace: 'pre-line',
                      mt: '6px',
                    }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.8, fontSize: '17px' }}
            >
              Senior Frontend Engineer with 7+ years of experience building scalable web, mobile and
              desktop products. I specialise in React/TypeScript and Electron on the web/desktop
              side, and Flutter/Android on mobile. I care deeply about performance, testability, and
              clean, maintainable architectures.
            </Typography>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.8, fontSize: '17px' }}
            >
              Recent work includes leading frontend architecture for an AI creative platform (React,
              Redux, Electron), designing a timeline video editor SDK, and delivering cross-platform
              apps with secure IPC and caching for fast cold/warm loads.
            </Typography>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.8, fontSize: '17px' }}
            >
              I enjoy turning complex product problems into polished experiences and collaborating
              across design, product, and platform teams to ship reliable features quickly.
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Update AboutMeSectionStyles.js**

```js
// Styles migrated inline to AboutMeSection.jsx
export const aboutMeSectionStyles = {};
```

- [ ] **Step 3: Visual check**

- Left column: three large indigo stats (7+, 3, 10+) with labels, stagger in on scroll
- Right column: bio text in three short paragraphs
- No SVG illustration

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/about-me-section/AboutMeSection.jsx
git add src/layouts/landing-page/components/about-me-section/AboutMeSectionStyles.js
git commit -m "feat: about me — stats + bio, remove SVG illustration"
```

---

### Task 18: Contact Section — Minimal Dark Layout

**Files:**
- Modify: `src/layouts/landing-page/components/contact-me-section/ContactMeSection.jsx`
- Modify: `src/layouts/landing-page/components/contact-me-section/ContactMeSectionStyle.js`

- [ ] **Step 1: Replace ContactMeSection.jsx**

```jsx
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import SectionHeading from '../../../components/section-heading/SectionHeading.jsx';
import ContactForm from './ContactForm.jsx';

export default function ContactMeSection() {
  const copyEmail = () => {
    navigator.clipboard.writeText('harishiv8@gmail.com').then(() => {
      toast('Email copied to clipboard!', { theme: 'dark' });
    });
  };

  return (
    <Box
      id="contact-me"
      sx={{
        width: '100%',
        padding: { xs: '80px 16px', md: '120px 80px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '56px',
        scrollMarginTop: '64px',
      }}
    >
      <SectionHeading label="Get In Touch" title="Let's" accent="Talk." />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '48px', md: '80px' },
        }}
      >
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0, maxWidth: '320px' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.75 }}
            >
              I seek to push the limits of creativity to create high-engaging, user-friendly, and
              memorable interactive experiences.
            </Typography>

            {/* Clickable email */}
            <Box
              onClick={copyEmail}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                padding: '12px 20px',
                border: '1px solid',
                borderColor: 'colors.border',
                borderRadius: '8px',
                backgroundColor: 'colors.surface',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'colors.accent',
                  backgroundColor: 'colors.accentMuted',
                },
              }}
            >
              <Typography
                variant="heading_h6_medium"
                sx={{ color: 'colors.textPrimary' }}
              >
                harishiv8@gmail.com
              </Typography>
              <Typography sx={{ color: 'colors.textMuted', fontSize: '12px' }}>
                (click to copy)
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ flex: 1 }}
        >
          <ContactForm />
        </motion.div>
      </Box>
    </Box>
  );
}
```

- [ ] **Step 2: Update ContactMeSectionStyle.js** — dark form field styling

```js
export const contactMeSectionStyles = {
  contactMeForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#111111',
        borderRadius: '8px',
        '& fieldset': { borderColor: '#1E1E1E' },
        '&:hover fieldset': { borderColor: '#6366F1' },
        '&.Mui-focused fieldset': { borderColor: '#6366F1' },
      },
      '& .MuiInputLabel-root': { color: '#71717A' },
      '& .MuiInputLabel-root.Mui-focused': { color: '#6366F1' },
      '& .MuiOutlinedInput-input': { color: '#F5F5F5' },
    },
  },
  contactMeFormActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  getInTouchButton: {
    textTransform: 'none',
    backgroundColor: '#6366F1',
    color: '#fff',
    borderRadius: '8px',
    padding: '12px 28px',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#4F46E5',
      boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
    },
  },
};
```

- [ ] **Step 3: Visual check**

- "Let's Talk." heading with "Get In Touch" overline label
- Left: description + clickable email box with copy-to-clipboard + toast notification
- Right: dark-styled form fields (dark bg, indigo focus outline)
- "Get In Touch" button is indigo

- [ ] **Step 4: Commit**

```bash
git add src/layouts/landing-page/components/contact-me-section/ContactMeSection.jsx
git add src/layouts/landing-page/components/contact-me-section/ContactMeSectionStyle.js
git commit -m "feat: contact section — minimal layout, copy-email, dark form styles"
```

---

### Task 19: LandingPage — Add Padding Top for Fixed Navbar

**Files:**
- Modify: `src/layouts/landing-page/LandingPage.jsx`

Since the navbar is now `position: fixed` (was not before), the hero section needs no explicit adjustment (it's full-viewport), but we need to make sure sections below have correct scroll targets. Verify the `scrollMarginTop` on each section matches the new navbar height of `64px`.

All sections already have `scrollMarginTop: '64px'` from the tasks above. This task is a verification-only step.

- [ ] **Step 1: Verify each section's scrollMarginTop**

Check that the following section IDs have `scrollMarginTop: '64px'`:
- `#skills` ✓ (set in Task 12)
- `#experience` ✓ (set in Task 14)
- `#projects` ✓ (set in Task 16)
- `#about-me` ✓ (set in Task 17)
- `#contact-me` ✓ (set in Task 18)

- [ ] **Step 2: Click each nav link and verify scroll targets are accurate**

Open the dev server. Click "About Me", "Skills", "Projects", "Contact Me" in the navbar. Each should scroll to its section without the content hiding behind the navbar.

- [ ] **Step 3: Final visual check — full page walkthrough**

Walk through the entire page top-to-bottom:

1. **Hero**: Full viewport, large name, gradient orbs, stagger entrance, indigo CTA button
2. **Skills**: Two infinite marquee rows of pill badges, opposite directions
3. **Experience**: Dark cards with indigo left border, cards slide in on scroll, tenure in accent color
4. **About Me**: Three large indigo stats on left, bio text on right
5. **Projects**: 2×3 grid, hover reveals indigo overlay + description
6. **Contact**: Email copy-to-clipboard, dark form
7. **Navbar**: Transparent at top, frosted glass when scrolled
8. **Scrolling**: Butter-smooth (Lenis)
9. **Mobile**: Test at 375px viewport — all sections stack vertically, hamburger opens dark drawer

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete portfolio dark redesign — dark theme, marquee skills, glass navbar, scroll animations"
```

---

## Summary of New Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `lenis` | latest | Smooth scroll |

Run `npm install lenis` before starting Task 1.

## Quick Reference — Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `background` | `#0A0A0A` | Page background |
| `surface` | `#111111` | Cards, Drawer |
| `surfaceElevated` | `#161616` | Hover state backgrounds |
| `border` | `#1E1E1E` | Card borders, dividers |
| `accent` | `#6366F1` | Buttons, borders, highlights |
| `accentMuted` | `rgba(99,102,241,0.12)` | Hover backgrounds |
| `textPrimary` | `#F5F5F5` | Headings, body text |
| `textSecondary` | `#A1A1AA` | Subtitles, descriptions |
| `textMuted` | `#71717A` | Labels, timestamps |
