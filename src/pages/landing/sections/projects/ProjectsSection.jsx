import Box from '@mui/material/Box';
import { projectsSectionStyles } from './ProjectsSectionStyles.js';
import ProjectsCard from './ProjectsCard.jsx';
import { Grid } from '@mui/material';
import SectionHeading from '../../../../components/section-heading/SectionHeading.jsx';

export default function ProjectsSection() {
  return (
    <Box id="projects" sx={projectsSectionStyles.projectsSection}>
      <SectionHeading label="Work" title="My" accent="Projects" />

      <Box sx={{ width: '100%' }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="01"
              name="Leaf AI"
              description="Universal LLM interface with Next.js + FastAPI, supporting OpenAI, Anthropic & Gemini, with real-time chat"
              link="https://github.com/graphicstone/project-leaf"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="02"
              name="Transformer Playground"
              description="Browser-based ML playground using Transformer.js for client-side AI, no server needed"
              link="https://github.com/graphicstone/transformer-js-playground"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="03"
              name="Video Editor SDK"
              description="React and TypeScript-based video editor SDK with real-time preview, timeline editing, and audio synchronisation"
              link="https://github.com/graphicstone/video-editor"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="04"
              name="Project OneSide"
              description="Unique mathematical puzzle game in Kotlin where you swap rows and columns to match a 3×3 grid."
              link="https://github.com/graphicstone/OneSide"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="05"
              name="Covid 19 Support"
              description="Android app showing real-time statistical and graphical data for the Covid-19 pandemic."
              link="https://github.com/graphicstone/Covid-19-Support"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectsCard
              index="06"
              name="UserInfoView"
              description="Android library to create a UserViewCard with title, subtitle, tag and image, customisable via XML attributes."
              link="https://github.com/graphicstone/UserInfoView"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
