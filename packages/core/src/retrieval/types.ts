import { ModelMessage } from "ai";
import { LlmConfig } from "../generation/types.js";
import { EmbeddingConfig } from "../ai/types.js";

export type embeddingProvider = "gemini"
export type patternTypes = "naive"
export interface QueryConfig {
    pattern: patternTypes;
    llmConfig: LlmConfig;
    query: string;
    messages: ModelMessage[];
    embeddings: EmbeddingConfig
}