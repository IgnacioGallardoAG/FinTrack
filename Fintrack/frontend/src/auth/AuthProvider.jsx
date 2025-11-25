// src/auth/AuthProvider.jsx
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import keycloakService from "./keycloakService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const authenticated = await keycloakService.init();
        setIsAuthenticated(authenticated);

        if (authenticated) {
          const info = await keycloakService.getProfile();
          setProfile(info);
        }
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  const login = (opts) => keycloakService.login(opts);
  const logout = () => keycloakService.logout();

  const value = {
    isAuthenticated,
    loading,
    login,
    logout,
    profile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function useAuth() {
  return useContext(AuthContext);
}
