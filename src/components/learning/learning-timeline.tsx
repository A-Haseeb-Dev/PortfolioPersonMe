"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Award, ExternalLink } from "lucide-react"
import { formatDate } from "@/lib/utils"
interface Milestone {
  id: string
  title: string
  description: string
  date: Date
  category: string
  certificate?: string
  certificateUrl?: string
}

interface LearningTimelineProps {
  milestones: Milestone[]
}

export default function LearningTimeline({ milestones }: LearningTimelineProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
          Learning Timeline
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Courses and milestones I have completed
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[23px] top-0 h-full w-px bg-gradient-to-b from-emerald-300 via-emerald-200 to-zinc-200 dark:from-emerald-700 dark:via-emerald-800 dark:to-zinc-800" />

        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative pl-14"
            >
              <div className="absolute left-0 top-0 flex h-[46px] w-[46px] items-center justify-center rounded-full border-2 border-emerald-200 bg-[var(--card-bg-80)] shadow-sm dark:border-emerald-700">
                {milestone.certificate ? (
                  <Award className="h-5 w-5 text-emerald-500" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                )}
              </div>

              <div className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        {milestone.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(milestone.date)}
                      </span>
                    </div>

                    <h3 className="font-semibold text-foreground">
                      {milestone.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {milestone.description}
                    </p>

                    {milestone.certificate && (
                      <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 dark:bg-amber-900/20">
                        <Award className="h-4 w-4 shrink-0 text-amber-500" />
                        <span className="text-sm text-foreground">
                          {milestone.certificate}
                        </span>
                        {milestone.certificateUrl && (
                          <a
                            href={milestone.certificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-400"
                          >
                            View
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
