import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

export default function ExperienceCard({
  companyLogo,
  jobTitle,
  tenure,
  description,
  children,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Box
        sx={{
          width: '100%',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          backgroundColor: 'colors.surface',
          borderRadius: '12px',
          borderLeft: '3px solid',
          borderLeftColor: 'colors.accent',
          outline: '1px solid',
          outlineColor: 'colors.border',
          transition: 'outline-color 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            outlineColor: 'rgba(99,102,241,0.35)',
            boxShadow: '0 0 32px rgba(99,102,241,0.10)',
          },
        }}
      >
        {/* Header row */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px', alignItems: 'center' }}>
            <Box sx={{ '& svg': { width: '44px', height: 'auto', borderRadius: '6px' } }}>
              {companyLogo}
            </Box>
            <Typography variant="heading_h4_semi_bold" sx={{ color: 'colors.textPrimary' }}>
              {jobTitle}
            </Typography>
          </Box>
          <Typography
            variant="heading_h6_medium"
            sx={{
              color: 'colors.accent',
              whiteSpace: 'nowrap',
              fontSize: '13px',
              letterSpacing: '0.03em',
            }}
          >
            {tenure}
          </Typography>
        </Box>

        {/* Body */}
        <Box sx={{ color: 'colors.textSecondary' }}>
          {children ? (
            children
          ) : (
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {description.map((item, index) => (
                <li key={index} style={{ marginBottom: '6px' }}>
                  <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textSecondary' }}>
                    {item}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
