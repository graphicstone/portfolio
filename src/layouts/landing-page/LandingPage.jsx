import * as React from 'react';
import Box from '@mui/material/Box';
import HeroSection from './components/hero-section/HeroSection.jsx';
import Toolbar from './components/toolbar/Toolbar.jsx';
import SkillsSection from './components/skills-section/SkillsSection.jsx';
import ExperienceSection from './components/experience-section/ExperienceSection.jsx';
import AboutMeSection from './components/about-me-section/AboutMeSection.jsx';
import ProjectsSection from './components/projects-section/ProjectsSection.jsx';

function LandingPage() {
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Toolbar />
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <AboutMeSection />
        <ProjectsSection />
      </Box>
    </Box>
  );
}

LandingPage.propTypes = {};

export default LandingPage;