"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Calendar, Target } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/ui/section"
import { formatDateShort } from "@/lib/utils"

interface CurrentCourse {
  id: string
  title: string
  description: string
  platform: string
  url: string
  startDate: Date
  estimatedEnd: Date
  progress: number
  category: string
}

interface CurrentLearningProps {
  courses: CurrentCourse[]
}

const categoryColors: Record<string, "default" | "secondary" | "success" | "warning" | "danger" | "info"> = {
  "Web Development": "info",
  "Mobile": "success",
  "AI": "secondary",
  "DevOps": "warning",
  "Business": "default",
}

export default function CurrentLearning({ courses }: CurrentLearningProps) {
  return (
    <Section title="Currently Learning" subtitle="Courses and resources I am actively studying">
      <div className="grid gap-6 lg:grid-cols-2">
        {courses.map((course, index) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <GlassCard className="p-6" hover={false}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={categoryColors[course.category] || "secondary"}
                    >
                      {course.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{course.platform}</span>
                  </div>

                  <h3 className="font-semibold text-foreground">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Started {formatDateShort(course.startDate)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="h-3.5 w-3.5" />
                      Est. {formatDateShort(course.estimatedEnd)}
                    </span>
                  </div>
                </div>

                <a
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
