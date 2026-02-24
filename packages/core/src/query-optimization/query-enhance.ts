import { streamText } from "ai";
import { modelRegistry } from "../generation/model-registry.js";
import { QueryConfig } from "../retrieval/types.js";
import { QUERY_ENHANCEMENT_SYSTEM_PROMPT, QUERY_ENHANCEMENT_USER_PROMPT } from "../prompts/query-enchance.js";

/**
 * Enhances user queries for better retrieval performance.
 * 
 * Transforms conversational questions into search-optimized queries by:
 * - Expanding abbreviations and technical terms
 * - Adding relevant context
 * - Making intent more explicit
 * 
 * @param config - Query configuration containing the original query and LLM settings
 * @returns Enhanced query string optimized for semantic search
 */
export default async function queryEnhance(config: QueryConfig) {
    const { textStream } = streamText({
        model: modelRegistry(config.queryOptimization),
        system: QUERY_ENHANCEMENT_SYSTEM_PROMPT,
        prompt: QUERY_ENHANCEMENT_USER_PROMPT(config.query),
        temperature: config.queryOptimization.temperature
    });

    let enhanced = '';
    for await (const text of textStream) {
        enhanced += text;
    }

    return enhanced.trim();
}