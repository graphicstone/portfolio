import Box from '@mui/material/Box';
import { socialButtonStyles } from './SocialButtonStyles.js';

export default function SocialButton({ icon, link, color }) {
  return (
    <Box
      id="social-button"
      sx={socialButtonStyles.container}
      onClick={() => window.open(link, '_blank')}
    >
      {icon}
    </Box>
  );
}