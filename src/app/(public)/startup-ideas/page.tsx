"use client"

import { Container } from "@/components/ui/container"
import StartupHeader from "@/components/startup/startup-header"
import StartupGrid from "@/components/startup/startup-grid"

export default function StartupIdeasPage() {
  return (
    <main className="min-h-screen pb-24">
      <Container>
        <StartupHeader />
        <StartupGrid />
      </Container>
    </main>
  )
}
