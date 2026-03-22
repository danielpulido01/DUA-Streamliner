import { logger } from "../../utils/logger";
import type { SemanticAnalyzer, SemanticSimilarityInput, SemanticSimilarityResult } from "./SemanticAnalyzer";

export type SemanticAnalyzerProxyMetrics = {
  cacheHits: number;
  cacheMisses: number;
  modelCalls: number;
  cacheSize: number;
};

export type SemanticAnalyzerProxyOptions = {
  enableLogging?: boolean;
  cacheKeyFactory?: (input: SemanticSimilarityInput) => string;
};

function defaultCacheKeyFactory(input: SemanticSimilarityInput) {
  return [input.chunkId, input.section.sectionId, input.chunkText, input.section.semanticFingerprint].join("::");
}

export class SemanticAnalyzerProxy implements SemanticAnalyzer {
  private readonly realAnalyzer: SemanticAnalyzer;
  private readonly options: Required<SemanticAnalyzerProxyOptions>;
  private readonly cache = new Map<string, SemanticSimilarityResult>();

  private cacheHits = 0;
  private cacheMisses = 0;
  private modelCalls = 0;

  constructor(realAnalyzer: SemanticAnalyzer, options: SemanticAnalyzerProxyOptions = {}) {
    this.realAnalyzer = realAnalyzer;
    this.options = {
      enableLogging: options.enableLogging ?? true,
      cacheKeyFactory: options.cacheKeyFactory ?? defaultCacheKeyFactory,
    };
  }

  async calculateSimilarity(input: SemanticSimilarityInput): Promise<SemanticSimilarityResult> {
    const cacheKey = this.options.cacheKeyFactory(input);
    const cached = this.cache.get(cacheKey);

    if (cached) {
      this.cacheHits += 1;
      if (this.options.enableLogging) {
        logger.trace("SemanticAnalyzerProxy cache hit", {
          chunkId: input.chunkId,
          sectionId: input.section.sectionId,
          cacheSize: this.cache.size,
        });
      }

      return { ...cached, source: "cache" };
    }

    this.cacheMisses += 1;
    this.modelCalls += 1;

    if (this.options.enableLogging) {
      logger.trace("SemanticAnalyzerProxy cache miss", {
        chunkId: input.chunkId,
        sectionId: input.section.sectionId,
      });
    }

    const result = await this.realAnalyzer.calculateSimilarity(input);
    this.cache.set(cacheKey, result);

    return result;
  }

  clearCache() {
    this.cache.clear();
  }

  getMetrics(): SemanticAnalyzerProxyMetrics {
    return {
      cacheHits: this.cacheHits,
      cacheMisses: this.cacheMisses,
      modelCalls: this.modelCalls,
      cacheSize: this.cache.size,
    };
  }
}
