import { useState } from "react";
import { authService } from "../services/authService";
import { loginRequestSchema, type LoginRequest } from "../schemas/loginRequest.schema";
import { useSession } from "./hooks/useSession";

export function useLogin() {
  const { setSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(input: LoginRequest) {
    setError(null);
    setIsLoading(true);

    const parsed = loginRequestSchema.safeParse(input);
    if (!parsed.success) {
      setIsLoading(false);
      setError("Invalid login data");
      return false;
    }

    try {
      const session = await authService.login(parsed.data);
      setSession(session);
      return true;
    } catch {
      setError("Invalid credentials");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}