import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

const apiBE = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GETAWAY_API_V1,
});

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
