import { EmbedChunk } from "../../ingest/github/github.types.js"

type chunkPayload = Omit<EmbedChunk,'id' | 'embeddings'>
export interface Point{
    id:string,
    vector:number[],
    payload:chunkPayload
}
