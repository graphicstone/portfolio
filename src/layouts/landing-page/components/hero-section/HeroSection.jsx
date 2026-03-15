import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion } from 'framer-motion';
import Medium from '../../../../assets/svg/social/medium.svg?react';
import GitHub from '../../../../assets/svg/social/github.svg?react';
import LinkedIn from '../../../../assets/svg/social/linkedIn.svg?react';
import Stackoverflow from '../../../../assets/svg/social/stackoverflow.svg?react';
import SocialButton from '../../../components/social-button/SocialButton.jsx';
import Download from '../../../../assets/svg/ic_download.svg?react';
import Galaxy from '../../../../components/Galaxy/Galaxy.jsx';
import DecryptedText from '../../../../components/DecryptedText/DecryptedText.jsx';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  return (
    <Box
      id="hero-section"
      sx={{
        width: '100%',
        minHeight: '100vh',
        padding: { xs: '100px 16px 80px', md: '0 80px' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Galaxy background */}
      <Galaxy
        transparent={true}
        hueShift={240}
        density={1.2}
        glowIntensity={0.25}
        saturation={1.5}
        speed={0.6}
        rotationSpeed={0.02}
        twinkleIntensity={0.4}
        mouseInteraction={true}
        mouseRepulsion={false}
        style={{ position: 'absolute', inset: 0, zIndex: 0 }}
      />

      {/* Left-side text protection fade */}
      <Box
        sx={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: { xs: '100%', md: '55%' },
          background: {
            xs: 'rgba(10,10,10,0.75)',
            md: 'linear-gradient(to right, rgba(10,10,10,0.92) 50%, transparent 100%)',
          },
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content — zIndex 2 above Galaxy and fade */}
      <motion.div variants={container} initial="hidden" animate="visible" style={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: '28px', md: '36px' },
            maxWidth: '860px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Overline */}
          <motion.div variants={item}>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'colors.accent',
              }}
            >
              Senior Frontend Engineer · 7 Years
            </Typography>
          </motion.div>

          {/* Name */}
          <motion.div variants={item}>
            <Box
              sx={{
                fontSize: { xs: 'clamp(52px, 14vw, 80px)', md: 'clamp(64px, 8vw, 96px)' },
                fontWeight: 900,
                lineHeight: 0.92,
                letterSpacing: '-0.03em',
                color: 'colors.textPrimary',
              }}
            >
              <DecryptedText
                text="Harishiv"
                animateOn="view"
                sequential={true}
                revealDirection="start"
                speed={45}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
              />
              <br />
              <DecryptedText
                text="Singh."
                animateOn="view"
                sequential={true}
                revealDirection="start"
                speed={45}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
              />
            </Box>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={item}>
            <Typography
              variant="paragraph_p2_regular"
              sx={{
                color: 'colors.textSecondary',
                maxWidth: '500px',
                lineHeight: 1.75,
                fontSize: '17px',
              }}
            >
              I build scalable, performant products across web, desktop and mobile — React,
              TypeScript, Electron and Flutter. Turning complex problems into polished experiences.
            </Typography>
          </motion.div>

          {/* CTA + Socials */}
          <motion.div variants={item}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: '24px',
              }}
            >
              <Button
                variant="contained"
                endIcon={<Download />}
                onClick={() => window.open('/resume.pdf', '_blank')}
                sx={{
                  textTransform: 'none',
                  backgroundColor: 'colors.accent',
                  color: '#fff',
                  borderRadius: '8px',
                  padding: '12px 28px',
                  fontWeight: 600,
                  fontSize: '15px',
                  transition: 'all 0.25s ease',
                  boxShadow: 'none',
                  '&:hover': {
                    backgroundColor: '#4F46E5',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(99,102,241,0.35)',
                  },
                }}
              >
                Download Resume
              </Button>

              <Box sx={{ display: 'flex', gap: '12px' }}>
                <SocialButton icon={<GitHub />} link="https://github.com/graphicstone/" />
                <SocialButton icon={<LinkedIn />} link="https://www.linkedin.com/in/harishiv-singh" />
                <SocialButton icon={<Medium />} link="https://medium.com/@graphicstone" />
                <SocialButton
                  icon={<Stackoverflow />}
                  link="https://stackoverflow.com/users/7810174/graphicstone"
                />
              </Box>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
}
