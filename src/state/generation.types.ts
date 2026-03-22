export type GenerationPhase =
  | "idle"
  | "queued"
  | "collecting-input"
  | "extracting-data"
  | "mapping-template"
  | "building-output"
  | "completed"
  | "failed"
  | "cancelled";

export type GenerationRunState = "idle" | "running" | "completed" | "failed" | "cancelled";

export type GenerationProgressState = {
  jobId: string | null;
  phase: GenerationPhase;
  runState: GenerationRunState;
  percentage: number;
  processedFiles: number;
  totalFiles: number;
  statusMessage: string;
  errorMessage: string | null;
  updatedAt: string;
};

export function createInitialGenerationProgressState(): GenerationProgressState {
  return {
    jobId: null,
    phase: "idle",
    runState: "idle",
    percentage: 0,
    processedFiles: 0,
    totalFiles: 0,
    statusMessage: "No generation has started.",
    errorMessage: null,
    updatedAt: new Date().toISOString(),
  };
}
