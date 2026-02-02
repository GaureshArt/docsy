import { QdrantClient } from "@qdrant/js-client-rest";

/**
 * Creates and returns a configured Qdrant client instance.
 * 
 * @returns {QdrantClient} Configured Qdrant client
 * @throws {Error} If QDRANT_URL or QDRANT_API_KEY environment variables are not set
 * 
 * @example
 * const client = createQdrantClient();
 * await client.getCollections();
 */
export function createQdrantClient(): QdrantClient {
  if (!process.env.QDRANT_URL || !process.env.QDRANT_API_KEY) {
    throw new Error("QDRANT_URL and QDRANT_API_KEY must be set in environment variables");
  }

  return new QdrantClient({
    url: process.env.QDRANT_URL,
    apiKey: process.env.QDRANT_API_KEY,
  });
}