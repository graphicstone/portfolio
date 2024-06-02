import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import { toolbarStyles } from './ToolbarStyles.js';
import Menu from '../../../../assets/svg/ic_menu.svg?react';
import { Drawer, List, ListItem, ListItemButton } from '@mui/material';

export default function Toolbar() {
  const toolbarItems = ['About Me', 'Skills', 'Project', 'Contact Me'];
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
        {toolbarItems.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <Typography variant="paragraph_p2_regular">{text}</Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box id="toolbar" sx={toolbarStyles.container}>
      <Typography variant="h6">Personal</Typography>
      <Box id="toolbar-items" sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'row' }}>
        {toolbarItems.map((item) => (
          <Typography key={item} variant="h6" sx={{ mx: 2 }}>
            {item}
          </Typography>
        ))}
      </Box>
      <Button
        id="toolbar-button"
        variant="contained"
        sx={{ display: { xs: 'none', md: 'flex' } }}>
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