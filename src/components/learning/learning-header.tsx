"use client"

import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export default function LearningHeader() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background pb-12 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-emerald-100/60 to-transparent blur-3xl dark:from-emerald-900/30" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-teal-100/50 to-transparent blur-3xl dark:from-teal-800/25" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-[var(--card-bg-60)] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <GraduationCap className="h-3.5 w-3.5" />
            Continuous learning path
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Learning{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-300">
              Journey
            </span>
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Tracking my continuous learning path — courses, certificates, and milestones I have achieved along the way.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
