import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getLoadingState,
  handelUserError,
  resetError,
} from "../../store/slices/userSlice";
import { signInUser, signUpUser } from "../../store/slices/userThunk";
import "./index.css";
import LoginForm from "./LogInForm";
import LogOnForm from "./LogOnForm";
const SignIn = () => {
  const loading = useSelector(getLoadingState) === "loading";
  const dispatch = useDispatch();
  const error = useSelector(handelUserError);
  const [search, setSearch] = useSearchParams();
  React.useEffect(() => {
    dispatch(resetError());
  }, []);
  const onSubmitHandler = (data, type) => {
    if (type === "login") {
      dispatch(signInUser(data)).then((res) => {
        if (!res.error?.message) {
          toast.success("Login successful!");
        }
      });
    } else {
      dispatch(signUpUser(data)).then((res) => {
        if (!res.error?.message) {
          toast.success("Sign up successful!");
        }
      });
    }
  };
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        {" "}
        <div className="fadeIn first">
          <img
            className="image-icon"
            src="https://cdn-icons-png.flaticon.com/512/1791/1791961.png"
            id="icon"
            alt="User Icon"
          />
        </div>{" "}
        {search.get("type") === "sign-in" ? (
          <LoginForm
            onSubmitHandler={onSubmitHandler}
            loading={loading}
            error={error}
          />
        ) : (
          <LogOnForm
            onSubmitHandler={onSubmitHandler}
            loading={loading}
            error={error}
          />
        )}
        <div id="formFooter">
          <a
            className="underlineHover"
            href="javascript:void(0)"
            onClick={() =>
              setSearch({
                type: search.get("type") === "sign-in" ? "sign-up" : "sign-in",
              })
            }
          >
            {search.get("type") === "sign-in"
              ? "Create your account here"
              : "Already have an account? Sign In now"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
