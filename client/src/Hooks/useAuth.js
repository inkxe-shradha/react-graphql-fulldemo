import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "./useLocalStorage";
const AuthContext = createContext({
  user: {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const navigate = useNavigate();
  const login = async (data) => {
    setUser(data);
    navigate("/profile");
  };
  const logout = () => {
    setUser(null);
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;