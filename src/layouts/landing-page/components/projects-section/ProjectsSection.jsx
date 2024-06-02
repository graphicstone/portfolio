import Box from '@mui/material/Box';
import { projectsSectionStyles } from './ProjectsSectionStyles.js';
import Typography from '@mui/material/Typography';
import ProjectsCard from './ProjectsCard.jsx';
import ProjectCovid from '../../../../assets/webp/project_covid.png?react';
import ProjectOneSide from '../../../../assets/webp/project_one_side.png?react';
import ProjectUserInfoView from '../../../../assets/webp/project_user_info_view.png?react';

export default function ProjectsSection() {
  return (
    <Box id="projects" sx={projectsSectionStyles.projectsSection}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Typography variant="displayText_extra_bold" sx={{ color: 'colors.white' }}>
          <span style={{ fontWeight: 400 }}>My</span> Projects
        </Typography>
      </Box>
      <Box
        id="experience-cards"
        sx={{ width: '100%', padding: '40px 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        <ProjectsCard
          index="01"
          name="Project OneSide"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          image={ProjectOneSide}
          link="https://www.google.com"
        />
        <ProjectsCard
          index="02"
          name="Project Covid 19"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          image={ProjectCovid}
          link="https://www.google.com"
          reverse={true}
        />
        <ProjectsCard
          index="03"
          name="Project UserInfoView"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          image={ProjectUserInfoView}
          link="https://www.google.com"
        />
      </Box>
    </Box>
  );
}