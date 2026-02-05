import { RoadmapPhase } from "@/types/raodmap.type";

export const roadmapData: RoadmapPhase[] = [
    {
        phase: "Phase 1: Core Pipeline",
        description: "Build the foundation for document ingestion and processing",
        items: [
            { name: "GitHub repository ingestion", status: "done", description: "Fetch docs from any public repo" },
            { name: "Intelligent document filtering", status: "done", description: "Smart prioritization with rule-based scoring" },
            { name: "Content cleaning", status: "done", description: "Remove HTML, normalize whitespace" },
            { name: "Markdown-aware chunking", status: "done", description: "Structure-aware document splitting" },
            { name: "Embedding generation", status: "done", description: "Vector embeddings via Gemini" },
            { name: "Vector storage (Qdrant)", status: "done", description: "Qdrant integration complete" },
        ],
    },
    {
        phase: "Phase 2: Retrieval & Query",
        description: "Enable semantic search and context retrieval",
        items: [
            { name: "Semantic search implementation", status: "in-progress" },
            { name: "Context ranking and reranking", status: "planned" },
            { name: "Query optimization", status: "planned" },
            { name: "Citation generation", status: "planned", description: "Link to source files on GitHub" },
        ],
    },
    {
        phase: "Phase 3: UI Components",
        description: "Pre-built chat interface for documentation",
        items: [
            { name: "Chat interface component", status: "planned" },
            { name: "Streaming responses", status: "planned" },
            { name: "Syntax highlighting", status: "planned" },
            { name: "Source citations UI", status: "planned" },
            { name: "Feedback mechanism", status: "planned" },
        ],
    },
    {
        phase: "Phase 4: Beyond GitHub",
        description: "Support multiple data sources",
        items: [
            { name: "Website scraping adapter", status: "planned" },
            { name: "Local filesystem support", status: "planned" },
            { name: "Google Drive integration", status: "planned" },
            { name: "Generic adapter interface", status: "planned" },
        ],
    },
    {
        phase: "Phase 5: Scale & Performance",
        description: "Production-ready optimizations",
        items: [
            { name: "Incremental updates", status: "planned", description: "Only re-index changed files" },
            { name: "Multiple LLM providers", status: "planned", description: "OpenAI, Anthropic, local models" },
            { name: "Multiple vector stores", status: "planned", description: "Pinecone, Supabase, pgvector" },
            { name: "Caching layer", status: "planned" },
        ],
    },
];