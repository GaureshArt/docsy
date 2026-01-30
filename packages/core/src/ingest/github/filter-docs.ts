import { GitTreeItem, GitTreeResponse, PriorityRule } from "./github.types.js";

const DOCS_EXTENSIONS = ['.md', '.mdx'];
const MAX_FILE_SIZE = 1_000_000;
const MAX_FILES_LIMIT = 150;

const HARD_EXCLUDES = [
  "node_modules",
  "vendor",
  "dist",
  "build",
];

const LOW_SIGNAL_DIRS = [
  "test",
  "tests",
  "__tests__",
  "fixtures",
  "mocks",
  ".github",
];

const DOC_DIRS = [
  "docs",
  "documentation",
  "doc",
];

const API_DIRS = [
  "api",
  "interfaces",
  "modules",
  "reference",
];

const GUIDE_DIRS = [
  "guide",
  "guides",
  "tutorial",
  "tutorials",
  "concepts",
];

const BLOG_DIRS = [
  "blog",
  "_posts",
  "articles",
];


const PRIORITY_RULES: PriorityRule[] = [
  {
    score: 1000,
    match: (path) => path === "readme.md" || path === "readme.mdx",
  },
  {
    score: 950,
    match: (path) =>
      path.includes("getting-started") ||
      path.includes("quick-start") ||
      path.includes("quickstart") ||
      path.includes("installation"),
  },
  {
    score: 900,
    match: (path, segments) =>
      path.endsWith("/readme.md") && segments.includes("packages"),
  },
  {
    score: 800,
    match: (_, segments) => segments.some(s => DOC_DIRS.includes(s)),
  },
  {
    score: 750,
    match: (_, segments) =>
      segments.includes("packages") &&
      segments.some(s => DOC_DIRS.includes(s)),
  },
  {
    score: 700,
    match: (path) =>
      path.includes("migration") ||
      path.includes("upgrade") ||
      path.includes("migrating"),
  },
  {
    score: 650,
    match: (_, segments) => segments.some(s => API_DIRS.includes(s)),
  },
  {
    score: 625,
    match: (path) => /\/\d{2,}[-_]/.test(path),
  },
  {
    score: 600,
    match: (_, segments) => segments.some(s => GUIDE_DIRS.includes(s)),
  },
  {
    score: 300,
    match: (_, segments) =>
      segments.includes("examples") || segments.includes("example"),
  },
  {
    score: 150,
    match: (_, segments) => segments.some(s => BLOG_DIRS.includes(s)),
  },
  {
    score: 100,
    match: (path, segments) =>
      path.includes("changelog") || segments.includes("errors"),
  },
  {
    score: 50,
    match: (path) =>
      path.includes("contributing") ||
      path.includes("license") ||
      path.includes("code_of_conduct") ||
      path.includes("security"),
  },
];

/**
 * Calculate importance score for a documentation file
 * 
 * Scoring system:
 * - Root README: 1000 points
 * - Getting started guides: 950 points
 * - Package READMEs: 900 points
 * - Documentation folders: 800 points
 * - API references: 650 points
 * - Guides and tutorials: 600 points
 * - Examples: 300 points
 * - Blog posts: 150 points
 * - Changelogs: 100 points
 * - Contributing guides: 50 points
 * 
 * Penalties:
 * - Test directories: -500 points
 * - Deep nesting: -5 points per level
 * - Hard excludes: -1000 points (filtered out)
 * 
 * @param path - File path relative to repository root
 * @returns Numeric score (higher = more important, negative = excluded)
 */
function calculateDocScore(path: string): number {
  const lower = path.toLowerCase();
  const segments = lower.split("/");
  const depth = segments.length;

  if (segments.some(s => HARD_EXCLUDES.includes(s))) {
    return -1000;
  }

  let score = 0;

  for (const rule of PRIORITY_RULES) {
    if (rule.match(lower, segments)) {
      score += rule.score;
    }
  }

  if (segments.some(s => LOW_SIGNAL_DIRS.includes(s))) {
    score -= 500;
  }

  score -= depth * 5;

  return score;
}

/**
 * Sort documentation files by calculated importance
 * 
 * Prioritizes files based on:
 * - Location (root, docs folder, packages)
 * - Purpose (README, getting started, API reference)
 * - Depth (shallower paths ranked higher)
 * 
 * Excludes files from:
 * - node_modules, vendor, dist, build
 * - Test directories
 * 
 * @param files - Array of documentation files
 * @returns Sorted array with highest priority files first
 */
function prioritizeDocsByImportance(files: GitTreeItem[]): GitTreeItem[] {
  const scored = files
    .map(file => ({
      file,
      score: calculateDocScore(file.path),
    }))
    .filter(({ score }) => score > -1000);

  const sorted = scored.sort((a, b) => {
    const diff = b.score - a.score;
    return diff !== 0 ? diff : a.file.path.localeCompare(b.file.path);
  });


  return sorted.map(s => s.file);
}

/**
 * Filter and prioritize repository documentation files
 * 
 * Extracts .md and .mdx files from GitHub tree response,
 * excluding directories, empty files, and files larger than 1MB.
 * 
 * Applies intelligent prioritization:
 * - README files and getting started guides ranked highest
 * - Main documentation folders prioritized over auxiliary content
 * - Test files and low-signal directories deprioritized
 * - Deep nested files ranked lower than top-level docs
 * 
 * Limits to top 100 files by priority to control processing costs.
 * 
 * @param gitTree - Full repository tree from GitHub API
 * @returns Array of prioritized documentation files ready for processing
 *
 * @example
 * ```ts
 * const result = await fetchGitTree("https://github.com/facebook/react");
 * const docs = filterDocs(result.tree);
 * console.log(`Processing ${docs.length} documentation files`);
 * ```
 */
export function filterDocs(gitTree: GitTreeResponse): GitTreeItem[] {
  const filtered = gitTree.tree.filter((file) => {
    if (file.type !== 'blob') return false;
    if (!file.size || file.size === 0 || file.size > MAX_FILE_SIZE) return false;

    const pathLower = file.path.toLowerCase();
    const hasValidExtension = DOCS_EXTENSIONS.some((ext) =>
      pathLower.endsWith(ext)
    );

    return hasValidExtension;
  });

  const prioritized = prioritizeDocsByImportance(filtered);

  if (prioritized.length > MAX_FILES_LIMIT) {
    console.warn(
      `Found ${prioritized.length} documentation files, processing top ${MAX_FILES_LIMIT} by priority`
    );
    return prioritized.slice(0, MAX_FILES_LIMIT);
  }

  console.log(`Selected ${prioritized.length} documentation files for processing`);
  return prioritized;
}