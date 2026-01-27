import { GitTreeResponse } from "./github.types.js";
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
export async function fetchGitTree(url: string, branch: string = "main"): Promise<GitTreeResponse> {
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
        return tree.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                `Failed to fetch tree for ${owner}/${repo}@${branch}: ${error.message}`
            );
        }
        throw error;
    }
}
