export interface LlmConfig {
    provider: "google" | "openai";
    model: string
    maxRetries?: number;
}
export interface LoadPrompt {
    query: string;
    context: string;
}