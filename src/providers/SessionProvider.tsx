import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../services/authService";
import type { AuthSession, AuthUser, PermissionCode } from "../types/session.types";

type SessionState = AuthSession | null;

export type SessionContextValue = {
  session: SessionState;
  user: AuthUser | null;
  permissions: PermissionCode[];
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (nextSession: AuthSession) => void;
  clearSession: () => void;
  refreshSession: () => Promise<void>;
};

export const SessionContext = createContext<SessionContextValue | null>(null);

function normalizeSession(payload: AuthSession | null | undefined): SessionState {
  if (!payload) {
    return null;
  }

  const hasUser = Boolean(payload.user?.id);
  const permissions = Array.isArray(payload.permissions) ? payload.permissions : [];

  if (!hasUser) {
    return null;
  }

  return {
    ...payload,
    permissions,
    isAuthenticated: payload.isAuthenticated ?? true,
  };
}

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<SessionState>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setSession = useCallback((nextSession: AuthSession) => {
    setSessionState(normalizeSession(nextSession));
  }, []);

  const clearSession = useCallback(() => {
    setSessionState(null);
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const freshSession = await authService.getCurrentSession();
      setSessionState(normalizeSession(freshSession));
    } catch {
      setSessionState(null);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const current = await authService.getCurrentSession();
        if (!isMounted) {
          return;
        }
        setSessionState(normalizeSession(current));
      } catch {
        if (isMounted) {
          setSessionState(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void bootstrap();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<SessionContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      permissions: session?.permissions ?? [],
      isAuthenticated: session?.isAuthenticated ?? false,
      isLoading,
      setSession,
      clearSession,
      refreshSession,
    }),
    [session, isLoading, setSession, clearSession, refreshSession]
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}
