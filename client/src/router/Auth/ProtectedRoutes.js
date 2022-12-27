import { Navigate, Outlet } from "react-router";
import useAuth from "../../Hooks/useAuth";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { isUserAuthenticated } from "../../store/slices/userThunk";
import { toast } from "react-toastify";

export const ProtectedRoute = () => {
  const { user, token, resetUser } = useAuth();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (user && token) {
      dispatch(isUserAuthenticated()).then((res) => {
        if (res.error?.message) {
          toast.error(res.error.message);
        }
      });
    }
  }, [dispatch]);

  if (!user || !token) {
    // user is not authenticated
    return <Navigate to="/" />;
  } else if (token) {
    const decodedToken = jwt_decode(token);
    var dateNow = new Date();
    if (decodedToken.exp * 1000 < dateNow.getTime()) {
      resetUser();
      return <Navigate to="/" />;
    }
  }
  return <Outlet />;
};
