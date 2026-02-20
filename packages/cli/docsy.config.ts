import { defineConfig } from "@gaureshart/docsy-core";

export default defineConfig({
  source: {
    type: "github",
    owner: "GaureshArt",
    repo: "docsy",
    branch: "main",
  },
  processing: {
    maxFiles: 100,
    chunkSize: 1000,
    chunkOverlap: 200,
  },
  embeddings: {
    provider: 'google',
    taskType: "RETRIEVAL_DOCUMENT",
    model: "gemini-embedding-001",
  },
  vectorDatabase: {
    provider: "qdrant",
    collection: "docsy-docs",
  },
});
