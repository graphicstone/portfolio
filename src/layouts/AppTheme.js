import { createTheme } from '@mui/material';
import { colorPalette } from './ColorPalette';
import { FontsEnum } from '../constants/FontsEnum.ts';

/*
  FONT WEIGHTS MAPPING
  --------------------
  light     | 300
  regular   | 400
  medium    | 500
  semi-bold | 600
  bold      | 700
 */

const appThemeWithoutCustomStyles = createTheme({
  spacing: 8,
  breakpoints: {
    keys: [
      'xs',
      'mm',
      'sm',
      'md',
      'mobileUi',
      'lg',
      'xl',
      'xxl'
    ],
    values: {
      xs: 0,
      mm: 375,
      sm: 600,
      md: 900,
      mobileUi: 1080,
      lg: 1200,
      xl: 1440,
      xxl: 1700
    },
    unit: 'px'
  },
  palette: {
    background: {
      default: colorPalette.white
    },
    text: {
      primary: colorPalette.black
    },
    primary: {
      main: colorPalette.neutral
    },
    colors: {
      ...colorPalette
    }
  },
  typography: {
    fontFamily: FontsEnum.SORA,
    scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          displayText_regular: 'p',
          displayText_medium: 'p',
          displayText_bold: 'p',
          displayText_extra_bold: 'p',

          paragraph_p2_regular: 'p',
          paragraph_p2_medium: 'p',
          paragraph_p2_bold: 'p',
          paragraph_p2_extra_bold: 'p',

          heading_h2_regular: 'p',
          heading_h2_medium: 'p',
          heading_h2_bold: 'p',
          heading_h2_extra_bold: 'p',

          heading_h3_regular: 'p',
          heading_h3_medium: 'p',
          heading_h3_bold: 'p',
          heading_h3_semi_bold: 'p',
          heading_h3_extra_bold: 'p',

          heading_h4_regular: 'p',
          heading_h4_medium: 'p',
          heading_h4_bold: 'p',
          heading_h4_semi_bold: 'p',
          heading_h4_extra_bold: 'p',

          heading_h5_regular: 'p',
          heading_h5_medium: 'p',
          heading_h5_bold: 'p',
          heading_h5_extra_bold: 'p',

          heading_h6_regular: 'p',
          heading_h6_medium: 'p',
          heading_h6_bold: 'p',
          heading_h6_semi_bold: 'p',
          heading_h6_extra_bold: 'p'
        }
      }
    }
  }
});

const appTheme = createTheme(appThemeWithoutCustomStyles, {
  typography: {
    // displayText
    displayText_regular: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400,
      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '28px',
        lineHeight: '32px'
      }
    },

    displayText_medium: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500,
      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '28px',
        lineHeight: '32px'
      }
    },

    displayText_bold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700,
      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '28px',
        lineHeight: '32px'
      }
    },

    displayText_extra_bold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900,
      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '28px',
        lineHeight: '32px'
      }
    },

    // paragraph_p2
    paragraph_p2_regular: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    paragraph_p2_medium: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    paragraph_p2_bold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },

    paragraph_p2_extra_bold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900
    },

    // heading_h2
    heading_h2_regular: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    heading_h2_medium: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    heading_h2_bold: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },

    heading_h2_extra_bold: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900
    },

    // heading_h3
    heading_h3_regular: {
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    heading_h3_medium: {
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    heading_h3_semi_bold: {
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },

    heading_h3_bold: {
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },

    heading_h3_extra_bold: {
      fontSize: '28px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900
    },

    // heading_h4
    heading_h4_regular: {
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    heading_h4_medium: {
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    heading_h4_semi_bold: {
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },

    heading_h4_bold: {
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },

    heading_h4_extra_bold: {
      fontSize: '24px',
      lineHeight: '28px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900
    },

    // heading_h5
    heading_h5_regular: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    heading_h5_medium: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    heading_h5_bold: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },

    heading_h5_extra_bold: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900
    },

    // heading_h6
    heading_h6_regular: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    heading_h6_medium: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    heading_h6_semi_bold: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },

    heading_h6_bold: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },

    heading_h6_extra_bold: {
      fontSize: '16px',
      lineHeight: '20px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900
    }
  }
});

export default appTheme;
