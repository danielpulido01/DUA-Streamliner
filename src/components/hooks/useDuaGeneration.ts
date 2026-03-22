import { useCallback, useState } from "react";
import { generationManager, type StartGenerationInput } from "../../state/generationManager";

export function useDuaGeneration() {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startGeneration = useCallback(async (input: StartGenerationInput = {}) => {
    setIsStarting(true);
    setError(null);

    try {
      return await generationManager.startGeneration(input);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Could not start generation.");
      return null;
    } finally {
      setIsStarting(false);
    }
  }, []);

  const cancelGeneration = useCallback(() => {
    generationManager.cancelGeneration();
  }, []);

  return {
    startGeneration,
    cancelGeneration,
    isStarting,
    error,
  };
}
