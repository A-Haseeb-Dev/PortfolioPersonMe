"use client"

import { useData } from "@/hooks/use-data"
import { CaseStudiesHeader } from "@/components/case-studies/case-studies-header"
import { CaseStudiesList } from "@/components/case-studies/case-studies-list"

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
  completedDate: Date | null
  duration: string | null
  createdAt: Date
  updatedAt: Date
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
    createdAt: new Date(item.createdAt as string),
    updatedAt: new Date(item.updatedAt as string),
  }))
}

export default function CaseStudiesPage() {
  const caseStudies = useData("/api/case-studies", [] as CaseStudy[], transformResponse)

  return (
    <div>
      <CaseStudiesHeader totalStudies={caseStudies.length} />
      <CaseStudiesList studies={caseStudies} />
    </div>
  )
}
