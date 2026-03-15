import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import SectionHeading from '../../../../components/section-heading/SectionHeading.jsx';
import ContactForm from './ContactForm.jsx';

export default function ContactMeSection() {
  const copyEmail = () => {
    navigator.clipboard.writeText('harishiv8@gmail.com').then(() => {
      toast('Email copied to clipboard!', { theme: 'dark' });
    });
  };

  return (
    <Box
      id="contact-me"
      sx={{
        width: '100%',
        padding: { xs: '80px 16px', md: '120px 80px' },
        display: 'flex',
        flexDirection: 'column',
        gap: '56px',
        scrollMarginTop: '64px',
      }}
    >
      <SectionHeading label="Get In Touch" title="Let's" accent="Talk." />

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '48px', md: '80px' },
        }}
      >
        {/* Left — info */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ flexShrink: 0, maxWidth: '320px' }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Typography
              variant="paragraph_p2_regular"
              sx={{ color: 'colors.textSecondary', lineHeight: 1.75 }}
            >
              I seek to push the limits of creativity to create high-engaging, user-friendly, and
              memorable interactive experiences.
            </Typography>

            {/* Clickable email — copies to clipboard */}
            <Box
              onClick={copyEmail}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                padding: '12px 20px',
                border: '1px solid',
                borderColor: 'colors.border',
                borderRadius: '8px',
                backgroundColor: 'colors.surface',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'colors.accent',
                  backgroundColor: 'colors.accentMuted',
                },
              }}
            >
              <Typography variant="heading_h6_medium" sx={{ color: 'colors.textPrimary' }}>
                harishiv8@gmail.com
              </Typography>
              <Typography sx={{ color: 'colors.textMuted', fontSize: '12px', whiteSpace: 'nowrap' }}>
                click to copy
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ flex: 1 }}
        >
          <ContactForm />
        </motion.div>
      </Box>
    </Box>
  );
}
