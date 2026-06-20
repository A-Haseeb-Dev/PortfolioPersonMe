export interface Repo {
  id: string
  name: string
  description: string
  stars: number
  forks: number
  issues: number
  language: string
  languageColor: string
  url: string
  topics: string[]
  updatedAt: string
}

export interface Contribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export const repos: Repo[] = [
  {
    id: "nextjs-starter",
    name: "nextjs-starter",
    description: "Production-grade Next.js starter with authentication, database, theming, and CI/CD pre-configured.",
    stars: 342,
    forks: 89,
    issues: 4,
    language: "TypeScript",
    languageColor: "#3178C6",
    url: "https://github.com/abdulhaseeb/nextjs-starter",
    topics: ["nextjs", "starter-kit", "typescript", "prisma", "next-auth"],
    updatedAt: "2026-06-15",
  },
  {
    id: "react-form-validator",
    name: "react-form-validator",
    description: "Lightweight, type-safe form validation library for React with zero dependencies.",
    stars: 187,
    forks: 34,
    issues: 2,
    language: "TypeScript",
    languageColor: "#3178C6",
    url: "https://github.com/abdulhaseeb/react-form-validator",
    topics: ["react", "validation", "typescript", "forms"],
    updatedAt: "2026-06-10",
  },
  {
    id: "tailwind-glass",
    name: "tailwind-glass",
    description: "Tailwind CSS plugin for glass morphism effects with customizable blur, opacity, and border options.",
    stars: 256,
    forks: 41,
    issues: 1,
    language: "JavaScript",
    languageColor: "#F7DF1E",
    url: "https://github.com/abdulhaseeb/tailwind-glass",
    topics: ["tailwind-css", "glassmorphism", "plugin", "css"],
    updatedAt: "2026-05-28",
  },
  {
    id: "prisma-seeder",
    name: "prisma-seeder",
    description: "Declarative seed data generator for Prisma with factories, relations, and realistic fake data.",
    stars: 98,
    forks: 22,
    issues: 0,
    language: "TypeScript",
    languageColor: "#3178C6",
    url: "https://github.com/abdulhaseeb/prisma-seeder",
    topics: ["prisma", "seeding", "testing", "factory"],
    updatedAt: "2026-05-20",
  },
  {
    id: "framer-motion-hooks",
    name: "framer-motion-hooks",
    description: "Custom React hooks for common framer-motion animation patterns — scroll, parallax, reveal, and more.",
    stars: 423,
    forks: 67,
    issues: 3,
    language: "TypeScript",
    languageColor: "#3178C6",
    url: "https://github.com/abdulhaseeb/framer-motion-hooks",
    topics: ["framer-motion", "react", "hooks", "animations"],
    updatedAt: "2026-06-18",
  },
  {
    id: "cli-ai",
    name: "cli-ai",
    description: "CLI tool that brings AI assistants directly to your terminal — pipe any command output for analysis.",
    stars: 634,
    forks: 112,
    issues: 7,
    language: "Python",
    languageColor: "#3776AB",
    url: "https://github.com/abdulhaseeb/cli-ai",
    topics: ["cli", "ai", "terminal", "openai", "python"],
    updatedAt: "2026-06-19",
  },
  {
    id: "docker-node-deploy",
    name: "docker-node-deploy",
    description: "Production-ready Docker Compose setup for Node.js apps with Nginx, SSL, and monitoring.",
    stars: 145,
    forks: 53,
    issues: 1,
    language: "Dockerfile",
    languageColor: "#2496ED",
    url: "https://github.com/abdulhaseeb/docker-node-deploy",
    topics: ["docker", "nodejs", "devops", "deployment", "nginx"],
    updatedAt: "2026-04-30",
  },
  {
    id: "zustand-persist",
    name: "zustand-persist",
    description: "Zustand middleware for flexible state persistence with encryption, compression, and migration support.",
    stars: 78,
    forks: 15,
    issues: 0,
    language: "TypeScript",
    languageColor: "#3178C6",
    url: "https://github.com/abdulhaseeb/zustand-persist",
    topics: ["zustand", "state-management", "persistence", "react"],
    updatedAt: "2026-05-05",
  },
]

export const contributions: Contribution[] = (() => {
  const data: Contribution[] = []
  const now = new Date()
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split("T")[0]
    const rand = Math.random()
    let count = 0
    let level: 0 | 1 | 2 | 3 | 4 = 0
    if (rand > 0.6) {
      count = Math.floor(Math.random() * 5) + 1
      level = 1
    }
    if (rand > 0.8) {
      count = Math.floor(Math.random() * 10) + 5
      level = 2
    }
    if (rand > 0.93) {
      count = Math.floor(Math.random() * 15) + 10
      level = 3
    }
    if (rand > 0.98) {
      count = Math.floor(Math.random() * 20) + 15
      level = 4
    }
    data.push({ date: dateStr, count, level })
  }
  return data
})()

export const totalContributions = contributions.reduce((sum, c) => sum + c.count, 0)

export const githubProfile = {
  username: "abdulhaseeb",
  name: "Abdul Haseeb",
  avatar: "https://avatars.githubusercontent.com/u/abdulhaseeb",
  bio: "Full Stack Developer · Building open source tools for the community",
  totalStars: repos.reduce((s, r) => s + r.stars, 0),
  totalForks: repos.reduce((s, r) => s + r.forks, 0),
  totalRepos: repos.length,
}
