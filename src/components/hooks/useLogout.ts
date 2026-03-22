import { useState } from "react";
import { authService } from "../../auth/authService";
import { useSession } from "./useSession";

export function useLogout() {
  const { clearSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  async function logout() {
    setIsLoading(true);
    try {
      await authService.logout();
    } finally {
      clearSession();
      setIsLoading(false);
    }
  }

  return { logout, isLoading };
}
