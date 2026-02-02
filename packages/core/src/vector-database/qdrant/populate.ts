import { createQdrantClient } from "./client.js";
import { QDRANT_COLLECTION_NAME } from "./collection.js";
import { Point } from "./qdrant.types.js";

/**
 * Populates Qdrant collection with document embedding points.
 * 
 * @param {Point[]} points - Array of points containing vectors and metadata to insert
 * @returns {Promise<void>}
 * @throws  If population fails
 * 
 * @example
 * const points = convertChunksToPoints(embedChunks);
 * await populateCollection(points);
 */
export async function populateCollection(points: Point[]): Promise<void> {
  if (!points || points.length === 0) {
    console.warn("No points provided to populate");
    return;
  }

  try {
    const client = createQdrantClient();
    const res = await client.upsert(QDRANT_COLLECTION_NAME, {
      wait: true,
      points,
    });

    if (res.status === "completed") {
      console.log(`Successfully populated ${points.length} points to collection`);
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    throw new Error(
      `Failed to populate data points to collection "${QDRANT_COLLECTION_NAME}": ${errorMessage}`
    );
  }
}