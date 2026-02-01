import { GoogleGenAI } from "@google/genai";
import { Embedder } from "../types.js";

/**
 * Creates a Gemini-based embedding function.
 *
 * Initializes the google genai client once and returns a reusable
 * embedding function that converts text into numeric vectors.
 *
 * @param apiKey - Gemini API key
 * @param model - Optional embedding model name
 * @returns An embedder function
 */
export function createGeminiEmbedder(
  apiKey: string,
  model = "gemini-embedding-001",
): Embedder {
  const client = new GoogleGenAI({ apiKey });
  return async function embed(texts: string[]) {
    const vectors: number[][] = [];

    for (const text of texts) {
      const result = await client.models.embedContent({
        model,
        contents: text,
        config: {
          taskType: 'RETRIEVAL_DOCUMENT',
          outputDimensionality: 768
        }
      });

      const embedding = result.embeddings?.[0]?.values;
      if (!embedding) {
        throw new Error("No embedding found");
      }
      vectors.push(embedding);
    }

    return vectors;
  };
}
