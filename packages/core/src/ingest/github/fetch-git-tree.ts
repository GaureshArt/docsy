import { GitTreeResponse } from "./github.types.js";
import octokitProvider from "./octokit-provider.js";

function getOwnerAndRepoFromUrl(url: string): [string, string] {
    const [owner = "", repo = ""] = url.split("/");
    if (!owner || !repo) {
        throw new Error(`Invalid format. Expected "owner/repo", got "${url}"`);
    }
    return [owner, repo];
}
function validateAndParseUrl(url: string): string {
    if (!url.startsWith("https://github.com/")) {
        throw new Error("Invalid URL");
    }
    const parsed = url.replace("https://github.com/", "");
    const parts = parsed.split("/");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
        throw new Error(`Invalid format. Expected "owner/repo", got "${parsed}"`);
    }
    return parsed
}

export async function fetchGitTree(url: string, branch: string = "main"): Promise<GitTreeResponse> {
    const repoPath = validateAndParseUrl(url);
    const octokit = octokitProvider;

    const [owner, repo] = getOwnerAndRepoFromUrl(repoPath) as [string, string];
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
