import axios, { AxiosError } from "axios";
import { router } from "expo-router";
import tokenStorage from "./tokenStorage";

const api = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}/api/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string[]>;
  status: number;
}

export function extractApiError(error: unknown): {
  message: string;
  status: number;
  errors: Record<string, string[]> | undefined;
} {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorResponse | undefined;

    if (data?.message) {
      return {
        message: data.message,
        status: data.status,
        errors: data.errors,
      };
    }

    if (data?.errors) {
      const firstError = Object.values(data.errors)[0]?.[0];
      if (firstError)
        return {
          message: firstError,
          status: data.status,
          errors: data.errors,
        };
    }

    if (error.message) {
      return {
        message: error.message,
        status: error.response?.status ?? 0,
        errors: undefined,
      };
    }
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      status: 0,
      errors: undefined,
    };
  }

  return {
    message: "Une erreur est survenue",
    status: 0,
    errors: undefined,
  };
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
  const token = await tokenStorage.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
