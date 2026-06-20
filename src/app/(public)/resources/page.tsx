"use client"

import { Container } from "@/components/ui/container"
import ResourcesHeader from "@/components/resources/resources-header"
import ResourcesGrid from "@/components/resources/resources-grid"

export default function ResourcesPage() {
  return (
    <main className="min-h-screen pb-24">
      <Container>
        <ResourcesHeader />
        <ResourcesGrid />
      </Container>
    </main>
  )
}
