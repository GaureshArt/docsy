interface GoogleEmbeddingConfig {
  provider: 'google'
  taskType: 'RETRIEVAL_DOCUMENT' | 'QUESTION_ANSWERING'
  model: 'gemini-embedding-001'
}

interface OpenAIEmbeddingConfig {
  provider: 'openai'
  model: 'text-embedding-3-small' | 'text-embedding-3-large'
}
export type EmbeddingConfig = GoogleEmbeddingConfig | OpenAIEmbeddingConfig

export interface Embedder {
  (texts: string[]): Promise<number[][]>
}
