"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, FolderOpen } from "lucide-react"
import { useData } from "@/hooks/use-data"
import { ProjectDetail } from "@/components/projects/project-detail"
import type { ProjectDetailData } from "@/components/projects/project-detail"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"

function transformProjectDetail(data: Record<string, unknown>): ProjectDetailData[] {
  const items = (data as any).projects || []
  return items.map((p: any): ProjectDetailData => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    description: p.description,
    image: p.coverImage || null,
    images: (p.images || []).map((i: any) => typeof i === "string" ? i : i.url),
    techStack: (p.technologies || []).map((t: any) => t.technology?.name || t.name),
    githubUrl: p.githubUrl || null,
    liveUrl: p.liveUrl || null,
    content: p.description || null,
    category: "Web",
    featured: p.featured || false,
    status: p.published ? "completed" : "in-progress" as const,
    startDate: p.createdAt ? new Date(p.createdAt) : null,
    endDate: null,
    highlights: Array.isArray(p.features) ? p.features : [],
    createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
    updatedAt: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    problem: p.problem || "",
    solution: p.solution || "",
    architecture: p.architecture || "",
    features: Array.isArray(p.features) ? p.features : [],
    videoUrl: p.videoDemo || null,
    results: p.results || "",
    lessonsLearned: [],
    screenshots: (p.images || []).map((i: any) => typeof i === "string" ? i : i.url),
    relatedProjects: [],
  }))
}

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const projects = useData<ProjectDetailData>("/api/projects?published=true&limit=50", [], transformProjectDetail)
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          icon={<FolderOpen className="h-6 w-6" />}
          title="Project not found"
          description="The project you are looking for does not exist."
          action={
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          }
        />
      </Container>
    )
  }

  return <ProjectDetail project={project} />
}
