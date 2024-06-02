import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { experienceSectionStyles } from './ExperienceSectionStyles.js';
import ExperienceCard from './ExperienceCard.jsx';
import JavaScript from '../../../../assets/svg/ic_javascript.svg?react';
import { colorPalette } from '../../../ColorPalette.js';

export default function ExperienceSection() {
  return (
    <Box id="experience-section" sx={experienceSectionStyles.experienceSection}>
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
          companyLogo={<JavaScript />} jobTitle="Frontend Developer" tenure="2019 - 2021"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <ExperienceCard
          companyLogo={<JavaScript />} jobTitle="Frontend Developer" tenure="2019 - 2021"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          backgroundColor={colorPalette.zinc800}
        />
        <ExperienceCard
          companyLogo={<JavaScript />} jobTitle="Frontend Developer" tenure="2019 - 2021"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
      </Box>
    </Box>
  );
}