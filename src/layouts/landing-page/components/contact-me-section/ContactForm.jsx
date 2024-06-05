import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Formik } from 'formik';
import { contactMeSectionStyles } from './ContactMeSectionStyle.js';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase.js';
import { toast } from 'react-toastify';

export default function ContactForm() {
  return (
    <Formik
      initialValues={{ name: '', email: '', website: '', message: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Email cannot be empty';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        await setDoc(doc(db, 'feedback', values?.email), {
          name: values?.name,
          website: values?.website,
          message: values?.message
        }).then((data) => {
          toast('Feedback submitted successfully 🥳', { theme: 'dark' });
        }).catch((error) => {
          toast('Error submitting feedback 😢', { theme: 'dark' });
        });
      }}
    >{({
      values,
      errors,
      touched,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    }) => (
      <Box
        id="contact-me-form"
        component="form"
        sx={contactMeSectionStyles.contactMeForm}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="name-input"
          name="name"
          label="Your name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          id="email-input"
          name="email"
          label="Your name"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!(errors.email && touched.email && errors.email)}
          helperText={errors.email && touched.email && errors.email}
        />
        <TextField
          id="website-input"
          name="website"
          label="Your website (if exists)"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          id="message-input"
          name="message"
          label="How can I help you?"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          multiline
          rows={4}
        />
        <Box id="contact-me-form-actions" sx={contactMeSectionStyles.contactMeFormActions}>
          <Button
            variant="contained"
            disabled={isSubmitting}
            onClick={(e) => handleSubmit(e)}
            sx={contactMeSectionStyles.getInTouchButton}
          >
            Get In Touch
          </Button>
        </Box>
      </Box>
    )}
    </Formik>
  );
}