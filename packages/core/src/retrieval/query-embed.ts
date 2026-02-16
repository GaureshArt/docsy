import { getEmbedder } from "../ai/embeddings/registry.js";
import { QueryConfig } from "./types.js";

/**
 * Generates an embedding vector for a given query string.
 *
 * This function uses the configured embedding provider (currently Gemini)
 * to convert a natural language query into a numerical vector representation.
 * The resulting vector can be used for semantic search, similarity comparison,
 * or retrieval-augmented generation (RAG).
 *

 * @param {string} query
 * The input text that needs to be embedded.
 *
 * @param {QueryConfig} config
 * Configuration object containing embedding-related settings.
 *
 *
 * @returns {Promise<number[]>}
 * A promise that resolves to a numerical embedding vector representing the query.
 *
 * @throws 
 * Throws an error if the embedding generation fails or returns no vector.
 *
 * @example
 * ```ts
 * const vector = await queryEmbed("How does vector search work?", {
    embeddings:{
        provider:'gemini',
        apikey:process.env.GEMINI_API_KEY,
        model:'gemini-embedding-001'
    }
 * });
 * ```
 */
export async function queryEmbed(
    query: string,
    config: QueryConfig
): Promise<number[]> {
    const embedder = getEmbedder(config.embeddings);
    const embeddedQuery = await embedder([query]);
    const vector = embeddedQuery.at(0);
    if (!vector) {
        throw new Error('Query Embedding failed. Try again!');
    }
    return vector;
}
