import { queryEmbed } from "./query-embed.js";
import { querySearch } from "./query-search.js";
import { QueryConfig } from "./types.js";


export async function retrive() {
    const query = "What is the  day 4 project?";
    const config = {
        embeddings: {
            provider: 'gemini', model: 'gemini-embedding-001', apikey: process.env.GEMINI_API_KEY
        }
    } as QueryConfig
    const vectorQuery = await queryEmbed(query, config);
    console.log("vector is done: ")
    const res = await querySearch(vectorQuery)

}
retrive();