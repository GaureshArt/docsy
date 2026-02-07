import { createQdrantCollection } from "../../vector-database/qdrant/collection.js";
import { convertChunkToPoint } from "../../vector-database/qdrant/helper.js";
import { populateCollection } from "../../vector-database/qdrant/populate.js";
import { Point } from "../../vector-database/qdrant/qdrant.types.js";
import { EmbedChunk } from "../sources/github/github.types.js";


/**
 * Stores embedded chunks in the vector database.
 * 
 * @param embedChunks - Array of embedded chunks to store
 * @param options - Storage options
 * @param options.collectionName - Name of the Qdrant collection (default: from env or "docsy-test-1")
 * @param options.vectorSize - Dimension size of embeddings (default: 768 for Gemini)
 * @returns Promise that resolves when chunks are stored
 */
export async function storeChunks(
  embedChunks: EmbedChunk[],
  options?: { collectionName?: string; vectorSize?: number }
) {
    const collectionName = options?.collectionName;
    const vectorSize = options?.vectorSize;
    
    await createQdrantCollection({ collectionName, vectorSize });
    const points: Point[] = [];
    for(const chunk of embedChunks){
        const point = convertChunkToPoint(chunk);
        points.push(point)
    }
    await populateCollection(points, collectionName);
}