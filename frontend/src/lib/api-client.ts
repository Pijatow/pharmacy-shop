import axios from "axios";
import { useAuthStore } from "@/store/auth";

const defaultBaseUrl = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Important for cookies if you use them later
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function getApiBaseUrl(): string {
  return api.defaults.baseURL ?? defaultBaseUrl;
}