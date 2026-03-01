import { generate } from "../generation/generate.js";
import { queryEmbed } from "../retrieval/query-embed.js";
import { querySearch } from "../retrieval/query-search.js";
import { QueryConfig } from "../retrieval/types.js";

export default async function naiveRag(config: QueryConfig) {
    console.log("naiveRag is called");
    const embededqueries = await queryEmbed([config.query], config);
    const retrievedPoints = await Promise.all(embededqueries.map(emb => querySearch(emb, config)))
    const res = await generate(retrievedPoints.flat(), config);
    return res;
}