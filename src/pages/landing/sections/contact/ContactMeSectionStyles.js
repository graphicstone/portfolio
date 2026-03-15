export const contactMeSectionStyles = {
  contactMeForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
    '& .MuiTextField-root': {
      '& .MuiOutlinedInput-root': {
        backgroundColor: '#111111',
        borderRadius: '8px',
        '& fieldset': { borderColor: '#1E1E1E' },
        '&:hover fieldset': { borderColor: '#6366F1' },
        '&.Mui-focused fieldset': { borderColor: '#6366F1' },
      },
      '& .MuiInputLabel-root': { color: '#71717A' },
      '& .MuiInputLabel-root.Mui-focused': { color: '#6366F1' },
      '& .MuiOutlinedInput-input': { color: '#F5F5F5' },
      '& .MuiFormHelperText-root': { color: '#EF4444' },
    },
  },
  contactMeFormActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  getInTouchButton: {
    textTransform: 'none',
    backgroundColor: '#6366F1',
    color: '#fff',
    borderRadius: '8px',
    padding: '12px 28px',
    fontWeight: 600,
    '&:hover': {
      backgroundColor: '#4F46E5',
      boxShadow: '0 8px 24px rgba(99,102,241,0.3)',
    },
  },
};
