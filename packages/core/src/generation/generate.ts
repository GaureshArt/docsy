import { streamText } from "ai";
import { QueryConfig } from "../retrieval/types.js";
import { Point } from "../vector-database/qdrant/qdrant.types.js";
import { modelRegistry } from "./model-registry.js";
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const promptsDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '../prompts'
);

function readPrompt(filename: string): string {
    return readFileSync(path.join(promptsDir, filename), 'utf-8');
}

function interpolate(template: string, vars: Record<string, string>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? '');
}

function loadPrompt(filename: string, vars: Record<string, string> = {}): string {
    return interpolate(readPrompt(filename), vars);
}

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
    const system = loadPrompt('system.md');
    const userText = loadPrompt('user.md', {
        query: config.query,
        context
    });

    const { textStream } = streamText({
        model: modelRegistry(config.llmConfig),
        maxRetries: config.llmConfig.maxRetries ?? 1,
        system,
        prompt: userText,
    });

    return textStream;
}