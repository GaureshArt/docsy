import fs from "node:fs/promises";
import prettier from "prettier";

interface ConfigAnswers {
  githubOwner: string;
  githubRepo: string;
  githubBranch: string;
  githubPath?: string;
  maxFiles: number;
  chunkSize: number;
  embeddingProvider: 'gemini' | 'openai';
  collectionName: string;
  excludePaths?: string[];
  strictRegex?: boolean;
}

export async function writeConfig(
  filePath: string,
  config: ConfigAnswers
): Promise<void> {
  const excludePathsArray = config.excludePaths || [];
  const template = `import { defineConfig } from "@docsy/core";

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
  },
  
  vectorDatabase: {
    provider: "qdrant",
    collection: "${config.collectionName}",
  },
});
`;

  const formatted = await prettier.format(template, {
    parser: "typescript",
  });

  await fs.writeFile(filePath, formatted, "utf-8");
}