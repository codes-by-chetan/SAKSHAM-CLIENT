import {
  signIn,
  signUp,
  validateSession as validateSessionAPI,
  refreshToken as refreshTokenAPI,
  logoutAPI,
} from "./api/auth.api";

import {
  saveAccessToken,
  saveRefreshToken,
  saveUser,
  getAccessToken,
  getRefreshToken,
  clearSession,
} from "./storage";

import {
  AuthSession,
  SignInPayload,
  SignUpPayload,
} from "@/types/auth";

/* -------------------------------------------------------------------------- */
/*                           Private Helper Methods                           */
/* -------------------------------------------------------------------------- */

async function persistSession(
  session: AuthSession
): Promise<void> {
  await saveAccessToken(session.token);

  if (session.refreshToken) {
    await saveRefreshToken(
      session.refreshToken
    );
  }

  if (session.user) {
    await saveUser(session.user);
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Login                                    */
/* -------------------------------------------------------------------------- */

export async function login(
  payload: SignInPayload
): Promise<AuthSession> {
  const response = await signIn(payload);

  const session = response.data;

  await persistSession(session);

  return session;
}

/* -------------------------------------------------------------------------- */
/*                                 Register                                   */
/* -------------------------------------------------------------------------- */

export async function register(
  payload: SignUpPayload
): Promise<AuthSession> {
  const response = await signUp(payload);

  const session = response.data;

  await persistSession(session);

  return session;
}

/* -------------------------------------------------------------------------- */
/*                             Validate Session                               */
/* -------------------------------------------------------------------------- */

export async function validateSession(): Promise<boolean> {
  const token = await getAccessToken();

  if (!token) {
    return false;
  }

  try {
    await validateSessionAPI(token);

    return true;
  } catch (error) {
    console.error(
      "Session validation failed",
      error
    );

    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                             Refresh Session                                */
/* -------------------------------------------------------------------------- */

export async function refreshSession(): Promise<boolean> {
  const refreshToken =
    await getRefreshToken();

  if (!refreshToken) {
    return false;
  }

  try {
    const response =
      await refreshTokenAPI(
        refreshToken
      );

    const session = response.data;

    await saveAccessToken(
      session.token
    );

    if (session.refreshToken) {
      await saveRefreshToken(
        session.refreshToken
      );
    }

    if (session.user) {
      await saveUser(session.user);
    }

    return true;
  } catch (error) {
    console.error(
      "Token refresh failed",
      error
    );

    return false;
  }
}

/* -------------------------------------------------------------------------- */
/*                                  Logout                                    */
/* -------------------------------------------------------------------------- */

export async function logout(): Promise<void> {
  try {
    const token =
      await getAccessToken();

    if (token) {
      await logoutAPI(token);
    }
  } catch (error) {
    console.warn(
      "Logout API failed.",
      error
    );
  } finally {
    await clearSession();
  }
}