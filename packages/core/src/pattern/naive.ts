import { generate } from "../generation/generate.js";
import { queryEmbed } from "../retrieval/query-embed.js";
import { querySearch } from "../retrieval/query-search.js";
import { QueryConfig } from "../retrieval/types.js";

export default async function naiveRag(config: QueryConfig) {
    const embededquery = await queryEmbed(config.query, config);
    const retrievedPoints = await querySearch(embededquery, config);
    const res = await generate(retrievedPoints, config);
    return res;
}