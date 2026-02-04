import { GitTreeItem, RawFile, RepositoryConfig } from "./github.types.js";
import octokitProvider from "./octokit-provider.js";

const DECODE_FORMAT = 'utf-8'

/**
 * Fetch raw file contents from GitHub
 * 
 * Files that fail to fetch are skipped and logged.
 * This function does NOT throw if individual files fail.
 * 
 * @param docFiles - Filtered list of documentation files
 * @param config - Repository configuration (owner, repo, branch)
 * @returns Array of raw files with content and metadata
 * 
 * @example
 * ```ts
 * const tree = await fetchGitTree("https://github.com/facebook/react");
 * const docs = filterDocs(tree.tree);
 * const files = await fetchFileContent(docs, tree.repository);
 * console.log(`Fetched ${files.length} files`);
 * ```
 */
export async function fetchFileContent(docFiles: GitTreeItem[], config: RepositoryConfig): Promise<RawFile[]> {
  const octokit = octokitProvider;

  const filePromises = docFiles.map(async (file) => {
    try {
      const res = await octokit.rest.repos.getContent({
        repo: config.repo,
        path: file.path,
        owner: config.owner,
        ref:config.branch
      });
      if (!("content" in res.data)) {
        throw new Error(`${file.path} has no content field`);
      }
      if (res.data.encoding !== "base64") {
        throw new Error(`${file.path} has not base64 encoding content`);
      }
      const decodeContent = Buffer.from(res.data.content, res.data.encoding).toString(DECODE_FORMAT);
      return {
        sha: file.sha,
        path: file.path,
        content: decodeContent,
        fetchedAt: new Date(),
        size: res.data.size,
        url: res.data.html_url ?? "",
      }
    } catch (err) {
      console.error(`Failed to fetch content from file: ${file.path}`);
      return null;
    }

  })
  const files = await Promise.all(filePromises);
  const filteredContentFiles = files.filter((file):file is RawFile => file !== null)
  return filteredContentFiles
}
