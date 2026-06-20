import {
  Code2,
  Globe,
  Server,
  Layout,
  Box,
  Database,
  Cloud,
  GitBranch,
  Smartphone,
  Brain,
  Link,
  Wrench,
  Briefcase,
  BarChart3,
  type LucideIcon,
} from "lucide-react"

export interface SkillCategory {
  id: string
  name: string
  icon: LucideIcon
  description: string
  color: string
}

export interface Technology {
  id: string
  name: string
  categoryId: string
  icon: string
  description: string
  experienceLevel: "beginner" | "intermediate" | "advanced" | "expert"
  yearsExperience: number
  proficiency: number
  color: string
  relatedTechnologies: string[]
  projects: string[]
  certificates: { name: string; issuer: string; url?: string }[]
  learningResources: { name: string; type: string; url: string }[]
  useCases: string[]
  features: string[]
}

export const skillCategories: SkillCategory[] = [
  { id: "programming-languages", name: "Programming Languages", icon: Code2, description: "Core programming languages", color: "#f59e0b" },
  { id: "frontend", name: "Frontend", icon: Layout, description: "Client-side technologies", color: "#3b82f6" },
  { id: "backend", name: "Backend", icon: Server, description: "Server-side technologies", color: "#10b981" },
  { id: "frameworks", name: "Frameworks", icon: Box, description: "Development frameworks", color: "#8b5cf6" },
  { id: "libraries", name: "Libraries", icon: Box, description: "Utility libraries", color: "#ec4899" },
  { id: "databases", name: "Databases", icon: Database, description: "Data storage solutions", color: "#06b6d4" },
  { id: "cloud", name: "Cloud & DevOps", icon: Cloud, description: "Cloud platforms & deployment", color: "#6366f1" },
  { id: "devops", name: "DevOps Tools", icon: GitBranch, description: "CI/CD & automation", color: "#f97316" },
  { id: "mobile", name: "Mobile Development", icon: Smartphone, description: "Mobile app technologies", color: "#14b8a6" },
  { id: "ai", name: "AI & Machine Learning", icon: Brain, description: "Artificial intelligence", color: "#a855f7" },
  { id: "blockchain", name: "Blockchain", icon: Link, description: "Distributed ledger tech", color: "#eab308" },
  { id: "tools", name: "Tools & Utilities", icon: Wrench, description: "Development tools", color: "#64748b" },
  { id: "business", name: "Business Skills", icon: Briefcase, description: "Business & management", color: "#0ea5e9" },
  { id: "marketing", name: "Marketing Skills", icon: BarChart3, description: "Digital marketing", color: "#ef4444" },
]

export const technologies: Technology[] = [
  {
    id: "javascript",
    name: "JavaScript",
    categoryId: "programming-languages",
    icon: "📜",
    description: "High-level, interpreted programming language that conforms to the ECMAScript specification. Essential for web development.",
    experienceLevel: "expert",
    yearsExperience: 6,
    proficiency: 92,
    color: "#f7df1e",
    relatedTechnologies: ["typescript", "react", "nodejs", "nextjs"],
    projects: ["Portfolio Platform", "E-commerce Dashboard", "Real-time Chat App", "Task Management System"],
    certificates: [{ name: "JavaScript Algorithms and Data Structures", issuer: "freeCodeCamp", url: "#" }],
    learningResources: [
      { name: "MDN Web Docs", type: "Documentation", url: "#" },
      { name: "JavaScript: The Good Parts", type: "Book", url: "#" },
    ],
    useCases: ["Web Development", "Server-side with Node.js", "Mobile Apps with React Native"],
    features: ["Dynamic Typing", "Prototype-based OOP", "First-class Functions", "Event-driven", "Async/Await"],
  },
  {
    id: "typescript",
    name: "TypeScript",
    categoryId: "programming-languages",
    icon: "🔷",
    description: "Strict syntactical superset of JavaScript that adds optional static typing. Improves developer experience and code quality.",
    experienceLevel: "advanced",
    yearsExperience: 4,
    proficiency: 85,
    color: "#3178c6",
    relatedTechnologies: ["javascript", "react", "nextjs", "nodejs"],
    projects: ["Portfolio Platform", "E-commerce Dashboard", "TypeScript Library", "API Gateway"],
    certificates: [{ name: "Understanding TypeScript", issuer: "Udemy", url: "#" }],
    learningResources: [
      { name: "TypeScript Handbook", type: "Documentation", url: "#" },
      { name: "TypeScript Deep Dive", type: "Book", url: "#" },
    ],
    useCases: ["Large-scale Applications", "Library Development", "Enterprise Software"],
    features: ["Static Typing", "Interfaces", "Generics", "Decorators", "Union Types"],
  },
  {
    id: "python",
    name: "Python",
    categoryId: "programming-languages",
    icon: "🐍",
    description: "High-level, general-purpose programming language known for its readability and versatility.",
    experienceLevel: "advanced",
    yearsExperience: 5,
    proficiency: 82,
    color: "#3776ab",
    relatedTechnologies: ["django", "fastapi", "tensorflow", "pytorch"],
    projects: ["ML Prediction API", "Data Analysis Pipeline", "Automation Scripts", "Web Scraper"],
    certificates: [{ name: "Python for Everybody", issuer: "Coursera", url: "#" }],
    learningResources: [
      { name: "Python Docs", type: "Documentation", url: "#" },
      { name: "Automate the Boring Stuff", type: "Book", url: "#" },
    ],
    useCases: ["Web Development", "Data Science", "Automation", "Machine Learning"],
    features: ["Dynamic Typing", "Extensive Standard Library", "List Comprehensions", "Decorators", "Generators"],
  },
  {
    id: "react",
    name: "React",
    categoryId: "frontend",
    icon: "⚛️",
    description: "A JavaScript library for building user interfaces. Component-based architecture with virtual DOM.",
    experienceLevel: "expert",
    yearsExperience: 5,
    proficiency: 90,
    color: "#61dafb",
    relatedTechnologies: ["javascript", "typescript", "nextjs", "tailwindcss", "reactnative"],
    projects: ["Portfolio Platform", "E-commerce Dashboard", "Real-time Chat App", "Social Media Dashboard"],
    certificates: [{ name: "React - The Complete Guide", issuer: "Udemy", url: "#" }],
    learningResources: [
      { name: "React Documentation", type: "Documentation", url: "#" },
      { name: "Epic React", type: "Course", url: "#" },
    ],
    useCases: ["Single Page Applications", "Progressive Web Apps", "Dashboard Interfaces"],
    features: ["Virtual DOM", "Component Architecture", "Hooks", "Context API", "Server Components"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    categoryId: "frameworks",
    icon: "▲",
    description: "React framework for production-grade applications. Provides SSR, SSG, and full-stack capabilities.",
    experienceLevel: "advanced",
    yearsExperience: 4,
    proficiency: 88,
    color: "#000000",
    relatedTechnologies: ["react", "typescript", "tailwindcss", "nodejs", "prisma"],
    projects: ["Portfolio Platform", "E-commerce Dashboard", "Blog Platform", "SaaS Application"],
    certificates: [{ name: "Next.js 14 & React", issuer: "Academind", url: "#" }],
    learningResources: [
      { name: "Next.js Documentation", type: "Documentation", url: "#" },
      { name: "Learn Next.js", type: "Course", url: "#" },
    ],
    useCases: ["Full-stack Applications", "Static Sites", "E-commerce", "Blogs"],
    features: ["SSR", "SSG", "API Routes", "File-based Routing", "Middleware"],
  },
  {
    id: "nodejs",
    name: "Node.js",
    categoryId: "backend",
    icon: "💚",
    description: "JavaScript runtime built on Chrome's V8 engine. Enables server-side JavaScript execution.",
    experienceLevel: "advanced",
    yearsExperience: 5,
    proficiency: 85,
    color: "#339933",
    relatedTechnologies: ["javascript", "typescript", "express", "nextjs", "mongodb"],
    projects: ["REST API Gateway", "Real-time Chat Server", "Authentication Service", "File Processing API"],
    certificates: [{ name: "Node.js Developer", issuer: "Node.js Foundation", url: "#" }],
    learningResources: [
      { name: "Node.js Docs", type: "Documentation", url: "#" },
      { name: "Node.js Design Patterns", type: "Book", url: "#" },
    ],
    useCases: ["API Development", "Microservices", "Real-time Apps", "CLI Tools"],
    features: ["Event-driven", "Non-blocking I/O", "npm Ecosystem", "Streams", "Cluster Module"],
  },
  {
    id: "express",
    name: "Express.js",
    categoryId: "frameworks",
    icon: "⚡",
    description: "Fast, unopinionated, minimalist web framework for Node.js. The de facto standard for Node.js APIs.",
    experienceLevel: "advanced",
    yearsExperience: 5,
    proficiency: 83,
    color: "#000000",
    relatedTechnologies: ["nodejs", "mongodb", "typescript", "postgresql"],
    projects: ["REST API Gateway", "Authentication Service", "CMS Backend", "Payment Processing API"],
    certificates: [],
    learningResources: [
      { name: "Express.js Guide", type: "Documentation", url: "#" },
    ],
    useCases: ["REST APIs", "GraphQL APIs", "Middleware Pipelines"],
    features: ["Middleware Architecture", "Routing", "Template Engines", "Error Handling"],
  },
  {
    id: "tailwindcss",
    name: "Tailwind CSS",
    categoryId: "libraries",
    icon: "🎨",
    description: "Utility-first CSS framework for rapid UI development. Highly customizable and performant.",
    experienceLevel: "expert",
    yearsExperience: 4,
    proficiency: 92,
    color: "#06b6d4",
    relatedTechnologies: ["react", "nextjs", "typescript", "css"],
    projects: ["Portfolio Platform", "E-commerce Dashboard", "Marketing Site", "Admin Panel"],
    certificates: [],
    learningResources: [
      { name: "Tailwind CSS Docs", type: "Documentation", url: "#" },
      { name: "Tailwind UI", type: "Component Library", url: "#" },
    ],
    useCases: ["Rapid Prototyping", "Production UI", "Design Systems"],
    features: ["Utility Classes", "Responsive Design", "Dark Mode", "Custom Config", "JIT Compiler"],
  },
  {
    id: "mongodb",
    name: "MongoDB",
    categoryId: "databases",
    icon: "🍃",
    description: "NoSQL document database designed for scalability and flexibility. Uses JSON-like documents.",
    experienceLevel: "advanced",
    yearsExperience: 4,
    proficiency: 80,
    color: "#47a248",
    relatedTechnologies: ["nodejs", "express", "mongoose", "prisma"],
    projects: ["E-commerce Dashboard", "Real-time Chat App", "Content Management System"],
    certificates: [{ name: "MongoDB University M001", issuer: "MongoDB", url: "#" }],
    learningResources: [
      { name: "MongoDB University", type: "Course", url: "#" },
    ],
    useCases: ["Content Management", "Real-time Analytics", "Catalogs"],
    features: ["Document Model", "Aggregation Pipeline", "Replication", "Sharding"],
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    categoryId: "databases",
    icon: "🐘",
    description: "Advanced relational database system known for reliability, feature robustness, and performance.",
    experienceLevel: "advanced",
    yearsExperience: 4,
    proficiency: 82,
    color: "#336791",
    relatedTechnologies: ["prisma", "nodejs", "express", "django"],
    projects: ["Portfolio Platform", "SaaS Application", "Analytics Dashboard"],
    certificates: [{ name: "PostgreSQL Bootcamp", issuer: "Udemy", url: "#" }],
    learningResources: [
      { name: "PostgreSQL Documentation", type: "Documentation", url: "#" },
    ],
    useCases: ["Transactional Systems", "Data Warehousing", "Geospatial Applications"],
    features: ["ACID Compliance", "JSON Support", "Full-text Search", "Window Functions"],
  },
  {
    id: "prisma",
    name: "Prisma",
    categoryId: "tools",
    icon: "🔮",
    description: "Next-generation ORM for Node.js and TypeScript. Provides type-safe database access.",
    experienceLevel: "advanced",
    yearsExperience: 3,
    proficiency: 85,
    color: "#2d3748",
    relatedTechnologies: ["typescript", "nextjs", "postgresql", "mongodb", "nodejs"],
    projects: ["Portfolio Platform", "SaaS Application", "API Gateway"],
    certificates: [],
    learningResources: [
      { name: "Prisma Documentation", type: "Documentation", url: "#" },
    ],
    useCases: ["Database Access", "Migrations", "Data Modeling"],
    features: ["Type Safety", "Auto-generated Client", "Migrations", "Studio"],
  },
  {
    id: "reactnative",
    name: "React Native",
    categoryId: "mobile",
    icon: "📱",
    description: "Framework for building native mobile applications using React. Cross-platform development.",
    experienceLevel: "intermediate",
    yearsExperience: 3,
    proficiency: 72,
    color: "#61dafb",
    relatedTechnologies: ["react", "javascript", "typescript", "expo"],
    projects: ["Mobile Fitness App", "Social Media App", "E-commerce Mobile App"],
    certificates: [{ name: "React Native - The Practical Guide", issuer: "Udemy", url: "#" }],
    learningResources: [
      { name: "React Native Docs", type: "Documentation", url: "#" },
    ],
    useCases: ["Cross-platform Apps", "Mobile-first Products"],
    features: ["Native Components", "Hot Reloading", "Bridge Architecture", "Cross-platform"],
  },
  {
    id: "django",
    name: "Django",
    categoryId: "frameworks",
    icon: "🎯",
    description: "High-level Python web framework that encourages rapid development and clean, pragmatic design.",
    experienceLevel: "intermediate",
    yearsExperience: 3,
    proficiency: 68,
    color: "#092e20",
    relatedTechnologies: ["python", "postgresql", "restframework", "docker"],
    projects: ["Content Management System", "RESTful Blog API", "Portfolio Backend"],
    certificates: [],
    learningResources: [
      { name: "Django Documentation", type: "Documentation", url: "#" },
      { name: "Django for Everybody", type: "Course", url: "#" },
    ],
    useCases: ["Web Applications", "REST APIs", "Content Management"],
    features: ["Admin Interface", "ORM", "Authentication", "Template Engine"],
  },
  {
    id: "docker",
    name: "Docker",
    categoryId: "cloud",
    icon: "🐳",
    description: "Platform for developing, shipping, and running applications in containers.",
    experienceLevel: "intermediate",
    yearsExperience: 3,
    proficiency: 70,
    color: "#2496ed",
    relatedTechnologies: ["kubernetes", "linux", "nodejs", "githubactions"],
    projects: ["CI/CD Pipeline", "Microservices Deployment", "Dev Environment Setup"],
    certificates: [{ name: "Docker Essentials", issuer: "IBM", url: "#" }],
    learningResources: [
      { name: "Docker Documentation", type: "Documentation", url: "#" },
    ],
    useCases: ["Containerization", "Microservices", "Dev Environments"],
    features: ["Container Runtime", "Docker Compose", "Image Layering", "Volumes"],
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    categoryId: "cloud",
    icon: "☸️",
    description: "Production-grade container orchestration system for automated deployment, scaling, and management.",
    experienceLevel: "beginner",
    yearsExperience: 1,
    proficiency: 40,
    color: "#326ce5",
    relatedTechnologies: ["docker", "linux", "helm", "terraform"],
    projects: ["Cluster Setup", "Microservices Orchestration"],
    certificates: [],
    learningResources: [
      { name: "Kubernetes Documentation", type: "Documentation", url: "#" },
      { name: "CKAD Preparation", type: "Course", url: "#" },
    ],
    useCases: ["Container Orchestration", "Service Discovery", "Auto-scaling"],
    features: ["Pod Management", "Service Discovery", "Auto-scaling", "Self-healing"],
  },
  {
    id: "githubactions",
    name: "GitHub Actions",
    categoryId: "devops",
    icon: "⚙️",
    description: "CI/CD platform integrated with GitHub for automating build, test, and deployment pipelines.",
    experienceLevel: "advanced",
    yearsExperience: 3,
    proficiency: 78,
    color: "#2088ff",
    relatedTechnologies: ["docker", "nodejs", "git", "terraform"],
    projects: ["Automated Testing Pipeline", "Deployment Workflow", "Lint & Format Checks"],
    certificates: [],
    learningResources: [
      { name: "GitHub Actions Docs", type: "Documentation", url: "#" },
    ],
    useCases: ["CI/CD", "Automation", "Release Management"],
    features: ["Event-driven", "Matrix Builds", "Self-hosted Runners", "Reusable Workflows"],
  },
  {
    id: "git",
    name: "Git",
    categoryId: "devops",
    icon: "🔀",
    description: "Distributed version control system for tracking changes in source code during development.",
    experienceLevel: "expert",
    yearsExperience: 6,
    proficiency: 90,
    color: "#f05032",
    relatedTechnologies: ["github", "gitlab", "bitbucket"],
    projects: ["All Projects"],
    certificates: [],
    learningResources: [
      { name: "Pro Git Book", type: "Book", url: "#" },
    ],
    useCases: ["Version Control", "Collaboration", "Code Review"],
    features: ["Branching", "Merging", "Rebasing", "Staging Area"],
  },
  {
    id: "figma",
    name: "Figma",
    categoryId: "tools",
    icon: "🖌️",
    description: "Cloud-based UI/UX design tool for collaborative interface design and prototyping.",
    experienceLevel: "intermediate",
    yearsExperience: 3,
    proficiency: 65,
    color: "#f24e1e",
    relatedTechnologies: ["tailwindcss", "react", "nextjs"],
    projects: ["Portfolio Design", "E-commerce Mockups", "Brand Guidelines"],
    certificates: [],
    learningResources: [
      { name: "Figma 101", type: "Course", url: "#" },
    ],
    useCases: ["UI Design", "Prototyping", "Design Systems"],
    features: ["Vector Networks", "Auto Layout", "Components", "Collaborative Editing"],
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    categoryId: "ai",
    icon: "🧠",
    description: "Open-source machine learning platform for building and deploying ML models.",
    experienceLevel: "intermediate",
    yearsExperience: 2,
    proficiency: 55,
    color: "#ff6f00",
    relatedTechnologies: ["python", "pytorch", "keras", "jupyter"],
    projects: ["Image Classification Model", "Sentiment Analysis", "Predictive Analytics"],
    certificates: [{ name: "TensorFlow Developer Certificate", issuer: "Google", url: "#" }],
    learningResources: [
      { name: "TensorFlow Documentation", type: "Documentation", url: "#" },
    ],
    useCases: ["Deep Learning", "Computer Vision", "NLP"],
    features: ["Eager Execution", "Keras API", "TF Serving", "TensorBoard"],
  },
  {
    id: "pytorch",
    name: "PyTorch",
    categoryId: "ai",
    icon: "🔥",
    description: "Open-source machine learning library for Python, used for applications like computer vision and NLP.",
    experienceLevel: "beginner",
    yearsExperience: 1,
    proficiency: 35,
    color: "#ee4c2c",
    relatedTechnologies: ["python", "tensorflow", "jupyter", "fastai"],
    projects: ["Neural Network Experiments", "Research Paper Implementation"],
    certificates: [],
    learningResources: [
      { name: "PyTorch Documentation", type: "Documentation", url: "#" },
      { name: "Fast.ai Practical Deep Learning", type: "Course", url: "#" },
    ],
    useCases: ["Research", "Computer Vision", "NLP"],
    features: ["Dynamic Computation Graphs", "Distributed Training", "TorchScript"],
  },
  {
    id: "solidity",
    name: "Solidity",
    categoryId: "blockchain",
    icon: "🔗",
    description: "Contract-oriented programming language for writing smart contracts on Ethereum and other EVM chains.",
    experienceLevel: "beginner",
    yearsExperience: 1,
    proficiency: 30,
    color: "#363636",
    relatedTechnologies: ["ethereum", "web3js", "hardhat", "ipfs"],
    projects: ["Token Contract", "NFT Marketplace (Learning)"],
    certificates: [],
    learningResources: [
      { name: "Solidity Documentation", type: "Documentation", url: "#" },
      { name: "CryptoZombies", type: "Course", url: "#" },
    ],
    useCases: ["Smart Contracts", "DeFi", "NFTs"],
    features: ["Turing-complete", "EVM Compatible", "Inheritance", "Modifiers"],
  },
  {
    id: "graphql",
    name: "GraphQL",
    categoryId: "backend",
    icon: "◈",
    description: "Query language for APIs that provides a complete description of the data in the API.",
    experienceLevel: "intermediate",
    yearsExperience: 2,
    proficiency: 60,
    color: "#e535ab",
    relatedTechnologies: ["react", "nodejs", "apollo", "typescript"],
    projects: ["GraphQL API Gateway", "Real-time Subscription Service"],
    certificates: [],
    learningResources: [
      { name: "GraphQL Documentation", type: "Documentation", url: "#" },
      { name: "How to GraphQL", type: "Tutorial", url: "#" },
    ],
    useCases: ["API Development", "Data Fetching", "Microservices"],
    features: ["Type System", "Subscriptions", "Resolver Pattern", "Schema Stitching"],
  },
  {
    id: "aws",
    name: "AWS",
    categoryId: "cloud",
    icon: "☁️",
    description: "Amazon Web Services - comprehensive cloud computing platform offering over 200 services.",
    experienceLevel: "intermediate",
    yearsExperience: 3,
    proficiency: 62,
    color: "#ff9900",
    relatedTechnologies: ["docker", "nodejs", "terraform", "serverless"],
    projects: ["Cloud Infrastructure", "Serverless API", "S3 Data Lake"],
    certificates: [{ name: "AWS Cloud Practitioner", issuer: "Amazon", url: "#" }],
    learningResources: [
      { name: "AWS Documentation", type: "Documentation", url: "#" },
    ],
    useCases: ["Cloud Infrastructure", "Serverless", "Storage", "Compute"],
    features: ["EC2", "Lambda", "S3", "RDS", "CloudFront"],
  },
  {
    id: "nextauth",
    name: "NextAuth.js",
    categoryId: "libraries",
    icon: "🔐",
    description: "Authentication library for Next.js applications with support for multiple providers.",
    experienceLevel: "advanced",
    yearsExperience: 3,
    proficiency: 82,
    color: "#000000",
    relatedTechnologies: ["nextjs", "react", "prisma", "typescript"],
    projects: ["Portfolio Platform", "SaaS Application"],
    certificates: [],
    learningResources: [
      { name: "NextAuth Documentation", type: "Documentation", url: "#" },
    ],
    useCases: ["Authentication", "Authorization", "Session Management"],
    features: ["OAuth Providers", "Credentials", "JWT Sessions", "Database Sessions"],
  },
  {
    id: "framer",
    name: "Framer Motion",
    categoryId: "libraries",
    icon: "🎬",
    description: "Animation library for React that makes creating complex animations simple.",
    experienceLevel: "advanced",
    yearsExperience: 3,
    proficiency: 80,
    color: "#0055ff",
    relatedTechnologies: ["react", "nextjs", "typescript"],
    projects: ["Portfolio Platform", "Landing Pages", "Interactive Dashboards"],
    certificates: [],
    learningResources: [
      { name: "Framer Motion Docs", type: "Documentation", url: "#" },
    ],
    useCases: ["UI Animations", "Page Transitions", "Gesture-based Interactions"],
    features: ["AnimatePresence", "Layout Animations", "Drag & Drop", "Variants"],
  },
  {
    id: "linux",
    name: "Linux",
    categoryId: "tools",
    icon: "🐧",
    description: "Open-source Unix-like operating system kernel. Essential for server administration and development.",
    experienceLevel: "advanced",
    yearsExperience: 5,
    proficiency: 78,
    color: "#fcc624",
    relatedTechnologies: ["docker", "kubernetes", "nodejs", "bash"],
    projects: ["Server Administration", "CI/CD Pipeline Setup", "Development Environment"],
    certificates: [],
    learningResources: [
      { name: "Linux Command Line", type: "Book", url: "#" },
    ],
    useCases: ["Server Management", "Development", "DevOps"],
    features: ["Shell", "File System", "Permissions", "Process Management"],
  },
  {
    id: "project-management",
    name: "Project Management",
    categoryId: "business",
    icon: "📋",
    description: "Expertise in planning, executing, and closing projects using agile and waterfall methodologies.",
    experienceLevel: "advanced",
    yearsExperience: 4,
    proficiency: 75,
    color: "#0ea5e9",
    relatedTechnologies: ["jira", "trello", "slack"],
    projects: ["Multiple Client Projects", "Team Leadership"],
    certificates: [{ name: "Project Management Professional", issuer: "PMI", url: "#" }],
    learningResources: [
      { name: "PMBOK Guide", type: "Book", url: "#" },
    ],
    useCases: ["Team Management", "Product Development", "Client Delivery"],
    features: ["Agile/Scrum", "Risk Management", "Budgeting", "Stakeholder Communication"],
  },
  {
    id: "seo",
    name: "SEO & Analytics",
    categoryId: "marketing",
    icon: "📊",
    description: "Search engine optimization and web analytics expertise for driving organic traffic and measuring performance.",
    experienceLevel: "intermediate",
    yearsExperience: 3,
    proficiency: 65,
    color: "#ef4444",
    relatedTechnologies: ["nextjs", "googleanalytics", "sentry"],
    projects: ["SEO Optimization Portfolio", "Analytics Dashboard", "Traffic Growth Strategy"],
    certificates: [{ name: "Google Analytics Certification", issuer: "Google", url: "#" }],
    learningResources: [
      { name: "Moz SEO Guide", type: "Guide", url: "#" },
    ],
    useCases: ["Traffic Growth", "Conversion Optimization", "Performance Monitoring"],
    features: ["Keyword Research", "Technical SEO", "Content Strategy", "Analytics"],
  },
  {
    id: "restapi",
    name: "REST API Design",
    categoryId: "backend",
    icon: "🔌",
    description: "Architectural style for designing networked applications. Focus on stateless, cacheable communication.",
    experienceLevel: "expert",
    yearsExperience: 5,
    proficiency: 88,
    color: "#25a162",
    relatedTechnologies: ["nodejs", "express", "typescript", "postgresql"],
    projects: ["REST API Gateway", "Payment Processing API", "Content API"],
    certificates: [],
    learningResources: [
      { name: "REST API Tutorial", type: "Guide", url: "#" },
    ],
    useCases: ["API Development", "System Integration", "Microservices"],
    features: ["Stateless", "Resource-based", "HATEOAS", "Versioning"],
  },
  {
    id: "html-css",
    name: "HTML & CSS",
    categoryId: "frontend",
    icon: "🌐",
    description: "Foundational web technologies for structuring and styling web content.",
    experienceLevel: "expert",
    yearsExperience: 7,
    proficiency: 95,
    color: "#e34f26",
    relatedTechnologies: ["tailwindcss", "javascript", "react", "nextjs"],
    projects: ["All Web Projects"],
    certificates: [],
    learningResources: [
      { name: "MDN Web Docs", type: "Documentation", url: "#" },
    ],
    useCases: ["Web Development", "Email Templates", "Documentation"],
    features: ["Semantic HTML", "CSS Grid", "Flexbox", "Custom Properties", "Animations"],
  },
]

export interface GraphNode {
  id: string
  name: string
  category: string
  proficiency: number
  color: string
  x?: number
  y?: number
  vx?: number
  vy?: number
}

export interface GraphLink {
  source: string
  target: string
  strength: number
}

export function buildGraphData(): { nodes: GraphNode[]; links: GraphLink[] } {
  const nodes: GraphNode[] = technologies.map((t) => ({
    id: t.id,
    name: t.name,
    category: t.categoryId,
    proficiency: t.proficiency,
    color: t.color,
  }))

  const links: GraphLink[] = []
  const added = new Set<string>()

  for (const tech of technologies) {
    for (const relatedId of tech.relatedTechnologies) {
      const key = [tech.id, relatedId].sort().join("-")
      if (!added.has(key)) {
        added.add(key)
        links.push({ source: tech.id, target: relatedId, strength: 0.5 })
      }
    }
  }

  return { nodes, links }
}

export interface RadarItem {
  name: string
  ring: "mastered" | "advanced" | "learning" | "future"
  category: string
  description?: string
}

export const radarData: RadarItem[] = [
  ...technologies
    .filter((t) => t.experienceLevel === "expert")
    .map((t) => ({ name: t.name, ring: "mastered" as const, category: t.categoryId, description: t.description })),
  ...technologies
    .filter((t) => t.experienceLevel === "advanced")
    .map((t) => ({ name: t.name, ring: "advanced" as const, category: t.categoryId, description: t.description })),
  ...technologies
    .filter((t) => t.experienceLevel === "intermediate")
    .map((t) => ({ name: t.name, ring: "learning" as const, category: t.categoryId, description: t.description })),
  ...technologies
    .filter((t) => t.experienceLevel === "beginner")
    .map((t) => ({ name: t.name, ring: "future" as const, category: t.categoryId, description: t.description })),
]
