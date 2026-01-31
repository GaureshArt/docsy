import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Chunk, RawFile } from "./github.types.js";


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
 * - Size: 1000 characters 
 * - Overlap: 200 characters 
 * - Preserves: code blocks, headers with content, tables
 * 
 * Each chunk includes:
 * - Unique ID based on file path, SHA, and index
 * - Links to previous and next chunks for context navigation
 * - File metadata for freshness tracking
 * 
 * @param files - Cleaned documentation files
 * @returns Array of chunks ready for embedding
 * 
 * @example
 * ```ts
 * const cleaned = cleanFiles(rawFiles);
 * const chunks = await chunkFiles(cleaned);
 * console.log(`Created ${chunks.length} chunks`);
 * ```
 */
export async function chunkFiles(files: RawFile[]): Promise<Chunk[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
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
          filePath: file.path,
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