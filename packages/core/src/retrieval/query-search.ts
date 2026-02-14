import path from "path";
import { getVectorDB } from "../vector-database/registry.js";
import { Point } from "../vector-database/qdrant/qdrant.types.js";

export async function querySearch(queryVector: number[]): Promise<Point[]> {
    const configPath = path.join(process.cwd(), 'docsy.config.ts');
    const { default: config } = await import(configPath);

    const vectorDb = await getVectorDB({ provider: 'qdrant' });

    const result = await vectorDb.query(config.vectorDatabase.collection, {
        query: queryVector,
        limit: 5,
        with_payload: true
    });

    const points: Point[] = result.points
        .filter(p => p.payload !== null && p.payload !== undefined)
        .map(p => ({
            id: String(p.id),
            vector: (Array.isArray(p.vector) && Array.isArray(p.vector[0])
                ? (p.vector as number[][])[0]
                : (p.vector as number[])) ?? [] as number[],
            payload: {
                id: String(p.payload!.id ?? ''),
                content: String(p.payload!.content ?? ''),
                metadata: {
                    filePath: String(p.payload!.filePath ?? ''),
                    fileSha: String(p.payload!.fileSha ?? ''),
                    chunkIndex: Number(p.payload!.chunkIndex ?? 0),
                    totalChunks: Number(p.payload!.totalChunks ?? 0),
                    previousChunkId: p.payload!.previousChunkId
                        ? String(p.payload!.previousChunkId)
                        : null,
                    nextChunkId: p.payload!.nextChunkId
                        ? String(p.payload!.nextChunkId)
                        : null,
                }
            }
        }));

    return points;
}