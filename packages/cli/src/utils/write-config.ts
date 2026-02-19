import fs from "node:fs/promises";

interface ConfigAnswers {
  githubOwner: string;
  githubRepo: string;
  githubBranch: string;
  githubPath?: string;
  maxFiles: number;
  chunkSize: number;
  embeddingProvider: 'google' | 'openai';

  collectionName: string;
  excludePaths?: string[];
  strictRegex?: boolean;
}

export async function writeConfig(
  filePath: string,
  config: ConfigAnswers
): Promise<void> {
  const excludePathsArray = config.excludePaths || [];
  const template = `import { defineConfig } from "@gaureshart/docsy-core";

export default defineConfig({
  source: {
    type: "github",
    owner: "${config.githubOwner}",
    repo: "${config.githubRepo}",
    branch: "${config.githubBranch}",
    ${config.githubPath ? `path: "${config.githubPath}",` : ''}
  },
  
  processing: {
    maxFiles: ${config.maxFiles},
    chunkSize: ${config.chunkSize},
    chunkOverlap: 200,
    ${excludePathsArray.length > 0 ? `excludePaths: ${JSON.stringify(excludePathsArray)},` : ''}
    ${config.strictRegex !== undefined ? `strictRegex: ${config.strictRegex},` : ''}
  },
  
  embeddings: {
    provider: "${config.embeddingProvider}",
    model:
  },
  
  vectorDatabase: {
    provider: "qdrant",
    collection: "${config.collectionName}",
  },
});
`;
  await fs.writeFile(filePath, template, "utf-8");
}