"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, GitBranch, ExternalLink, ChevronRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"

const gradients = [
  "from-blue-600 via-blue-500 to-cyan-400",
  "from-emerald-600 via-emerald-500 to-teal-400",
  "from-violet-600 via-violet-500 to-purple-400",
  "from-amber-600 via-amber-500 to-orange-400",
]

const featuredProjects = [
  {
    title: "Enterprise CRM Platform",
    description:
      "A comprehensive customer relationship management system with real-time analytics, AI-powered insights, and automated workflow management.",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Web App",
    details:
      "Built for a fast-growing SaaS company, this platform handles 10K+ daily active users with sub-second query times. Features include real-time dashboards, automated email workflows, role-based access control, and AI-powered lead scoring.",
  },
  {
    title: "E-Commerce Marketplace",
    description:
      "Full-featured e-commerce platform with multi-vendor support, real-time inventory management, and integrated payment processing.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redis"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Web App",
    details:
      "A multi-vendor marketplace connecting 500+ sellers with 50K+ customers. Implemented real-time inventory sync across warehouses, Stripe Connect for automated payouts, and a recommendation engine that boosted average order value by 34%.",
  },
  {
    title: "AI Content Generator",
    description:
      "An intelligent content generation tool leveraging large language models for automated blog posts, social media content, and marketing copy.",
    techStack: ["Python", "FastAPI", "React", "OpenAI", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "AI/ML",
    details:
      "Developed an AI-powered platform that generates SEO-optimized content at scale. Features include custom fine-tuned models for different industries, batch generation capabilities, plagiarism checking, and direct publishing to WordPress and Medium APIs.",
  },
  {
    title: "Health Tracking Mobile App",
    description:
      "Cross-platform mobile application for health monitoring with workout tracking, nutrition logging, and AI-powered recommendations.",
    techStack: ["React Native", "Expo", "Firebase", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    category: "Mobile",
    details:
      "A cross-platform health companion app with 100K+ downloads. Includes workout tracking with custom exercise creation, nutrition logging with barcode scanning, wearable device integration, and personalized AI health insights based on user patterns.",
  },
]

export default function FeaturedProjects() {
  const [selected, setSelected] = React.useState(0)

  return (
    <Section
      title="Featured Projects"
      subtitle="A selection of recent work that showcases my expertise across different domains."
      action={
        <Button variant="ghost" size="sm" asChild>
          <a href="/projects">
            View All Projects
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      }
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
        <div className="w-full shrink-0 space-y-1 lg:w-72 xl:w-80 lg:max-h-[600px] lg:overflow-y-auto">
          {featuredProjects.map((project, index) => (
            <button
              key={project.title}
              onClick={() => setSelected(index)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                selected === index
                  ? "bg-zinc-100 text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-50"
              )}
            >
              <span className={cn(
                "flex h-2 w-2 shrink-0 rounded-full transition-all duration-200",
                selected === index ? "bg-zinc-900 dark:bg-zinc-50" : "bg-zinc-300 dark:bg-zinc-600"
              )} />
              <span className="flex-1 truncate">{project.title}</span>
              <ChevronRight className={cn(
                "h-4 w-4 shrink-0 transition-all duration-200",
                selected === index ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
              )} />
            </button>
          ))}
        </div>
        <div className="relative min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <GlassCard intensity="light" hover={false} className="h-full overflow-hidden">
                {(() => {
                  const project = featuredProjects[selected]
                  const gradient = gradients[selected % gradients.length]
                  return (
                    <div>
                      <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[16/7]">
                        <div className={cn("absolute inset-0 bg-gradient-to-br", gradient)}>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_50%)]" />
                          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-7xl font-black tracking-tighter text-white/20 select-none">
                            {project.title.split(" ").map(w => w[0]).join("")}
                          </span>
                        </div>
                        <div className="absolute bottom-4 right-4 flex gap-2">
                          <Button size="sm" variant="secondary" asChild className="bg-white/80 backdrop-blur-sm dark:bg-zinc-800/80">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <GitBranch className="h-3.5 w-3.5" />
                              Source
                            </a>
                          </Button>
                          <Button size="sm" variant="secondary" asChild className="bg-white/80 backdrop-blur-sm dark:bg-zinc-800/80">
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3.5 w-3.5" />
                              Live Demo
                            </a>
                          </Button>
                        </div>
                      </div>
                      <div className="p-6 sm:p-8">
                        <div className="mb-4 flex items-center gap-2">
                          <Badge variant="secondary" className="rounded-md px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider">
                            {project.category}
                          </Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {project.details}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="inline-flex items-center rounded-md border border-zinc-200 bg-zinc-50/50 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/30 dark:text-zinc-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
