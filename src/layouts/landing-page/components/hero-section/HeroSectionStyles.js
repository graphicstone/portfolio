export const heroSectionStyles = {
  heroSection: {
    width: '100%',
    height: { xs: 'auto', md: 'calc(100vh - 84px)' }, // 84px is the height of the toolbar
    padding: { xs: '40px 16px', md: '60px 80px' },
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: '48px',
    scrollMarginTop: { xs: '72px', md: '84px' }
  },
  heroContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: { xs: '0', md: '32px' },
    gap: '48px'
  },
  heroImage: {
    display: 'flex',
    position: { xs: 'initial', md: 'absolute' },
    bottom: { xs: 'auto', md: '80px' },
    top: { xs: '40px', md: 'auto' },
    right: { xs: '16px', md: '40px' },
    left: { xs: '16px', md: 'auto' },
    '& svg': { width: { xs: '100%', md: '60vw' }, height: 'auto' }
  }
};
