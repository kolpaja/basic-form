import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import SelectField from './components/SelectField';
import Result from './components/Result';
import './App.css';

const formSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('First Name is Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Last Name is Required'),
  email: Yup.string().email('Invalid email').required('Email is Required'),
  hobbies: Yup.array()
    .min(1, 'Please Select at least 1 hoby')
    .required('At least one hoby is required'),
});

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  hobbies: [],
};

const options = [
  { value: 'coding', label: 'Coding' },
  { value: 'reading', label: 'Reading Books' },
  { value: 'hiking', label: 'Hiking' },
  { value: 'football', label: 'Football' },
];

function App() {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (values, actions) => {
    setIsSubmitted(true);
    setFormData(values);
    console.log(values);
    actions.setSubmitting(false);
    actions.resetForm();
  };

  useEffect(() => {}, [isSubmitted]);

  return (
    <div className='container'>
      <h1 className='title'>Basic Form</h1>
      <section className='section'>
        <div className='form d-flex flex-column justify-content-around'>
          <Formik
            initialValues={initialValues}
            validationSchema={formSchema}
            onSubmit={(values, actions) => handleSubmit(values, actions)}
          >
            {({ errors, touched, isSubmitting }) => {
              return (
                <Form>
                  <div
                    className={`${
                      errors.firstName && touched.firstName ? 'has-error' : ''
                    } form-group`}
                  >
                    <label className='control-label'>First Name</label>
                    <Field
                      type='text'
                      name='firstName'
                      placeholder='Alban'
                      error={errors.firstName && touched.firstName}
                      className='form-control form-control-lg'
                    />
                    <div className='text-danger'>
                      <ErrorMessage name='firstName' />
                    </div>
                  </div>

                  <div
                    className={`${
                      errors.lastName && touched.lastName ? 'has-error' : ''
                    } form-group`}
                  >
                    <label className='control-label'>Last Name</label>
                    <Field
                      name='lastName'
                      type='text'
                      placeholder='Hoxha'
                      error={errors.lastName && touched.lastName}
                      className='form-control form-control-lg font-weight-bold'
                    />
                    <div className='text-danger'>
                      <ErrorMessage name='lastName' />
                    </div>
                  </div>

                  <div
                    className={`${
                      errors.email && touched.email ? 'has-error' : ''
                    } form-group`}
                  >
                    <label className='control-label'>E-mail</label>
                    <Field
                      name='email'
                      type='email'
                      placeholder='asd@asd.asd'
                      className='form-control form-control-lg'
                      error={errors.email && touched.email}
                    />
                    <div className='text-danger'>
                      <ErrorMessage name='email' />
                    </div>
                  </div>

                  <div
                    className={`${
                      errors.hobbies ? 'has-error' : ''
                    } form-group`}
                  >
                    <label className='control-label'>Hobbies</label>
                    <Field
                      name={'hobbies'}
                      component={SelectField}
                      isMulti
                      placeholder='Select hobbies...'
                      error={errors.hobbies && touched.hobbies}
                      options={options}
                    />

                    <div className='text-danger'>
                      <ErrorMessage name='hobbies' />
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='btn btn-lg btn-primary'
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
        <div className='result'>
          <Result
            isSubmitted={isSubmitted}
            data={formData}
            handleClose={() => setIsSubmitted(false)}
          />
        </div>
      </section>
    </div>
  );
}

export default App;
