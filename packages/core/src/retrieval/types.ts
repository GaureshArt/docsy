import { ModelMessage } from "ai";
import { LlmConfig } from "../generation/types.js";
import { EmbeddingConfig } from "../ai/types.js";
import { RankerConfig } from "../ai/ranker/types.js";

export type embeddingProvider = "gemini"
export type patternTypes = "naive"
export interface QueryConfig {
    pattern: patternTypes;
    llmConfig: LlmConfig;
    systemPrompt?: string;
    query: string;
    vectorDatabase: {
        collection: string;
        provider: 'qdrant'
    };
    queryOptimization: LlmConfig;
    rankerConfig: RankerConfig;
    messages: ModelMessage[];
    embeddings: EmbeddingConfig
}