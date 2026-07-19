import { request } from "./api";

import {
  AuthSession,
  SignInPayload,
  SignUpPayload,
} from "@/types/auth";

export async function signIn(
  payload: SignInPayload
) {
  const identifier = payload.identifier.trim();

  const body = identifier.includes("@")
    ? {
        email: identifier.toLowerCase(),
        password: payload.password,
      }
    : {
        contactNumber: {
          countryCode: payload.countryCode,
          number: identifier.replace(/\D/g, ""),
        },
        password: payload.password,
      };

  return request<AuthSession>(
    "/auth/login",
    {
      method: "POST",
      body,
    }
  );
}

export async function signUp(
  payload: SignUpPayload
) {
  return request<AuthSession>(
    "/auth/register",
    {
      method: "POST",

      body: {
        fullName: {
          firstName: payload.firstName.trim(),
          lastName: payload.lastName.trim(),
        },

        email:
          payload.email?.trim() ||
          undefined,

        contactNumber: {
          countryCode: payload.countryCode,
          number: payload.phone.replace(
            /\D/g,
            ""
          ),
        },

        password: payload.password,

        mpin:
          payload.mpin?.trim() ||
          undefined,
      },
    }
  );
}

/**
 * Coming Soon
 */
export async function validateSession(
  token: string
) {
  return request(
    "/auth/validate",
    {
      method: "POST",
      token,
    }
  );
}

/**
 * Coming Soon
 */
export async function refreshToken(
  refreshToken: string
) {
  return request<AuthSession>(
    "/auth/refresh",
    {
      method: "POST",

      body: {
        refreshToken,
      },
    }
  );
}

/**
 * Coming Soon
 */
export async function logoutAPI(
  token: string
) {
  return request(
    "/auth/logout",
    {
      method: "POST",
      token,
    }
  );
}