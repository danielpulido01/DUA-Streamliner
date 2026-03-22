import { useEffect, useState } from "react";
import { generationManager } from "../../state/generationManager";
import type { GenerationProgressState } from "../../state/generation.types";

export function useGenerationProgress() {
  const [progressState, setProgressState] = useState<GenerationProgressState>(() =>
    generationManager.getProgressSnapshot(),
  );

  useEffect(() => {
    return generationManager.subscribe(setProgressState);
  }, []);

  return progressState;
}
