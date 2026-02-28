import { generateText } from "ai";
import { modelRegistry } from "../generation/model-registry.js";
import { QueryExpansionConfig } from "./types.js";
import { QUERY_EXPANSION_SYSTEM_PROMPT, QUERY_EXPANSION_USER_PROMPT } from "../prompts/query-expansion.js";


/**
 * Generates multiple query variations from a single user query.
 * 
 * Creates diverse search queries to improve retrieval coverage by rephrasing
 * and approaching the question from different angles.
 * 
 * @param query - Original user query to expand
 * @param config - Query expansion configuration with LLM settings and total queries
 * @returns Array of expanded query strings
 * 
 * @example
 * const queries = await queryExpansion("How to deploy?" OR config.query, config.queryOptimization);
 * // Returns: [
 * //   "How do I deploy my Next.js application to production?",
 * //   "What are the deployment configuration steps?",
 * //   "How to set up environment variables for deployment?"
 * // ]
 */

export default async function queryExpansion(
    query: string,
    config: QueryExpansionConfig
) {
    const numQueries = config.totalQueries ?? 3;

    const { text } = await generateText({
        model: modelRegistry(config),
        system: QUERY_EXPANSION_SYSTEM_PROMPT.replace('{{numQueries}}', String(numQueries)),
        prompt: QUERY_EXPANSION_USER_PROMPT.replace('{{numQueries}}', String(numQueries)).replace('{{query}}', query),
        temperature: config.temperature ?? 0.7
    });

    return text
        .split('\n')
        .map((q) => q.trim())
        .filter((p) => p.length > 0)
        .slice(0, numQueries);
}