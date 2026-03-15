import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Drawer, List, ListItem, ListItemButton } from '@mui/material';
import { FiMenu, FiDownload } from 'react-icons/fi';
import { useScrolled } from '../../../hooks/useScrolled.js';

export default function Toolbar() {
  const toolbarItems = ['About Me', 'Skills', 'Projects', 'Contact Me'];
  const [drawerState, setDrawerState] = React.useState(false);
  const scrolled = useScrolled(20);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerState(open);
  };

  const scrollTo = (label) => {
    const id = label.toLowerCase().replace(' ', '-');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const drawerList = () => (
    <Box
      sx={{ width: 260, backgroundColor: 'colors.surface', height: '100%', p: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {toolbarItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton onClick={() => scrollTo(item)} sx={{ borderRadius: '8px' }}>
              <Typography variant="paragraph_p2_regular" sx={{ color: 'colors.textPrimary' }}>
                {item}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      id="toolbar"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: { xs: '0 16px', md: '0 80px' },
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.75)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: '1px solid',
        borderBottomColor: scrolled ? 'rgba(30, 30, 30, 0.8)' : 'transparent',
      }}
    >
      {/* Logo */}
      <Typography
        variant="heading_h5_bold"
        onClick={() => document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' })}
        sx={{
          cursor: 'pointer',
          color: 'colors.textPrimary',
          letterSpacing: '-0.01em',
          userSelect: 'none',
        }}
      >
        HS.
      </Typography>

      {/* Desktop nav links */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '36px' }}>
        {toolbarItems.map((item) => (
          <Typography
            key={item}
            variant="heading_h6_medium"
            onClick={() => scrollTo(item)}
            sx={{
              cursor: 'pointer',
              color: 'colors.textSecondary',
              transition: 'color 0.2s ease',
              '&:hover': { color: 'colors.textPrimary' },
            }}
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Resume CTA */}
      <Button
        variant="outlined"
        endIcon={<FiDownload />}
        sx={{
          display: { xs: 'none', md: 'flex' },
          textTransform: 'none',
          color: 'colors.textPrimary',
          borderColor: 'colors.border',
          borderRadius: '8px',
          padding: '8px 20px',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'colors.accent',
            color: 'colors.accent',
            backgroundColor: 'colors.accentMuted',
          },
        }}
        onClick={() => window.open('/resume.pdf', '_blank')}
      >
        Resume
      </Button>

      {/* Mobile hamburger */}
      <Box
        sx={{ display: { xs: 'flex', md: 'none' }, cursor: 'pointer' }}
        onClick={toggleDrawer(true)}
      >
        <FiMenu style={{ color: '#F5F5F5', width: '22px', height: '22px' }} />
      </Box>

      <Drawer
        anchor="right"
        open={drawerState}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { backgroundColor: 'colors.surface' } }}
      >
        {drawerList()}
      </Drawer>
    </Box>
  );
}
