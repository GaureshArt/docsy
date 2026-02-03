import { createQdrantCollection } from "../../vector-database/qdrant/collection.js";
import { convertChunkToPoint } from "../../vector-database/qdrant/helper.js";
import { populateCollection } from "../../vector-database/qdrant/populate.js";
import { Point } from "../../vector-database/qdrant/qdrant.types.js";
import { EmbedChunk } from "./github.types.js";

export async function storeChunks(embedChunks:EmbedChunk[]){
    await createQdrantCollection();
    const points:Point[] = [];
    for(const chunk of embedChunks){
        const point = convertChunkToPoint(chunk);
        points.push(point)
    }
    await populateCollection(points);
}