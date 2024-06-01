import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import Button from '@mui/material/Button';
import { toolbarStyles } from './ToolbarStyles.js';

export default function Toolbar() {
  const toolbarItems = ['About Me', 'Skills', 'Project', 'Contact Me'];

  return (
    <Box id="toolbar" sx={toolbarStyles.container}>
      <Typography variant="h6">Personal</Typography>
      <Box id="toolbar-items" sx={{ display: 'flex', flexDirection: 'row' }}>
        {toolbarItems.map((item) => (
          <Typography key={item} variant="h6" sx={{ mx: 2 }}>
            {item}
          </Typography>
        ))}
      </Box>
      <Button id="toolbar-button" variant="contained">
        Resume
      </Button>
    </Box>
  );
}