import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import { toolbarStyles } from './ToolbarStyles.js';
import Menu from '../../../../assets/svg/ic_menu.svg?react';

export default function Toolbar() {
  const toolbarItems = ['About Me', 'Skills', 'Project', 'Contact Me'];

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
      <Box id="toolbar-menu" sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Menu />
      </Box>
    </Box>
  );
}