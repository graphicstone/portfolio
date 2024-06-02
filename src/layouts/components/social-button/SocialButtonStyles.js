import { colorPalette } from '../../ColorPalette.js';

export const socialButtonStyles = {
  container: {
    height: '56px',
    width: '56px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #000000',
    borderRadius: '8px',
    cursor: 'pointer',
    '& svg': {
      width: 'auto',
      height: '32px'
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