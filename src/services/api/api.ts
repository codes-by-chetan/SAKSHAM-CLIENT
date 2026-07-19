import { ApiResponse } from "@/types/api";
import { AuthSession } from "@/types/auth";
import {
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  saveUser,
} from "@/services/storage";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_SAKSHAM_API_URL ??
  "http://192.168.1.3:3000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string;
  authenticated?: boolean;
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    const error = new Error(payload.message || "Request Failed") as Error & {
      status?: number;
    };
    error.status = response.status;
    throw error;
  }

  return payload;
}

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return null;

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    const payload = await parseResponse<AuthSession>(response);

    await Promise.all([
      saveAccessToken(payload.data.token),
      saveRefreshToken(payload.data.refreshToken),
      payload.data.user ? saveUser(payload.data.user) : Promise.resolve(),
    ]);

    return payload.data.token;
  })();

  try {
    return await refreshPromise;
  } catch {
    return null;
  } finally {
    refreshPromise = null;
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { method = "GET", body, token, authenticated = false } = options;
  const accessToken = token ?? (authenticated ? await getAccessToken() : null);

  const createRequest = (bearerToken?: string | null) => fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(bearerToken
        ? {
            Authorization: `Bearer ${bearerToken}`,
          }
        : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  let response = await createRequest(accessToken);
  if (authenticated && response.status === 401) {
    const refreshedToken = await refreshAccessToken();
    if (refreshedToken) response = await createRequest(refreshedToken);
  }

  return parseResponse<T>(response);
}
