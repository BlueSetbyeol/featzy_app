import tokenStorage from "@/lib/tokenStorage";
import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  AuthResponse,
  AuthUser,
  AvatarUploadFile,
  ChangePasswordPayload,
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
  Session,
  UpdateProfilePayload,
  VerifyEmailPayload,
} from "../types/authTypes";

const authApi = {
  // Auth
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    try {
      const { data } = await api.post<{
        token: string;
        user: AuthResponse["user"];
      }>("/mobile/login", payload);

      // Persist the token so the interceptor picks it up on future requests
      await tokenStorage.set("token", data.token);

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Identifiants incorrects";
        throw new Error(message);
      }
      throw new Error("Une erreur est survenue");
    }
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse["user"]> => {
    try {
      const { data } = await api.post<{ data: AuthResponse["user"] }>(
        "/register",
        payload,
      );

      return data.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erreur lors de l'inscription";
        throw new Error(message);
      }
      throw new Error("Une erreur est survenue");
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");

      await tokenStorage.delete("token");
    } catch {
      throw new Error("Erreur lors de la déconnexion");
    }
  },

  me: async (): Promise<AuthUser> => {
    try {
      const { data } = await api.get<{ data: AuthUser }>("/auth/me");
      return data.data;
    } catch {
      throw new Error("Impossible de récupérer l'utilisateur");
    }
  },

  // Email verification

  verifyEmail: async (payload: VerifyEmailPayload): Promise<void> => {
    try {
      await api.post("/auth/email/verify", payload);
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erreur de vérification email";
        throw new Error(message);
      }
      throw new Error("Une erreur est survenue");
    }
  },

  // Password reset

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
    try {
      await api.post("/auth/password/forgot", payload);
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erreur lors de la demande";
        throw new Error(message);
      }
      throw new Error("Une erreur est survenue");
    }
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
    try {
      await api.post("/auth/password/reset", payload);
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Erreur lors de la réinitialisation";
        throw new Error(message);
      }
      throw new Error("Une erreur est survenue");
    }
  },

  // Sessions

  getSessions: async (): Promise<Session[]> => {
    try {
      const { data } = await api.get<{ data: Session[] }>("/auth/sessions");
      return data.data;
    } catch {
      throw new Error("Impossible de récupérer les sessions");
    }
  },

  revokeSession: async (id: string): Promise<void> => {
    try {
      await api.delete(`/auth/sessions/${id}`);
    } catch {
      throw new Error("Impossible de révoquer la session");
    }
  },

  revokeAllSessions: async (): Promise<void> => {
    try {
      await api.delete("/auth/sessions");
    } catch {
      throw new Error("Impossible de révoquer toutes les sessions");
    }
  },

  // user's specifics
  updateProfile: async (payload: UpdateProfilePayload): Promise<AuthUser> => {
    const { data } = await api.patch<{ data: AuthUser }>("/me", payload);
    return data.data;
  },

  changePassword: async (payload: ChangePasswordPayload): Promise<void> => {
    try {
      const { data } = await api.put("/me/password", payload);

      // Persist the token so the interceptor picks it up on future requests
      await tokenStorage.set("token", data.token);

      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        const message =
          error.response?.data?.message || "Identifiants incorrects";
        throw new Error(message);
      }
      throw new Error("Une erreur est survenue");
    }
  },

  uploadAvatar: async (file: AvatarUploadFile): Promise<AuthUser> => {
    const formData = new FormData();
    formData.append("file", file as unknown as Blob);
    const { data } = await api.post<{ data: AuthUser }>(
      "/me/avatar",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        transformRequest: (data) => data, // bypass the default JSON.stringify
      },
    );
    return data.data;
  },
};

export default authApi;
