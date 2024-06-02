import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import { toolbarStyles } from './ToolbarStyles.js';
import Menu from '../../../../assets/svg/ic_menu.svg?react';
import Download from '../../../../assets/svg/ic_download.svg?react';
import { Drawer, List, ListItem, ListItemButton } from '@mui/material';

export default function Toolbar() {
  const toolbarItems = ['About Me', 'Skills', 'Projects', 'Contact Me'];
  const [drawerState, setDrawerState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {toolbarItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <Box
                id="drawer-items"
                sx={{ cursor: 'pointer', width: '100%' }}
                onClick={() => {
                  const element = document.getElementById(item.toLowerCase().replace(' ', '-'));
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Typography variant="paragraph_p2_regular">{item}</Typography>
              </Box>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box id="toolbar" sx={toolbarStyles.container}>
      <Typography variant="h6">Personal</Typography>
      <Box id="toolbar-items" sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row', gap: '24px' }}>
        {toolbarItems.map((item) => (
          <Box
            id="toolbar-item"
            key={item}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            onClick={() => {
              const element = document.getElementById(item.toLowerCase().replace(' ', '-'));
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Typography key={item} variant="h6">
              {item}
            </Typography>
          </Box>
        ))}
      </Box>
      <Button
        id="toolbar-button"
        variant="contained"
        endIcon={<Download />}
        sx={{
          textTransform: 'none',
          display: { xs: 'none', md: 'flex' },
          color: 'colors.white',
          backgroundColor: 'colors.black'
        }}
        onClick={() => {
          window.open('https://drive.google.com/file/d/1Wq0hp1qiY5gYM-pCes0-TIX_apt3KC9k/view', '_blank');
        }}
      >
        Resume
      </Button>
      <Box
        id="toolbar-menu"
        sx={{ display: { xs: 'flex', md: 'none' } }}
        onClick={toggleDrawer(true)}
      >
        <Menu />
      </Box>
      <Drawer
        anchor="right"
        open={drawerState}
        onClose={toggleDrawer(false)}
      >
        {drawerList()}
      </Drawer>
    </Box>
  );
}