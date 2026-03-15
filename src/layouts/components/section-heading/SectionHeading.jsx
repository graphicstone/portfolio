import { motion } from 'framer-motion';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

/**
 * Animated section heading used by every section.
 * Props:
 *   label  — small uppercase overline text in accent color (optional)
 *   title  — regular-weight first word(s)
 *   accent — bold last word (shown in textPrimary, extra bold)
 */
export default function SectionHeading({ label, title, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
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
        <Typography variant="displayText_extra_bold" sx={{ color: 'colors.textPrimary' }}>
          <span style={{ fontWeight: 400 }}>{title}</span>
          {accent ? ` ${accent}` : ''}
        </Typography>
      </Box>
    </motion.div>
  );
}
