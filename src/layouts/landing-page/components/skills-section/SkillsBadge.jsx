import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colorPalette } from '../../../ColorPalette.js';

export default function SkillsBadge({ icon, name, brandColor }) {
  return (
    <Box
      role="button"
      aria-label={`Skill: ${name}`}
      tabIndex={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        minHeight: { xs: '88px', md: '120px' },
        padding: { xs: '16px', md: '24px' },
        border: `2px solid ${colorPalette.black}`,
        borderRadius: '12px',
        gap: { xs: '16px', md: '24px' },
        cursor: 'pointer',
        transition:
          'transform 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
        '& svg': {
          height: { xs: '24px', md: '40px' },
          width: 'auto',
          color: colorPalette.black
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          backgroundColor: colorPalette.black,
          color: colorPalette.white,
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          '& svg': {
            color: brandColor || colorPalette.white
          }
        },
        '&:focus-visible': {
          outline: '3px solid #7aa2ff',
          outlineOffset: '2px'
        }
      }}
    >
      {icon}
      <Typography variant="heading_h5_bold">{name}</Typography>
    </Box>
  );
}
