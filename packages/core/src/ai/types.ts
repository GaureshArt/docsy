export interface EmbeddingConfig {
    provider: "gemini";
    apiKey: string;
    model?: string;
  }
  

  export interface Embedder {
    (texts: string[]): Promise<number[][]>;
  }
  