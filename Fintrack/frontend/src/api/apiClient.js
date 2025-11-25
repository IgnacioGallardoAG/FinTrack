// src/api/apiClient.js
import axios from "axios";
import keycloakService from "../auth/keycloakService";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

let isRefreshing = false;
let pendingRequests = [];

const subscribeTokenRefresh = (cb) => pendingRequests.push(cb);

const onRefreshed = (token) => {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
};

// REQUEST interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = await keycloakService.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          if (!token) return reject(error);
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const newToken = await keycloakService.refreshTokenIfNeeded();
      isRefreshing = false;
      onRefreshed(newToken);

      if (!newToken) {
        await keycloakService.login();
        return Promise.reject(error);
      }

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return apiClient(originalRequest);
    } catch (err) {
      isRefreshing = false;
      return Promise.reject(err);
    }
  }
);

export default apiClient;
