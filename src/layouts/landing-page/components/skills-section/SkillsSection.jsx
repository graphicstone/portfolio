import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { skillsSectionStyles } from './SkillsSectionStyles.js';
import { Grid } from '@mui/material';
import SkillsBadge from './SkillsBadge.jsx';
import Android from '../../../../assets/svg/skills/android.svg?react';
import Css from '../../../../assets/svg/skills/css.svg?react';
import Firebase from '../../../../assets/svg/skills/firebase.svg?react';
import Flutter from '../../../../assets/svg/skills/flutter.svg?react';
import Html from '../../../../assets/svg/skills/html.svg?react';
import JavaScript from '../../../../assets/svg/skills/javascript.svg?react';
import Kotlin from '../../../../assets/svg/skills/kotlin.svg?react';
import React from '../../../../assets/svg/skills/react.svg?react';
import Redux from '../../../../assets/svg/skills/redux.svg?react';
import Git from '../../../../assets/svg/skills/git.svg?react';


export default function SkillsSection() {
  return (
    <Box id="skills" sx={skillsSectionStyles.skillsSection}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Typography variant="displayText_extra_bold">
          <span style={{ fontWeight: 400 }}>My</span> skills
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="Android" icon={<Android />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="Flutter" icon={<Flutter />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="React" icon={<React />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="Redux" icon={<Redux />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="JavaScript" icon={<JavaScript />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="Kotlin" icon={<Kotlin />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="HTML" icon={<Html />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="CSS" icon={<Css />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="Firebase" icon={<Firebase />} />
        </Grid>
        <Grid item xs={6} md={2.4}>
          <SkillsBadge name="Git" icon={<Git />} />
        </Grid>
      </Grid>
    </Box>
  );
}