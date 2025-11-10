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
          <Box id="name-title" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography id="hero-title-prefix" variant="displayText_regular">
              Hello I'm
            </Typography>
            <Typography id="hero-title-name" variant="displayText_extra_bold">
              Harishiv Singh
            </Typography>
          </Box>
          <Box id="position-title" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography id="hero-title-role1" variant="displayText_extra_bold">
              Senior Frontend
            </Typography>
            <Typography id="hero-title-role2" variant="displayText_extra_bold">
              Engineer
            </Typography>
          </Box>
        </Box>
        <Typography
          id="hero-subtitle"
          variant="paragraph_p2_regular"
          sx={{ width: { xs: '100%', md: '50%' } }}
        >
          Senior Frontend Engineer with 6+ years of experience building scalable web, mobile and
          desktop products using React, Electron, Android and Flutter.
        </Typography>
        <Box id="social-section" sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
          <SocialButton icon={<GitHub />} link={'https://github.com/graphicstone/'} />
          <SocialButton icon={<LinkedIn />} link={'https://www.linkedin.com/in/harishiv-singh'} />
          <SocialButton icon={<Medium />} link={'https://medium.com/@graphicstone'} />
          <SocialButton
            icon={<Stackoverflow />}
            link={'https://stackoverflow.com/users/7810174/graphicstone'}
          />
        </Box>
      </Box>
    </Box>
  );
}
