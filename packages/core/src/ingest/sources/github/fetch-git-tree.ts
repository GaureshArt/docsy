import { FetchGitTreeResponse } from "./github.types.js";
import octokitProvider from "./octokit-provider.js";

/**
 * Fetches the complete Git tree of a GitHub repository using the Git Tree API.
 *
 * This function retrieves all files and directories from the specified branch
 * by calling Octokit `git.getTree` REST API with the `recursive` option enabled.
 *
 * Internally, the branch name is passed as `tree_sha`, which GitHub resolves
 * to the latest commit on that branch.
 *
 * @param owner - Owner of the repo (e.g. vercel is owner in "https://github.com/vercel/next.js")
 * @param repo - Name of the repo which need to fetch. (e.g. next.js is repo in  "https://github.com/vercel/next.js")
 * @param branch - Branch name to fetch the tree from (default: "main")
 *
 * @returns An object containing:
 * - `tree`:  the full Git tree response from GitHub 
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

export async function fetchGitTree(owner: string, repo: string, branch: string = "main"): Promise<FetchGitTreeResponse> {
    const octokit = octokitProvider();
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
