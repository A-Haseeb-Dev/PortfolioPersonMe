"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Circle, Play } from "lucide-react"
import { cn } from "@/lib/utils"
interface RoadmapStep {
  id: string
  title: string
  description: string
  status: "completed" | "current" | "future"
}

interface Track {
  id: string
  title: string
  description: string
  color: string
  steps: RoadmapStep[]
}

interface LearningRoadmapProps {
  tracks: Track[]
}

export default function LearningRoadmap({ tracks }: LearningRoadmapProps) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Learning Roadmap
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          My planned learning tracks and progress
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {tracks.map((track, trackIndex) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: trackIndex * 0.1, duration: 0.4 }}
            className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-6 shadow-sm"
          >
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: track.color }} />
                <h3 className="text-lg font-semibold text-foreground">
                  {track.title}
                </h3>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {track.description}
              </p>
            </div>

            <div className="space-y-1">
              {track.steps.map((step, stepIndex) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: stepIndex * 0.05, duration: 0.3 }}
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-3 transition-colors",
                    "hover:bg-muted"
                  )}
                >
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center">
                    {step.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    ) : step.status === "current" ? (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full" style={{ backgroundColor: track.color }}>
                        <Play className="h-3 w-3 text-white" />
                      </div>
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span
                      className={cn(
                        "text-sm font-medium",
                        step.status === "future"
                          ? "text-muted-foreground"
                          : "text-foreground"
                      )}
                    >
                      {step.title}
                    </span>
                    <p
                      className={cn(
                        "text-xs",
                        step.status === "future"
                          ? "text-muted-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
