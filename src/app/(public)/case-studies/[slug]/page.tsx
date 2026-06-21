"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { CaseStudyDetail } from "@/components/case-studies/case-study-detail"
import { useData } from "@/hooks/use-data"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"

interface CaseStudy {
  id: string
  title: string
  slug: string
  client: string
  overview: string
  challenge: string
  approach: string
  solution: string
  results: string
  techStack: string[]
  image: string | null
  images: string[]
  testimonial: string | null
  metrics: { label: string; value: string }[]
  featured: boolean
  completedDate: string | null
  duration: string | null
  createdAt: string
  updatedAt: string
  research?: string
  planning?: string
  design?: string
  architecture?: string
  development?: string
  testing?: string
  deployment?: string
  technologies?: string[]
}

function transformResponse(data: Record<string, unknown>): CaseStudy[] {
  const items = (data as Record<string, unknown>).caseStudies as Record<string, unknown>[] ?? []
  if (!Array.isArray(items)) return []
  return items.map((item) => ({
    id: item.id as string,
    title: item.title as string,
    slug: item.slug as string,
    client: (item.client as string) ?? "",
    overview: (item.problem as string) ?? "",
    challenge: (item.problem as string) ?? "",
    approach: (item.problem as string) ?? "",
    solution: (item.results as string) ?? "",
    results: (item.results as string) ?? "",
    techStack: Array.isArray(item.technologies) ? item.technologies as string[] : [],
    image: (item.coverImage as string) ?? null,
    images: [],
    testimonial: null,
    metrics: [],
    featured: (item.featured as boolean) ?? false,
    completedDate: null,
    duration: (item.duration as string) ?? null,
    createdAt: new Date(item.createdAt as string).toISOString(),
    updatedAt: new Date(item.updatedAt as string).toISOString(),
    research: (item.research as string) ?? undefined,
    planning: (item.planning as string) ?? undefined,
    design: (item.design as string) ?? undefined,
    architecture: (item.architecture as string) ?? undefined,
    development: (item.development as string) ?? undefined,
    testing: (item.testing as string) ?? undefined,
    deployment: (item.deployment as string) ?? undefined,
    technologies: Array.isArray(item.technologies) ? item.technologies as string[] : undefined,
  }))
}

export default function CaseStudyDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const allStudies = useData("/api/case-studies", [] as CaseStudy[], transformResponse)
  const study = allStudies.find((s) => s.slug === slug)

  if (!study) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <EmptyState
          icon={<BarChart3 className="h-6 w-6" />}
          title="Case study not found"
          description="The case study you are looking for does not exist."
          action={
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Case Studies
            </Link>
          }
        />
      </Container>
    )
  }

  return <CaseStudyDetail study={study} />
}
