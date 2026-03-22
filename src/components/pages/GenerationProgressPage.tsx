import { useMemo } from "react";
import { Progress } from "../atoms/ui/progress";
import { useDuaGeneration } from "../hooks/useDuaGeneration";
import { useGenerationProgress } from "../hooks/useGenerationProgress";

export function GenerationProgressPage() {
  const progress = useGenerationProgress();
  const { startGeneration, cancelGeneration, isStarting, error } = useDuaGeneration();

  const isRunning = progress.runState === "running";
  const canStart = !isRunning && !isStarting;

  const statusLine = useMemo(() => {
    const updatedAt = new Date(progress.updatedAt).toLocaleTimeString();
    return `${progress.statusMessage} Last update: ${updatedAt}.`;
  }, [progress.statusMessage, progress.updatedAt]);

  const handleStart = async () => {
    await startGeneration({
      totalFiles: 6,
    });
  };

  return (
    <section style={{ maxWidth: "640px", margin: "0 auto", padding: "1rem" }}>
      <h1>DUA Generation Progress</h1>
      <p>{statusLine}</p>

      <Progress value={progress.percentage} />

      <p>
        Phase: <strong>{progress.phase}</strong>
      </p>
      <p>
        Progress: <strong>{progress.percentage}%</strong>
      </p>
      <p>
        Processed files:{" "}
        <strong>
          {progress.processedFiles} / {progress.totalFiles}
        </strong>
      </p>

      {progress.errorMessage ? <p role="alert">Error: {progress.errorMessage}</p> : null}
      {error ? <p role="alert">Start error: {error}</p> : null}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="button" onClick={handleStart} disabled={!canStart}>
          {isStarting ? "Starting..." : "Start Placeholder Generation"}
        </button>
        <button type="button" onClick={cancelGeneration} disabled={!isRunning}>
          Cancel
        </button>
      </div>
    </section>
  );
}

export default GenerationProgressPage;
