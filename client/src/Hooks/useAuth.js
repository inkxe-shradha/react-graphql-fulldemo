import { createContext, useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router";
import { useLocalStorage } from "./useLocalStorage";
import jwt_decode from "jwt-decode";
import graphQLClient from "../confg/graphqli.config";
const AuthContext = createContext({
  user: {},
  token: {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const login = async (data) => {
    setUser(data.user);
    setToken(data.token);
    graphQLClient.setHeader("authorization", "Bearer " + data.token);
    navigate(pathname && pathname === "auth" ? "/" : pathname, {
      state: { previousPath: pathname || "/" },
    });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    navigate("/", { replace: true });
  };

  const resetUser = () => {
    setUser(null);
    setToken(null);
  };

  const validateUser = () => {
    if (token) {
      const decodedToken = jwt_decode(token);
      var dateNow = new Date();
      if (decodedToken.exp * 1000 < dateNow.getTime()) {
        resetUser();
      }
    }
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      resetUser,
      validateUser,
    }),
    [user, token, validateUser]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
