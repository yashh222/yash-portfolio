export const projects = [
  {
    slug: "agentflow-ai",
    title: "Agentflow AI — Visual AI Workflow Engine",
    category: "DYNAMIC",
    pitch:
      "A fullstack visual AI workflow automation platform executed via a 5-agent orchestration engine for DAG planning, LLM execution, grounded validation, and fault recovery.",
    stack: [
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "OpenRouter",
      "Gemini",
    ],
    outcome:
      "⚡ Real-time execution monitoring with sub-10ms UI updates & 5-agent fallback recovery",
    liveDemo: "https://agentflow.dev",
    github: "https://github.com/yash/agentflow-ai",
    architecture:
      "Next.js/React provides the visual workflow builder and execution dashboard. Express/Node.js exposes REST & webhook APIs running a 5-agent pipeline: Planner resolves DAG dependencies using Kahn's algorithm, Execution runs LLM nodes, Validation enforces grounded outputs, Recovery handles retries, and Monitoring streams Socket.IO telemetry.",
    challenges: [
      "Designed a 5-agent execution pipeline with clear separation of concerns across planning, execution, validation, recovery, and monitoring.",
      "Prevented LLM hallucinations from empty or metadata-only webhook payloads using payload preprocessing and grounded validation rules.",
      "Implemented asynchronous webhook acknowledgement with 202 Accepted so long-running AI workflows could execute without blocking external webhook providers."
    ],
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
      "OpenRouter",
      "Gemini",
      "Nodemailer",
      "Kahn's Algorithm",
      "WebSockets"
    ],
    gallery: [
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996603/Screenshot_2026-08-18_011854_w5erkc.png",
        alt: "Agentflow AI Visual Workflow Canvas",
      },
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996604/Screenshot_2026-08-18_012016_y8njxu.png",
        alt: "Agentflow Execution Flow Details",
      },
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996603/Screenshot_2026-08-18_012101_vtyxl7.png",
        alt: "Agentflow Real-Time Monitoring Panel",
      },
    ],
  },
  {
    slug: "tripset-ai",
    title: "Tripset AI Travel Platform",
    category: "DYNAMIC",
    pitch: "An agentic travel platform that plans multi-step itineraries, queries live inventory, and isolates session states with MongoDB persistence.",
    stack: ["React", "Python", "LangGraph", "FastAPI", "MongoDB", "Express"],
    outcome: "⚡ 45% latency reduction via thread session isolation & agent state caching",
    liveDemo: "https://tripset.ai",
    github: "https://github.com/yash/tripset-ai",
    architecture:
      "React client interfaces with Express & FastAPI services. LangGraph agents orchestrate multi-step planning loops backed by MongoDB thread isolation.",
    challenges: [
      "Isolated session state context across independent agent threads to prevent prompt leakage.",
      "Implemented MongoDB thread persistence so multi-step travel plans survive browser refreshes.",
    ],
    technologies: ["React", "Python", "LangGraph", "FastAPI", "MongoDB", "Express.js"],
    gallery: [
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996613/Screenshot_2026-08-18_012228_guozot.png",
        alt: "Tripset AI Planner Dashboard",
      },
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996610/Screenshot_2026-08-18_012247_kxhu4s.png",
        alt: "Tripset AI Search & Hotel Selection",
      },
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996608/Screenshot_2026-08-18_012308_jyp8fn.png",
        alt: "Tripset AI Itinerary Summary",
      },
    ],
  },
  {
    slug: "webgenix",
    title: "WebGenix AI Site Builder",
    category: "DYNAMIC",
    pitch: "Prompt-driven web application builder that generates fullstack component architectures with live rendering and instant sandbox previews.",
    stack: ["TypeScript", "React", "Node.js", "Claude API", "Docker", "Vite"],
    outcome: "🚀 Generates production-ready component codebases in < 5 seconds",
    liveDemo: "https://webgenix.dev",
    github: "https://github.com/yash/webgenix",
    architecture:
      "A React workspace client streams code generations from Node.js background processes, deploying temporary containerized previews via Docker.",
    challenges: [
      "Built non-blocking streaming code generation pipeline using WebSockets and server-sent events.",
      "Isolated execution environments in containerized sandboxes for immediate live previews.",
    ],
    technologies: ["TypeScript", "React", "Node.js", "Claude API", "Docker", "Vite"],
    gallery: [
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996605/Screenshot_2026-08-18_012513_myvjs7.png",
        alt: "WebGenix AI Web Generator Interface",
      },
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996605/Screenshot_2026-08-18_012531_pytdxz.png",
        alt: "WebGenix Live Sandbox Preview",
      },
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996611/Screenshot_2026-08-18_012553_z1mjpj.png",
        alt: "WebGenix Code Generation View",
      },
    ],
  },
  {
    slug: "mcp-path-generator",
    title: "MCP Learning Path Engine",
    category: "RESPONSIVE",
    pitch: "Model Context Protocol engine that analyzes developer skill graphs, parses repository dependencies, and builds targeted learning paths.",
    stack: ["Python", "LangChain", "MCP Protocol", "FastAPI", "ChromaDB"],
    outcome: "🎯 Parsed 100+ skill graphs into deterministic learning nodes",
    liveDemo: "https://mcp-path.dev",
    github: "https://github.com/yash/mcp-path-generator",
    architecture:
      "MCP protocol handlers ingest skill repositories, extract dependency graphs, and store vector embeddings in ChromaDB for context-aware path generation.",
    challenges: [
      "Standardized MCP protocol context schemas across diverse developer skill trees.",
      "Optimized vector search reranking to generate deterministic step-by-step learning sequences.",
    ],
    technologies: ["Python", "LangChain", "MCP Protocol", "FastAPI", "ChromaDB"],
    gallery: [
      {
        src: "https://res.cloudinary.com/dmm9zrqfs/image/upload/v1786996856/Screenshot_2026-08-18_013019_gmswmg.png",
        alt: "MCP Path Engine Workspace",
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
