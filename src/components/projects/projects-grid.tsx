"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { ExternalLink, Code2, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { GlassCard } from "@/components/ui/glass-card"
import { EmptyState } from "@/components/ui/empty-state"
import type { Project } from "@/types"

interface ProjectsGridProps {
  projects: Project[]
  isLoading?: boolean
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}

const statusConfig = {
  completed: { label: "Completed", variant: "success" as const },
  "in-progress": { label: "In Progress", variant: "warning" as const },
  planned: { label: "Planned", variant: "secondary" as const },
}

const defaultGradients = [
  "from-zinc-900 to-zinc-700",
  "from-blue-600 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-purple-600 to-pink-500",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter()
  const gradient = defaultGradients[index % defaultGradients.length]
  const status = statusConfig[project.status]

  return (
    <motion.div variants={cardVariants}>
      <GlassCard
        intensity="light"
        border
        hover
        className="group cursor-pointer overflow-hidden"
        onClick={() => router.push(`/projects/${project.slug}`)}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className={cn(
                "flex h-full w-full items-center justify-center bg-gradient-to-br",
                gradient
              )}
            >
              <span className="text-4xl font-bold tracking-tight text-white/80">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
              >
                <Code2 className="h-4 w-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-background"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge variant={status.variant} className="text-[11px] shadow-sm">
              {status.label}
            </Badge>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="text-[11px]">
              {project.category}
            </Badge>
          </div>
          <h3 className="text-lg font-semibold leading-tight tracking-tight text-foreground">
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground/60">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-foreground">
            View Project
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl border-border bg-card">
      <Skeleton className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex gap-1.5">
          <Skeleton className="h-5 w-14" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
      </div>
    </div>
  )
}

export function ProjectsGrid({ projects, isLoading }: ProjectsGridProps) {
  if (isLoading) {
    return (
      <Container className="py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </Container>
    )
  }

  if (projects.length === 0) {
    return (
      <Container className="py-16">
        <EmptyState
          icon={<ExternalLink className="h-6 w-6" />}
          title="No projects found"
          description="No projects match the selected category. Try a different filter."
        />
      </Container>
    )
  }

  return (
    <Container className="py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>
    </Container>
  )
}
