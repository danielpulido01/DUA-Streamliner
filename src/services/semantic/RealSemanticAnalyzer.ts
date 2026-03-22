import type { SemanticAnalyzer, SemanticSimilarityInput, SemanticSimilarityResult } from "./SemanticAnalyzer";

export interface EmbeddingProvider {
  embed(text: string): Promise<number[]>;
}

class PlaceholderEmbeddingProvider implements EmbeddingProvider {
  async embed(_text: string): Promise<number[]> {
    // TODO: replace with real embedding provider (OpenAI/Azure/other)
    return [];
  }
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/\W+/)
    .map((token) => token.trim())
    .filter((token) => token.length > 0);
}

function lexicalSimilarity(chunkText: string, semanticFingerprint: string): number {
  const chunkTokens = new Set(tokenize(chunkText));
  const sectionTokens = new Set(tokenize(semanticFingerprint));

  if (chunkTokens.size === 0 || sectionTokens.size === 0) {
    return 0;
  }

  let intersections = 0;
  for (const token of chunkTokens) {
    if (sectionTokens.has(token)) {
      intersections += 1;
    }
  }

  const unionSize = new Set([...chunkTokens, ...sectionTokens]).size;
  return unionSize === 0 ? 0 : intersections / unionSize;
}

export class RealSemanticAnalyzer implements SemanticAnalyzer {
  private readonly embeddingProvider: EmbeddingProvider;

  constructor(embeddingProvider: EmbeddingProvider = new PlaceholderEmbeddingProvider()) {
    this.embeddingProvider = embeddingProvider;
  }

  async calculateSimilarity(input: SemanticSimilarityInput): Promise<SemanticSimilarityResult> {
    // Placeholder: keep the contract and extension points ready.
    // The proxy still treats this as an expensive operation.
    await this.embeddingProvider.embed(input.chunkText);
    await this.embeddingProvider.embed(input.section.semanticFingerprint);

    const score = lexicalSimilarity(input.chunkText, input.section.semanticFingerprint);

    return {
      chunkId: input.chunkId,
      sectionId: input.section.sectionId,
      score,
      source: "model",
    };
  }
}
