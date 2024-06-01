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
      primary: colorPalette.light4
    },
    primary: {
      main: '#0D1F39'
    },
    colors: {
      ...colorPalette
    }
  },
  typography: {
    fontFamily: FontsEnum.SORA,
    skHeight: '1em',
    scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)'
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the custom variant to render a <h1> by default
          d1_light: 'h1',
          d1_regular: 'h1',
          d1_bold: 'h1',

          // Map the custom variant to render a <h2> by default
          d2_light: 'h2',
          d2_regular: 'h2',
          d2_bold: 'h2',

          // Map the custom variant to render a <h3> by default
          d3_light: 'h3',
          d3_regular: 'h3',
          d3_bold: 'h3',

          // Map the custom variant to render a <h4> by default
          h1_regular: 'h4',
          h1_medium: 'h4',
          h1_bold: 'h4',

          // Map the custom variant to render a <h5> by default
          h2_regular: 'h5',
          h2_medium: 'h5',
          h2_bold: 'h5',

          // Map the custom variant to render a <h6> by default
          t1_regular: 'h6',
          t1_medium: 'h6',
          t1_bold: 'h6',

          // Map the custom variant to render a <p> by default
          body1: 'p',
          t2_medium: 'p',
          t2_bold: 'p',

          b1_regular: 'p',
          b1_medium: 'p',
          b1_bold: 'p',

          b2_regular: 'p',
          b2_medium: 'p',
          b2_bold: 'p',

          b2_caption: 'p',
          b2_caption_medium: 'p',
          b2_caption_bold: 'p',

          numbers: 'p',

          tooltip_regular: 'p',
          tooltip_medium: 'p',
          tooltip_bold: 'p',

          displayText_regular: 'p',
          displayText_medium: 'p',
          displayText_bold: 'p',
          displayText_extra_bold: 'p',

          paragraph_p2_regular: 'p',
          paragraph_p2_medium: 'p',
          paragraph_p2_bold: 'p',
          paragraph_p2_extra_bold: 'p',

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
          heading_h6_extra_bold: 'p',

          nd1: 'p',
          nd2: 'p',
          nd3: 'p',
          np1: 'p',
          np2: 'p',
          np3: 'p',
          ns1: 'p',
          ns2: 'p',
          nl1: 'p',
          nl2: 'p',
          nt: 'p',

          input_label: 'p',
          info_text: 'p',
          alert_header: 'p'
        }
      }
    }
  }
});

const appTheme = createTheme(appThemeWithoutCustomStyles, {
  typography: {
    //
    // DESIGN SYSTEM UPDATE
    //

    // displayText
    displayText_regular: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    displayText_medium: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    displayText_bold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },

    displayText_extra_bold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 900
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
    },

    // D1
    d1_light: {
      fontSize: '96px',
      lineHeight: '112px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 200
    },
    d1_regular: {
      fontSize: '96px',
      lineHeight: '112px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    d1_bold: {
      fontSize: '96px',
      lineHeight: '112px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 800
    },

    // D2
    d2_light: {
      fontSize: '56px',
      lineHeight: '64px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 200
    },
    d2_regular: {
      fontSize: '56px',
      lineHeight: '64px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    d2_bold: {
      fontSize: '56px',
      lineHeight: '64px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 800
    },

    // D3
    d3_light: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 200,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '32px'
      }
    },
    d3_regular: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '32px'
      }
    },
    d3_bold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 800,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '32px'
      }
    },

    // H1
    h1_regular: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '0.25px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '24px'
      }
    },
    h1_medium: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '0.25px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '24px'
      }
    },
    h1_bold: {
      fontSize: '32px',
      lineHeight: '40px',
      letterSpacing: '0.25px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 600,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '24px'
      }
    },

    // H2
    h2_regular: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '16px'
      }
    },
    h2_medium: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    h2_bold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },

    // T1
    t1_regular: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '16px'
      }
    },
    t1_medium: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '16px'
      }
    },
    t1_bold: {
      fontSize: '20px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 600,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '16px'
      }
    },

    // body1
    body1: {
      fontSize: '16px',
      lineHeight: '1.5em', // 24px
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '14px'
      }
    },

    // T2
    t2_regular: {
      fontSize: '16px',
      lineHeight: '1.5em', // 24px
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '14px'
      }
    },
    t2_medium: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '14px'
      }
    },
    t2_bold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 600,

      [appThemeWithoutCustomStyles.breakpoints.down('md')]: {
        fontSize: '14px'
      }
    },

    // B1
    b1_regular: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.1px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },
    b1_medium: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.1px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    b1_bold: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },

    // B2
    b2_regular: {
      fontFamily: FontsEnum.SORA,
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '14px',
      textAlign: 'left'
    },
    b2_medium: {
      fontFamily: FontsEnum.SORA,
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '14px',
      textAlign: 'left'
    },
    b2_bold: {
      fontFamily: FontsEnum.SORA,
      fontSize: '12px',
      fontWeight: 600,
      lineHeight: '14px',
      textAlign: 'left'
    },

    b2_caption: {
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },
    b2_caption_medium: {
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    b2_caption_bold: {
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },
    numbers: {
      fontSize: '12px',
      lineHeight: '16px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },

    // tooltip
    tooltip_regular: {
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },
    tooltip_medium: {
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    tooltip_bold: {
      fontSize: '10px',
      lineHeight: '14px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },

    // NUMBERS
    nd1: {
      fontSize: '40px',
      lineHeight: '52.75px',
      letterSpacing: '0.17px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },
    nd2: {
      fontSize: '32px',
      lineHeight: '42.2px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },
    nd3: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    np1: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.17px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 700
    },
    np2: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.17px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    np3: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.17px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },
    ns1: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    ns2: {
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: 0,
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },
    nl1: {
      fontSize: '10px',
      lineHeight: '16px',
      letterSpacing: '-0.2px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 500
    },
    nl2: {
      fontSize: '10px',
      lineHeight: '16px',
      letterSpacing: '-0.2px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },
    nt: {
      fontSize: '8px',
      lineHeight: '12px',
      letterSpacing: '-0.2px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 400
    },

    button: {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA,
      fontWeight: 600
    },

    input_label: {
      fontSize: '12px',
      fontWeight: 500,
      lineHeight: '24px',
      letterSpacing: '0.1px',
      fontFamily: FontsEnum.SORA
    },
    info_text: {
      fontSize: '12px',
      fontWeight: 400,
      lineHeight: '24px',
      fontFamily: FontsEnum.SORA
    },
    alert_header: {
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '0.15px',
      fontFamily: FontsEnum.SORA
    }

    //
    // DESIGN SYSTEM UPDATE END
    //
  }
});

export default appTheme;
