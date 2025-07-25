import Box from '@mui/material/Box';
import { aboutMeSectionStyles } from './AboutMeSectionStyles.js';
import AboutMeImage from '../../../../assets/svg/about_me.svg?react';
import Typography from '@mui/material/Typography';

export default function AboutMeSection() {
  return (
    <Box id="about-me" sx={aboutMeSectionStyles.aboutMeSection}>
      <AboutMeImage />
      <Box id="about-me-text" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Box id="about-me-title" sx={{ display: 'flex', flexDirection: 'row', gap: '16px', padding: '20px 0' }}>
          <Typography variant="displayText_extra_bold">
            <span style={{ fontWeight: 400 }}>About</span> Me
          </Typography>
        </Box>
        <Typography variant="paragraph_p2_regular">
          With around 6 years of frontend development experience, I specialize in ReactJS, Redux, and Flutter, creating
          and managing applications such as generative AI tools, NFT portfolio trackers, and crypto investment
          platforms.
          <br />
          <br />
          Successfully led the frontend development team, delivering high-quality products such as an generative AI tool
          using ReactJS, enhancing user engagement with advanced canvas functionalities. Migrated a native Android app
          to Flutter, enabling iOS support and expanding user reach.
          <br />
          <br />
          Transformed current React JS application into a desktop application using Electron JS giving more power
          to the user. Achieved 90% test coverage with Playwright and Jest, resulting in robust and
          reliable code. Optimized CI/CD pipelines with GitHub Actions and Firebase hosting, reducing deployment times
          by 20%.
        </Typography>
      </Box>
    </Box>
  );
}