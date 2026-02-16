export interface LlmConfig {
    provider: "gemini" | "openai";
    model: string
    maxRetries?: number;
}
export interface LoadPrompt {
    query: string;
    context: string;
}