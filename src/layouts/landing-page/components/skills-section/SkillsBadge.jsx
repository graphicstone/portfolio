import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        border: '2px solid #E0E0E0',
        gap: '8px'
      }}
    >
      {icon}
      <Typography variant="heading_h5_bold">{name}</Typography>
    </Box>
  );
}