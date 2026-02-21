import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Chunk, RawFile } from "../sources/github/github.types.js";


/**
 * Generate unique chunk ID
 * 
 * Format: {path}-{first8CharsOfSha}-{index}
 * Example: docs/intro.md-a1b2c3d4-0
 * 
 * @param filePath - File path
 * @param fileSha - Git SHA hash
 * @param index - Chunk index (0-based)
 * @returns Unique chunk identifier
 */
function generateChunkId(
  filePath: string,
  fileSha: string,
  index: number
): string {
  const shortSha = fileSha.substring(0, 8);
  const safePath = filePath.replace(/[^a-zA-Z0-9/-]/g, "-");
  return `${safePath}-${shortSha}-${index}`;
}

/**
 * Split documentation files into overlapping chunks
 * 
 * Uses recursive character splitting with markdown-aware separators.
 * Code blocks are preserved by splitting before triple backticks.
 * 
 * Chunk strategy:
 * - Size: 1000 characters (configurable)
 * - Overlap: 200 characters (configurable)
 * - Preserves: code blocks, headers with content, tables
 * 
 * Each chunk includes:
 * - Unique ID based on file path, SHA, and index
 * - Links to previous and next chunks for context navigation
 * - File metadata for freshness tracking
 * 
 * @param files - Cleaned documentation files
 * @param options - Optional chunking configuration
 * @param options.chunkSize - Size of each chunk in characters (default: 1000)
 * @param options.chunkOverlap - Overlap between chunks in characters (default: 200)
 * @returns Array of chunks ready for embedding
 * 
 * @example
 * ```ts
 * const cleaned = cleanFiles(rawFiles);
 * const chunks = await chunkFiles(cleaned, { chunkSize: 1000, chunkOverlap: 200 });
 * console.log(`Created ${chunks.length} chunks`);
 * ```
 */
export async function chunkFiles(
  files: RawFile[],
  options?: { chunkSize?: number; chunkOverlap?: number, githubUrl: string }
): Promise<Chunk[]> {
  const chunkSize = options?.chunkSize ?? 1000;
  const chunkOverlap = options?.chunkOverlap ?? 200;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize,
    chunkOverlap,
    separators: [
      "\n```",
      "\n## ",
      "\n### ",
      "\n#### ",
      "\n\n",
      "\n",
      ". ",
      " ",
      "",
    ],
  });

  const allChunks: Chunk[] = [];

  for (const file of files) {
    const docs = await splitter.createDocuments([file.content]);

    const fileChunks: Chunk[] = docs.map((doc, index) => {
      const chunkId = generateChunkId(file.path, file.sha, index);
      const previousChunkId = index > 0
        ? generateChunkId(file.path, file.sha, index - 1)
        : null;
      const nextChunkId = index < docs.length - 1
        ? generateChunkId(file.path, file.sha, index + 1)
        : null;

      return {
        id: chunkId,
        content: doc.pageContent,
        metadata: {
          filePath: `${options?.githubUrl}/tree/main/${file.path}`,
          fileSha: file.sha,
          chunkIndex: index,
          totalChunks: docs.length,
          previousChunkId,
          nextChunkId,
        },
      };
    });

    allChunks.push(...fileChunks);
  }


  return allChunks;
}