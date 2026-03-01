import { getEmbedder } from "../ai/embeddings/registry.js";
import { QueryConfig } from "./types.js";

/**
 * Generates embedding vectors for one or more query strings.
 *
 * Converts natural language queries into numerical vector representations
 * using the configured embedding provider. The resulting vectors can be used
 * for semantic search, similarity comparison, or retrieval-augmented generation (RAG).
 *
 * @param queries - Array of input text strings to embed
 * @param config - Query configuration containing embedding provider settings
 * @returns Promise resolving to array of embedding vectors (one per query)
 * @throws Error if embedding generation fails or returns no vectors
 *
 * @example
 * // Single query
 * const [vector] = await queryEmbed(
 *   ["How does vector search work?"],
 *   { embeddings: { provider: 'google', model: 'text-embedding-004' } }
 * );
 *
 * @example
 * // Multiple queries
 * const vectors = await queryEmbed(
 *   ["How to deploy?", "What is deployment?", "Deploy production app"],
 *   { embeddings: { provider: 'google', model: 'text-embedding-004' } }
 * );
 * // Returns: [[0.1, 0.2, ...], [0.3, 0.4, ...], [0.5, 0.6, ...]]
 */
export async function queryEmbed(
    queries: string[],
    config: QueryConfig
): Promise<number[][]> {
    const embedder = getEmbedder(config.embeddings);
    const embeddings = await embedder(queries);

    if (!embeddings || embeddings.length === 0) {
        throw new Error('Query embedding failed. Try again!');
    }

    return embeddings;
}