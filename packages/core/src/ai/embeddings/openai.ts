import { EmbeddingConfig } from "../types.js";
import OpenAI from "openai";
export default function createOpenAiEmbedder(config: EmbeddingConfig) {
    const ai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
    return async function embed(texts: string[]) {
        const vectors: number[][] = [];
        let i = 0;
        for (const text of texts) {
            const result = await ai.embeddings.create({
                model: config.model,
                input: text,
                encoding_format: 'float'
            });

            const embedding = result.data[0]?.embedding;
            if (!embedding) {
                throw new Error("No embedding found");
            }
            console.log(++i, "completed")
            vectors.push(embedding);
        }

        return vectors;
    }
}