import { EmbeddingConfig } from "../ai/types.js";

export interface DocsyConfig {
  source: {
    type: 'github';
    owner: string;
    repo: string;
    branch?: string;
  };
  processing: {
    maxFiles?: number;
    chunkSize?: number;
    chunkOverlap?: number;
    excludePaths?: string[];
    strictRegex?: boolean;
  };
  embeddings: EmbeddingConfig;
  vectorDatabase: {
    provider: 'qdrant';
    collection: string;
  };
}

export function defineConfig(config: DocsyConfig): DocsyConfig {
  return config;
}

