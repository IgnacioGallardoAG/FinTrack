import axios from "axios";
import { getToken } from "../auth/keycloakService";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: false,
});

// Agregar token de Keycloak automáticamente
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

// -----------------------
//  MÉTODOS ESPECÍFICOS
// -----------------------

// Enviar CSV al backend → validar
export const validateCSV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await api.post("/validate", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;

    } catch (error) {
        console.error("[VALIDATE CSV ERROR]", error);
        throw error.response?.data || { error: "Error al validar CSV" };
    }
};

// Enviar CSV al backend → importar
export const importCSV = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await api.post("/import", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;

    } catch (error) {
        console.error("[IMPORT CSV ERROR]", error);
        throw error.response?.data || { error: "Error al importar CSV" };
    }
};

export default api;
