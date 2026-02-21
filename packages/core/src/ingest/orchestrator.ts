import { fetchGitTree } from './sources/github/fetch-git-tree.js';
import { filterDocs } from './sources/github/filter-docs.js';
import { fetchFileContent } from './sources/github/fetch-file-content.js';
import { cleanFiles } from './sources/github/clean-files.js';
import { chunkFiles } from './processing/chunk-files.js';
import { embedChunks } from './processing/embed-chunks.js';
import { storeChunks } from './processing/store-chunks.js';
import { getEmbedder } from '../ai/embeddings/registry.js';
import { validateOwnerAndRepo } from './sources/github/helper.js';
import { DocsyConfig } from '../config/index.js';


/**
 * Vector size mapping for different embedding providers
 */
const EMBEDDING_VECTOR_SIZES: Record<string, number> = {
  'gemini': 768,
  'openai': 1536,
};

/**
 * Gets the API key for the specified embedding provider from environment variables.
 * 
 * @param provider - Embedding provider name
 * @returns API key string
 * @throws Error if API key is not found
 */

/**
 * Orchestrates the complete ingestion pipeline for documentation.
 * 
 * This function handles the entire flow from fetching repository data
 * to storing embedded chunks in the vector database:
 * 
 * 1. Fetches Git tree from GitHub repository
 * 2. Filters and prioritizes documentation files
 * 3. Fetches file contents
 * 4. Cleans file contents
 * 5. Chunks files into smaller pieces
 * 6. Generates embeddings for chunks
 * 7. Stores embedded chunks in vector database
 * 
 * @param config - Complete Docsy configuration
 * @returns Promise that resolves when ingestion is complete
 * 
 * @throws Error if:
 * - GitHub repository cannot be accessed
 * - API keys are missing
 * - Vector database connection fails
 * - Any step in the pipeline fails
 */
export async function ingest(config: DocsyConfig): Promise<void> {
  const githubUrl = `https://github.com/${config.source.owner}/${config.source.repo}`;
  const branch = config.source.branch ?? 'main';
  validateOwnerAndRepo(config.source.owner, config.source.repo);
  console.log(`Fetching repository tree from ${githubUrl}@${branch}...`);
  const gitTreeResult = await fetchGitTree(config.source.owner, config.source.repo, config.source.branch);
  console.log(`Found ${gitTreeResult.tree.tree.length} total files`);


  console.log('Filtering documentation files...');
  const docs = filterDocs(gitTreeResult.tree, {
    maxFiles: config.processing.maxFiles,
    excludePaths: config.processing.excludePaths,
  });
  console.log(`Selected ${docs.length} documentation files`);


  console.log('Fetching file contents...');
  const rawFiles = await fetchFileContent(docs, gitTreeResult.repository);
  console.log(`Fetched ${rawFiles.length} files`);

  console.log('Cleaning file contents...');
  const cleanedFiles = cleanFiles(rawFiles);
  console.log(`Cleaned ${cleanedFiles.length} files`);


  console.log('Chunking files...');
  const chunks = await chunkFiles(cleanedFiles, {
    chunkSize: config.processing.chunkSize,
    chunkOverlap: config.processing.chunkOverlap,
    githubUrl
  });
  console.log(`Created ${chunks.length} chunks`);


  console.log('Generating embeddings...');
  if (config.embeddings.provider !== 'google') {
    throw new Error(`Embedding provider "${config.embeddings.provider}" is not yet implemented. Only "google" is currently supported.`);
  }


  const modelName = config.embeddings.model
  const embedder = getEmbedder(config.embeddings);

  const embeddedChunks = await embedChunks(chunks, embedder, modelName);
  console.log(`Generated embeddings for ${embeddedChunks.length} chunks`);


  console.log('Storing chunks in vector database...');
  const vectorSize = EMBEDDING_VECTOR_SIZES[config.embeddings.provider];
  await storeChunks(embeddedChunks, {
    collectionName: config.vectorDatabase.collection,
    vectorSize,
  });
  console.log(`Successfully stored ${embeddedChunks.length} chunks in collection "${config.vectorDatabase.collection}"`);
}
