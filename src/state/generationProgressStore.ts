import {
  createInitialGenerationProgressState,
  type GenerationProgressState,
} from "./generation.types";

export type GenerationProgressListener = (state: GenerationProgressState) => void;

class GenerationProgressStore {
  private static instance: GenerationProgressStore | null = null;
  private readonly listeners = new Set<GenerationProgressListener>();
  private state: GenerationProgressState = createInitialGenerationProgressState();

  static getInstance() {
    if (!GenerationProgressStore.instance) {
      GenerationProgressStore.instance = new GenerationProgressStore();
    }

    return GenerationProgressStore.instance;
  }

  private constructor() {}

  getState() {
    return this.state;
  }

  subscribe(listener: GenerationProgressListener) {
    this.listeners.add(listener);
    listener(this.state);

    return () => {
      this.listeners.delete(listener);
    };
  }

  setState(nextState: GenerationProgressState) {
    this.state = nextState;
    this.notify();
  }

  patchState(partial: Partial<GenerationProgressState>) {
    this.state = {
      ...this.state,
      ...partial,
      updatedAt: new Date().toISOString(),
    };
    this.notify();
  }

  reset() {
    this.state = createInitialGenerationProgressState();
    this.notify();
  }

  private notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}

export const generationProgressStore = GenerationProgressStore.getInstance();
