import { User } from "./user";

export interface AuthSession {
  token: string;

  refreshToken: string;

  expiryTime: string;

  user?: User;
}

export interface SignInPayload {
  identifier: string;
  password: string;
  countryCode: string;
}

export interface SignUpPayload {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  countryCode: string;
  password: string;
  mpin?: string;
}

