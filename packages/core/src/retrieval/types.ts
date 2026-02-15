import { ModelMessage } from "ai";
import { LlmConfig } from "../generation/types.js";

export type embeddingProvider = "gemini"

export interface QueryConfig {
    llmConfig: LlmConfig;
    query: string;
    messages: ModelMessage[];
    embeddings: {
        provider: embeddingProvider;
        model: string;
        apikey: string;
    },
}