import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ExternalLink from '../../../../assets/svg/ic_external_link.svg?react';

export default function ProjectsCard({ image, index, name, description, link, reverse = false }) {
  return (
    <Box
      id="projects-card"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: reverse ? 'row-reverse' : 'row' },
        gap: { xs: '28px', md: '40px' },
        padding: { xs: '8px 0', md: '20px 0' }
      }}
    >
      <Box
        id="projects-card-details"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: '16px', md: '28px' }
        }}
      >
        <Typography variant="displayText_extra_bold" sx={{ color: 'colors.white' }}>
          {index}
        </Typography>
        <Typography variant="heading_h2_bold" sx={{ color: 'colors.white' }}>
          {name}
        </Typography>
        <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.zinc500' }}>
          {description}
        </Typography>
        <Box
          id="projects-card-link"
          sx={{ cursor: 'pointer' }}
          onClick={() => window.open(link, '_blank')}
        >
          <ExternalLink />
        </Box>
      </Box>
    </Box>
  );
}
