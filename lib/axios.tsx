import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  withCredentials: true, // required for Sanctum session cookies
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Fetch the Sanctum CSRF cookie before any state-mutating request.
 * Call this once before login/register.
 */
export async function initCsrf(): Promise<void> {
  await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
    withCredentials: true,
  });
}

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
}

export function extractApiError(error: unknown): { message: string } {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.message) {
      return { message: data.message };
    }

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];
      if (firstError) return { message: firstError };
    }

    if (error.message) {
      return { message: error.message };
    }
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Une erreur est survenue" };
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      router.replace("/login");
    }
    return Promise.reject(error);
  },
);

// Attaches CSRF token to every request
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
