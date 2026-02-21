import { streamText } from "ai";
import { QueryConfig } from "../retrieval/types.js";
import { Point } from "../vector-database/qdrant/qdrant.types.js";
import { modelRegistry } from "./model-registry.js";
import { SYSTEM_PROMPT } from "../prompts/system.js";

function formatContext(points: Point[]): string {
    return points
        .map((p, i) => {
            return `--- SOURCE [${i + 1}] ---
            LINK: ${p.payload.metadata.filePath}
            CONTENT: ${p.payload.content}`;
        })
        .join('\n\n');
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
    const userQuery = config.messages.at(-1)?.content
    return streamText({
        model: modelRegistry(config.llmConfig),
        maxRetries: config.llmConfig.maxRetries ?? 1,
        system,
        messages: [
            ...config.messages,
            {
                role: 'user',
                content: `
                KNOWLEDGE BASE:
                ${context}

                USER QUERY:
                ${userQuery}
                
               REMINDER: You MUST include the "Sources:" section with the actual links at the end of your response.`
            }
        ],
    }).toUIMessageStreamResponse();
}