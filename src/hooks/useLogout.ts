import { authService } from "../services/authService";
import { useSession } from "../hooks/useSession";

export function useLogout() {
  const { clearSession } = useSession();

  async function logout() {
    try {
      await authService.logout();
    } finally {
      clearSession();
    }
  }

  return { logout };
}