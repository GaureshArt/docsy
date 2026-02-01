import { Embedder, EmbeddingConfig } from "../types.js";
import { createGeminiEmbedder } from "./gemini.js";

/**
 * Resolves and initializes an embedding provider based on configuration.
 *
 * Acts as the single entry point for embedding model selection,
 * allowing the rest of the system to remain provider-agnostic.
 *
 * @param config - Embedding provider configuration
 * @returns Initialized embedder function
 */
export function getEmbedder(config: EmbeddingConfig): Embedder {
  switch (config.provider) {
    case "gemini":
      return createGeminiEmbedder(
        config.apiKey,
        config.model
      );

    default:
      throw new Error(
        `Unsupported embedding provider: ${config.provider}`
      );
  }
}
