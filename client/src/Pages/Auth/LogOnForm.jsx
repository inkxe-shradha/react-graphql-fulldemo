import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
const signUpSchema = Yup.object().shape({
  name: Yup.string().min(3).required(),
  lname: Yup.string().min(2).required(),
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
const initialValues = {
  email: "",
  name: "",
  lname: "",
  password: "",
};
const LogOnForm = ({ onSubmitHandler, loading, error }) => {
  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (value) => {
      onSubmitHandler(value, "signUp");
      formik.resetForm();
    },
  });
  return (
    <form className="mt-2" onSubmit={formik.handleSubmit}>
      {error && <div className="alert alert-danger mx-2">{error}</div>}
      <input
        type="text"
        id="name"
        className={
          "fadeIn second " + (formik.errors.name ? "invalid-item" : null)
        }
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Your First Name"
      />
      <input
        type="text"
        id="lname"
        className={
          "fadeIn second " + (formik.errors.lname ? "invalid-item" : null)
        }
        name="lname"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Your Last Name"
      />
      <input
        type="email"
        id="email"
        className={
          "fadeIn second " + (formik.errors.email ? "invalid-item" : null)
        }
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Your email address"
      />
      <input
        type="password"
        id="password"
        className={
          "fadeIn second " + (formik.errors.password ? "invalid-item" : null)
        }
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="password"
      />
      <input
        type="submit"
        className="fadeIn fourth"
        value={loading ? "Signing Up ..." : "Sign Up"}
      />
    </form>
  );
};

export default LogOnForm;
