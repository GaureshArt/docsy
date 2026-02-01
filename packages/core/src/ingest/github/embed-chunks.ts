import { Embedder } from "../../ai/types.js";
import { Chunk, EmbedChunk } from "./github.types.js";




/**
 * Embeds document chunks and attaches vector metadata.
 *
 * Converts chunk content into embeddings while preserving
 * chunk structure and metadata for downstream indexing.
 *
 * @param chunks - Parsed and chunked documents
 * @param embedder - Initialized embedding function
 * @param modelName - Name of the embedding model used
 * @returns Chunks augmented with embeddings
 */

export async function embedChunks(
  chunks: Chunk[],
  embedder: Embedder,
  modelName: string
): Promise<EmbedChunk[]> {
  const contents = chunks.map(c => c.content);
  const embeddings = await embedder(contents);
  if (embeddings.length !== chunks.length) {
    throw new Error(
      `Embedding count mismatch: expected ${chunks.length}, got ${embeddings.length}`
    );
  }
  
  return chunks.map((chunk, index):EmbedChunk => ({
    ...chunk,
    embeddings: embeddings[index],
    embeddingModel: modelName,
  }));
}
