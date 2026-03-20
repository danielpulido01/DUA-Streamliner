import { parseWithSchema } from "../utils/schemaValidator";
import {
  forgotPasswordRequestSchema,
  loginRequestSchema,
  resetPasswordRequestSchema,
} from "./auth-schemas";
import { apiFetch, authFetch } from "../services/client";
import type { AuthSession } from "../state/session.types";
import { sessionManager } from "../state/sessionManager";

type LoginInput = {
  email: string;
  password: string;
};

async function readErrorMessage(response: Response) {
  try {
    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = await response.json();
      if (typeof body?.message === "string") {
        return body.message;
      }
      if (typeof body?.error === "string") {
        return body.error;
      }
      return JSON.stringify(body);
    }
    return await response.text();
  } catch {
    return "Request failed.";
  }
}

export class AuthServiceError extends Error {
  readonly status?: number;

  constructor(message: string, options?: { status?: number }) {
    super(message);
    this.name = "AuthServiceError";
    this.status = options?.status;
  }
}

export class NoTenantAccessError extends AuthServiceError {
  constructor(message: string) {
    super(message, { status: 403 });
    this.name = "NoTenantAccessError";
  }
}

export class AuthService {
  async login(input: LoginInput): Promise<AuthSession | null> {
    const payload = parseWithSchema(loginRequestSchema, input, {
      schemaName: "login request",
      context: { scope: "auth-service" },
    });

    const response = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new AuthServiceError(await readErrorMessage(response), { status: response.status });
    }

    return this.getCurrentSession();
  }

  async logout(): Promise<void> {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } finally {
      sessionManager.clearSession();
    }
  }

  async refreshSession(): Promise<AuthSession | null> {
    const refreshResponse = await apiFetch("/api/auth/refresh", { method: "POST" });
    if (!refreshResponse.ok) {
      sessionManager.clearSession();
      return null;
    }

    return this.getCurrentSession();
  }

  async requestPasswordReset(email: string, redirectTo?: string): Promise<void> {
    const payload = parseWithSchema(
      forgotPasswordRequestSchema,
      {
        email,
        redirectTo: redirectTo ?? `${window.location.origin}${window.location.pathname}`,
      },
      {
        schemaName: "forgot password request",
        context: { scope: "auth-service" },
      },
    );

    const response = await apiFetch("/api/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new AuthServiceError(await readErrorMessage(response), { status: response.status });
    }
  }

  async resetPassword(accessToken: string, refreshToken: string, newPassword: string): Promise<void> {
    const payload = parseWithSchema(
      resetPasswordRequestSchema,
      {
        accessToken,
        refreshToken,
        newPassword,
      },
      {
        schemaName: "reset password request",
        context: { scope: "auth-service" },
      },
    );

    const response = await apiFetch("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new AuthServiceError(await readErrorMessage(response), { status: response.status });
    }
  }

  async getCurrentSession(): Promise<AuthSession | null> {
    const response = await authFetch("/api/auth/me");

    if (response.status === 401) {
      sessionManager.clearSession();
      return null;
    }

    if (response.status === 403) {
      sessionManager.clearSession();
      throw new NoTenantAccessError(await readErrorMessage(response));
    }

    if (!response.ok) {
      throw new AuthServiceError(await readErrorMessage(response), { status: response.status });
    }

    const payload = await response.json();
    return sessionManager.setSession(payload);
  }
}

export const authService = new AuthService();