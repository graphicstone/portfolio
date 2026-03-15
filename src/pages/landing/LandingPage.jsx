import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from './sections/toolbar/Toolbar.jsx';
import HeroSection from './sections/hero/HeroSection.jsx';
import SkillsSection from './sections/skills/SkillsSection.jsx';
import ExperienceSection from './sections/experience/ExperienceSection.jsx';
import AboutMeSection from './sections/about/AboutMeSection.jsx';
import ProjectsSection from './sections/projects/ProjectsSection.jsx';
import ContactMeSection from './sections/contact/ContactMeSection.jsx';

function LandingPage() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Toolbar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <AboutMeSection />
        <ProjectsSection />
        <ContactMeSection />
      </Box>
    </Box>
  );
}

LandingPage.propTypes = {};

export default LandingPage;
