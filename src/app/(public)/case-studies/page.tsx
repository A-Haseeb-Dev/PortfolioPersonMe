"use client"

import { caseStudies as staticStudies } from "@/data/case-studies"
import { useData } from "@/hooks/use-data"
import { CaseStudiesHeader } from "@/components/case-studies/case-studies-header"
import { CaseStudiesList } from "@/components/case-studies/case-studies-list"

export default function CaseStudiesPage() {
  const caseStudies = useData("/api/case-studies", staticStudies)

  return (
    <div>
      <CaseStudiesHeader totalStudies={caseStudies.length} />
      <CaseStudiesList studies={caseStudies} />
    </div>
  )
}
