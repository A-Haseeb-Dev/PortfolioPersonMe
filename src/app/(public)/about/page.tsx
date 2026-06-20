"use client"

import HeroSection from "@/components/about/hero-section"
import StorySection from "@/components/about/story-section"
import MissionVision from "@/components/about/mission-vision"
import Education from "@/components/about/education"
import CareerTimeline from "@/components/about/career-timeline"
import FutureGoals from "@/components/about/future-goals"
import StatsSection from "@/components/about/stats-section"

export default function AboutPage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <StorySection />
      <MissionVision />
      <Education />
      <CareerTimeline />
      <FutureGoals />
    </>
  )
}
