"use client"

import { Container } from "@/components/ui/container"
import AchievementsHeader from "@/components/achievements/achievements-header"
import AchievementsTimeline from "@/components/achievements/achievements-timeline"

export default function AchievementsPage() {
  return (
    <main className="min-h-screen pb-24">
      <AchievementsHeader />
      <Container className="pt-6 sm:pt-8">
        <AchievementsTimeline />
      </Container>
    </main>
  )
}
