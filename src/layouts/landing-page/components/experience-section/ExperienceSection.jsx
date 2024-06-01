import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { experienceSectionStyles } from './ExperienceSectionStyles.js';
import ExperienceCard from './ExperienceCard.jsx';
import JavaScript from '../../../../assets/ic_javascript.svg?react';

export default function ExperienceSection() {
  return (
    <Box id="experience-section" sx={experienceSectionStyles.experienceSection}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Typography variant="displayText_regular" sx={{ color: 'colors.white' }}>My</Typography>
        <Typography variant="displayText_extra_bold" sx={{ color: 'colors.white' }}>Experience</Typography>
      </Box>
      <Box
        id="experience-cards"
        sx={{ width: '100%', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <ExperienceCard
          companyLogo={<JavaScript />} jobTitle="Frontend Developer" tenure="2019 - 2021"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <ExperienceCard
          companyLogo={<JavaScript />} jobTitle="Frontend Developer" tenure="2019 - 2021"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
        <ExperienceCard
          companyLogo={<JavaScript />} jobTitle="Frontend Developer" tenure="2019 - 2021"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />
      </Box>
    </Box>
  );
}