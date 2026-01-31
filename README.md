# Docsy

**AI-powered documentation chatbot for Next.js applications.**

Turn your technical documentation into an intelligent chatbot. Users ask questions, get instant answers—no more endless scrolling through markdown files.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![Next.js 16+](https://img.shields.io/badge/Next.js-16+-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-CC3534?style=flat-square&logo=pnpm)](https://pnpm.io/)

---

## What is Docsy?

Docsy is an **embeddable RAG (Retrieval-Augmented Generation) chatbot component** for documentation sites built with Next.js and React.

Instead of users manually searching through documentation, they simply ask questions in natural language. Docsy finds the relevant information from your docs and generates accurate, context-aware answers.

**Primary use case:** Point Docsy at your **GitHub repository** containing documentation (markdown files), and it automatically:
- Fetches and indexes your docs
- Intelligently prioritizes important files (README, getting started, API references)
- Breaks content into semantic chunks while preserving code blocks and tables
- Generates embeddings for semantic search
- Provides a chat interface for users to ask questions

**Beyond GitHub:** While GitHub repositories are the primary focus, Docsy's modular architecture is designed to support additional data sources in the future—website scraping, local files, Google Drive, Confluence, and more.

---

## Why Docsy?

**For developers:**
- No need to build RAG pipelines from scratch
- Production-ready ingestion, chunking, and retrieval logic
- Works with existing Next.js documentation sites

**For users:**
- Instant answers instead of searching through files
- Natural language queries ("How do I configure authentication?")
- Contextual responses with source citations

**For documentation maintainers:**
- Keep using markdown and GitHub (no migration needed)
- Periodic updates for upto date information retrieval
- Smart content prioritization (important docs ranked higher)

---

## Features

### 🧠 Intelligent Document Processing
- Automatically discovers documentation in GitHub repositories
- Smart filtering (`.md`, `.mdx` files only)
- Priority-based ranking (README > getting started > main docs > API references > examples)
- Excludes noise (test files, node_modules, build artifacts)

### ✂️ Markdown-Aware Chunking
- Preserves code blocks (never splits mid-code)
- Keeps headers with their content (no orphaned headings)
- Respects table structures
- Context-aware overlapping for better retrieval

### 🎯 Built for Technical Docs
- Handles code snippets, API references, and technical content
- Understands monorepo structures (packages, modules)
- Supports numbered guides (01-intro.md, 02-setup.md)
- Recognizes migration guides, installation docs, and tutorials

### ⚙️ Production-Ready
- TypeScript throughout
- Modular architecture (easy to extend)
- Error handling 
- Efficient processing (handles 100+ doc files)

---

## Current Status

Docsy is under active development. The ingestion and chunking pipeline is complete:

- ✅ **GitHub Repository Fetching** — Fetch documentation from any public GitHub repo
- ✅ **Intelligent Filtering** — Smart prioritization with rule-based scoring
- ✅ **Content Cleaning** — Remove HTML artifacts, normalize whitespace
- ✅ **Markdown-Aware Chunking** — Split docs while preserving structure

**In progress:**
- 🚧 Embedding generation
- 🚧 Vector storage integration
- 🚧 Chat UI component
- 🚧 Query handling and retrieval

---

## Architecture

Docsy uses a **modular RAG pipeline**:
```
GitHub Repo → Fetch Docs → Filter & Prioritize → Clean Content 
→ Chunk Documents → Generate Embeddings → Store in Vector DB 
→ User Query → Semantic Search → Context Retrieval → LLM Response → UI
```

**Key design decisions:**
- **Separation of concerns** — Each stage is independent and testable
- **Immutable transformations** — Each function returns new data, never mutates
- **Type safety** — Full TypeScript coverage with strict types
- **Markdown preservation** — Code blocks, tables, and structure remain intact

---

## Technical Stack

- **Language:** TypeScript 5.7+
- **Framework:** Next.js 16+ (App Router, Server Components)
- **Chunking:** LangChain (RecursiveCharacterTextSplitter)
- **Embeddings:** OpenAI (planned: Anthropic, local models)
- **Vector Store:** TBD (considering Pinecone, Supabase, Qdrant)
- **Package Manager:** pnpm
- **Monorepo:** Turborepo

---

## Project Structure
```
docsy/
├── apps/
│   └── web/                 # Marketing site and documentation
├── packages/
│   ├── core/               # RAG pipeline (ingest, chunk, embed)
│   └── docsy/              # Main component (future)
└── tooling/                # Shared configs (ESLint, TypeScript)
```

---

## Roadmap

### Phase 1: Core Pipeline (In Progress)
- [x] GitHub repository ingestion
- [x] Intelligent document filtering and prioritization
- [x] Content cleaning and normalization
- [x] Markdown-aware chunking with code preservation
- [ ] Embedding generation (OpenAI)
- [ ] Vector database integration

### Phase 2: Query & Retrieval
- [ ] Semantic search implementation
- [ ] Context ranking and reranking
- [ ] Query optimization
- [ ] Citation generation (link to source files)

### Phase 3: UI Component
- [ ] Chat interface component
- [ ] Streaming responses
- [ ] Markdown rendering with syntax highlighting
- [ ] Source citations with links to GitHub
- [ ] Feedback mechanism (thumbs up/down)

### Phase 4: Beyond GitHub
- [ ] Website scraping adapter
- [ ] Local filesystem support
- [ ] Google Drive integration
- [ ] Confluence/Notion support
- [ ] Generic adapter interface for custom sources

### Phase 5: Advanced Features
- [ ] Incremental updates (only re-index changed files)
- [ ] Multiple LLM providers (Anthropic Claude, Google Gemini, local models)
- [ ] Multiple vector stores (Pinecone, Supabase, Qdrant, pgvector)
- [ ] Usage analytics
- [ ] A/B testing for prompts
- [ ] Multi-language support

### Phase 6: Developer Experience
- [ ] CLI tool for batch processing
- [ ] Next.js template/starter
- [ ] Comprehensive documentation site
- [ ] Video tutorials
- [ ] Self-hosted deployment guides

---

## Development

This is a monorepo managed with **pnpm** and **Turborepo**.
```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run development server
pnpm dev

# Lint
pnpm lint

# Type check
pnpm typecheck
```

---

## Contributing

Docsy is in early development. Contributions are welcome, especially for:
- Testing the ingestion pipeline with different repositories
- Improving chunking strategies
- Adding support for new documentation formats
- Building the UI component

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before contributing.

---

## License

[MIT](./LICENSE)

---

## Why Open Source?

Documentation is a universal problem. Every project needs good docs, and every project struggles with making docs discoverable and searchable.

By building Docsy in the open:
- Developers can self-host without vendor lock-in
- The community can add support for new data sources
- Everyone benefits from improvements and bug fixes
- No per-user pricing or usage limits

---

## Contact

- 🐛 [Report Issues](https://github.com/GaureshArt/docsy/issues)
- 💬 [Discussions](https://github.com/GaureshArt/docsy/discussions)
- 🌟 [Star on GitHub](https://github.com/GaureshArt/docsy)

---

Built for developers who believe great documentation deserves great discoverability.