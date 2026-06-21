"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, GitBranch, ExternalLink, ChevronRight } from "lucide-react"
import { Section } from "@/components/ui/section"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const gradients = [
  "from-blue-600 via-blue-500 to-cyan-400",
  "from-emerald-600 via-emerald-500 to-teal-400",
  "from-violet-600 via-violet-500 to-purple-400",
  "from-amber-600 via-amber-500 to-orange-400",
]

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string | null
  liveUrl: string | null
  category: string
  details?: string
}

export default function FeaturedProjects() {
  const [selected, setSelected] = React.useState(0)
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    let cancelled = false

    fetch("/api/projects?featured=true&published=true&limit=6")
      .then((r) => {
        if (!r.ok) throw new Error(`API error: ${r.status}`)
        return r.json()
      })
      .then((json: Record<string, unknown>) => {
        if (cancelled) return
        const rawItems = json.projects
        if (!Array.isArray(rawItems)) {
          setLoading(false)
          return
        }
        const mapped: Project[] = rawItems.map((p: Record<string, unknown>) => {
          const rawTechs = p.technologies
          const techStack: string[] = Array.isArray(rawTechs)
            ? rawTechs.map((t: Record<string, unknown>) => {
                const tech = typeof t.technology === "object" && t.technology !== null
                  ? t.technology as Record<string, unknown>
                  : null
                return String(tech?.name ?? t.name ?? "")
              }).filter(Boolean)
            : []

          return {
            id: String(p.id ?? ""),
            title: String(p.title ?? ""),
            description: String(p.description ?? ""),
            techStack,
            githubUrl: typeof p.githubUrl === "string" ? p.githubUrl : null,
            liveUrl: typeof p.liveUrl === "string" ? p.liveUrl : null,
            category: String(p.category ?? "Project"),
            details: String(p.solution ?? p.description ?? ""),
          }
        })
        if (mapped.length > 0) setProjects(mapped)
      })
      .catch((err: Error) => {
        if (!cancelled) console.error("[FeaturedProjects] Failed to fetch:", err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  if (loading) {
    return (
      <Section title="Featured Projects" subtitle="Loading featured projects...">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-64 rounded-xl" />
          ))}
        </div>
      </Section>
    )
  }

  if (projects.length === 0) return null

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
          {projects.map((project, index) => (
            <button
              key={project.id}
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
                  const project = projects[selected]
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
                          {project.githubUrl && (
                            <Button size="sm" variant="secondary" asChild className="bg-white/80 backdrop-blur-sm dark:bg-zinc-800/80">
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <GitBranch className="h-3.5 w-3.5" />
                                Source
                              </a>
                            </Button>
                          )}
                          {project.liveUrl && (
                            <Button size="sm" variant="secondary" asChild className="bg-white/80 backdrop-blur-sm dark:bg-zinc-800/80">
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-3.5 w-3.5" />
                                Live Demo
                              </a>
                            </Button>
                          )}
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
                          {project.details || project.description}
                        </p>
                        {project.techStack.length > 0 && (
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
                        )}
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
