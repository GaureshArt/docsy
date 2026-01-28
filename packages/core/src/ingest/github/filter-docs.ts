import { GitTreeItem, GitTreeResponse } from "./github.types.js";

const DOCS_EXTENSIONS = ['.md', '.mdx']
const MAX_FILE_SIZE = 1_000_000;



/**
 * Filter repository tree to only documentation files
 * 
 * Extracts .md and .mdx files from GitHub tree response,
 * excluding directories, empty files, and files larger than 1MB.
 * 
 * @param gitTree - Full repository tree from GitHub API
 * @returns Array of documentation files ready for processing
 *
 * @example
 * ```ts
 * const tree = await fetchGitTree("https://github.com/facebook/react");
 * const docs = filterDocs(tree);
 * console.log(`Found ${docs.length} documentation files`);
 * ```
 */
export function filterDocs(gitTree: GitTreeResponse): GitTreeItem[] {
    return gitTree.tree.filter((file) => {
        if (file.type !== 'blob') return false;
        if (!file.size || file.size === 0 || file.size > MAX_FILE_SIZE) return false;
        
        const pathLower = file.path.toLowerCase();
        const hasValidExtension = DOCS_EXTENSIONS.some((ext) =>
            pathLower.endsWith(ext)
        );
        
        return hasValidExtension;
    });
}