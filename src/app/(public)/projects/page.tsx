"use client"

import * as React from "react"
import { useData } from "@/hooks/use-data"
import type { Project } from "@/types"
import { ProjectsHeader } from "@/components/projects/projects-header"
import { ProjectsGrid } from "@/components/projects/projects-grid"

function categoryForProject(p: {
  githubUrl?: string | null
  liveUrl?: string | null
  technologyNames?: string[]
}): string {
  const stack = (p.technologyNames ?? []).join(" ").toLowerCase()
  if (/\b(react\s*native|flutter|swift|kotlin|dart|expo|android|ios)\b/.test(stack)) return "mobile"
  if (/\b(tensorflow|pytorch|openai|langchain|llm|gpt|machine[\s-]?learning|huggingface|hugging[\s-]?face)\b/.test(stack)) return "ai"
  if (p.githubUrl && p.liveUrl) return "saas"
  if (p.githubUrl) return "opensource"
  return "web"
}

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
  return items.map((p): Project => {
    const techStack = (p.technologies ?? []).map((t) => (typeof t === "string" ? t : (t.technology?.name ?? t.name ?? "")))
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description ?? "",
      content: null,
      image: p.coverImage || null,
      images: (p.images ?? []).map((i) => (typeof i === "string" ? i : (i.url ?? ""))),
      techStack,
      githubUrl: p.githubUrl || null,
      liveUrl: p.liveUrl || null,
      category: categoryForProject({ githubUrl: p.githubUrl, liveUrl: p.liveUrl, technologyNames: techStack }),
      featured: p.featured || false,
      status: p.published ? "completed" : "in-progress" as const,
      startDate: p.createdAt ? new Date(p.createdAt) : null,
      endDate: null,
      highlights: Array.isArray(p.features) ? (p.features as string[]) : [],
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    }
  })
}

const categoryTabs = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI" },
  { id: "saas", label: "SaaS" },
  { id: "opensource", label: "Open Source" },
]

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = React.useState("all")
  const projects = useData<Project>("/api/projects?published=true&limit=50", [], transformProjects)

  const activeCategoryExists = activeCategory === "all" || projects.some((p) => p.category === activeCategory)
  const effectiveCategory = activeCategoryExists ? activeCategory : "all"

  const categories = React.useMemo(() => {
    const present = Array.from(new Set(projects.map((p) => p.category)))
    return categoryTabs.filter((t) => t.id === "all" || present.includes(t.id))
  }, [projects])

  const filtered = effectiveCategory === "all"
    ? projects
    : projects.filter((p) => p.category === effectiveCategory)

  return (
    <div>
      <ProjectsHeader
        activeCategory={effectiveCategory}
        onCategoryChange={setActiveCategory}
        totalProjects={projects.length}
        categories={categories}
      />
      <ProjectsGrid projects={filtered} isLoading={false} />
    </div>
  )
}
