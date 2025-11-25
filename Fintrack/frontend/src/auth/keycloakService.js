// src/auth/keycloakService.js
import keycloak from "./keycloak";

const TOKEN_KEY = "kc_token";
const REFRESH_TOKEN_KEY = "kc_refresh_token";

let _initialized = false;

const saveTokens = () => {
  if (keycloak.token) localStorage.setItem(TOKEN_KEY, keycloak.token);
  if (keycloak.refreshToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, keycloak.refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

const keycloakService = {
  init: async () => {
    if (_initialized) return keycloak.authenticated;
    _initialized = true;

    const authenticated = await keycloak.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      checkLoginIframe: false,
    });

    if (authenticated) saveTokens();

    keycloak.onAuthSuccess = saveTokens;

    keycloak.onTokenExpired = async () => {
      try {
        const refreshed = await keycloak.updateToken(30);
        if (refreshed) saveTokens();
        else {
          clearTokens();
          await keycloak.login();
        }
      } catch (e) {
        clearTokens();
        await keycloak.login();
      }
    };

    keycloak.onAuthLogout = clearTokens;

    return authenticated;
  },

  login: (opts) => keycloak.login(opts),
  logout: () => {
    clearTokens();
    return keycloak.logout();
  },

  getToken: async () => {
    if (keycloak.authenticated) {
      try {
        await keycloak.updateToken(30);
        saveTokens();
        return keycloak.token;
      } catch (e) {
        clearTokens();
        return null;
      }
    }
    return localStorage.getItem(TOKEN_KEY);
  },

  refreshTokenIfNeeded: async () => {
    if (!keycloak.authenticated) return localStorage.getItem(TOKEN_KEY);

    try {
      const refreshed = await keycloak.updateToken(30);
      if (refreshed) saveTokens();
      return keycloak.token;
    } catch (e) {
      clearTokens();
      return null;
    }
  },

  getProfile: async () => {
    if (!keycloak.authenticated) return null;
    return keycloak.loadUserInfo();
  },
};

export default keycloakService;
