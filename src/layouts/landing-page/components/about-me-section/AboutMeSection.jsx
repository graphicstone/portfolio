import Box from '@mui/material/Box';
import { aboutMeSectionStyles } from './AboutMeSectionStyles.js';
import AboutMeImage from '../../../../assets/svg/about_me.svg?react';
import Typography from '@mui/material/Typography';

export default function AboutMeSection() {
  return (
    <Box id="about-me" sx={aboutMeSectionStyles.aboutMeSection}>
      <AboutMeImage />
      <Box id="about-me-text" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box
          id="about-me-title"
          sx={{ display: 'flex', flexDirection: 'row', gap: '16px', padding: '20px 0' }}
        >
          <Typography variant="displayText_extra_bold">
            <span style={{ fontWeight: 400 }}>About</span> Me
          </Typography>
        </Box>
        <Typography variant="paragraph_p2_regular">
          Senior Frontend Engineer with 6+ years of experience building scalable web, mobile and
          desktop products. I specialize in React/TypeScript and Electron on the web/desktop side,
          and Flutter/Android on mobile. I care deeply about performance, testability, and clean,
          maintainable architectures.
          <br />
          <br />
          Recent work includes leading frontend architecture for an AI creative platform (React,
          Redux, Electron), designing a timeline video editor SDK, and delivering cross‑platform
          apps with secure IPC and caching for fast cold/ warm loads. I build with strong testing
          (Jest, RTL, Playwright, MSW) and ship via CI/CD.
          <br />
          <br />I enjoy turning complex product problems into polished experiences and collaborating
          across design, product, and platform teams to ship reliable features quickly.
        </Typography>
      </Box>
    </Box>
  );
}
