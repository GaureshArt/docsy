import { RerankingModel } from 'ai'
import { QueryConfig } from '../../retrieval/types.js'
import { cohere } from '@ai-sdk/cohere'
import { togetherai } from '@ai-sdk/togetherai'
import { bedrock } from '@ai-sdk/amazon-bedrock'
export default function rankerModelRegistry(
    config: QueryConfig,
): RerankingModel {
    switch (config.rankerConfig.provider) {
        case 'Cohere':
            return cohere.reranking(config.rankerConfig.model)
        case 'Bedrock':
            return bedrock.reranking(config.rankerConfig.model)
        case 'TogetherAI':
            return togetherai.reranking(config.rankerConfig.model)
    }
}
