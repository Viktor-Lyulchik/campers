import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputDate from '../InputDate/InputDate';
import css from './BookingForm.module.css';
import CampButton from '../CampButton/CampButton';

export default function BookingForm() {
  const initialValues = {
    name: '',
    email: '',
    bookingDate: null as Date | null,
    comment: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    bookingDate: Yup.date().required('Booking date is required'),
    comment: Yup.string(),
  });

  const onSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    toast.success('Your campervan booking is submitted!');
    formikHelpers.resetForm();
  };

  return (
    <div className={css.container}>
      <h3 className={css.title}>Book your campervan now</h3>
      <p className={css.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue, setFieldTouched, values, touched, errors }) => (
          <Form className={css.form}>
            <Field name="name" placeholder="Name*" className={css.input} />
            <ErrorMessage name="name" component="div" className={css.error} />

            <Field
              name="email"
              type="email"
              placeholder="Email*"
              className={css.input}
            />
            <ErrorMessage name="email" component="div" className={css.error} />

            <InputDate
              name="bookingDate"
              value={values.bookingDate}
              onChange={date => {
                setFieldValue('bookingDate', date);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setFieldTouched('bookingDate', true, true);
                }, 0);
              }}
              touched={touched.bookingDate}
              error={errors.bookingDate}
            />
            {touched.bookingDate && errors.bookingDate && (
              <div className={css.error}>{errors.bookingDate}</div>
            )}

            <Field
              name="comment"
              as="textarea"
              placeholder="Comment"
              className={css.textarea}
            />

            <CampButton type="submit" textBtn="Send"></CampButton>
          </Form>
        )}
      </Formik>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
