import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import SectionHeading from '../../../../components/section-heading/SectionHeading.jsx';

const stats = [
  { value: '7+', label: 'Years of\nExperience' },
  { value: '3', label: 'Platforms\nWeb · Mobile · Desktop' },
  { value: '10+', label: 'Products\nShipped' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const statVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function AboutMeSection() {
  return (
    <Box
      id="about-me"
      sx={{
        width: '100%',
        padding: { xs: '80px 16px', md: '120px 80px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '56px',
        scrollMarginTop: '64px',
      }}
    >
      <SectionHeading label="Background" title="About" accent="Me" />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '48px', md: '80px' },
          alignItems: 'flex-start',
        }}
      >
        {/* Stats column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ flexShrink: 0 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {stats.map((s) => (
              <motion.div key={s.value} variants={statVariant}>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: '52px', md: '64px' },
                      fontWeight: 900,
                      lineHeight: 1,
                      letterSpacing: '-0.03em',
                      color: 'colors.accent',
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography
                    variant="paragraph_p2_regular"
                    sx={{ color: 'colors.textMuted', whiteSpace: 'pre-line', mt: '6px' }}
                  >
                    {s.label}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Bio text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.8, fontSize: '17px' }}
            >
              Senior Frontend Engineer with 7+ years of experience building scalable web, mobile and
              desktop products. I specialise in React/TypeScript and Electron on the web/desktop
              side, and Flutter/Android on mobile. I care deeply about performance, testability, and
              clean, maintainable architectures.
            </Typography>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.8, fontSize: '17px' }}
            >
              Recent work includes leading frontend architecture for an AI creative platform (React,
              Redux, Electron), designing a timeline video editor SDK, and delivering cross-platform
              apps with secure IPC and caching for fast cold/warm loads.
            </Typography>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.8, fontSize: '17px' }}
            >
              I enjoy turning complex product problems into polished experiences and collaborating
              across design, product, and platform teams to ship reliable features quickly.
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
