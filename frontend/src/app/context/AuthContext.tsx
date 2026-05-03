import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  AuthUser,
  clearSession,
  getStoredToken,
  getStoredUser,
  login as loginRequest,
  register as registerRequest,
} from '../lib/api';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, senha: string) => Promise<void>;
  register: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());
  const [token, setToken] = useState<string | null>(() => getStoredToken());

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login: async (email, senha) => {
        const session = await loginRequest(email, senha);
        setUser(session.user);
        setToken(session.token);
      },
      register: async (nome, email, senha) => {
        const session = await registerRequest(nome, email, senha);
        setUser(session.user);
        setToken(session.token);
      },
      logout: () => {
        clearSession();
        setUser(null);
        setToken(null);
      },
    }),
    [token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
