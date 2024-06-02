import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colorPalette } from '../../../ColorPalette.js';

export default function SkillsBadge({ icon, name }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '24px',
        border: `2px solid ${colorPalette.black}`,
        gap: '32px',
        cursor: 'pointer',
        '& svg': {
          height: '40px',
          width: 'auto'
        },
        '&:hover': {
          backgroundColor: colorPalette.black,
          color: colorPalette.white,
          '& svg': {
            fill: colorPalette.white
          }
        }
      }}
    >
      {icon}
      <Typography variant="heading_h5_bold">{name}</Typography>
    </Box>
  );
}