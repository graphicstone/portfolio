import Box from '@mui/material/Box';
import { motion } from 'framer-motion';
import {
  SiAndroid,
  SiCss3,
  SiDatadog,
  SiElectron,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiKotlin,
  SiMui,
  SiReact,
  SiRedux,
  SiTypescript,
  SiWebpack,
} from 'react-icons/si';
import {
  FiCloud,
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiMousePointer,
  FiPlay,
  FiServer,
  FiSettings,
  FiShield,
  FiTool,
} from 'react-icons/fi';
import SkillsBadge from './SkillsBadge.jsx';
import MarqueeStrip from '../../../components/marquee/MarqueeStrip.jsx';
import SectionHeading from '../../../components/section-heading/SectionHeading.jsx';

const webSkills = [
  { name: 'React', icon: <SiReact />, color: '#61DAFB' },
  { name: 'Redux', icon: <SiRedux />, color: '#764ABC' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'HTML', icon: <SiHtml5 />, color: '#E34F26' },
  { name: 'CSS', icon: <SiCss3 />, color: '#1572B6' },
  { name: 'Jest', icon: <SiJest />, color: '#C21325' },
  { name: 'Playwright', icon: <FiPlay /> },
  { name: 'Webpack', icon: <SiWebpack />, color: '#8DD6F9' },
  { name: 'Electron', icon: <SiElectron />, color: '#47848F' },
  { name: 'MSW', icon: <FiShield /> },
];

const mobileAndToolsSkills = [
  { name: 'Android', icon: <SiAndroid />, color: '#3DDC84' },
  { name: 'Flutter', icon: <SiFlutter />, color: '#02569B' },
  { name: 'Kotlin', icon: <SiKotlin />, color: '#7F52FF' },
  { name: 'Coroutines', icon: <FiCpu /> },
  { name: 'Dagger (DI)', icon: <FiTool /> },
  { name: 'Jetpack', icon: <FiCloud /> },
  { name: 'MVVM', icon: <FiLayers /> },
  { name: 'Bloc', icon: <FiGitBranch /> },
  { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
  { name: 'Git', icon: <SiGit />, color: '#F05032' },
  { name: 'RESTful APIs', icon: <FiServer /> },
  { name: 'CI/CD', icon: <FiSettings /> },
  { name: 'Material UI', icon: <SiMui />, color: '#007FFF' },
  { name: 'Datadog', icon: <SiDatadog />, color: '#632CA6' },
  { name: 'App Engine', icon: <FiCloud /> },
  { name: 'Cursor', icon: <FiMousePointer /> },
];

export default function SkillsSection() {
  const renderBadge = (s, i) => (
    <SkillsBadge key={`${s.name}-${i}`} name={s.name} icon={s.icon} brandColor={s.color} />
  );

  return (
    <Box
      id="skills"
      sx={{
        width: '100%',
        padding: { xs: '80px 0', md: '120px 0' },
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
        overflow: 'hidden',
        scrollMarginTop: '64px',
      }}
    >
      <Box sx={{ px: { xs: '16px', md: '80px' } }}>
        <SectionHeading label="Expertise" title="My" accent="Skills" />
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <MarqueeStrip items={webSkills.map(renderBadge)} speed={40} />
          <MarqueeStrip items={mobileAndToolsSkills.map(renderBadge)} speed={32} reverse />
        </Box>
      </motion.div>
    </Box>
  );
}
