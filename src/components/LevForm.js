import { useFormik } from 'formik';
import React from 'react';
import './LevForm.scss'
import * as Yup from 'yup';

const initialValues = {
    name: '',
    lastname: '',
    email: ''
}
const onSubmit = values => {
    console.log("submit value", values);
}

const validate = values => {
    let errors = {}

    if (!values.name) {
        errors.name = "Required"
    }
    if (!values.email) {
        errors.email = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.lastname) {
        errors.lastname = "Required"
    }

    return errors
}

const validationSchema = Yup.object({
    name: Yup.string()
        .required("Required!"),
    lastname: Yup.string()
        .required("Required"),
    email: Yup.string()
        .email("email invalid")
        .required("Required")
})

console.log("validate scheme");

const LevForm = () => {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        // validate
    })
    console.log("Formik Erors:", formik.errors);
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />

                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div>
                        : null}
                </div>
                <div className="form-control">
                    <label htmlFor="lastname">Lastaname</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formik.values.lastname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.lastname && formik.errors.lastname ? <div className="error">{formik.errors.lastname}</div>
                        : null}
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur} />
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div>
                        : null}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default LevForm;