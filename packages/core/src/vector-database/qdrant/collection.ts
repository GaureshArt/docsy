import { createQdrantClient } from "./client.js";

export const QDRANT_COLLECTION_NAME = 
  process.env.DOCSY_QDRANT_COLLECTION_NAME ?? "docsy-test-1";

export const DEFAULT_VECTOR_SIZE = 768; // Gemini text-embedding-004


/**
 * Creates a Qdrant collection for storing document embeddings if it doesn't already exist.
 * 
 * @param {number} [vectorSize=768] - Dimension size of the embedding vectors (default: 768 for Gemini)
 * @returns {Promise<void>}
 * @throws If collection creation fails
 * 
 * @example
 * // Create collection with default Gemini embeddings (768)
 * await createQdrantCollection();
 * 
 * @example
 * // Create collection for OpenAI embeddings (1536)
 * await createQdrantCollection(1536);
 */

export async function createQdrantCollection(
  vectorSize: number = DEFAULT_VECTOR_SIZE
): Promise<void> {
  const client = createQdrantClient();

  try {
    const {exists} = await client.collectionExists(QDRANT_COLLECTION_NAME);

    if (!exists) {
      await client.createCollection(QDRANT_COLLECTION_NAME, {
        vectors: {
          size: vectorSize,
          distance: "Cosine",
        },
      });
      console.log(`Created collection: ${QDRANT_COLLECTION_NAME}`);
    } else {
      console.log(`Collection already exists: ${QDRANT_COLLECTION_NAME}`);
    }
  } catch (error) {
    console.error("Failed to create Qdrant collection:", error);
    throw error;
  }
}