import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { experienceSectionStyles } from './ExperienceSectionStyles.js';
import ExperienceCard from './ExperienceCard.jsx';
import GlobalLogic from '../../../../assets/svg/experience/globallogic.svg?react';
import Walrus from '../../../../assets/svg/experience/walrus.svg?react';
import Defy from '../../../../assets/svg/experience/defy.svg?react';
import RoverX from '../../../../assets/svg/experience/roverx.svg?react';
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
      'Led frontend development of a generative AI platform using ReactJS, Redux, and Electron',
      'Built and maintained the Affogato Client SDK, streamlining API integrations and developer workflows',
      'Developed canvas from Konva.js, later migrated to tldraw and implemented spatial indexing for performant rendering of 2000+ elements',
      'Established robust testing infrastructure with Jest, Playwright, and API mocking, decoupling backend dependencies',
      'Integrated Datadog for real-time performance/error monitoring across environments',
      'Automated Lighthouse audits in CI and optimized bundle performance via Webpack, reducing load time by 30%'
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
        <ExperienceCard
          companyLogo={<RenderNet />}
          jobTitle="Frontend Lead at Affogato AI (formerly RenderNet AI) (YC S21)"
          tenure="Nov 2023 - Present"
          description={workExperience.rendernet}
        />
        <ExperienceCard
          companyLogo={<RoverX />}
          jobTitle="Frontend Developer at RoverX (YC S21)"
          tenure="Aug 2022 - Nov 2023"
          description={workExperience.roverX}
          backgroundColor={colorPalette.zinc800}
        />
        <ExperienceCard
          companyLogo={<Defy />}
          jobTitle="Mobile Developer at Defy (YC S21)"
          tenure="Sep 2021 - Nov 2022"
          description={workExperience.defy}
        />
        <ExperienceCard
          companyLogo={<Walrus />}
          jobTitle="Android Developer at Walrus (YC S21)"
          tenure="May 2021 - Sep 2021"
          description={workExperience.walrus}
          backgroundColor={colorPalette.zinc800}
        />
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