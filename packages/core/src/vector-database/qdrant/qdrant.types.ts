import { EmbedChunk } from "../../ingest/github/github.types.js"

type chunkPayload = Omit<EmbedChunk, 'embeddings'|'embeddingModel'>
export interface Point{
    id:string,
    vector:number[],
    payload:chunkPayload
}
