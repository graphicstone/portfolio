import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

export default function ProjectsCard({ index, name, description, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        onClick={() => window.open(link, '_blank')}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '12px',
          border: '1px solid',
          borderColor: 'colors.border',
          backgroundColor: 'colors.surface',
          minHeight: { xs: '180px', md: '220px' },
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
          '&:hover': { borderColor: 'colors.accent' },
          '&:hover .card-overlay': { opacity: 1, transform: 'translateY(0)' },
          '&:hover .card-index': { opacity: 0.02 },
        }}
      >
        {/* Faint background index number */}
        <Typography
          className="card-index"
          sx={{
            position: 'absolute',
            top: '16px',
            left: '20px',
            fontSize: '96px',
            fontWeight: 900,
            color: 'colors.textPrimary',
            lineHeight: 1,
            opacity: 0.05,
            transition: 'opacity 0.3s ease',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          {index}
        </Typography>

        {/* Default state — project name at bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '20px',
            left: '24px',
            right: '24px',
            zIndex: 1,
          }}
        >
          <Typography
            variant="heading_h3_bold"
            sx={{ color: 'colors.textPrimary', lineHeight: 1.2 }}
          >
            {name}
          </Typography>
        </Box>

        {/* Hover overlay */}
        <Box
          className="card-overlay"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            backgroundColor: 'colors.accent',
            opacity: 0,
            transform: 'translateY(8px)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '28px',
            gap: '12px',
          }}
        >
          <Typography variant="heading_h4_bold" sx={{ color: '#fff' }}>
            {name}
          </Typography>
          <Typography
            variant="paragraph_p2_regular"
            sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.65 }}
          >
            {description}
          </Typography>
          <Typography
            sx={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              mt: '4px',
            }}
          >
            View on GitHub →
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
