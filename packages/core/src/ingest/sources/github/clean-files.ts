import { RawFile } from "./github.types.js";

const WINDOWS_LINE_ENDINGS = /\r\n/g;
const ZERO_WIDTH_CHARS = /[\u200B-\u200D\uFEFF]/g;
const BR_TAGS = /<br\s*\/?>/gi;
const IMG_TAGS = /<img[^>]*>/gi;
const EXCESSIVE_NEWLINES = /\n{4,}/g;
const MULTIPLE_SPACES = / {3,}/g;

const CODE_FENCE = /^\s*```[\w-]*\s*$/;
const TABLE_LINE = /^\s*\|.*\|\s*$/;
const HEADING_LINE = /^#{1,6}\s+/;

const LOW_VALUE_PATH_SEGMENTS = [
  "/__tests__/",
  "/fixtures/",
  "/mocks/",
];

const LOREM_IPSUM_PATTERNS = [
  /lorem ipsum/i,
  /dolor sit amet/i,
  /consectetur adipiscing/i,
  /sed do eiusmod/i,
  /ut labore et dolore/i,
];

/**
 * Determines whether a file path should be excluded from embedding
 * due to being test, fixture, or mock-related content.
 *
 * @param path - Repository-relative file path
 * @returns True if the file is considered low-value
 */
function isLowValuePath(path: string): boolean {
  const normalized = path.toLowerCase();
  return LOW_VALUE_PATH_SEGMENTS.some(segment =>
    normalized.includes(segment),
  );
}

/**
 * Detects placeholder documentation based on repeated lorem ipsum markers.
 * A minimum threshold is enforced to avoid accidental false positives.
 *
 * @param content - Raw file content
 * @returns True if placeholder content is detected
 */
function containsLoremIpsum(content: string): boolean {
  let hits = 0;

  for (const pattern of LOREM_IPSUM_PATTERNS) {
    const match = content.match(pattern);
    if (match) hits += match.length;
    if (hits >= 2) return true;
  }

  return false;
}

/**
 * Cleans markdown content while preserving semantic boundaries.
 * Code blocks, tables, and headings are preserved exactly to prevent
 * structural corruption and semantic drift.
 *
 * @param content - Raw markdown content
 * @returns Normalized content safe for embedding
 */
function cleanContentPreservingStructure(content: string): string {
  const normalized = content
    .replace(WINDOWS_LINE_ENDINGS, "\n")
    .replace(ZERO_WIDTH_CHARS, "")
    .replace(BR_TAGS, " ")
    .replace(IMG_TAGS, "")
    .replace(EXCESSIVE_NEWLINES, "\n\n");

  const lines = normalized.split("\n");

  let inCodeBlock = false;
  let inTable = false;

  const output: string[] = [];

  for (const line of lines) {
    if (CODE_FENCE.test(line)) {
      inCodeBlock = !inCodeBlock;
      inTable = false;
      output.push(line.trimEnd());
      continue;
    }

    if (inCodeBlock) {
      output.push(line);
      continue;
    }

    if (TABLE_LINE.test(line)) {
      inTable = true;
      output.push(line.trimEnd());
      continue;
    }

    if (inTable) {
      inTable = false;
    }

    if (HEADING_LINE.test(line)) {
      output.push(line.trimEnd());
      continue;
    }

    output.push(
      line
        .replace(MULTIPLE_SPACES, " ")
        .trimEnd(),
    );
  }

  return output.join("\n").trimEnd();
}

/**
 * Produces a new RawFile instance with updated content while preserving
 * all original file metadata.
 *
 * @param file - Original file object
 * @param content - Cleaned file content
 * @returns New RawFile instance
 */
function withCleanedContent(file: RawFile, content: string): RawFile {
  return {
    ...file,
    content,
  };
}

/**
 * Filters and normalizes repository files for semantic embedding.
 * Low-value paths and placeholder documentation are excluded.
 *
 * @param files - Raw repository files
 * @returns Cleaned, embedding-safe files
 */
export function cleanFiles(files: RawFile[]): RawFile[] {
  return files
    .filter(file => {
      if (isLowValuePath(file.path)) return false;
      if (containsLoremIpsum(file.content)) return false;
      return true;
    })
    .map(file =>
      withCleanedContent(
        file,
        cleanContentPreservingStructure(file.content),
      ),
    );
}
