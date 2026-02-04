# Docsy

**Drop-in RAG component that transforms GitHub documentation into an AI-powered knowledge base for React applications.**

Stop forcing users to scroll through endless markdown files. Let them ask questions and get instant, contextual answers from your technical documentation.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js 16+](https://img.shields.io/badge/Next.js-16+-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-CC3534?style=flat-square&logo=pnpm)](https://pnpm.io/)

---

## What is Docsy?

Docsy is a **headless RAG (Retrieval-Augmented Generation) component** that turns your GitHub documentation into an intelligent Q&A system.

Point it at your repo's docs, and Docsy handles everything:
- 📥 Fetches markdown files from GitHub
- 🧹 Cleans and normalizes content
- ✂️ Chunks documents intelligently (preserves code blocks, tables, structure)
- 🧠 Generates embeddings for semantic search
- 💾 Stores in vector database (Qdrant)
- 💬 Powers natural language queries over your docs

**Built for React/Next.js/TypeScript projects.** Headless by design—bring your own UI or use our components.

---

## Why Docsy?

**For developers:**
- No need to build RAG pipelines from scratch
- Production-ready document processing and chunking
- Markdown-aware (never splits code blocks mid-function)
- TypeScript-first with full type safety

**For users:**
- Ask questions in natural language instead of searching
- Get contextual answers with source citations
- Works with technical content (APIs, tutorials, guides)

**For documentation maintainers:**
- Keep using GitHub and markdown (zero migration)
- Automatic content prioritization (README > guides > API docs)
- Smart filtering (excludes tests, build artifacts, node_modules)



> **Note:** Full query/retrieval API coming soon. Current release focuses on ingestion pipeline.

---

## Features

### 🎯 Smart Document Processing
- **Intelligent filtering** — Only indexes `.md` and `.mdx` files
- **Priority ranking** — README > getting-started > main docs > API > examples
- **Monorepo support** — Handles packages, modules, nested structures
- **Auto-exclusions** — Skips `node_modules`, tests, build artifacts

### ✂️ Markdown-Aware Chunking
- **Code block preservation** — Never splits code mid-function
- **Header context** — Keeps headings with their content
- **Table integrity** — Respects markdown table structures
- **Smart overlapping** — Context windows for better retrieval

### 🏗️ Production-Ready Architecture
- **TypeScript throughout** — Full type safety, no `any`
- **Modular design** — Swap out embedding providers, vector stores
- **Error handling** — Graceful failures with detailed error messages
- **Efficient processing** — Tested with 100+ documentation files

---

## Current Status

Docsy is under active development. **Core ingestion pipeline is complete:**

✅ **GitHub Integration** — Fetch docs from any public repository  
✅ **Content Filtering** — Smart prioritization with rule-based scoring  
✅ **Markdown Cleaning** — Remove HTML, normalize whitespace  
✅ **Intelligent Chunking** — Structure-aware document splitting  
✅ **Embedding Generation** — Vector embeddings via Gemini  
✅ **Vector Storage** — Qdrant integration complete  

**Next up:**
- 🚧 Semantic search and retrieval API
- 🚧 Pre-built chat UI component
- 🚧 Next.js integration example
- 🚧 Self-hosted deployment guides

---

## Architecture

```
GitHub Repo → Fetch Docs → Filter & Prioritize → Clean Content 
→ Smart Chunking → Generate Embeddings → Vector DB (Qdrant)
→ [Coming Soon: Query → Search → Context → LLM → Response]
```

**Design principles:**
- **Headless by default** — Use your own UI or ours
- **Modular components** — Swap embedding models, vector stores
- **Type-safe** — Full TypeScript, strict mode enabled
- **Immutable transformations** — Pure functions, no side effects

---

## Technical Stack

| Layer | Technology |
|-------|-----------|
| Language | TypeScript 5.7+ |
| Framework | Next.js 16+ (optional, for UI) |
| Chunking | LangChain RecursiveCharacterTextSplitter |
| Embeddings | Google Gemini (text-embedding-004) |
| Vector DB | Qdrant Cloud |
| Package Manager | pnpm |
| Monorepo | Turborepo |

**Future support:** OpenAI embeddings, Pinecone, pgvector, local models

---

## Roadmap

### ✅ Phase 1: Ingestion Pipeline (Complete)
- [x] GitHub repository fetching
- [x] Intelligent filtering and prioritization
- [x] Content cleaning and normalization
- [x] Markdown-aware chunking
- [x] Embedding generation (Gemini)
- [x] Vector database integration (Qdrant)

### 🚧 Phase 2: Retrieval & Query (In Progress)
- [ ] Semantic search implementation
- [ ] Context ranking and reranking
- [ ] Citation generation with GitHub links
- [ ] Query optimization

### 📋 Phase 3: UI Components
- [ ] Pre-built chat interface (React)
- [ ] Streaming responses
- [ ] Syntax highlighting for code
- [ ] Source citations UI
- [ ] Feedback mechanism

### 🔮 Phase 4: Beyond GitHub
- [ ] Website scraping adapter
- [ ] Local filesystem support
- [ ] Google Drive integration
- [ ] Generic adapter interface

### 🚀 Phase 5: Scale & Performance
- [ ] Incremental updates (only changed files)
- [ ] Multiple LLM providers (OpenAI, Anthropic, local)
- [ ] Multiple vector stores (Pinecone, Supabase, pgvector)
- [ ] Caching layer for common queries

---

## Project Structure
```
docsy/
├── apps/                          # User apps
├── packages/
│   ├── core/                     # RAG engine
│   │   └── src/
│   │       ├── ai/               # AI layer
│   │       │   ├── embeddings/   # Embedding providers
│   │       │   └── types.ts      # AI types
│   │       ├── ingest/           # Data ingestion
│   │       │   ├── processing/   # Ingest pipeline
│   │       │   │   ├── chunk-files.ts    # File chunking
│   │       │   │   ├── embed-chunks.ts   # Chunk embedding
│   │       │   │   └── store-chunks.ts   # Vector storage
│   │       │   └── sources/      # Data sources
│   │       │       └── github/   # GitHub ingestion
│   │       │           ├── clean-files.ts        # File cleanup
│   │       │           ├── fetch-file-content.ts # File fetch
│   │       │           ├── fetch-git-tree.ts     # Repo tree
│   │       │           ├── filter-docs.ts        # Doc filter
│   │       │           ├── github.types.ts       # GitHub types
│   │       │           ├── octokit-provider.ts   # GitHub client
│   │       │           └── test-fetch.ts         # Fetch tests
│   │       ├── vector-database/  # Vector storage
│   │       │   └── qdrant/       # Qdrant adapter
│   │       │       ├── client.ts         # Qdrant client
│   │       │       ├── collection.ts     # Collections
│   │       │       ├── helper.ts          # DB helpers
│   │       │       ├── populate.ts        # Data insert
│   │       │       └── qdrant.types.ts    # Qdrant types
│   │       └── index.ts          # Core exports
│   └── docsy/                    # UI components
└── tooling/                      # Dev tooling
```

**Architecture principles:**
- **Adapter pattern** — Designed for swappable data sources and models
- **Modular design** — Each component is independent and replaceable
- **Type-safe** — Shared interfaces for consistency

---
## Architecture
```
GitHub Repo → Fetch & Filter → Clean Content → Smart Chunking 
→ Generate Embeddings (Gemini) → Store in Qdrant
```

**Current implementation:**
- **Ingest:** GitHub repositories (public repos)
- **Processing:** Markdown-aware chunking with structure preservation
- **Embeddings:** Google Gemini text-embedding-004 (768 dimensions)
- **Storage:** Qdrant vector database

**Design principles:**
- Immutable transformations (pure functions)
- Type-safe throughout (TypeScript strict mode)
- Modular architecture (swap components as needed)
- Separation of concerns (each stage independent)
---
## Development

```bash
# Clone the repository
git clone https://github.com/GaureshArt/docsy.git
cd docsy

# Install dependencies
pnpm install

# Build all packages
pnpm build

#test coming soon

# Lint
pnpm lint
```

---

## Contributing

Docsy is early-stage and contributions are welcome! Areas of focus:

- 🧪 Testing with diverse documentation repos
- 📊 Improving chunking strategies for edge cases
- 🔌 Adding new data source adapters
- 🎨 Building the chat UI component
- 📖 Writing documentation and examples

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

---

## Why Open Source?

Documentation discoverability is a universal problem. Every project needs docs, every project struggles with search.

By building Docsy in the open:
- ✅ Self-host without vendor lock-in
- ✅ Community-driven data source adapters
- ✅ Transparent development and roadmap

---

## License

[MIT](./LICENSE) — Use it however you want.

---

## Links

- 📦 [npm Package] *(coming soon)*
- 🐛 [Report Issues](https://github.com/GaureshArt/docsy/issues)
- 💬 [Discussions](https://github.com/GaureshArt/docsy/discussions)
- 🌟 [Star on GitHub](https://github.com/GaureshArt/docsy)

---

**Built for developers who believe great documentation deserves great discoverability.**

