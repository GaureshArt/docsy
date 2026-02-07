import { createQdrantClient } from "./client.js";

export const QDRANT_COLLECTION_NAME =
  process.env.DOCSY_QDRANT_COLLECTION_NAME ?? "docsy-test-1";

export const DEFAULT_VECTOR_SIZE = 768; // Gemini text-embedding-004


/**
 * Creates a Qdrant collection for storing document embeddings if it doesn't already exist.
 * 
 * @param {object} options - Collection creation options
 * @param {number} [options.vectorSize=768] - Dimension size of the embedding vectors (default: 768 for Gemini)
 * @param {string} [options.collectionName] - Name of the collection (default: from env or "docsy-test-1")
 * @returns {Promise<void>}
 * @throws If collection creation fails
 * 
 * @example
 * // Create collection with default Gemini embeddings (768)
 * await createQdrantCollection();
 * 
 * @example
 * // Create collection for OpenAI embeddings (1536)
 * await createQdrantCollection({ vectorSize: 1536 });
 * 
 * @example
 * // Create collection with custom name
 * await createQdrantCollection({ collectionName: "my-docs" });
 */

export async function createQdrantCollection(
  options?: { vectorSize?: number; collectionName?: string }
): Promise<void> {
  const vectorSize = options?.vectorSize ?? DEFAULT_VECTOR_SIZE;
  const collectionName = options?.collectionName ?? QDRANT_COLLECTION_NAME;
  const client = createQdrantClient();

  try {
    const { exists } = await client.collectionExists(collectionName);

    if (!exists) {
      await client.createCollection(collectionName, {
        vectors: {
          size: vectorSize,
          distance: "Cosine",
        },
      });
      console.log(`Created collection: ${collectionName}`);
    } else {
      console.log(`Collection already exists: ${collectionName}`);
    }
  } catch (error) {
    console.error("Failed to create Qdrant collection:", error);
    throw error;
  }
}