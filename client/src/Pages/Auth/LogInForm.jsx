import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

const LoginForm = ({ onSubmitHandler, loading, error }) => {
  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      onSubmitHandler(values, "login");
    },
  });

  return (
    <form className="mt-2" onSubmit={formik.handleSubmit}>
      {error && <div className="alert alert-danger mx-2">{error}</div>}
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
        disabled={loading}
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="password"
      />
      <input
        type="submit"
        className="fadeIn fourth"
        value={loading ? "Signing in ..." : "Log In"}
      />
    </form>
  );
};

export default LoginForm;
