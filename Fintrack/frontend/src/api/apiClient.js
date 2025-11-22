import axios from "axios";
import { getToken } from "../auth/keycloakService";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: false,
});

api.interceptors.request.use(
    async (config) => {
        const token = await getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
