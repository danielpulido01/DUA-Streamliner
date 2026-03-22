import { generationProgressStore, type GenerationProgressListener } from "./generationProgressStore";
import type { GenerationPhase, GenerationProgressState } from "./generation.types";

export type StartGenerationInput = {
  totalFiles?: number;
};

type SimulatedPhasePlan = {
  phase: GenerationPhase;
  targetProgress: number;
  statusMessage: string;
  delayMs: number;
  steps: number;
};

const SIMULATED_PHASES: SimulatedPhasePlan[] = [
  {
    phase: "collecting-input",
    targetProgress: 25,
    statusMessage: "Collecting source files for generation.",
    delayMs: 180,
    steps: 5,
  },
  {
    phase: "extracting-data",
    targetProgress: 55,
    statusMessage: "Extracting document data.",
    delayMs: 220,
    steps: 6,
  },
  {
    phase: "mapping-template",
    targetProgress: 80,
    statusMessage: "Mapping extracted values to DUA template.",
    delayMs: 240,
    steps: 5,
  },
  {
    phase: "building-output",
    targetProgress: 100,
    statusMessage: "Building output document.",
    delayMs: 260,
    steps: 4,
  },
];

class GenerationManager {
  private static instance: GenerationManager | null = null;
  private activeJobToken: symbol | null = null;

  static getInstance() {
    if (!GenerationManager.instance) {
      GenerationManager.instance = new GenerationManager();
    }

    return GenerationManager.instance;
  }

  private constructor() {}

  getProgressSnapshot() {
    return generationProgressStore.getState();
  }

  subscribe(listener: GenerationProgressListener) {
    return generationProgressStore.subscribe(listener);
  }

  async startGeneration(input: StartGenerationInput = {}) {
    this.cancelGeneration({ silent: true });

    const totalFiles = normalizeTotalFiles(input.totalFiles);
    const jobId = createJobId();
    const jobToken = Symbol(jobId);
    this.activeJobToken = jobToken;

    generationProgressStore.setState({
      jobId,
      phase: "queued",
      runState: "running",
      percentage: 0,
      processedFiles: 0,
      totalFiles,
      statusMessage: "Generation has been queued.",
      errorMessage: null,
      updatedAt: new Date().toISOString(),
    });

    void this.runPlaceholderGeneration(jobToken, jobId, totalFiles);
    return jobId;
  }

  cancelGeneration(options: { silent?: boolean } = {}) {
    if (!this.activeJobToken) {
      return;
    }

    this.activeJobToken = null;
    if (options.silent) {
      return;
    }

    generationProgressStore.patchState({
      runState: "cancelled",
      phase: "cancelled",
      statusMessage: "Generation was cancelled.",
    });
  }

  private async runPlaceholderGeneration(jobToken: symbol, jobId: string, totalFiles: number) {
    try {
      await this.prepareGeneration(jobId);

      for (const phase of SIMULATED_PHASES) {
        if (!this.isActiveJob(jobToken)) {
          return;
        }

        generationProgressStore.patchState({
          phase: phase.phase,
          statusMessage: phase.statusMessage,
        });

        await this.simulatePhaseProgress(jobToken, phase, totalFiles);
      }

      if (!this.isActiveJob(jobToken)) {
        return;
      }

      await this.persistGeneratedOutput(jobId);

      this.activeJobToken = null;
      generationProgressStore.patchState({
        runState: "completed",
        phase: "completed",
        percentage: 100,
        processedFiles: totalFiles,
        statusMessage: "Generation completed.",
        errorMessage: null,
      });
    } catch (reason) {
      if (!this.isActiveJob(jobToken)) {
        return;
      }

      this.activeJobToken = null;
      generationProgressStore.patchState({
        runState: "failed",
        phase: "failed",
        statusMessage: "Generation failed.",
        errorMessage: reason instanceof Error ? reason.message : "Unexpected generation error.",
      });
    }
  }

  private async simulatePhaseProgress(jobToken: symbol, phase: SimulatedPhasePlan, totalFiles: number) {
    const snapshot = generationProgressStore.getState();
    const start = clampPercentage(snapshot.percentage);
    const delta = Math.max(phase.targetProgress - start, 0);
    const stepCount = Math.max(phase.steps, 1);

    for (let step = 1; step <= stepCount; step += 1) {
      if (!this.isActiveJob(jobToken)) {
        return;
      }

      await wait(phase.delayMs);

      const percentage = clampPercentage(start + (delta * step) / stepCount);
      generationProgressStore.patchState({
        percentage,
        processedFiles: computeProcessedFiles(totalFiles, percentage),
      });
    }
  }

  private isActiveJob(jobToken: symbol) {
    return this.activeJobToken === jobToken;
  }

  private async prepareGeneration(_jobId: string) {
    // Placeholder for request preparation/business logic.
    await Promise.resolve();
  }

  private async persistGeneratedOutput(_jobId: string) {
    // Placeholder for final storage/business logic.
    await Promise.resolve();
  }
}

function createJobId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `job-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function normalizeTotalFiles(value: number | undefined) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return 1;
  }

  return Math.max(Math.trunc(value), 1);
}

function computeProcessedFiles(totalFiles: number, percentage: number) {
  if (totalFiles <= 1) {
    return clampPercentage(percentage) >= 100 ? 1 : 0;
  }

  return Math.min(totalFiles, Math.round((clampPercentage(percentage) / 100) * totalFiles));
}

function clampPercentage(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (value < 0) {
    return 0;
  }

  if (value > 100) {
    return 100;
  }

  return Math.round(value);
}

function wait(durationMs: number) {
  return new Promise<void>((resolve) => {
    globalThis.setTimeout(resolve, Math.max(durationMs, 0));
  });
}

export const generationManager = GenerationManager.getInstance();
export type { GenerationProgressState };
