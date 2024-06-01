export const heroSectionStyles = {
  heroSection: {
    width: '100%',
    height: 'calc(100vh - 84px)', // 84px is the height of the toolbar
    padding: '60px 80px',
    display: 'flex',
    position: 'relative',
    alignItems: 'flex-end'
  },
  heroContent: {
    width: '45vw',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '32px',
    gap: '48px'
  },
  heroImage: {
    display: 'flex',
    position: 'absolute',
    bottom: '80px',
    right: '60px',
    '& svg': { width: '60vw', height: 'auto' }
  }
};