import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { skillsSectionStyles } from './SkillsSectionStyles.js';
import { Grid } from '@mui/material';
import SkillsBadge from './SkillsBadge.jsx';
import JavaScript from '../../../../assets/svg/ic_javascript.svg?react';

export default function SkillsSection() {
  return (
    <Box id="skills-section" sx={skillsSectionStyles.skillsSection}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Typography variant="displayText_extra_bold">
          <span style={{ fontWeight: 400 }}>My</span> skills
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={3}>
          <SkillsBadge name="React" icon={<JavaScript />} />
        </Grid>
      </Grid>
    </Box>
  );
}