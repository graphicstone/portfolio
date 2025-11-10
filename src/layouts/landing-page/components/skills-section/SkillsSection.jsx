import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { skillsSectionStyles } from './SkillsSectionStyles.js';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SkillsBadge from './SkillsBadge.jsx';
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
  SiWebpack
} from 'react-icons/si';
// Feather placeholders for non-brand concepts/tools
import {
  FiChevronDown,
  FiCloud,
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiMousePointer,
  FiPlay,
  FiServer,
  FiSettings,
  FiShield,
  FiTool
} from 'react-icons/fi';

export default function SkillsSection() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  // Animation variants for staggered reveal
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
  };

  // Data-driven groups
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
    { name: 'MSW', icon: <FiShield /> }
  ];

  const mobileSkills = [
    { name: 'Android', icon: <SiAndroid />, color: '#3DDC84' },
    { name: 'Flutter', icon: <SiFlutter />, color: '#02569B' },
    { name: 'Kotlin', icon: <SiKotlin />, color: '#7F52FF' },
    { name: 'Coroutine', icon: <FiCpu /> },
    { name: 'Dagger (DI)', icon: <FiTool /> },
    { name: 'Jetpack', icon: <FiCloud /> },
    { name: 'MVVM', icon: <FiLayers /> },
    { name: 'Bloc Pattern', icon: <FiGitBranch /> }
  ];

  const toolsSkills = [
    { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
    { name: 'Git', icon: <SiGit />, color: '#F05032' },
    { name: 'RESTful APIs', icon: <FiServer /> },
    { name: 'CI/CD Integration', icon: <FiSettings /> },
    { name: 'Material UI', icon: <SiMui />, color: '#007FFF' },
    { name: 'Datadog', icon: <SiDatadog />, color: '#632CA6' },
    { name: 'App Engine', icon: <FiCloud /> },
    { name: 'Cursor', icon: <FiMousePointer /> }
  ];

  const renderGrid = (items) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <Grid container spacing={2}>
        {items.map((s) => (
          <Grid key={s.name} item xs={6} md={2.4}>
            <motion.div variants={itemVariants}>
              <SkillsBadge name={s.name} icon={s.icon} brandColor={s.color} />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );

  const renderGroup = (title, items) => {
    if (isMdUp) {
      return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Typography variant="heading_h4_bold">{title}</Typography>
          {renderGrid(items)}
        </Box>
      );
    }

    return (
      <Accordion
        disableGutters
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'colors.black',
          borderRadius: '12px',
          '&::before': { display: 'none' }
        }}
      >
        <AccordionSummary expandIcon={<FiChevronDown />} sx={{ px: 2 }}>
          <Typography variant="heading_h4_bold">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ pt: 0, px: 2, pb: 2 }}>{renderGrid(items)}</AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box id="skills" sx={skillsSectionStyles.skillsSection}>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Typography variant="displayText_extra_bold">
          <span style={{ fontWeight: 400 }}>My</span> skills
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: '12px', md: '24px' } }}>
        {renderGroup('Web', webSkills)}
        {renderGroup('Mobile', mobileSkills)}
        {renderGroup('Tools', toolsSkills)}
      </Box>
    </Box>
  );
}
