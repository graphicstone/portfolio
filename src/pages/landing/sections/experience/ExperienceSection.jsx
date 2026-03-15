import { useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../../../../components/section-heading/SectionHeading.jsx';
import ExperienceCard from './ExperienceCard.jsx';
import RenderNet from '../../../../assets/svg/experience/rendernet.svg?react';
import GlobalLogic from '../../../../assets/svg/experience/globallogic.svg?react';
import KreditBeeLogo from '../../../../assets/webp/kreditbee.webp';

// ── Animation variants ──────────────────────────────────────────────────────

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

      <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '16px', md: '20px' } }}>

        {/* ── Entry 1: KreditBee ── */}
        <motion.div variants={cardVariants(0)} initial="hidden" animate={animate}>
          <ExperienceCard
                isActive={true}
                defaultExpanded={true}
                expandLabel="4 bullets"
                tags={['React', 'TypeScript', 'Redux', 'UPI / Fintech', 'System Design']}
                companyLogo={
                  <img
                    src={KreditBeeLogo}
                    alt="KreditBee"
                    style={{ width: '44px', height: '44px', borderRadius: '6px', objectFit: 'cover' }}
                  />
                }
                jobTitle="Technical Lead at KreditBee"
                tenure="Jan 2026 – Present"
                description={[
                  'Architecting and owning the frontend systems for a high-scale fintech UPI payment platform.',
                  'Driving technical decisions, code standards, and delivery across the frontend org.',
                  'Collaborating with product, design, and platform teams on system design.',
                  'Building performant, accessible interfaces for millions of users.',
                ]}
              />
        </motion.div>

        {/* ── Entry 2: Walrus Tech ── */}
        <motion.div variants={cardVariants(1)} initial="hidden" animate={animate}>
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

        {/* ── Entry 3: GlobalLogic ── */}
        <motion.div variants={cardVariants(2)} initial="hidden" animate={animate}>
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
        </motion.div>

      </Box>
    </Box>
  );
}
