import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  login as loginService,
  logout as logoutService,
  register as registerService,
} from "@/services/auth";

import { getUser } from "@/services/storage";

import {
  AuthSession,
  SignInPayload,
  SignUpPayload,
} from "@/types/auth";

import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;

  authenticated: boolean;

  loading: boolean;

  login(
    payload: SignInPayload
  ): Promise<void>;

  register(
    payload: SignUpPayload
  ): Promise<void>;

  logout(): Promise<void>;

  loadUser(): Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

interface Props {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
    useState<User | null>(null);

  const [authenticated, setAuthenticated] =
    useState(false);

  const [loading] = useState(false);

  async function loadUser() {
    const storedUser = await getUser();

    setUser(storedUser);

    setAuthenticated(!!storedUser);
  }

  async function login(
    payload: SignInPayload
  ) {
    const session: AuthSession =
      await loginService(payload);

    setUser(session.user ?? null);

    setAuthenticated(true);
  }

  async function register(
    payload: SignUpPayload
  ) {
    const session: AuthSession =
      await registerService(payload);

    setUser(session.user ?? null);

    setAuthenticated(true);
  }

  async function logout() {
    await logoutService();

    setUser(null);

    setAuthenticated(false);
  }

  const value = useMemo(
    () => ({
      user,

      authenticated,

      loading,

      login,

      register,

      logout,

      loadUser,
    }),
    [
      user,
      authenticated,
      loading,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}