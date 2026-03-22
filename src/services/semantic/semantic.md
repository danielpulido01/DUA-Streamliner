# Semantic Analyzer Module - Agent Guide

This file is for engineers/agents who need to use or replicate this module quickly.

## Current module surface

Location: `src/services/semantic/`

- `SemanticAnalyzer.ts`
  - Interface: `SemanticAnalyzer`
  - Method: `calculateSimilarity(input) => Promise<SemanticSimilarityResult>`
- `RealSemanticAnalyzer.ts`
  - Class: `RealSemanticAnalyzer implements SemanticAnalyzer`
  - Optional constructor dependency: `EmbeddingProvider`
- `SemanticAnalyzerProxy.ts`
  - Class: `SemanticAnalyzerProxy implements SemanticAnalyzer`
  - Extra methods: `getMetrics()`, `clearCache()`
- `index.ts`
  - Barrel exports for all public types/classes

## How to use in other classes

1. Depend on the interface (`SemanticAnalyzer`).
2. Inject one shared analyzer instance (use proxy in runtime).
3. Call `calculateSimilarity` for each `(chunk, section)` pair.

```ts
import type { SemanticAnalyzer, SemanticSectionProfile } from "./semantic";

export class ChunkClassifier {
  constructor(private readonly analyzer: SemanticAnalyzer) {}

  async bestMatch(chunkId: string, chunkText: string, sections: SemanticSectionProfile[]) {
    let best: { sectionId: string; score: number } | null = null;

    for (const section of sections) {
      const r = await this.analyzer.calculateSimilarity({ chunkId, chunkText, section });
      if (!best || r.score > best.score) best = { sectionId: r.sectionId, score: r.score };
    }

    return best;
  }
}
```

Composition root (create once, reuse):

```ts
import { RealSemanticAnalyzer, SemanticAnalyzerProxy } from "./semantic";

const semanticAnalyzer = new SemanticAnalyzerProxy(new RealSemanticAnalyzer(), {
  enableLogging: true,
});

// inject semanticAnalyzer into services/classes that need similarity
```

## How to replicate this module in another project

1. Create folder: `services/semantic/`.
2. Add `SemanticAnalyzer.ts` with only:
   - input types (`chunkId`, `chunkText`, `section`)
   - result type (`chunkId`, `sectionId`, `score`, `source`)
   - interface method `calculateSimilarity(...)`
3. Add `RealSemanticAnalyzer.ts`:
   - implements `SemanticAnalyzer`
   - keep real model call isolated here
4. Add `SemanticAnalyzerProxy.ts`:
   - constructor receives `SemanticAnalyzer`
   - cache key = chunk + section + semantic fingerprint
   - on hit: return cached value with `source: "cache"`
   - on miss: call real analyzer, cache result, return it
   - include `getMetrics()` and `clearCache()`
5. Add `index.ts` barrel exports.
6. Wire once in bootstrap/composition root and inject interface everywhere.

## Minimal contract to keep stable

Do not break these unless you migrate all callers:

- Interface name: `SemanticAnalyzer`
- Method name: `calculateSimilarity`
- Result fields: `chunkId`, `sectionId`, `score`, `source`
- Proxy utility methods: `getMetrics`, `clearCache`

## Testing guidance

- Unit tests for callers should use a fake `SemanticAnalyzer` (not the real class).
- Proxy tests should verify:
  - first call is miss + model call
  - repeated call is hit + no extra model call
  - metrics counters update correctly

## Notes for replacing placeholder AI logic

When integrating a real AI provider, update only `RealSemanticAnalyzer` (or its `EmbeddingProvider`).
Keep proxy and callers unchanged.
