"use client"

import * as React from "react"
import { useData } from "@/hooks/use-data"
import type { Project } from "@/types"
import { ProjectsHeader } from "@/components/projects/projects-header"
import { ProjectsGrid } from "@/components/projects/projects-grid"

function transformProjects(data: Record<string, unknown>): Project[] {
  const items = (Array.isArray(data.projects) ? data.projects : []) as Array<{
    id: string
    title: string
    slug: string
    description?: string | null
    coverImage?: string | null
    images?: Array<string | { url?: string }> | null
    technologies?: Array<string | { name?: string; technology?: { name?: string } }> | null
    githubUrl?: string | null
    liveUrl?: string | null
    featured?: boolean | null
    published?: boolean | null
    createdAt?: string | null
    updatedAt?: string | null
    features?: unknown
  }>
  return items.map((p): Project => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description ?? "",
    content: null,
    image: p.coverImage || null,
    images: (p.images ?? []).map((i) => (typeof i === "string" ? i : (i.url ?? ""))),
    techStack: (p.technologies ?? []).map((t) => (typeof t === "string" ? t : (t.technology?.name ?? t.name ?? ""))),
    githubUrl: p.githubUrl || null,
    liveUrl: p.liveUrl || null,
    category: "Web",
    featured: p.featured || false,
    status: p.published ? "completed" : "in-progress" as const,
    startDate: p.createdAt ? new Date(p.createdAt) : null,
    endDate: null,
    highlights: Array.isArray(p.features) ? (p.features as string[]) : [],
    createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
    updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
  }))
}

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = React.useState("all")
  const projects = useData<Project>("/api/projects?published=true&limit=50", [], transformProjects)

  const filtered = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory)

  return (
    <div>
      <ProjectsHeader
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalProjects={projects.length}
      />
      <ProjectsGrid projects={filtered} isLoading={false} />
    </div>
  )
}
