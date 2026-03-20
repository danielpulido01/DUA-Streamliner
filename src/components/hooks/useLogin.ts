import { useState } from "react";
import { AuthServiceError, NoTenantAccessError, authService } from "../../auth/authService";
import { useSession } from "./useSession";

type LoginInput = {
  email: string;
  password: string;
};

export function useLogin() {
  const { setSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(input: LoginInput) {
    setError(null);
    setIsLoading(true);

    try {
      const session = await authService.login(input);
      if (!session) {
        setError("No active session was returned by the server.");
        return false;
      }

      setSession(session);
      return true;
    } catch (reason) {
      if (reason instanceof NoTenantAccessError) {
        setError("Your account has no assigned tenant access.");
        return false;
      }

      if (reason instanceof AuthServiceError) {
        setError(reason.message || "Login failed.");
        return false;
      }

      setError("Login failed.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}
