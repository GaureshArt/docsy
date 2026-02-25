import { rerank } from "ai";
import { QueryConfig } from "../retrieval/types.js";
import { Point } from "../vector-database/qdrant/qdrant.types.js";
import rankerModelRegistry from "../ai/ranker/ranker-model-registry.js";

/**
 * Reranks search results using a specified AI model and filters by score.
 * @param {Point[]} points - The raw candidate points from the vector database.
 * @param {QueryConfig} config - Configuration containing query, model, and threshold settings.
 * @returns {Promise<Point[]>} A sorted and filtered list of relevant points.
 */
export default async function ranker(points: Point[], config: QueryConfig): Promise<Point[]> {
    const documents = points.map(p => p.payload.content);
    const { scoreThreshold = 0, topN } = config.rankerConfig;

    const model = rankerModelRegistry(config);
    if (!model) return [];

    const { ranking } = await rerank({
        model,
        documents,
        query: config.query,
        topN: topN
    });

    return ranking
        .map(r => {
            if (r.score >= scoreThreshold) {
                return points[r.originalIndex];
            }
        })
        .filter((p): p is Point => !!p);
}