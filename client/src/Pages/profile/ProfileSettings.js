import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../store/slices/userSlice";
import { updateUserCredentials } from "../../store/slices/userThunk";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";

const ProfileSettings = () => {
  const { login } = useAuth();
  const userDetails = useSelector(getUserDetails);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const signInSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).required(),
  });
  const formik = useFormik({
    initialValues: {
      email: userDetails.email,
      password: "",
    },
    validationSchema: signInSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(updateUserCredentials({ ...values, id: userDetails.id })).then(
        (res) => {
          if (res.payload?.id) {
            console.log(res.payload);
            login({
              user: {
                id: res.payload.id,
                email: res.payload.email,
              },
              token: res.payload.token,
            });
            toast.success("User Creds has been updated");
            setIsLoading(false);
          }
        }
      );
      formik.resetForm();
    },
  });

  React.useEffect(() => {
    if (userDetails.email) {
      formik.setValues({
        email: userDetails.email,
        password: "",
      });
    }
  }, [userDetails.email]);

  return (
    <div className="row">
      <div className="col-lg-10 offset-lg-1">
        <h3 className="mb-3">Update Your Details</h3>
        <div className="bg-white shadow rounded">
          <div className="form-left h-100 py-5 px-5">
            <form
              action=""
              className="row g-4"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className="col-12">
                <label>
                  Username<span className="text-danger">*</span>
                </label>
                <div
                  className={
                    "input-group " +
                    (formik.errors.email ? "has-validation" : null)
                  }
                >
                  <div className="input-group-text">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <input
                    type="email"
                    name="email"
                    defaultValue={userDetails.email}
                    autoComplete="off"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={
                      "form-control " +
                      (formik.errors.email ? "is-invalid" : null)
                    }
                    placeholder="Enter Username"
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <label>
                  Password<span className="text-danger">*</span>
                </label>
                <div
                  className={
                    "input-group " +
                    (formik.errors.password ? "is-invalid" : null)
                  }
                >
                  <div className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    autoComplete="off"
                    name="password"
                    className={
                      "form-control " +
                      (formik.errors.password && formik.touched.password
                        ? "is-invalid"
                        : null)
                    }
                    required
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="col-12">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary px-4 float-end mt-4"
                >
                  {isLoading ? "Updating..." : "Update Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
