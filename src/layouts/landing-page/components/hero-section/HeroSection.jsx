import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HeroImage from '../../../../assets/hero_image.svg?react';
import JavaScript from '../../../../assets/ic_javascript.svg?react';
import { heroSectionStyles } from './HeroSectionStyles.js';
import SocialButton from '../../../components/social-button/SocialButton.jsx';

export default function HeroSection() {
  return (
    <Box id="hero-section" sx={heroSectionStyles.heroSection}>
      <Box id="hero-content" sx={heroSectionStyles.heroContent}>
        <Box id="hero-title" sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Box id="name-title" sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Typography id="hero-title" variant="displayText_regular">
              Hello I'm
            </Typography>
            <Typography id="hero-title" variant="displayText_extra_bold">
              Harishiv Singh
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
            <Typography id="hero-title" variant="displayText_regular">
              Based In
            </Typography>
            <Typography id="hero-title" variant="displayText_extra_bold">
              India
            </Typography>
          </Box>
        </Box>
        <Typography id={'hero-subtitle'} variant="paragraph_p2_regular">
          With 5+ years in frontend development, I specialize in ReactJS, Android, and Flutter.
          Skilled in real-time data, cross-platform apps, and deployment.
        </Typography>
        <Box id="social-section" sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <SocialButton icon={<JavaScript />} link={'https://www.facebook.com/'} />
          <SocialButton icon={<JavaScript />} link={'https://www.facebook.com/'} />
          <SocialButton icon={<JavaScript />} link={'https://www.facebook.com/'} />
          <SocialButton icon={<JavaScript />} link={'https://www.facebook.com/'} />
        </Box>
      </Box>
      <Box id="hero-imag" sx={heroSectionStyles.heroImage}>
        <HeroImage />
      </Box>
    </Box>
  );
}