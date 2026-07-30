export const projects = [
  {
    slug: "aurora",
    title: "Project Aurora",
    pitch:
      "An agentic research assistant that plans multi-step tasks, gathers context, and executes workflows with minimal supervision.",
    stack: ["Next.js", "Python", "LangGraph", "OpenAI"],
    liveDemo: "https://example.com/aurora",
    github: "https://github.com/example/aurora",
    architecture:
      "A frontend workspace orchestrates tasks, a planning agent decomposes goals, and tool adapters execute web/API actions while a memory layer tracks progress.",
    challenges: [
      "Managed long-running task states across retries and partial failures.",
      "Balanced autonomy with user trust by surfacing agent reasoning in a readable workflow panel.",
    ],
    technologies: ["Next.js", "TypeScript", "Python", "LangGraph", "PostgreSQL"],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
        alt: "Dashboard view of Project Aurora",
      },
      {
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
        alt: "Workflow board for Project Aurora",
      },
    ],
  },
  {
    slug: "nimbus",
    title: "Project Nimbus",
    pitch:
      "A collaborative product workspace for SaaS teams, with shared docs, live updates, and streamlined delivery workflows.",
    stack: ["React", "Node.js", "PostgreSQL", "Socket.IO"],
    liveDemo: "https://example.com/nimbus",
    github: "https://github.com/example/nimbus",
    architecture:
      "A React client talks to Node services through REST and WebSocket channels, with PostgreSQL powering persistence and event-driven sync.",
    challenges: [
      "Serialized real-time collaboration without introducing race conditions or UI churn.",
      "Optimized permission checks so teams could work safely in shared spaces.",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.IO", "Redis"],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        alt: "Workspace dashboard for Project Nimbus",
      },
      {
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        alt: "Collaboration view for Project Nimbus",
      },
    ],
  },
  {
    slug: "vertex",
    title: "Project Vertex",
    pitch:
      "A retrieval-augmented knowledge layer that turns messy documents into an instant queryable system for teams.",
    stack: ["FastAPI", "Vector DB", "OpenAI", "Pinecone"],
    liveDemo: "https://example.com/vertex",
    github: "https://github.com/example/vertex",
    architecture:
      "Document ingestion pipelines normalize content, embeddings are stored in a vector database, and an LLM layer generates grounded responses.",
    challenges: [
      "Improved retrieval quality by adding chunking, metadata filters, and reranking loops.",
      "Reduced hallucinations by attaching source references to every answer.",
    ],
    technologies: ["FastAPI", "Python", "OpenAI", "Pinecone", "Docker"],
    gallery: [
      {
        src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
        alt: "Knowledge base interface for Project Vertex",
      },
      {
        src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
        alt: "Search and retrieval workflow for Project Vertex",
      },
    ],
  },
];

export const posts = [
  {
    slug: "building-agentic-workflows",
    title: "Building Agentic Workflows That Feel Reliable",
    description:
      "A practical breakdown of designing agentic systems that stay observable, resilient, and useful in production.",
    excerpt:
      "The trick is not just making an agent capable, but making it trustworthy under real constraints.",
    date: "July 2026",
    tags: ["AI", "Systems"],
    content:
      "Agentic systems become useful when they are grounded in clear boundaries, visible state, and simple fallbacks. In practice, that means designing for retries, confidence thresholds, and easy intervention rather than purely raw autonomy.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "shipping-with-a-small-team",
    title: "Shipping With a Small Team and a Big Scope",
    description:
      "How to keep momentum high when you own the product experience from design through deployment.",
    excerpt:
      "A small team can move quickly when the product stack is intentionally streamlined and the roadmap is sharp.",
    date: "June 2026",
    tags: ["Product", "Leadership"],
    content:
      "The best small-team product work is often about removing friction: choosing a strong core workflow, reducing needless context switching, and shipping a polished version before overbuilding.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
  },
];
