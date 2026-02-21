import { getVectorDB } from "../vector-database/registry.js";
import { Point } from "../vector-database/qdrant/qdrant.types.js";
import type { Chunk } from "../ingest/sources/github/github.types.js";
import { QueryConfig } from "./types.js";

export async function querySearch(queryVector: number[], config: QueryConfig): Promise<Point[]> {

    const vectorDb = await getVectorDB({ provider: config.vectorDatabase.provider });

    const result = await vectorDb.query(config.vectorDatabase.collection, {
        query: queryVector,
        limit: 5,
        with_payload: true,
    });

    const points: Point[] = result.points
        .filter(p => p.payload !== null && p.payload !== undefined)
        .map(p => {
            const meta = (p.payload!.metadata ?? {}) as Partial<Chunk["metadata"]>;
            return {
                id: String(p.id),
                vector: (Array.isArray(p.vector) && Array.isArray(p.vector[0])
                    ? (p.vector as number[][])[0]
                    : (p.vector as number[])) ?? [] as number[],
                payload: {
                    id: String(p.payload!.id ?? ''),
                    content: String(p.payload!.content ?? ''),
                    metadata: {
                        filePath: String(meta.filePath ?? ''),
                        fileSha: String(meta.fileSha ?? ''),
                        chunkIndex: Number(meta.chunkIndex ?? 0),
                        totalChunks: Number(meta.totalChunks ?? 0),
                        previousChunkId: meta.previousChunkId != null
                            ? String(meta.previousChunkId)
                            : null,
                        nextChunkId: meta.nextChunkId != null
                            ? String(meta.nextChunkId)
                            : null,
                    }
                }
            };
        });
    return points;
}