import fs from "node:fs/promises";

export async function writeEnvExample(filePath: string): Promise<void> {
  const template = `# GitHub (required for private repos, optional for public)
GITHUB_TOKEN=

# Embedding Provider (choose one)
GEMINI_API_KEY=
# OPENAI_API_KEY=

# Vector Database (Qdrant)
QDRANT_URL=
QDRANT_API_KEY=
`;

  await fs.writeFile(filePath, template, "utf-8");
}