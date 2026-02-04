import { EmbedChunk } from "../../ingest/sources/github/github.types.js";
import { Point } from "./qdrant.types.js";
import { v4 as uuidv4 } from 'uuid'
/**
 * Converts a single embedded chunk to Qdrant point format.
 * 
 * @param {EmbedChunk} embedChunk - Chunk with embeddings to convert
 * @returns {Point} Formatted point ready for Qdrant insertion
 * @throws If embeddings are missing from the chunk
 * 
 * @example
 * const point = convertChunkToPoint(embedChunk);
 * await populateCollection([point]);
 * 
 * @example
 * // Convert multiple chunks
 * const points = embedChunks.map(convertChunkToPoint);
 * await populateCollection(points);
 */
export function convertChunkToPoint(embedChunk: EmbedChunk): Point {
  if (!embedChunk.embeddings) {
    throw new Error(`Embeddings missing for chunk: ${embedChunk.id}`);
  }
  
  const {  embeddings, ...payload } = embedChunk;
  
  return {
    id:uuidv4(),
    vector: embeddings,
    payload,
  };
}