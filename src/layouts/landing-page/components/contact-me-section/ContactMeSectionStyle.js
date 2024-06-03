export const contactMeSectionStyles = {
  contactMeSection: {
    width: '100%',
    padding: { xs: '40px 16px', md: '60px 80px' },
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    alignItems: { xs: 'flex-start', md: 'center' },
    gap: '48px'
  },
  contactMeInfo: { display: 'flex', flexDirection: 'column', gap: '40px' },
  contactMeForm: {
    display: 'flex', flexDirection: 'column', gap: '20px', width: '100%'
  },
  contactMeFormActions: {
    display: 'flex', flexDirection: 'row', gap: '20px'
  },
  contactMeText: {
    display: 'flex', flexDirection: 'column', gap: '20px'
  },
  getInTouchButton: {
    textTransform: 'none',
    color: 'colors.white',
    backgroundColor: 'colors.black'
  }
};