export type SemanticSectionProfile = {
  sectionId: string;
  semanticFingerprint: string;
  metadata?: Record<string, unknown>;
};

export type SemanticSimilarityInput = {
  chunkId: string;
  chunkText: string;
  section: SemanticSectionProfile;
};

export type SimilaritySource = "model" | "cache";

export type SemanticSimilarityResult = {
  chunkId: string;
  sectionId: string;
  score: number;
  source: SimilaritySource;
};

export interface SemanticAnalyzer {
  calculateSimilarity(input: SemanticSimilarityInput): Promise<SemanticSimilarityResult>;
}
