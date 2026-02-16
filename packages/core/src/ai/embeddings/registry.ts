import { Embedder, EmbeddingConfig } from '../types.js'
import { createGeminiEmbedder } from './gemini.js'
import createOpenAiEmbedder from './openai.js'

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
    case 'google':
      return createGeminiEmbedder(config.model, config.taskType)
    case 'openai':
      return createOpenAiEmbedder(config)
    default:
      throw new Error(`Unsupported embedding provider`)
  }
}
