import axios from "axios";

// Centralize Axios Configuration
const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Add Authorization Interceptor
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token") || ""
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;