"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"
import { useData } from "@/hooks/use-data"
import LearningHeader from "@/components/learning/learning-header"
import LearningOverview from "@/components/learning/learning-overview"
import CurrentLearning from "@/components/learning/current-learning"
import LearningTimeline from "@/components/learning/learning-timeline"
import LearningRoadmap from "@/components/learning/learning-roadmap"

interface ApiMilestone {
  id: string
  title: string
  description: string | null
  date: string
  journeyId: string
  completed: boolean
}

interface LearningJourney {
  id: string
  title: string
  description: string | null
  status: string
  category: string | null
  resource: string | null
  startDate: string | null
  endDate: string | null
  certificate: string | null
  notes: string | null
  createdAt: string
  updatedAt: string
  milestones: ApiMilestone[]
}

export default function LearningPage() {
  const learning = useData<LearningJourney>("/api/learning", [])

  const courses = useMemo(
    () =>
      learning
        .filter((l) => l.status === "CURRENT")
        .map((l) => ({
          id: l.id,
          title: l.title,
          description: l.description || "",
          platform: l.resource || "",
          url: "",
          startDate: new Date(l.startDate || l.createdAt),
          estimatedEnd: new Date(l.endDate || l.startDate || l.createdAt),
          progress: 0,
          category: l.category || "",
        })),
    [learning],
  )

  const milestones = useMemo(
    () =>
      learning
        .filter((l) => l.status === "COMPLETED")
        .map((l) => ({
          id: l.id,
          title: l.title,
          description: l.description || "",
          date: new Date(l.endDate || l.createdAt),
          category: l.category || "",
          certificate: l.certificate || undefined,
        })),
    [learning],
  )

  const tracks = useMemo(
    () =>
      learning
        .filter((l) => l.status === "PLANNED")
        .map((l) => ({
          id: l.id,
          title: l.title,
          description: l.description || "",
          color: "#3b82f6",
          steps: l.milestones.map((m) => ({
            id: m.id,
            title: m.title,
            description: m.description || "",
            status: (m.completed ? "completed" : "future") as "completed" | "future",
          })),
        })),
    [learning],
  )

  const totalCompleted = milestones.length
  const totalInProgress = courses.length
  const totalTimeSpent = 480
  const totalCertificates = milestones.filter((m) => m.certificate).length

  return (
    <div className="min-h-screen bg-background">
      <LearningHeader />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <LearningOverview
          totalCompleted={totalCompleted}
          totalInProgress={totalInProgress}
          totalTimeSpent={totalTimeSpent}
          totalCertificates={totalCertificates}
        />
      </motion.div>

        <CurrentLearning courses={courses} />

      <div className="border-t border-border" />

      <LearningTimeline milestones={milestones} />

      <div className="border-t border-border" />

      <LearningRoadmap tracks={tracks} />
    </div>
  )
}
