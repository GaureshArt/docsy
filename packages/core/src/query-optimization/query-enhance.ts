import { streamText } from "ai";
import { modelRegistry } from "../generation/model-registry.js";
import { QUERY_ENHANCEMENT_SYSTEM_PROMPT, QUERY_ENHANCEMENT_USER_PROMPT } from "../prompts/query-enchance.js";
import { QueryEnchanceConfig } from "./types.js";

/**
 * Enhances user queries for better retrieval performance.
 * 
 * Transforms conversational questions into search-optimized queries by:
 * - Expanding abbreviations and technical terms
 * - Adding relevant context
 * - Making intent more explicit
 * 
 * @param query - Original query
 * @param config - Query configuration containing the  LLM settings for query optimization
 * @returns Enhanced query string optimized for semantic search
 */
export default async function queryEnhance(query: string, config: QueryEnchanceConfig) {
    const { textStream } = streamText({
        model: modelRegistry(config),
        system: QUERY_ENHANCEMENT_SYSTEM_PROMPT,
        prompt: QUERY_ENHANCEMENT_USER_PROMPT(query),
        temperature: config.temperature
    });

    let enhanced = '';
    for await (const text of textStream) {
        enhanced += text;
    }
    return enhanced.trim();
}