export interface CurrentCourse {
  id: string
  title: string
  description: string
  platform: string
  url: string
  startDate: Date
  estimatedEnd: Date
  progress: number
  category: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  date: Date
  category: string
  certificate?: string
  certificateUrl?: string
}

export interface RoadmapStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "future"
}

export interface Track {
  id: string
  title: string
  description: string
  color: string
  steps: RoadmapStep[]
}

export const currentCourses: CurrentCourse[] = [
  {
    id: "1",
    title: "Advanced Next.js 15 Patterns",
    description: "Deep dive into server components, server actions, caching strategies, and advanced data fetching patterns in Next.js 15.",
    platform: "Frontend Masters",
    url: "https://frontendmasters.com",
    startDate: new Date("2026-05-01"),
    estimatedEnd: new Date("2026-07-15"),
    progress: 65,
    category: "Web Development",
  },
  {
    id: "2",
    title: "Machine Learning Specialization",
    description: "Stanford's comprehensive ML course covering supervised learning, neural networks, and model evaluation techniques.",
    platform: "Coursera (DeepLearning.AI)",
    url: "https://coursera.org",
    startDate: new Date("2026-04-10"),
    estimatedEnd: new Date("2026-08-30"),
    progress: 40,
    category: "AI",
  },
  {
    id: "3",
    title: "Flutter & Dart - The Complete Guide",
    description: "Building cross-platform mobile applications with Flutter framework and Dart programming language.",
    platform: "Udemy",
    url: "https://udemy.com",
    startDate: new Date("2026-06-01"),
    estimatedEnd: new Date("2026-09-15"),
    progress: 25,
    category: "Mobile",
  },
  {
    id: "4",
    title: "AWS Solutions Architect Associate",
    description: "Preparing for the AWS SAA-C03 certification covering compute, storage, networking, and security services.",
    platform: "A Cloud Guru",
    url: "https://acloudguru.com",
    startDate: new Date("2026-05-15"),
    estimatedEnd: new Date("2026-08-01"),
    progress: 35,
    category: "DevOps",
  },
]

export const timelineMilestones: Milestone[] = [
  {
    id: "1",
    title: "React - The Complete Guide",
    description: "Comprehensive React course covering hooks, context, Redux, and testing with over 60 hours of content.",
    date: new Date("2025-03-15"),
    category: "Web Development",
    certificate: "React Developer Certificate",
    certificateUrl: "#",
  },
  {
    id: "2",
    title: "TypeScript Masterclass",
    description: "Advanced TypeScript patterns, generics, declaration files, and integration with React and Node.js.",
    date: new Date("2025-06-20"),
    category: "Programming Languages",
    certificate: "TypeScript Advanced Certificate",
    certificateUrl: "#",
  },
  {
    id: "3",
    title: "Node.js Microservices",
    description: "Building and deploying microservices architecture with Node.js, Express, and Docker.",
    date: new Date("2025-08-10"),
    category: "Backend",
  },
  {
    id: "4",
    title: "Python for Data Science",
    description: "Data analysis, visualization, and machine learning fundamentals using Python ecosystem.",
    date: new Date("2025-10-05"),
    category: "AI & Data",
    certificate: "Python for Data Science Certificate",
    certificateUrl: "#",
  },
  {
    id: "5",
    title: "Docker & Kubernetes Bootcamp",
    description: "Container orchestration with Docker Compose and Kubernetes cluster management.",
    date: new Date("2025-12-18"),
    category: "DevOps",
    certificate: "Containerization Essentials",
    certificateUrl: "#",
  },
  {
    id: "6",
    title: "Product-Led Growth Certification",
    description: "Strategies for building product-led growth models, viral loops, and freemium conversion optimization.",
    date: new Date("2026-02-28"),
    category: "Business",
    certificate: "PLG Certified Professional",
    certificateUrl: "#",
  },
]

export const roadmapTracks: Track[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    description: "Mastering modern frontend development from fundamentals to advanced patterns",
    color: "#3b82f6",
    steps: [
      { id: "f1", title: "HTML & CSS Fundamentals", description: "Semantic HTML, CSS Grid, Flexbox", status: "completed" },
      { id: "f2", title: "JavaScript Deep Dive", description: "Closures, event loop, async patterns", status: "completed" },
      { id: "f3", title: "React Ecosystem", description: "Hooks, state management, testing", status: "completed" },
      { id: "f4", title: "Next.js App Router", description: "RSC, server actions, caching", status: "completed" },
      { id: "f5", title: "Advanced Next.js Patterns", description: "Streaming, ISR, middleware", status: "current" },
      { id: "f6", title: "Web Performance & a11y", description: "Core Web Vitals, WCAG compliance", status: "future" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    description: "Building expertise in AI development from fundamentals to production ML",
    color: "#a855f7",
    steps: [
      { id: "a1", title: "Python Programming", description: "Python fundamentals for data science", status: "completed" },
      { id: "a2", title: "Math for ML", description: "Linear algebra, calculus, probability", status: "completed" },
      { id: "a3", title: "Machine Learning Specialization", description: "Supervised & unsupervised learning", status: "current" },
      { id: "a4", title: "Deep Learning", description: "Neural networks, CNNs, RNNs", status: "future" },
      { id: "a5", title: "LLM & RAG Systems", description: "Building production RAG pipelines", status: "future" },
      { id: "a6", title: "MLOps & Deployment", description: "Model serving, monitoring, A/B testing", status: "future" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Development",
    description: "Cross-platform mobile app development with Flutter",
    color: "#14b8a6",
    steps: [
      { id: "m1", title: "Dart Language", description: "Dart syntax, types, async programming", status: "completed" },
      { id: "m2", title: "Flutter Widget Tree", description: "Stateless & stateful widgets, layout", status: "completed" },
      { id: "m3", title: "Flutter State Management", description: "Riverpod, BLoC patterns", status: "current" },
      { id: "m4", title: "Flutter & Firebase", description: "Auth, Firestore, cloud functions", status: "future" },
      { id: "m5", title: "App Store Deployment", description: "iOS and Android release process", status: "future" },
    ],
  },
  {
    id: "devops",
    title: "DevOps & Cloud",
    description: "Cloud infrastructure and DevOps practices for production systems",
    color: "#f97316",
    steps: [
      { id: "d1", title: "Linux Administration", description: "Command line, shell scripting", status: "completed" },
      { id: "d2", title: "Docker & Containers", description: "Containerization, Docker Compose", status: "completed" },
      { id: "d3", title: "CI/CD Pipelines", description: "GitHub Actions, automated testing", status: "completed" },
      { id: "d4", title: "AWS Foundations", description: "S3, EC2, Lambda, RDS", status: "current" },
      { id: "d5", title: "Kubernetes", description: "Cluster management, Helm, scaling", status: "future" },
      { id: "d6", title: "Infrastructure as Code", description: "Terraform, Pulumi, CDK", status: "future" },
    ],
  },
]
