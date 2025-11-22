import Keycloak from "keycloak-js";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const keycloak = new Keycloak({
  url: "http://localhost:8080/",
  realm: "fintrack",
  clientId: "frontend-client",
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    keycloak
      .init({ onLoad: "check-sso", pkceMethod: "S256" })
      .then(async (authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          const userInfo = await keycloak.loadUserInfo();
          setProfile(userInfo);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const login = (opts) => keycloak.login(opts);
  const logout = () => keycloak.logout();

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
    profile,
    token: keycloak.token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  return useContext(AuthContext);
}
