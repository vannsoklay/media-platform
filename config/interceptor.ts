import axios from "axios";

// Centralize Axios Configuration
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const apiBE = axios.create({
  baseURL: "http://localhost:8443/api/v1",
});

// Add Authorization Interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token") || "";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiBE.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token") || "";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api, apiBE };
