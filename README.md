# Docsy

**Headless RAG engine that transforms GitHub documentation into an AI-powered knowledge base for TypeScript applications.**

Stop forcing users to search through endless markdown files. Let them ask questions and get instant, contextual answers directly from your technical documentation.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16+-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-CC3534?style=flat-square&logo=pnpm)](https://pnpm.io/)

---

## What is Docsy?

Docsy is a **headless Retrieval-Augmented Generation (RAG) engine** that turns GitHub documentation into an intelligent Q&A system.

Point it at your repository’s docs and Docsy handles:

- 📥 Fetching markdown files from GitHub
- 🧹 Cleaning and normalizing content
- ✂️ Markdown-aware chunking (preserves code blocks & structure)
- 🧠 Generating embeddings for semantic search
- 💾 Storing vectors in Qdrant
- 💬 Streaming LLM-powered answers

**Headless by design — plug directly into Vercel AI SDK (`useChat`) or any custom UI.**

---

## Why Docsy?

### For developers

- No need to build RAG pipelines from scratch
- Production-ready ingestion & retrieval
- TypeScript-first with strict typing
- Modular providers (LLMs, embeddings, vector DB)

### For users

- Ask natural language questions
- Get contextual answers from real docs
- Works great with APIs, tutorials, guides

### For maintainers

- Keep GitHub + Markdown
- Zero migration
- Automatic prioritization & filtering

---

## Features

### 🎯 Smart Document Processing

- Indexes `.md` and `.mdx` only
- Priority ranking (README → guides → APIs → examples)
- Monorepo aware
- Auto-excludes tests & build artifacts

### ✂️ Markdown-Aware Chunking

- Preserves code blocks
- Keeps headers with content
- Maintains tables
- Context overlap windows

### 🏗️ Production-Ready Architecture

- Full TypeScript safety
- Adapter-based design
- Provider-agnostic
- Pure functional pipelines

---

## Current Status

### ✅ End-to-End RAG Working

- GitHub ingestion pipeline
- Intelligent filtering & cleaning
- Smart chunking
- Gemini embeddings
- Qdrant vector storage
- Semantic retrieval
- Streaming generation via Vercel AI SDK

### 🚧 Improving

- Hybrid search & reranking
- Citations support
- Advanced pipelines (sequential, self-RAG)

---

## Project Structure

```
docsy/
├── apps/
│   └── web/                         # Landing page / demo app
│
├── packages/
│
│   ├── cli/                         # CLI tool
│   │   └── src/
│   │       ├── commands/
│   │       │   ├── init.ts
│   │       │   └── ingest.ts
│   │       ├── utils/
│   │       └── index.ts
│
│   ├── core/                        # Headless RAG engine
│   │   ├── dist/
│   │   └── src/
│   │
│   │       ├── ai/                  # Model abstraction layer
│   │       │   ├── embeddings/
│   │       │   │   ├── gemini.ts
│   │       │   │   ├── openai.ts
│   │       │   │   └── registry.ts
│   │       │   └── types.ts
│   │
│   │       ├── config/              # Ingest-time config
│   │       │   └── index.ts
│   │
│   │       ├── ingest/              # Data ingestion pipeline
│   │       │   ├── processing/
│   │       │   │   ├── chunk-files.ts
│   │       │   │   ├── embed-chunks.ts
│   │       │   │   └── store-chunks.ts
│   │       │   └── sources/
│   │       │       └── github/
│   │       │           ├── clean-files.ts
│   │       │           ├── fetch-file-content.ts
│   │       │           ├── fetch-git-tree.ts
│   │       │           ├── filter-docs.ts
│   │       │           ├── github.types.ts
│   │       │           └── octokit-provider.ts
│   │
│   │       ├── generation/          # LLM response generation
│   │       │   ├── generate.ts
│   │       │   ├── model-registry.ts
│   │       │   ├── prompt-loader.ts
│   │       │   └── types.ts
│   │
│   │       ├── prompts/             # Prompt templates
│   │       │   ├── system.md
│   │       │   └── user.md
│   │
│   │       ├── retrieval/           # Semantic search layer
│   │       │   ├── index.ts
│   │       │   ├── query-embed.ts
│   │       │   ├── query-search.ts
│   │       │   └── types.ts
│   │
│   │       ├── pattern/             # RAG pipelines (flows)
│   │       │   ├── naive.ts         # naive retrieve → generate
│   │       │   └── types.ts
│   │
│   │       ├── vector-database/
│   │       │   └── qdrant/
│   │       │       ├── client.ts
│   │       │       ├── collection.ts
│   │       │       ├── helper.ts
│   │       │       ├── populate.ts
│   │       │       ├── qdrant.types.ts
│   │       │       └── index.ts
│   │
│   │       └── index.ts             # createDocsy() entry point
│   │
│   └── ui/                          # (optional later)
│
└── tooling/
    ├── eslint/
    └── typescript/

```

---

## Technical Stack

| Layer           | Technology              |
| --------------- | ----------------------- |
| Language        | TypeScript 5.7+         |
| Streaming       | Vercel AI SDK           |
| Chunking        | Markdown-aware pipeline |
| Embeddings      | Google Gemini           |
| Vector DB       | Qdrant                  |
| Monorepo        | Turborepo               |
| Package Manager | pnpm                    |

**Planned:** OpenAI embeddings, pgvector, Pinecone, local models

---

## Quick Start

### Installation

```bash
npm install -g @gaureshart/docsy-cli
npm install @gaureshart/docsy-core ai
```

### Step 1: Initialize Configuration

```bash
npx @gaureshart/docsy-cli init
```

This creates:

- `docsy.config.ts` - Ingestion configuration
- `.env.example` - Environment variables template

### Step 2: Configure Environment

Copy `.env.example` to `.env` and add your API keys:

```bash
# GitHub (optional for public repos)
GITHUB_TOKEN=

# Embedding Provider
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key

# Vector Database
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
```

### Step 3: Configure Ingestion

```typescript
// docsy.config.ts
import { defineConfig } from '@gaureshart/docsy-core'

export default defineConfig({
  source: {
    type: 'github',
    owner: 'facebook',
    repo: 'react',
    branch: 'main',
    path: 'docs',
  },
  processing: {
    maxFiles: 100,
    chunkSize: 1000,
    chunkOverlap: 200,
  },
  embeddings: {
    provider: 'gemini',
  },
  vectorDatabase: {
    provider: 'qdrant',
    collection: 'react-docs',
  },
})
```

### Step 4: Run Ingestion

```bash
npx @gaureshart/docsy-cli ingest
```

This will:

1. Fetch documentation from GitHub
2. Clean and filter markdown files
3. Chunk documents intelligently
4. Generate embeddings
5. Store in Qdrant vector database

---

## Query Your Documentation

### Step 5: Create API Route

Create `app/api/chat/route.ts` in your Next.js project:

```typescript
import createDocsy from '@gaureshart/docsy-core'

export const maxDuration = 30

export async function POST(req: Request) {
  const body = await req.json()
  console.log('this is query: ', body.messages.at(-1).parts.at(-1).text)
  const res = await createDocsy({
    pattern: 'naive',
    vectorDatabase: {
      provider: 'qdrant',
      collection: 'react-vasu',
    },
    llmConfig: {
      provider: 'google',
      model: 'gemini-2.5-flash',
    },
    messages: body.messages,
    query: body.messages.at(-1).parts.at(-1).text,
    embeddings: {
      provider: 'google',
      model: 'gemini-embedding-001',
      taskType: 'QUESTION_ANSWERING',
    },
  })
  return res
}
```

### Step 6: Use in Your React Component

```typescript
'use client';
import { useChat } from 'ai/react';

export function DocsChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      <div>
        {messages.map((m) => (
          <div key={m.id}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about your docs..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}
```

---

## Configuration Options

### Supported Providers

**Embeddings:**

- Google Gemini (`gemini-embedding-001`)
- OpenAI (`text-embedding-3-small`, `text-embedding-3-large`)

**LLM:**

- Google Gemini (`gemini-2.5-flash`)+
- OpenAI (`gpt-4o`, `gpt-4o-mini`)

**Vector Database:**

- Qdrant (self-hosted or cloud)

### RAG Patterns

- `naive` - Simple retrieve + generate (available now)
- `sequential` - Coming soon
- `self-rag` - Coming soon

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

- 📦 [npm Package](https://www.npmjs.com/package/@gaureshart/docsy-core)
- 🐛 [Report Issues](https://github.com/GaureshArt/docsy/issues)
- 💬 [Discussions](https://github.com/GaureshArt/docsy/discussions)
- 🌟 [Star on GitHub](https://github.com/GaureshArt/docsy)

---

**Built for developers who believe great documentation deserves great discoverability.**
