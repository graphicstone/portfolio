import Box from '@mui/material/Box';
import { projectsSectionStyles } from './ProjectsSectionStyles.js';
import Typography from '@mui/material/Typography';
import ProjectsCard from './ProjectsCard.jsx';
import ProjectCovid from '../../../../assets/webp/project_covid.png?react';
import ProjectOneSide from '../../../../assets/webp/project_one_side.png?react';
import ProjectUserInfoView from '../../../../assets/webp/project_user_info_view.png?react';
import { Grid } from '@mui/material';

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
        sx={{
          width: '100%',
          padding: '40px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="01"
              name="Leaf AI"
              description="Universal LLM interface with Next.js + FastAPI, supporting OpenAI, Anthropic & Gemini, with real-time chat"
              image={ProjectOneSide}
              link="https://github.com/graphicstone/project-leaf"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="02"
              name="transformer-playground"
              description="Browser-based ML playground using Transformer.js for client-side AI, no server needed"
              image={ProjectOneSide}
              link="https://github.com/graphicstone/transformer-js-playground"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="03"
              name="Video Editor SDK"
              description="React and TypeScript-based video editor SDK with real-time preview, timeline editing, and audio synchronisation."
              image={ProjectOneSide}
              link="https://github.com/graphicstone/video-editor"
            />
          </Grid>

          {/* Keep older projects below */}
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="04"
              name="Project OneSide"
              description="OneSide is a unique mathematical puzzle game written in Kotlin where you have to swap rows and columns up and down to match the grid generated on a 3 x 3 board."
              image={ProjectOneSide}
              link="https://github.com/graphicstone/OneSide"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="05"
              name="Project Covid 19 Support"
              description="Coivd-19 Support is an android application written in Java in which one can see real time statistical and graphical data regarding the Covid-19 pandemic."
              image={ProjectCovid}
              link="https://github.com/graphicstone/Covid-19-Support"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="06"
              name="Project UserInfoView"
              description="A UserInfoView for android to easily create a UserViewCard with title, subtitle, tag and image in it. You can easily customize the view through xml attributes that are present there."
              image={ProjectUserInfoView}
              link="https://github.com/graphicstone/UserInfoView"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
