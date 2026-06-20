export interface StartupIdea {
  id: string
  title: string
  tagline: string
  problem: string
  solution: string
  market: string
  revenueModel: string
  status: "idea" | "validating" | "building" | "launched" | "failed"
  techStack: string[]
  tags: string[]
  color: string
}

export const startupIdeas: StartupIdea[] = [
  {
    id: "devflow",
    title: "DevFlow",
    tagline: "AI-powered developer workflow assistant",
    problem: "Developers waste 30% of their time on repetitive tasks like code reviews, documentation, and issue triaging.",
    solution: "An AI agent that integrates with GitHub/GitLab to automate PR reviews, generate docs, and triage issues intelligently.",
    market: "$2B+ developer productivity tools market growing at 25% CAGR",
    revenueModel: "Freemium SaaS — $15/user/month for teams, custom enterprise pricing",
    status: "validating",
    techStack: ["Next.js", "TypeScript", "Python", "LangChain", "PostgreSQL"],
    tags: ["AI", "Developer Tools", "SaaS", "Productivity"],
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "skillswap",
    title: "SkillSwap",
    tagline: "Barter-based learning marketplace",
    problem: "Online learning is expensive and isolated. People have skills to teach but no platform to trade them.",
    solution: "A marketplace where users trade skills via video sessions — teach React, learn Guitar — no money involved.",
    market: "$350B global edtech market; 60% of Gen Z want peer-to-peer learning",
    revenueModel: "Premium memberships ($9/mo) for unlimited swaps + featured listings",
    status: "idea",
    techStack: ["Next.js", "TypeScript", "WebRTC", "Stripe", "Supabase"],
    tags: ["EdTech", "Marketplace", "P2P", "Community"],
    color: "from-purple-500 to-pink-400",
  },
  {
    id: "greenscan",
    title: "GreenScan",
    tagline: "Scan products, know their climate impact",
    problem: "Consumers want to shop sustainably but have no easy way to verify a product's environmental footprint.",
    solution: "Mobile app that scans barcodes and AI-generates a sustainability score using supply chain data.",
    market: "$150B sustainable goods market; 73% of consumers want transparency",
    revenueModel: "B2B API licensing for retailers + affiliate commissions from eco-brands",
    status: "building",
    techStack: ["React Native", "TypeScript", "Python", "TensorFlow", "MongoDB"],
    tags: ["Climate", "AI", "Mobile", "Consumer"],
    color: "from-emerald-500 to-teal-400",
  },
  {
    id: "legalease",
    title: "LegalEase",
    tagline: "Democratizing legal help for freelancers",
    problem: "Freelancers and solopreneurs can't afford $300/hr lawyers for simple contracts and compliance.",
    solution: "AI-powered legal document generator + on-demand affordable lawyer network for the gig economy.",
    market: "78M freelancers in US alone; $4.6B legal tech market",
    revenueModel: "Pay-per-document ($19-49) + annual compliance subscription ($199/yr)",
    status: "validating",
    techStack: ["Next.js", "Python", "GPT-4", "PostgreSQL", "DocuSign API"],
    tags: ["LegalTech", "Freelance", "AI", "SaaS"],
    color: "from-amber-500 to-orange-400",
  },
  {
    id: "fitmate",
    title: "FitMate",
    tagline: "AI personal trainer that actually adapts",
    problem: "Fitness apps give generic plans. Personal trainers are expensive ($50-100/session).",
    solution: "AI that watches you via camera, corrects form in real-time, and adapts workouts based on progress and recovery.",
    market: "$30B fitness app market; 45% of users quit within 30 days due to lack of personalization",
    revenueModel: "Subscription $12.99/mo + premium coaching add-on",
    status: "idea",
    techStack: ["React Native", "TensorFlow.js", "TypeScript", "Node.js", "Redis"],
    tags: ["Health", "AI", "Mobile", "Fitness"],
    color: "from-rose-500 to-red-400",
  },
  {
    id: "indiehq",
    title: "IndieHQ",
    tagline: "All-in-one operations hub for indie hackers",
    problem: "Indie founders juggle 15+ tools (Stripe, GitHub, Analytics, Email) with no unified dashboard.",
    solution: "A unified command center that connects all SaaS tools into one dashboard with actionable insights.",
    market: "2M+ indie makers worldwide; $12B small business SaaS market",
    revenueModel: "$19/mo starter, $49/mo pro with team features",
    status: "building",
    techStack: ["Next.js", "TypeScript", "tRPC", "Prisma", "PostgreSQL"],
    tags: ["SaaS", "Indie", "Productivity", "Dashboard"],
    color: "from-sky-500 to-indigo-400",
  },
  {
    id: "localcart",
    title: "LocalCart",
    tagline: "Shop local, delivered fast",
    problem: "Local shops have no online presence. Customers want local delivery but only find Amazon.",
    solution: "Hyperlocal marketplace connecting neighborhood stores with customers — delivery in under 2 hours.",
    market: "Failed $100B+ hyperlocal delivery market — but post-COVID demand is real and unit economics improved",
    revenueModel: "10% commission per order + delivery fee split + featured store listings",
    status: "failed",
    techStack: ["Next.js", "TypeScript", "Flutter", "Firebase", "Google Maps API"],
    tags: ["E-commerce", "Local", "Delivery", "Marketplace"],
    color: "from-zinc-600 to-zinc-400",
  },
  {
    id: "mentorbridge",
    title: "MentorBridge",
    tagline: "Connect junior devs with senior mentors",
    problem: "Junior developers struggle to find quality mentorship. Senior devs want to give back but have no platform.",
    solution: "Structured mentorship platform with career tracks, code review, and 1:1 video sessions.",
    market: "25M+ junior developers globally; corporate training is a $370B market",
    revenueModel: "Company sponsorship ($5k/mo for talent pipelines) + individual plans ($29/mo)",
    status: "launched",
    techStack: ["Next.js", "TypeScript", "WebRTC", "Stripe", "Prisma"],
    tags: ["EdTech", "Community", "Career", "Mentorship"],
    color: "from-violet-500 to-purple-400",
  },
]
