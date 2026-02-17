import { streamText } from "ai";
import { QueryConfig } from "../retrieval/types.js";
import { Point } from "../vector-database/qdrant/qdrant.types.js";
import { modelRegistry } from "./model-registry.js";
import { SYSTEM_PROMPT } from "../prompts/system.js";
import { USER_PROMPT } from "../prompts/user.js";

function formatContext(points: Point[]): string {
    return points
        .map((p, i) => `[${i + 1}] ${p.payload.content}`)
        .join('\n\n---\n\n');
}

/**
 * Generates a streaming response from an LLM based on retrieved document chunks.
 *
 * @param points - Retrieved vector DB chunks used as context
 * @param config - Query config containing the user query and LLM settings
 * @returns Async text stream of the generated response
 */
export async function generate(points: Point[], config: QueryConfig) {
    const context = formatContext(points);
    const system = config.systemPrompt ?? SYSTEM_PROMPT;
    const userText = config.userPrompt ?? USER_PROMPT.replace('{{query}}', config.query).replace('{{context}}', context)

    return streamText({
        model: modelRegistry(config.llmConfig),
        maxRetries: config.llmConfig.maxRetries ?? 1,
        system,
        prompt: userText,
    }).toUIMessageStreamResponse();
}