import { streamText } from "ai";
import { QueryConfig } from "../retrieval/types.js";
import { Point } from "../vector-database/qdrant/qdrant.types.js";
import { modelRegistry } from "./model-registry.js";

export async function generate(points: Point[], config: QueryConfig) {
    const rawContents = points.map(p => p.payload.content);
    const { textStream } = streamText({
        model: modelRegistry(config.llmConfig),
        maxRetries: 1,
        prompt: [{
            role: 'user',
            content: `Based on the given context give correct answer. for this user query: ${config.query} Dont hallucinate. Context:  ${rawContents}`
        }],
    })
    return textStream;
}