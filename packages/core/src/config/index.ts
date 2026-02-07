
export interface DocsyConfig {
  source: {
    type: 'github';
    owner: string;
    repo: string;
    branch?: string;
    path?: string;
  };
  processing: {
    maxFiles: number;
    chunkSize: number;
    chunkOverlap: number;
    excludePaths: string[];
    strictRegex: boolean;
  };
  embeddings: {
    provider: 'gemini' | 'openai';
    model?: string;
  };
  vectorDatabase: {
    provider: 'qdrant';
    collection: string;
  };
}

export function defineConfig(config: DocsyConfig): DocsyConfig {
  return config;
}

