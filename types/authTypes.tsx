export type AuthUser = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  email_verified_at: string | null;
  profile_picture_url: string | null;
  phone_number: string | null;
  is_active: boolean;
  role?: string | null;
  created_at: string;
  updated_at: string | null;
  last_login_at: string | null;
};

export type AuthResponse = {
  user: AuthUser;
  token: string;
};

export type Session = {
  id: string;
  user_agent: string | null;
  ip_address: string | null;
  last_activity: string;
  is_current: boolean;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  password: string;
  password_confirmation: string;
};

export type VerifyEmailPayload = {
  id: string;
  hash: string;
  expires: string;
  signature: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};
