import { generate } from "../generation/generate.js";
import queryOptimizationRegistry from "../query-optimization/registry.js";
import ranker from "../ranker/ranker.js";
import { queryEmbed } from "../retrieval/query-embed.js";
import { querySearch } from "../retrieval/query-search.js";
import { QueryConfig } from "../retrieval/types.js";

export default async function advancedRag(config: QueryConfig) {
    const optimizedQuery = await queryOptimizationRegistry(config);
    console.log("query optmization done: ", optimizedQuery);
    const queries = Array.isArray(optimizedQuery) ? optimizedQuery : [optimizedQuery];
    const embeddings = await queryEmbed(queries, config);
    console.log("query embedign doen:");
    const retrievedPoints = await Promise.all(embeddings.map(emb => querySearch(emb, config)));
    const uniquePoints = Array.from(
        new Map(retrievedPoints.flat().map(p => [p.id, p])).values()
    );
    console.log("Retrived points successfully: ", uniquePoints.length);
    const topRankedPoints = await ranker(uniquePoints, config);
    console.log("Get ranker best pints", topRankedPoints.length);
    const res = await generate(topRankedPoints, config);
    return res;
}