import { colorPalette } from '../../config/ColorPalette.js';

export const socialButtonStyles = {
  container: {
    height: '56px',
    width: '56px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    cursor: 'pointer',
    '& svg': {
      width: 'auto',
      height: '32px',
      fill: colorPalette.white,
    },
    '&:hover': {
      backgroundColor: colorPalette.black,
      color: colorPalette.white,
      '& svg': {
        fill: colorPalette.white
      }
    }
  }
};
