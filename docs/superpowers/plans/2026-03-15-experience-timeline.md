# Experience Timeline Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the stacked card Experience section with a left-aligned vertical timeline featuring scroll-triggered Framer Motion animations (line draw, dot pop, card slide).

**Architecture:** A `useInView` ref on the entries container drives all three animation types (line scaleY, dot scale/opacity, card x/opacity) via a single `inView` boolean and named variants. Each animated element is its own `motion.div`. The vertical line is absolutely positioned on the relative entries container; dots sit in a 24px fixed-width flex column ensuring guaranteed alignment without offset math.

**Tech Stack:** React 18, MUI v5 sx prop, Framer Motion (`motion`, `useInView`), plain CSS `@keyframes` for the pulse-ring.

---

## Chunk 1: Infrastructure — pulse-ring keyframe + ExperienceCard root change

---

### Task 1: Add `@keyframes pulse-ring` to `src/index.css`

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Open `src/index.css` and append the keyframe**

  Add the following block at the very end of `src/index.css`:

  ```css
  /* Pulsing ring for active job indicator (KreditBee dot) */
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.6; }
    70%  { transform: scale(2.5); opacity: 0;   }
    100% { transform: scale(2.5); opacity: 0;   }
  }
  ```

- [ ] **Step 2: Verify the keyframe is present**

  Run: `grep -n "pulse-ring" src/index.css`

  Expected output:
  ```
  49:@keyframes pulse-ring {
  50:  0%   { transform: scale(1);   opacity: 0.6; }
  51:  70%  { transform: scale(2.5); opacity: 0;   }
  52:  100% { transform: scale(2.5); opacity: 0;   }
  53:}
  ```
  (Line numbers may differ — what matters is the keyframe exists.)

- [ ] **Step 3: Commit**

  ```bash
  git add src/index.css
  git commit -m "feat: add pulse-ring keyframe for active job dot indicator"
  ```

---

### Task 2: Remove `motion.div` wrapper from `ExperienceCard`

The card currently wraps its content in a `motion.div` with `whileInView`. The timeline spec moves all animation responsibility to `ExperienceSection`; `ExperienceCard` must be a plain component.

**Files:**
- Modify: `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx`

- [ ] **Step 1: Remove the `motion.div` wrapper and the `framer-motion` import**

  Replace the entire file content with:

  ```jsx
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';

  export default function ExperienceCard({
    companyLogo,
    jobTitle,
    tenure,
    description,
    children,
  }) {
    return (
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
            <Box sx={{ '& svg': { width: '44px', height: 'auto', borderRadius: '6px' } }}>
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
    );
  }
  ```

- [ ] **Step 2: Verify `framer-motion` import is gone**

  Run: `grep -n "framer-motion" src/layouts/landing-page/components/experience-section/ExperienceCard.jsx`

  Expected output: *(empty — no matches)*

- [ ] **Step 3: Commit**

  ```bash
  git add src/layouts/landing-page/components/experience-section/ExperienceCard.jsx
  git commit -m "refactor: remove motion.div from ExperienceCard — animation now owned by ExperienceSection"
  ```

---

## Chunk 2: ExperienceSection timeline rewrite

---

### Task 3: Rewrite `ExperienceSection.jsx` with the flexbox timeline

This is the core task. The new file introduces `useInView`-driven animation for a vertical line, three dots, and three cards.

**Layout recap:**
- Entries container: `position: 'relative'` (so the absolute line is contained).
- Vertical line: a `motion.div` with absolute positioning + `transformOrigin: 'top'` in its `style` prop (not inside the variant object).
- Each entry row: `display: 'flex'`, `flexDirection: 'row'`.
  - Left: dot-column `width: '24px'`, `flexShrink: 0`, `alignItems: 'center'`.
  - Right: `flex: 1` card wrapped in `motion.div`.
- `marginBottom: { xs: '40px', md: '64px' }` on first two rows; last row has no `marginBottom`.

**Files:**
- Modify: `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx`

- [ ] **Step 1: Replace the entire file with the new timeline implementation**

  ```jsx
  import { useRef } from 'react';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import { motion, useInView } from 'framer-motion';
  import SectionHeading from '../../../components/section-heading/SectionHeading.jsx';
  import ExperienceCard from './ExperienceCard.jsx';
  import RenderNet from '../../../../assets/svg/experience/rendernet.svg?react';
  import GlobalLogic from '../../../../assets/svg/experience/globallogic.svg?react';

  // ── Animation variants ──────────────────────────────────────────────────────

  const lineVariants = {
    hidden:  { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 1.8, delay: 0, ease: [0.16, 1, 0.3, 1] } },
  };

  const dotVariants = (i) => ({
    hidden:  { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: 0.3 + i * 0.3, ease: [0.22, 1, 0.36, 1] } },
  });

  const cardVariants = (i) => ({
    hidden:  { x: 28, opacity: 0 },
    visible: { x: 0,  opacity: 1, transition: { duration: 0.65, delay: 0.45 + i * 0.3, ease: [0.22, 1, 0.36, 1] } },
  });

  // ── Work experience data ─────────────────────────────────────────────────────

  const workExperience = {
    globalLogic: [
      'Developed a corporate ride-sharing mobile application for employees',
      'Created a native Android application using Kotlin and MVVM architecture.',
    ],
    walrus: [
      'Developed virtual card feature and user signature functionality in Kotlin',
      'Created animations for virtual card processes',
      'Built an in-app cricket game to enhance user interactivity',
      'Integrated contact sharing for game results.',
    ],
    defy: [
      'Migrated native Android app to cross-platform Flutter app',
      'Implemented Firebase for authentication and Crashlytics for reporting',
      'Developed SDUI for dynamic content and notification service for portfolio alerts',
      'Integrated socket.io for real-time crypto data updates and Hyperverge for KYC',
      'Used Hive for local storage and developed Baskets feature for curated crypto collections.',
    ],
    roverX: [
      'Built NFT portfolio tracking app for web (ReactJS with Redux) and mobile (Flutter with BloC)',
      'Implemented multi-wallet login via WalletConnect and ENS for user-friendly addresses',
      'Added price alert feature and in-app review functionality in Flutter',
      'Managed deployment with GitHub Actions and Google App Engine',
      'Implemented Strategies feature for user-specific NFT suggestions.',
    ],
    rendernet: [
      'Led frontend architecture for an AI creative platform using ReactJS, Redux, and Electron.',
      'Architected npm workspaces monorepo: component-library, api-client, video-editor-sdk.',
      'Designed a timeline video editor with normalized state (clips/tracks) and performant selectors.',
      'Delivered cross-platform support (Web + Electron) with secure IPC and preload contextBridge.',
      'Developed canvas using Konva.js, later migrated to tldraw; implemented spatial indexing for 2000+ elements.',
      'Added Redux Persist + IndexedDB caching for 3–5× faster repeat loads.',
      'Optimized bundles via code-splitting, lazy imports, memoized selectors, and Webpack tuning.',
      'Testing stack: Jest, React Testing Library, Playwright, MSW; Storybook docs for component-library.',
      'Observability: Datadog RUM/logs and structured telemetry; reduced MTTR.',
      'CI/CD: Lighthouse in CI, GitHub Actions, Firebase Hosting; zero‑downtime deploys.',
    ],
  };

  // ── Dot column shared styles ─────────────────────────────────────────────────

  const dotColumnSx = {
    width: '24px',
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: { xs: '24px', md: '30px' },
  };

  const baseDotSx = {
    width: '14px',
    height: '14px',
    borderRadius: '50%',
    backgroundColor: 'colors.accent',
    zIndex: 2,
    position: 'relative',
  };

  // ── Component ────────────────────────────────────────────────────────────────

  export default function ExperienceSection() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.1 });

    const animate = inView ? 'visible' : 'hidden';

    return (
      <Box
        id="experience"
        sx={{
          width: '100%',
          padding: { xs: '80px 16px', md: '120px 80px' },
          display: 'flex',
          flexDirection: 'column',
          gap: '56px',
          scrollMarginTop: '64px',
        }}
      >
        <SectionHeading label="Career" title="My" accent="Experience" />

        {/* Entries container — position:relative contains the absolute line */}
        <Box ref={ref} sx={{ position: 'relative' }}>

          {/* Vertical line — motion.div IS the line element */}
          <motion.div
            variants={lineVariants}
            animate={animate}
            style={{
              transformOrigin: 'top',
              position: 'absolute',
              left: '11px',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #6366F1 0%, rgba(99,102,241,0.3) 60%, transparent 100%)',
              zIndex: 0,
            }}
          />

          {/* ── Entry 1: KreditBee ── */}
          <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: { xs: '40px', md: '64px' } }}>
            <Box sx={dotColumnSx}>
              <motion.div variants={dotVariants(0)} animate={animate}>
                <Box
                  sx={{
                    ...baseDotSx,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: '-5px',
                      right: '-5px',
                      bottom: '-5px',
                      left: '-5px',
                      borderRadius: '50%',
                      border: '2px solid #6366F1',
                      animation: 'pulse-ring 2s ease-out infinite',
                    },
                  }}
                />
              </motion.div>
            </Box>
            <Box sx={{ flex: 1 }}>
              <motion.div variants={cardVariants(0)} animate={animate}>
                <ExperienceCard
                  companyLogo={
                    <Box
                      sx={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '6px',
                        backgroundColor: 'colors.accentMuted',
                        border: '1px solid',
                        borderColor: 'colors.accent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Typography variant="heading_h6_bold" sx={{ color: 'colors.accent' }}>
                        KB
                      </Typography>
                    </Box>
                  }
                  jobTitle="Lead Frontend Engineer (UPI) at KreditBee"
                  tenure="Jan 2026 – Present"
                  description={[
                    'Architecting and owning the frontend systems for a high-scale fintech UPI payment platform.',
                    'Driving technical decisions, code standards, and delivery across the frontend org.',
                    'Collaborating with product, design, and platform teams on system design.',
                    'Building performant, accessible interfaces for millions of users.',
                  ]}
                />
              </motion.div>
            </Box>
          </Box>

          {/* ── Entry 2: Walrus Tech ── */}
          <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: { xs: '40px', md: '64px' } }}>
            <Box sx={dotColumnSx}>
              <motion.div variants={dotVariants(1)} animate={animate}>
                <Box sx={baseDotSx} />
              </motion.div>
            </Box>
            <Box sx={{ flex: 1 }}>
              <motion.div variants={cardVariants(1)} animate={animate}>
                <ExperienceCard
                  companyLogo={<RenderNet />}
                  jobTitle="Senior Frontend Engineer at Walrus Tech Inc. (YC S21)"
                  tenure="Jun 2021 – Dec 2025"
                  description={[]}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <Box>
                      <Typography variant="heading_h5_bold" sx={{ color: 'colors.textPrimary' }}>
                        Affogato AI (formerly RenderNet AI)
                      </Typography>
                      <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                        {workExperience.rendernet.map((item, index) => (
                          <li key={`rendernet-${index}`} style={{ marginBottom: '4px' }}>
                            <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textSecondary' }}>
                              {item}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                    <Box>
                      <Typography variant="heading_h5_bold" sx={{ color: 'colors.textPrimary' }}>
                        RoverX
                      </Typography>
                      <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                        {workExperience.roverX.map((item, index) => (
                          <li key={`roverx-${index}`} style={{ marginBottom: '4px' }}>
                            <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textSecondary' }}>
                              {item}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                    <Box>
                      <Typography variant="heading_h5_bold" sx={{ color: 'colors.textPrimary' }}>
                        Defy
                      </Typography>
                      <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                        {workExperience.defy.map((item, index) => (
                          <li key={`defy-${index}`} style={{ marginBottom: '4px' }}>
                            <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textSecondary' }}>
                              {item}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                    <Box>
                      <Typography variant="heading_h5_bold" sx={{ color: 'colors.textPrimary' }}>
                        Walrus
                      </Typography>
                      <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                        {workExperience.walrus.map((item, index) => (
                          <li key={`walrus-${index}`} style={{ marginBottom: '4px' }}>
                            <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textSecondary' }}>
                              {item}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </Box>
                  </Box>
                </ExperienceCard>
              </motion.div>
            </Box>
          </Box>

          {/* ── Entry 3: GlobalLogic (last — no marginBottom) ── */}
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={dotColumnSx}>
              <motion.div variants={dotVariants(2)} animate={animate}>
                <Box sx={baseDotSx} />
              </motion.div>
            </Box>
            <Box sx={{ flex: 1 }}>
              <motion.div variants={cardVariants(2)} animate={animate}>
                <ExperienceCard
                  companyLogo={<GlobalLogic />}
                  jobTitle="Software Engineer at GlobalLogic (A Hitachi Group Company)"
                  tenure="Jul 2019 – May 2021"
                  description={workExperience.globalLogic}
                />
              </motion.div>
            </Box>
          </Box>

        </Box>
      </Box>
    );
  }
  ```

- [ ] **Step 2: Verify no reference to `experienceSectionStyles` remains in ExperienceSection.jsx**

  Run: `grep -n "experienceSectionStyles" src/layouts/landing-page/components/experience-section/ExperienceSection.jsx`

  Expected output: *(empty — no matches)*

- [ ] **Step 3: Verify `useInView` is imported from `framer-motion` (not `react-intersection-observer`)**

  Run: `grep -n "useInView" src/layouts/landing-page/components/experience-section/ExperienceSection.jsx`

  Expected output:
  ```
  3:  import { motion, useInView } from 'framer-motion';
  ```

- [ ] **Step 4: Commit**

  ```bash
  git add src/layouts/landing-page/components/experience-section/ExperienceSection.jsx
  git commit -m "feat: rewrite ExperienceSection as animated vertical timeline with 3 entries"
  ```

---

### Task 4: Delete `ExperienceSectionStyles.js`

Now that `ExperienceSection.jsx` no longer imports this file, it is safe to delete.

**Files:**
- Delete: `src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js`

- [ ] **Step 1: Confirm no other file imports `ExperienceSectionStyles`**

  Run: `grep -rn "ExperienceSectionStyles" src/`

  Expected output: *(empty — no matches)*

- [ ] **Step 2: Delete the file**

  ```bash
  rm src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js
  ```

- [ ] **Step 3: Commit the deletion**

  ```bash
  git add -A src/layouts/landing-page/components/experience-section/ExperienceSectionStyles.js
  git commit -m "chore: delete ExperienceSectionStyles.js — styles inlined into ExperienceSection"
  ```

---

### Task 5: Visual verification

- [ ] **Step 1: Start the dev server**

  ```bash
  npm run dev
  ```

  Expected: Vite dev server starts, no compilation errors in terminal.

- [ ] **Step 2: Open the site and navigate to the Experience section**

  Open `http://localhost:5173` in a browser. Scroll down to the "My Experience" section.

  Expected:
  - Three cards appear in a vertical column.
  - A vertical indigo gradient line runs along the left edge.
  - Three dots sit on the line, aligned with each card's header row.
  - The KreditBee dot (first entry) has a pulsing indigo ring animation.
  - Scrolling into view triggers: line draws downward, dots pop in (staggered), cards slide in from the right (staggered).

- [ ] **Step 3: Check content correctness**

  - Entry 1 title: "Lead Frontend Engineer (UPI) at KreditBee", tenure "Jan 2026 – Present". Logo shows "KB" initials badge.
  - Entry 2 title: "Senior Frontend Engineer at Walrus Tech Inc. (YC S21)", tenure "Jun 2021 – Dec 2025". Four sub-role sections visible inside card.
  - Entry 3 title: "Software Engineer at GlobalLogic (A Hitachi Group Company)", tenure "Jul 2019 – May 2021".

- [ ] **Step 4: Check responsive layout at mobile width**

  Resize browser to 390px width.

  Expected: Cards still appear with the timeline line and dots, layout stays readable, dot-column padding adjusts to `24px` top.

- [ ] **Step 5: Commit if all looks correct (already committed above — this step is a no-op)**

  All changes were committed in Tasks 1–4. No additional commit needed.
