const API_BASE_URL =
  process.env.EXPO_PUBLIC_SAKSHAM_API_URL ?? "http://192.168.1.3:3000/api";

type ContactNumber = {
  countryCode: string;
  number: string;
};

type ApiResponse<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
};

export type AuthSession = {
  token: string;
  expiryTime: string;
  user?: {
    fullName?: {
      firstName?: string;
      lastName?: string;
    };
    email?: string;
    contactNumber?: ContactNumber;
    role?: string;
    fullNameString?: string;
  };
};

export type SignInPayload = {
  identifier: string;
  password: string;
  countryCode: string;
};

export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  countryCode: string;
  password: string;
  mpin?: string;
};

async function request<T>(
  path: string,
  body: unknown,
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as ApiResponse<T>;

  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export function signIn({ identifier, password, countryCode }: SignInPayload) {
  const trimmedIdentifier = identifier.trim();
  const body = trimmedIdentifier.includes("@")
    ? { email: trimmedIdentifier.toLowerCase(), password }
    : {
        contactNumber: {
          countryCode,
          number: trimmedIdentifier.replace(/\D/g, ""),
        },
        password,
      };

  return request<AuthSession>("/auth/login", body);
}

export function signUp(payload: SignUpPayload) {
  return request<AuthSession>("/auth/register", {
    fullName: {
      firstName: payload.firstName.trim(),
      lastName: payload.lastName.trim(),
    },
    email: payload.email?.trim() || undefined,
    contactNumber: {
      countryCode: payload.countryCode,
      number: payload.phone.replace(/\D/g, ""),
    },
    password: payload.password,
    mpin: payload.mpin?.trim() || undefined,
  });
}

export { API_BASE_URL };
