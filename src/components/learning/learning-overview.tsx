"use client"

import { motion } from "framer-motion"
import { CheckCircle2, BookOpen, Clock, Award } from "lucide-react"

interface LearningOverviewProps {
  totalCompleted: number
  totalInProgress: number
  totalTimeSpent: number
  totalCertificates: number
}

export default function LearningOverview({
  totalCompleted,
  totalInProgress,
  totalTimeSpent,
  totalCertificates,
}: LearningOverviewProps) {
  const stats = [
    { label: "Completed", value: totalCompleted, icon: CheckCircle2, color: "from-emerald-500 to-emerald-400" },
    { label: "In Progress", value: totalInProgress, icon: BookOpen, color: "from-blue-500 to-blue-400" },
    { label: "Hours Spent", value: `${totalTimeSpent}+`, icon: Clock, color: "from-amber-500 to-amber-400" },
    { label: "Certificates", value: totalCertificates, icon: Award, color: "from-purple-500 to-purple-400" },
  ]

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="rounded-xl border border-border/60 bg-[var(--card-bg-80)] p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
