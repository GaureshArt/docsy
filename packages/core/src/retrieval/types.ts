export type embeddingProvider = "gemini"

export interface QueryConfig {
    embeddings: {
        provider: embeddingProvider;
        model: string;
        apikey: string;
    },
}