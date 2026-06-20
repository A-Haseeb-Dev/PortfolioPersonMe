"use client"

import { motion } from "framer-motion"
import { currentCourses as staticCourses, timelineMilestones as staticMilestones, roadmapTracks as staticTracks } from "@/data/learning"
import { useState, useEffect } from "react"
import LearningHeader from "@/components/learning/learning-header"
import LearningOverview from "@/components/learning/learning-overview"
import CurrentLearning from "@/components/learning/current-learning"
import LearningTimeline from "@/components/learning/learning-timeline"
import LearningRoadmap from "@/components/learning/learning-roadmap"

export default function LearningPage() {
  const [courses, setCourses] = useState(staticCourses)
  const [milestones, setMilestones] = useState(staticMilestones)
  const [tracks, setTracks] = useState(staticTracks)

  useEffect(() => {
    fetch("/api/learning")
      .then(r => r.json())
      .then(res => {
        const learning = res.learning || res.data || []
        if (learning.length > 0) {
          setCourses(learning.filter((l: any) => l.status === "CURRENT" || l.status === "current" || l.status === "in-progress"))
          setMilestones(learning.filter((l: any) => l.status === "COMPLETED" || l.status === "completed"))
          setTracks(learning.filter((l: any) => l.status === "PLANNED" || l.status === "planned"))
        }
      })
      .catch(() => {})
  }, [])

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
