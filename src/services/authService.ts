import { apiClient } from "./services/apiClient";
import type { LoginRequest } from "@/schemas/loginRequest.schema";
import type { AuthSession } from "@/types/session.types";

export class AuthService {
  async login(payload: LoginRequest): Promise<AuthSession> {
    return apiClient.post("/auth/login", payload);
  }

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout");
  }

  async getCurrentSession(): Promise<AuthSession> {
    return apiClient.get("/auth/me");
  }
}

export const authService = new AuthService();
