import { LlmConfig } from "./types.js";
import { google } from "@ai-sdk/google";
import { LanguageModel } from 'ai';
import { openai } from "@ai-sdk/openai";

/**
 * Returns a language model instance based on the provided configuration.
 *
 * @param {LlmConfig} config - LLM provider and model selection
 * @returns {LanguageModel} Configured language model instance
 * @throws  If provider is unsupported
 *
 * @example
 * const model = modelRegistry({ provider: 'gemini', model: 'gemini-1.5-flash' });
 */
export function modelRegistry(config: LlmConfig): LanguageModel {
    switch (config.provider) {
        case 'gemini':
            return google(config.model)
        case 'openai':
            return openai(config.model)
    }
}