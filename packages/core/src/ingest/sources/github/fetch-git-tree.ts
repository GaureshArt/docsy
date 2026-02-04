import { FetchGitTreeResponse, GitTreeResponse, RepositoryConfig } from "./github.types.js";
import octokitProvider from "./octokit-provider.js";

function validateAndParseUrl(url: string): string {
    if (!url.startsWith("https://github.com/")) {
        throw new Error("URL must start with 'https://github.com/'");
    }
    return url.replace("https://github.com/", "");
}

function getOwnerAndRepoFromUrl(url: string): [string, string] {
    const parts = url.split("/");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
        throw new Error(`Invalid format. Expected "owner/repo", got "${url}"`);
    }
    return [parts[0], parts[1]];
}

/**
 * Fetches the complete Git tree of a GitHub repository using the Git Tree API.
 *
 * This function retrieves all files and directories from the specified branch
 * by calling GitHub’s `git.getTree` API with the `recursive` option enabled.
 *
 * Internally, the branch name is passed as `tree_sha`, which GitHub resolves
 * to the latest commit on that branch.
 *
 * @param url - Full GitHub repository URL (e.g. "https://github.com/owner/repo")
 * @param branch - Branch name to fetch the tree from (default: "main")
 *
 * @returns An object containing:
 * - `tree`: the full Git tree response from GitHub
 * - `repository`: repository metadata (owner, repo, branch)
 *
 * @throws 
 * - If the repository URL format is invalid
 * - If the GitHub API request fails or the branch does not exist
 *
 * @example
 * ```ts
 * const result = await fetchGitTree(
 *   "https://github.com/vercel/next.js",
 *   "canary"
 * );
 *
 * console.log(`Found ${result.tree.tree.length} files`);
 * ```
 */

export async function fetchGitTree(url: string, branch: string = "main"): Promise<FetchGitTreeResponse> {
    const repoPath = validateAndParseUrl(url);
    const octokit = octokitProvider;

    const [owner, repo] = getOwnerAndRepoFromUrl(repoPath);
    try {
        const tree = await octokit.rest.git.getTree({
            owner,
            repo,
            tree_sha: branch,
            recursive: "true",
        });
        return {
            tree: tree.data,
            repository: {
                owner,
                repo,
                branch
            }
        };
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                `Failed to fetch tree for ${owner}/${repo}@${branch}: ${error.message}`
            );
        }
        throw error;
    }
}
