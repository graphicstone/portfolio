import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colorPalette } from '../../../ColorPalette.js';

export default function ExperienceCard({
  companyLogo,
  jobTitle,
  tenure,
  description,
  backgroundColor = colorPalette.black
}) {
  return (
    <Box
      id="experience-card"
      sx={{
        width: '100%',
        padding: '24px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        border: `1px solid ${colorPalette.zinc800}`,
        backgroundColor: backgroundColor,
        borderRadius: '10px'
      }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: '20px',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' }
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: '30px', alignItems: 'center' }}>
          {companyLogo}
          <Typography variant="heading_h4_semi_bold" sx={{ color: 'colors.white' }}>{jobTitle}</Typography>
        </Box>
        <Typography variant="heading_h6_semibold" sx={{ color: 'colors.white' }}>{tenure}</Typography>
      </Box>
      <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.white' }}>{description}</Typography>
    </Box>
  );
}