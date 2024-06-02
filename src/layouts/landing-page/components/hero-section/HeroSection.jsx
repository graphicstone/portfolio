import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroImage from '../../../../assets/svg/hero_image.svg?react';
import Medium from '../../../../assets/svg/social/medium.svg?react';
import GitHub from '../../../../assets/svg/social/github.svg?react';
import LinkedIn from '../../../../assets/svg/social/linkedIn.svg?react';
import Stackoverflow from '../../../../assets/svg/social/stackoverflow.svg?react';
import { heroSectionStyles } from './HeroSectionStyles.js';
import SocialButton from '../../../components/social-button/SocialButton.jsx';

export default function HeroSection() {
  return (
    <Box id="hero-section" sx={heroSectionStyles.heroSection}>
      <Box id="hero-imag" sx={heroSectionStyles.heroImage}>
        <HeroImage />
      </Box>
      <Box id="hero-content" sx={heroSectionStyles.heroContent}>
        <Box id="hero-title" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box id="name-title" sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Typography id="hero-title" variant="displayText_extra_bold">
              <span style={{ fontWeight: 400 }}>Hello I'm</span> Harishiv Singh
            </Typography>
          </Box>
          <Box id="position-title" sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Typography id="hero-title" variant="displayText_extra_bold">
              Frontend
            </Typography>
            <Typography id="hero-title" variant="displayText_extra_bold">
              Developer
            </Typography>
          </Box>
          <Box id="location-title" sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Typography id="hero-title" variant="displayText_extra_bold">
              <span style={{ fontWeight: 400 }}>Based In</span> India
            </Typography>
          </Box>
        </Box>
        <Typography
          id="hero-subtitle"
          variant="paragraph_p2_regular"
          sx={{ width: { xs: '100%', md: '50%' } }}
        >
          With 5+ years in frontend development, I specialize in ReactJS, Android, and Flutter.
          Skilled in real-time data, cross-platform apps, and deployment.
        </Typography>
        <Box id="social-section" sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <SocialButton
            icon={<GitHub />}
            link={'https://github.com/graphicstone/'}
          />
          <SocialButton
            icon={<LinkedIn />}
            link={'https://www.linkedin.com/in/harishiv-singh/?original_referer=https%3A%2F%2Fwww.google.com%2F'} />
          <SocialButton
            icon={<Medium />}
            link={'https://medium.com/@graphicstone'}
          />
          <SocialButton
            icon={<Stackoverflow />}
            link={'https://stackoverflow.com/users/7810174/graphicstone'}
          />
        </Box>
      </Box>
    </Box>
  );
}