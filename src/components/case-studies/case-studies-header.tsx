"use client"

import { motion } from "framer-motion"

interface CaseStudiesHeaderProps {
  totalStudies: number
}

export function CaseStudiesHeader({ totalStudies }: CaseStudiesHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-background pb-12 pt-20 sm:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-100/60 to-transparent blur-3xl dark:from-blue-950/40" />
        <div className="absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tl from-indigo-100/50 to-transparent blur-3xl dark:from-indigo-950/30" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-[var(--card-bg-60)] px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            {totalStudies} case studies
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Case Studies
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Deep dives into real projects I have delivered — from initial research and planning through
            architecture, development, and deployment. Each case study examines challenges, decisions,
            and measurable outcomes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
