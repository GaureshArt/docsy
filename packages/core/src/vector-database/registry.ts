import { createQdrantClient } from "./qdrant/client.js";
import { VectorDBConfig } from "./types.js";

export async function getVectorDB(config: VectorDBConfig) {
    switch (config.provider) {
        case 'qdrant':
            return createQdrantClient()
    }
}