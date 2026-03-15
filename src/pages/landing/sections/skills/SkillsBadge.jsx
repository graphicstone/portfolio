import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SkillsBadge({ icon, name, brandColor }) {
  return (
    <Box
      role="img"
      aria-label={`Skill: ${name}`}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px',
        border: '1px solid',
        borderColor: 'colors.border',
        borderRadius: '100px',
        backgroundColor: 'colors.surface',
        flexShrink: 0,
        whiteSpace: 'nowrap',
        transition: 'border-color 0.2s ease, background-color 0.2s ease',
        '& svg': {
          height: '18px',
          width: 'auto',
          color: brandColor || 'colors.textSecondary',
          flexShrink: 0,
        },
        '&:hover': {
          borderColor: brandColor || 'colors.accent',
          backgroundColor: 'colors.surfaceElevated',
        },
      }}
    >
      {icon}
      <Typography
        variant="heading_h6_medium"
        sx={{ color: 'colors.textPrimary', lineHeight: 1 }}
      >
        {name}
      </Typography>
    </Box>
  );
}
