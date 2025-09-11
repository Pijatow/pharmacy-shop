import axios from "axios";
import { useAuthStore } from "@/store/auth";

// Ensure the base URL is defined in the environment variables.
if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_BASE_URL is not defined. Please check your frontend/.env file."
  );
}

export const api = axios.create({
  // Use the environment variable directly.
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Add a request interceptor to include the token in every request
api.interceptors.request.use(
  (config) => {
    // Only access the store if the code is running in a browser
    if (typeof window !== "undefined") {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export function getApiBaseUrl(): string {
  // This function now simply returns the configured baseURL.
  // We've already checked that it's defined when the app starts.
  return api.defaults.baseURL!;
}
