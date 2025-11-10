import Box from '@mui/material/Box';
import { contactMeSectionStyles } from './ContactMeSectionStyle.js';
import ContactForm from './ContactForm.jsx';
import Typography from '@mui/material/Typography';

export default function ContactMeSection() {
  return (
    <Box id="contact-me" sx={contactMeSectionStyles.contactMeSection}>
      <ContactForm />
      <Box id="contact-me-info" sx={contactMeSectionStyles.contactMeInfo}>
        <Box id="contact-me-text" sx={contactMeSectionStyles.contactMeText}>
          <Typography variant="displayText_extra_bold">
            Let's talk for <br /> something special
          </Typography>
          <Typography variant="paragraph_p2_regular">
            I seek to push the limits of creativity to create high-engaging, user-friendly, and
            memorable interactive experiences.
          </Typography>
        </Box>
        <Typography variant="heading_h3_semi_bold">
          harishiv8@gmail.com <br />
          +91-7210166265
        </Typography>
      </Box>
    </Box>
  );
}
