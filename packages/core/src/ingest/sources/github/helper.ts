/**
 * Validates GitHub repository owner and repository name.
 *
 * @param owner - GitHub username or organization name (e.g. "vercel")
 * @param repo - GitHub repository name (e.g. "next.js")
 * @returns `true` if the owner and repo are valid
 * @throws  If owner or repo is missing
 * @throws  If owner or repo contains slashes
 * @throws  If owner does not follow GitHub naming rules
 * @throws  If repo does not follow GitHub naming rules
 */
export function validateOwnerAndRepo(owner: string, repo: string) {
    if (!owner || !repo) {
        throw new Error('Owner and repo are required');
    }
    if (owner.includes('/') || repo.includes('/')) {
        throw new Error('Owner and repo must be provided separately (no slashes)');
    }
    const ownerRegex = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
    const repoRegex = /^[a-zA-Z0-9._-]+$/;
    if (!ownerRegex.test(owner)) {
        throw new Error(
            'Invalid GitHub owner name. Use letters, numbers, or hyphens only.'
        );
    }
    if (!repoRegex.test(repo)) {
        throw new Error(
            'Invalid GitHub repo name. Use letters, numbers, ".", "_" or "-".'
        );
    }

    return true;
}
