import { createQdrantClient } from "./client.js";
import { QDRANT_COLLECTION_NAME } from "./collection.js";
import { Point } from "./qdrant.types.js";

/**
 * Populates Qdrant collection with document embedding points.
 * 
 * @param {Point[]} points - Array of points containing vectors and metadata to insert
 * @param {string} [collectionName] - Name of the collection (default: from env or "docsy-test-1")
 * @returns {Promise<void>}
 * @throws  If population fails
 * 
 * @example
 * const points = convertChunksToPoints(embedChunks);
 * await populateCollection(points);
 * 
 * @example
 * await populateCollection(points, "my-custom-collection");
 */
export async function populateCollection(
  points: Point[],
  collectionName?: string
): Promise<void> {
  if (!points || points.length === 0) {
    console.warn("No points provided to populate");
    return;
  }

  const targetCollection = collectionName ?? QDRANT_COLLECTION_NAME;

  try {
    const client = createQdrantClient();
    const res = await client.upsert(targetCollection, {
      wait: true,
      points,
    });

    if (res.status === "completed") {
      console.log(`Successfully populated ${points.length} points to collection "${targetCollection}"`);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to populate data points to collection "${targetCollection}": ${errorMessage}`
    );
  }
}