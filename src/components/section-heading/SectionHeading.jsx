import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BlurText from '../BlurText/BlurText.jsx';

/**
 * Animated section heading used by every section.
 * Props:
 *   label  — small uppercase overline text in accent color (optional)
 *   title  — regular-weight first word(s)
 *   accent — bold last word (shown in textPrimary, extra bold)
 */
export default function SectionHeading({ label, title, accent }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {label && (
        <Typography
          sx={{
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'colors.accent',
          }}
        >
          {label}
        </Typography>
      )}
      <Typography
        variant="displayText_extra_bold"
        component="div"
        sx={{ color: 'colors.textPrimary' }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '0.28em' }}>
          <BlurText
            text={title}
            animateBy="words"
            direction="top"
            stepDuration={0.38}
            delay={80}
            className="blur-text-title"
          />
          {accent && (
            <BlurText
              text={accent}
              animateBy="words"
              direction="top"
              stepDuration={0.38}
              delay={80}
              className="blur-text-accent"
            />
          )}
        </Box>
      </Typography>
    </Box>
  );
}
