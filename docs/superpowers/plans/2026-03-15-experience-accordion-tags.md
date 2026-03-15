# Experience Accordion + Tech Stack Tags Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add accordion expand/collapse behaviour and tech stack tag badges to ExperienceCard, with the KreditBee card starting open and styled as the active role.

**Architecture:** All new logic lives in `ExperienceCard.jsx` — it gains internal `useState` for open/closed, a `motion.div` body wrapper for height animation (Framer Motion v11, `height: 'auto'` supported), and new props (`tags`, `isActive`, `defaultExpanded`, `expandLabel`). `ExperienceSection.jsx` only changes to pass the new props to each card call. The vertical timeline structure is untouched.

**Tech Stack:** React 18, MUI v5 sx prop, Framer Motion v11 (`motion`, `useState`).

---

## Chunk 1: ExperienceCard rewrite

---

### Task 1: Rewrite `ExperienceCard.jsx`

**Files:**
- Modify: `src/layouts/landing-page/components/experience-section/ExperienceCard.jsx`

- [ ] **Step 1: Replace the entire file with the new implementation**

  ```jsx
  import { useState } from 'react';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import { motion } from 'framer-motion';

  export default function ExperienceCard({
    companyLogo,
    jobTitle,
    tenure,
    description = [],
    children,
    tags = [],
    isActive = false,
    defaultExpanded = false,
    expandLabel = 'details',
  }) {
    const [isOpen, setIsOpen] = useState(defaultExpanded);

    return (
      <Box
        sx={{
          width: '100%',
          padding: '28px 32px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'colors.surface',
          borderRadius: '12px',
          borderLeft: '3px solid',
          borderLeftColor: 'colors.accent',
          outline: '1px solid',
          outlineColor: isActive
            ? 'rgba(99,102,241,0.45)'
            : isOpen
              ? 'rgba(99,102,241,0.2)'
              : 'colors.border',
          transition: 'outline-color 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Glowing top edge — active role only */}
        {isActive && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(to right, transparent, #6366F1, transparent)',
              borderRadius: '12px 12px 0 0',
            }}
          />
        )}

        {/* Header row — click to toggle */}
        <Box
          onClick={() => setIsOpen((prev) => !prev)}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '16px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          {/* Logo */}
          <Box sx={{ '& svg': { width: '44px', height: 'auto', borderRadius: '6px' }, flexShrink: 0 }}>
            {companyLogo}
          </Box>

          {/* Meta: title + tenure + tags */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="heading_h4_semi_bold" sx={{ color: 'colors.textPrimary' }}>
              {jobTitle}
            </Typography>
            <Typography
              variant="heading_h6_medium"
              sx={{
                color: isActive ? 'colors.accent' : '#888',
                fontSize: '12px',
                letterSpacing: '0.03em',
                marginBottom: tags.length > 0 ? '10px' : 0,
              }}
            >
              {tenure}
            </Typography>
            {tags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {tags.map((tag) => (
                  <Box
                    key={tag}
                    component="span"
                    sx={
                      isActive
                        ? {
                            fontSize: '10px', fontWeight: 600, color: '#a5b4fc',
                            background: 'rgba(99,102,241,0.1)',
                            border: '1px solid rgba(99,102,241,0.2)',
                            padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.03em',
                          }
                        : {
                            fontSize: '10px', fontWeight: 600, color: '#52525b',
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid #2a2a2a',
                            padding: '2px 8px', borderRadius: '4px', letterSpacing: '0.03em',
                          }
                    }
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            )}
          </Box>

          {/* Right column: CURRENT badge + expand button */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
            {isActive && (
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(99,102,241,0.1)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  borderRadius: '20px',
                  padding: '4px 10px 4px 7px',
                }}
              >
                <Box
                  sx={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    backgroundColor: '#6366F1',
                    boxShadow: '0 0 8px rgba(99,102,241,0.8)',
                  }}
                />
                <Typography sx={{ fontSize: '10px', fontWeight: 700, color: '#818cf8', letterSpacing: '0.06em' }}>
                  CURRENT
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                fontSize: '10px',
                color: isOpen ? '#6366F1' : '#555',
                border: '1px solid',
                borderColor: isOpen ? 'rgba(99,102,241,0.3)' : '#2a2a2a',
                borderRadius: '4px',
                padding: '4px 8px',
                whiteSpace: 'nowrap',
              }}
            >
              {isOpen ? '▲ hide' : `▼ ${expandLabel}`}
            </Box>
          </Box>
        </Box>

        {/* Body — animated accordion */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <Box sx={{ color: 'colors.textSecondary', paddingTop: '24px' }}>
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
        </motion.div>
      </Box>
    );
  }
  ```

  **Implementation notes:**
  - `position: 'relative'` on the outer Box enables the absolute glow strip.
  - The glow strip uses `position: absolute` (simpler than the spec's negative-margin approach — equivalent result).
  - No `gap` on the outer Box — body spacing comes from `paddingTop: '24px'` on the inner Box inside the `motion.div`, so the padding collapses cleanly when the accordion closes.
  - `initial={false}` prevents the open animation playing on mount when `defaultExpanded={true}`.
  - `userSelect: 'none'` on the header prevents text selection on rapid double-clicks.
  - The `isOpen ? '#6366F1' : '#555'` ternary on the expand button replaces the spec's redundant `isOpen && isActive ? '#6366F1' : isOpen ? '#6366F1' : '#555'`.

- [ ] **Step 2: Verify `framer-motion` is imported and `useState` is imported**

  Run:
  ```bash
  grep -n "import" src/layouts/landing-page/components/experience-section/ExperienceCard.jsx
  ```

  Expected output contains (exact line numbers may vary):
  ```
  import { useState } from 'react';
  import { motion } from 'framer-motion';
  ```

- [ ] **Step 3: Verify new props appear in the function signature**

  Run:
  ```bash
  grep -n "isActive\|defaultExpanded\|expandLabel\|tags" src/layouts/landing-page/components/experience-section/ExperienceCard.jsx | head -10
  ```

  Expected: matches found on the destructured props line and in the JSX body.

- [ ] **Step 4: Commit**

  ```bash
  git add src/layouts/landing-page/components/experience-section/ExperienceCard.jsx
  git commit -m "feat: add accordion, tech tags, active styling to ExperienceCard"
  ```

---

## Chunk 2: ExperienceSection prop updates

---

### Task 2: Update `ExperienceSection.jsx` — pass new props to each card

**Files:**
- Modify: `src/layouts/landing-page/components/experience-section/ExperienceSection.jsx`

The only changes are adding `isActive`, `defaultExpanded`, `expandLabel`, and `tags` props to the three `<ExperienceCard>` calls. All other code in the file is unchanged.

- [ ] **Step 1: Update the KreditBee `<ExperienceCard>` call (lines 154–183)**

  Find this block:
  ```jsx
              <ExperienceCard
                companyLogo={
  ```
  (the first ExperienceCard in the file)

  Add the four new props immediately after `<ExperienceCard`:
  ```jsx
              <ExperienceCard
                isActive={true}
                defaultExpanded={true}
                expandLabel="4 bullets"
                tags={['React', 'TypeScript', 'Redux', 'UPI / Fintech', 'System Design']}
                companyLogo={
  ```

- [ ] **Step 2: Update the Walrus `<ExperienceCard>` call (lines 197–201)**

  Find:
  ```jsx
              <ExperienceCard
                companyLogo={<RenderNet />}
                jobTitle="Senior Frontend Engineer at Walrus Tech Inc. (YC S21)"
  ```

  Add the four new props:
  ```jsx
              <ExperienceCard
                isActive={false}
                defaultExpanded={false}
                expandLabel="4 projects"
                tags={['React', 'Electron', 'Redux', 'Flutter', 'Kotlin', 'Playwright']}
                companyLogo={<RenderNet />}
                jobTitle="Senior Frontend Engineer at Walrus Tech Inc. (YC S21)"
  ```

- [ ] **Step 3: Update the GlobalLogic `<ExperienceCard>` call (lines 275–280)**

  Find:
  ```jsx
              <ExperienceCard
                companyLogo={<GlobalLogic />}
                jobTitle="Software Engineer at GlobalLogic (A Hitachi Group Company)"
  ```

  Add the four new props:
  ```jsx
              <ExperienceCard
                isActive={false}
                defaultExpanded={false}
                expandLabel="2 bullets"
                tags={['Android', 'Kotlin', 'MVVM']}
                companyLogo={<GlobalLogic />}
                jobTitle="Software Engineer at GlobalLogic (A Hitachi Group Company)"
  ```

- [ ] **Step 4: Verify no `motion` or `framer-motion` import was added to ExperienceSection**

  Run:
  ```bash
  grep -n "framer-motion" src/layouts/landing-page/components/experience-section/ExperienceSection.jsx
  ```

  Expected:
  ```
  4:import { motion, useInView } from 'framer-motion';
  ```
  (Only the existing import — no new ones.)

- [ ] **Step 5: Commit**

  ```bash
  git add src/layouts/landing-page/components/experience-section/ExperienceSection.jsx
  git commit -m "feat: pass accordion and tag props to experience timeline entries"
  ```

---

### Task 3: Visual verification

- [ ] **Step 1: Start the dev server**

  ```bash
  npm run dev
  ```

  Expected: Vite starts, no compilation errors.

- [ ] **Step 2: Open the site and scroll to the Experience section**

  Open `http://localhost:5173`. Scroll to "My Experience".

  Expected on load:
  - KreditBee card is **open** — bullets visible, expand button shows "▲ hide"
  - KreditBee card has a faint indigo glowing strip at the very top edge
  - KreditBee card has a "CURRENT" badge (pulsing-glow dot + text) in the top-right
  - KreditBee card border is brighter indigo (`rgba(99,102,241,0.45)`)
  - KreditBee tags (React, TypeScript, Redux, UPI / Fintech, System Design) are indigo-tinted
  - Walrus and GlobalLogic cards are **collapsed** — no bullets visible, expand button shows "▼ 4 projects" / "▼ 2 bullets"
  - Walrus and GlobalLogic tags are muted grey

- [ ] **Step 3: Test accordion toggle**

  Click the Walrus card header.

  Expected:
  - Card smoothly animates open (≈0.3s)
  - All 4 sub-role sections (Affogato AI, RoverX, Defy, Walrus) become visible
  - Card border shifts to `rgba(99,102,241,0.2)`
  - Expand button changes to "▲ hide" in indigo

  Click again.

  Expected: Card smoothly collapses, expand button returns to "▼ 4 projects".

- [ ] **Step 4: Test KreditBee collapse**

  Click the KreditBee card header.

  Expected: Card collapses smoothly. Tags remain visible. "CURRENT" badge remains visible.

- [ ] **Step 5: Check mobile layout at 390px**

  Resize browser to 390px wide.

  Expected: Cards still show logo, title, tenure, tags, and expand button. Tags wrap to multiple lines if needed. No overflow or truncation issues.
