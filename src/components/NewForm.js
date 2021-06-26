import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik';
import React from 'react';
import './LevForm.scss'
import * as Yup from 'yup';
import ErorText from './ErorText';

const initialValues = {
    name: '',
    lastname: '',
    email: '',
    comments: '',
    address: '',
    social: {
        facebook: '',
        instagram: ''
    },
    phonenumbers: ['', ''],
    phNumbers: ['']
}
const onSubmit = values => {
    console.log("submit value", values);
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required("შევსება აუცილებელია"),
    lastname: Yup.string()
        .required("შევსება აუცილებელია"),
    email: Yup.string()
        .email("email invalid")
        .required("შევსება აუცილებელია")
})

console.log("validate scheme");

const NewForm = () => {

    // console.log("Formik Erors:", formik.errors);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}>

            <Form className='form'>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <Field
                        type="text"
                        id="name"
                        name="name"
                    />
                    <ErrorMessage name='name' component={ErorText} />
                </div>
                <div className="form-control">
                    <label htmlFor="lastname">Lastaname</label>
                    <Field
                        type="text"
                        id="lastname"
                        name="lastname"
                    />
                    <ErrorMessage name='lastname'>
                        {(ErorText) => <div className='error'>{ErorText}</div>}
                    </ErrorMessage>

                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <Field
                        type="email"
                        id="email"
                        name="email"
                    />
                    <ErrorMessage name='email' />
                </div>
                <div className='form-control'>
                    <label htmlFor='comments'>Comments</label>
                    <Field as='textarea' id='comments' name='comments' />
                </div>
                <div className='form-control'>
                    <label htmlFor='address'>Address</label>
                    <FastField name='address'>
                        {
                            props => {
                                console.log('Field Log');
                                const { meta, form, field } = props
                                return (
                                    <div>
                                        <input type='text' id='address' {...Field} />
                                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                    </div>
                                )

                            }
                        }
                    </FastField>
                </div>
                <div className='form-control'>
                    <label htmlFor='facebook'>Facebook Url</label>
                    <Field id='facebook' type='text' name='social.facebook' />
                </div>
                <div className='form-control'>
                    <label htmlFor='instagram'>Instagram Url</label>
                    <Field id='instagram' type='text' name='social.instagram' />
                </div>
                <div className='form-control'>
                    <label htmlFor='phone'>Phone Number</label>
                    <Field id='phone' type='number' name='phonenumbers[0]' />
                </div>
                <div className='form-control'>
                    <label htmlFor='secondaryphone'>Secondary Phone Number</label>
                    <Field id='secondaryphone' type='number' name='phonenumbers[1]' />
                </div>
                <div className='form-control'>
                    <label htmlFor='listphones'>List Phone Numbers</label>
                    <FieldArray name='phNumbers'>
                        {
                            (fieldArrayProps) => {
                                const { push, remove, form } = fieldArrayProps
                                const { values } = form
                                const { phNumbers } = values

                                return <div>
                                    {
                                        phNumbers.map((phNumber, index) => (
                                            <div key={index}>
                                                <Field name={`phNumbers[${index}]`} />
                                                {
                                                    index > 0 &&
                                                    <button type='submit' onClick={() => remove(index)}> Remove </button>
                                                }
                                                <button type='submit' onClick={() => push()}> Add </button>
                                            </div>
                                        ))
                                    }
                                </div>
                            }
                        }

                    </FieldArray>
                </div>
                <button type="submit" className='submit'>Submit</button>
            </Form>
        </Formik>
    );
};

export default NewForm;