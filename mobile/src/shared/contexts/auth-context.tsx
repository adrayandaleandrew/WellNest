import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthContextValue, AuthUser } from '../types/auth';
import { toAuthUser } from '../types/auth';
import {
  loginWithEmail,
  registerWithEmail,
  logout as firebaseLogout,
  subscribeToAuthChanges,
} from '../services/auth-service';
import { getAuthErrorMessage } from '../utils/validation';

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser ? toAuthUser(firebaseUser) : null);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    try {
      await loginWithEmail(email, password);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code ?? '';
      throw new Error(getAuthErrorMessage(code));
    }
  }

  async function register(email: string, password: string) {
    try {
      await registerWithEmail(email, password);
    } catch (error: unknown) {
      const code = (error as { code?: string }).code ?? '';
      throw new Error(getAuthErrorMessage(code));
    }
  }

  async function logout() {
    await firebaseLogout();
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
