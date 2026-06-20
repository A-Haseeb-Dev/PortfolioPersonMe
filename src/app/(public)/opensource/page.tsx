"use client"

import { Container } from "@/components/ui/container"
import OpensourceHeader from "@/components/opensource/opensource-header"
import OpensourceRepos from "@/components/opensource/opensource-repos"
import OpensourceContributions from "@/components/opensource/opensource-contributions"

export default function OpensourcePage() {
  return (
    <main className="min-h-screen pb-24">
      <Container>
        <OpensourceHeader />
        <OpensourceContributions />
        <OpensourceRepos />
      </Container>
    </main>
  )
}
