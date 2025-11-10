import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { experienceSectionStyles } from './ExperienceSectionStyles.js';
import ExperienceCard from './ExperienceCard.jsx';
import GlobalLogic from '../../../../assets/svg/experience/globallogic.svg?react';
import RenderNet from '../../../../assets/svg/experience/rendernet.svg?react';
import { colorPalette } from '../../../ColorPalette.js';

export default function ExperienceSection() {
  const workExperience = {
    globalLogic: [
      'Developed a corporate ride-sharing mobile application for employees',
      'Created a native Android application using Kotlin and MVVM architecture.'
    ],
    walrus: [
      'Developed virtual card feature and user signature functionality in Kotlin',
      'Created animations for virtual card processes',
      'Built an in-app cricket game to enhance user interactivity',
      'Integrated contact sharing for game results.'
    ],
    defy: [
      'Migrated native Android app to cross-platform Flutter app',
      'Implemented Firebase for authentication and Crashlytics for reporting',
      'Developed SDUI for dynamic content and notification service for portfolio alerts',
      'Integrated socket.io for real-time crypto data updates and Hyperverge for KYC',
      'Used Hive for local storage and developed Baskets feature for curated crypto collections.'
    ],
    roverX: [
      'Built NFT portfolio tracking app for web (ReactJS with Redux) and mobile (Flutter with BloC)',
      'Implemented multi-wallet login via WalletConnect and ENS for user-friendly addresses',
      'Added price alert feature and in-app review functionality in Flutter',
      'Managed deployment with GitHub Actions and Google App Engine',
      'Implemented Strategies feature for user-specific NFT suggestions.'
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
      'CI/CD: Lighthouse in CI, GitHub Actions, Firebase Hosting; zero‑downtime deploys.'
    ]
  };

  return (
    <Box id="experience" sx={experienceSectionStyles.experienceSection}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Typography variant="displayText_extra_bold" sx={{ color: 'colors.white' }}>
          <span style={{ fontWeight: 400 }}>My</span> Experience
        </Typography>
      </Box>
      <Box
        id="experience-cards"
        sx={{
          width: '100%',
          padding: { xs: 0, md: '40px 24px' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '20px', md: '32px' }
        }}
      >
        {/* Walrus tech inc. parent card with nested projects */}
        <ExperienceCard
          companyLogo={<RenderNet />}
          jobTitle="Senior Frontend Engineer at Walrus Tech Inc. (YC S21)"
          tenure="Jun 2021 - Present"
          description={[]}
          backgroundColor={colorPalette.zinc800}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Affogato AI / RenderNet */}
            <Box>
              <Typography variant="heading_h5_bold" sx={{ color: 'colors.white' }}>
                Affogato AI (formerly RenderNet AI)
              </Typography>
              <ul>
                {workExperience.rendernet.map((item, index) => (
                  <li key={`rendernet-${index}`}>
                    <Typography variant="paragraph_p2_regular">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
            {/* RoverX */}
            <Box>
              <Typography variant="heading_h5_bold" sx={{ color: 'colors.white' }}>
                RoverX
              </Typography>
              <ul>
                {workExperience.roverX.map((item, index) => (
                  <li key={`roverx-${index}`}>
                    <Typography variant="paragraph_p2_regular">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
            {/* Defy */}
            <Box>
              <Typography variant="heading_h5_bold" sx={{ color: 'colors.white' }}>
                Defy
              </Typography>
              <ul>
                {workExperience.defy.map((item, index) => (
                  <li key={`defy-${index}`}>
                    <Typography variant="paragraph_p2_regular">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
            {/* Walrus */}
            <Box>
              <Typography variant="heading_h5_bold" sx={{ color: 'colors.white' }}>
                Walrus
              </Typography>
              <ul>
                {workExperience.walrus.map((item, index) => (
                  <li key={`walrus-${index}`}>
                    <Typography variant="paragraph_p2_regular">{item}</Typography>
                  </li>
                ))}
              </ul>
            </Box>
          </Box>
        </ExperienceCard>

        {/* GlobalLogic */}
        <ExperienceCard
          companyLogo={<GlobalLogic />}
          jobTitle="Software Engineer at GlobalLogic (A Hitachi Group Company)"
          tenure="Jul 2019 - May 2021"
          description={workExperience.globalLogic}
        />
      </Box>
    </Box>
  );
}
