import { defineConfig } from "@docsy/core";

export default defineConfig({
  source: {
    type: "github",
    owner: "Vasu7389",
    repo: "react-project-ideas",
    branch: "master",
  },

  processing: {
    maxFiles: 3,
    chunkSize: 1000,
    chunkOverlap: 200,
  },

  embeddings: {
    provider: "gemini",
    model: "gemini-embedding-001",
  },

  vectorDatabase: {
    provider: "qdrant",
    collection: "react-vasu",
  },
});
