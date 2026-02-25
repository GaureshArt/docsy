interface CohereRanker {
    provider: 'Cohere';
    model: 'rerank-v3.5' | 'rerank-english-v3.0' | 'rerank-multilingual-v3.0';
    topN?: number;
    scoreThreshold?: number
}
interface BedrockRanker {
    provider: 'Bedrock';
    model: "amazon.rerank-v1:0" | 'cohere.rerank-v3-5:0';
    topN?: number;
    scoreThreshold?: number
}

interface TogetherAiRanker {
    provider: 'TogetherAI';
    model: 'Salesforce/Llama-Rank-v1' | 'mixedbread-ai/Mxbai-Rerank-Large-V2';
    topN?: number;
    scoreThreshold?: number
}
export type RankerConfig = CohereRanker | BedrockRanker | TogetherAiRanker
