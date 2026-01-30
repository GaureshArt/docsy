import { RawFile } from "./github.types.js";

const WINDOWS_LINE_ENDINGS = /\r\n/g;
const TABS = /\t/g;
const BR_TAGS = /<br\s*\/?>/gi;
const ZERO_WIDTH_CHARS = /[\u200B-\u200D\uFEFF]/g;
const IMG_TAGS = /<img[^>]*>/gi;
const EXCESSIVE_NEWLINES = /\n{3,}/g;
const MULTIPLE_SPACES = /[ ]{2,}/g;
const CODE_FENCE = /^\s*```/;

/**
 * Create a new `RawFile` with cleaned content while preserving metadata.
 *
 * This function acts as a safe factory:
 * - Guarantees the returned object conforms to `RawFile`
 * - Prevents accidental shape mismatches during refactors
 *
 * @param file - Original raw file with metadata
 * @param cleanedContent - Cleaned and normalized file content
 * @returns A new `RawFile` instance with updated content
 */
function createRawFile(file: RawFile, cleanedContent: string): RawFile {
    return {
        ...file,
        content: cleanedContent,
    };
}

/**
 * Clean and normalize raw file contents.
 *
 * Cleaning rules:
 * - Normalize Windows line endings (`\r\n` → `\n`)
 * - Remove tab characters
 * - Remove `<br>` HTML tags (self-closing and normal)
 * - Remove zero-width Unicode characters
 * - Strip `<img>` tags (icons, badges, logos)
 * - Collapse excessive blank lines (3+ → 2)
 * - Remove multiple spaces (2+ → 1)
 * - Trim whitespace **only outside fenced code blocks**
 *
 *  Code block handling:
 * - Lines inside fenced code blocks (``` … ```) are left untouched
 * - Indentation and spacing inside code blocks are preserved exactly
 *
 * This function:
 * - Does NOT modify file metadata (path, sha, url, etc.)
 * - Preserves code blocks and markdown structure
 * - Returns a new array (does not mutate input)
 *
 * @param uncleanFiles - Raw files fetched from GitHub
 * @returns Cleaned raw files, safe for chunking and embedding
 *
 * @example
 * ```ts
 * const rawFiles = await fetchFileContent(docs, repoConfig);
 * const cleanedFiles = cleanFiles(rawFiles);
 * console.log(`Cleaned ${cleanedFiles.length} files`);
 * ```
 */
export function cleanFiles(uncleanFiles: RawFile[]): RawFile[] {
    const cleaned = uncleanFiles.map((file) => {
        const lines = file.content
            .replace(WINDOWS_LINE_ENDINGS, '\n')
            .replace(TABS, ' ')
            .replace(BR_TAGS, ' ')
            .replace(ZERO_WIDTH_CHARS, '')
            .replace(IMG_TAGS, '')
            .replace(EXCESSIVE_NEWLINES, '\n\n')
            .split('\n');

        let inCodeBlock = false;

        const cleanedContent = lines
            .map((line) => {
                if (CODE_FENCE.test(line)) {
                    inCodeBlock = !inCodeBlock;
                    return line.trimEnd();
                }

                if (inCodeBlock) {
                    return line;
                }

                return line
                    .replace(MULTIPLE_SPACES, ' ')
                    .trim();
            })
            .join('\n')
            .trim();

        return createRawFile(file, cleanedContent);
    });

    return cleaned;
}