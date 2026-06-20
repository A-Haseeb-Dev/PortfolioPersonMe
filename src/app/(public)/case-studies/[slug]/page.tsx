"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BarChart3 } from "lucide-react"
import { CaseStudyDetail } from "@/components/case-studies/case-study-detail"
import { caseStudyDetails as staticDetails } from "@/data/case-studies"
import { useData } from "@/hooks/use-data"
import { Container } from "@/components/ui/container"
import { EmptyState } from "@/components/ui/empty-state"

export default function CaseStudyDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const allStudies = useData("/api/case-studies", staticDetails)
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
